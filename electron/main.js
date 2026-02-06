const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const waitOn = require('wait-on');

let mainWindow;
let nextServer;
let expressServer;
let browserViews = new Map(); // Хранилище вкладок

const isDev = process.env.NODE_ENV === 'development';
const NEXT_PORT = 3000;
const EXPRESS_PORT = 8080;

// Запуск Express сервера
function startExpressServer() {
  console.log('Starting Express server...');
  
  expressServer = spawn('npm', ['run', isDev ? 'dev' : 'start'], {
    shell: true,
    cwd: path.join(__dirname, '../server'),
    env: { ...process.env, PORT: EXPRESS_PORT }
  });

  expressServer.stdout.on('data', (data) => {
    console.log(`[Express] ${data}`);
  });

  expressServer.stderr.on('data', (data) => {
    console.error(`[Express Error] ${data}`);
  });
}

// Запуск Next.js сервера
function startNextServer() {
  console.log('Starting Next.js server...');
  
  nextServer = spawn('npm', ['run', isDev ? 'dev' : 'start'], {
    shell: true,
    cwd: path.join(__dirname, '../client'),
    env: { ...process.env, PORT: NEXT_PORT }
  });

  nextServer.stdout.on('data', (data) => {
    console.log(`[Next.js] ${data}`);
  });

  nextServer.stderr.on('data', (data) => {
    console.error(`[Next.js Error] ${data}`);
  });
}

// Создание главного окна
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hidden', // Для кастомного заголовка
    trafficLightPosition: { x: 15, y: 15 } // macOS кнопки
  });

  // Загружаем Next.js приложение
  mainWindow.loadURL(`http://localhost:${NEXT_PORT}`);

  // DevTools в режиме разработки
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    // Закрываем все вкладки
    browserViews.forEach(view => view.destroy());
    browserViews.clear();
  });
}

// Управление вкладками браузера
ipcMain.handle('create-tab', async (event, url) => {
  const tabId = Date.now().toString();
  
  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.addBrowserView(view);
  
  // Позиционирование (отступ сверху под Header вашего UI)
  const bounds = mainWindow.getBounds();
  view.setBounds({
    x: 0,
    y: 120, // Высота вашего Header компонента
    width: bounds.width,
    height: bounds.height - 120
  });

  view.setAutoResize({
    width: true,
    height: true
  });

  view.webContents.loadURL(url || 'https://www.google.com');

  // Отслеживание навигации
  view.webContents.on('did-navigate', (e, url) => {
    mainWindow.webContents.send('tab-navigated', { tabId, url });
  });

  view.webContents.on('page-title-updated', (e, title) => {
    mainWindow.webContents.send('tab-title-updated', { tabId, title });
  });

  browserViews.set(tabId, view);
  
  return { tabId, url: url || 'https://www.google.com' };
});

// Переключение вкладок
ipcMain.handle('switch-tab', async (event, tabId) => {
  const view = browserViews.get(tabId);
  if (!view) return { success: false };

  // Скрываем все остальные вкладки
  browserViews.forEach((v, id) => {
    if (id !== tabId) {
      mainWindow.removeBrowserView(v);
    }
  });

  // Показываем нужную
  mainWindow.addBrowserView(view);
  const bounds = mainWindow.getBounds();
  view.setBounds({
    x: 0,
    y: 120,
    width: bounds.width,
    height: bounds.height - 120
  });

  return { success: true };
});

// Закрытие вкладки
ipcMain.handle('close-tab', async (event, tabId) => {
  const view = browserViews.get(tabId);
  if (!view) return { success: false };

  mainWindow.removeBrowserView(view);
  view.webContents.destroy();
  browserViews.delete(tabId);

  return { success: true };
});

// Навигация в активной вкладке
ipcMain.handle('navigate-tab', async (event, { tabId, url }) => {
  const view = browserViews.get(tabId);
  if (!view) return { success: false };

  view.webContents.loadURL(url);
  return { success: true };
});

// Назад/Вперед в активной вкладке
ipcMain.handle('tab-go-back', async (event, tabId) => {
  const view = browserViews.get(tabId);
  if (view && view.webContents.canGoBack()) {
    view.webContents.goBack();
  }
  return { success: true };
});

ipcMain.handle('tab-go-forward', async (event, tabId) => {
  const view = browserViews.get(tabId);
  if (view && view.webContents.canGoForward()) {
    view.webContents.goForward();
  }
  return { success: true };
});

ipcMain.handle('tab-reload', async (event, tabId) => {
  const view = browserViews.get(tabId);
  if (view) {
    view.webContents.reload();
  }
  return { success: true };
});

// Главная последовательность запуска
app.whenReady().then(async () => {
  // Запускаем серверы
  startExpressServer();
  startNextServer();

  // Ждём, пока серверы запустятся
  console.log('Waiting for servers to start...');
  
  try {
    await waitOn({
      resources: [
        `http://localhost:${EXPRESS_PORT}`,
        `http://localhost:${NEXT_PORT}`
      ],
      timeout: 30000,
      interval: 1000
    });

    console.log('Servers are ready!');
    createWindow();
  } catch (err) {
    console.error('Failed to start servers:', err);
    app.quit();
  }
});

// Управление окнами (macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Очистка при выходе
app.on('before-quit', () => {
  console.log('Shutting down servers...');
  
  if (nextServer) {
    nextServer.kill();
  }
  
  if (expressServer) {
    expressServer.kill();
  }

  // Закрываем все вкладки
  browserViews.forEach(view => view.destroy());
});
