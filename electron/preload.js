const { contextBridge, ipcRenderer } = require('electron');

// Предоставляем безопасный API для клиента
contextBridge.exposeInMainWorld('electron', {
  // Управление вкладками
  tabs: {
    create: (url) => ipcRenderer.invoke('create-tab', url),
    switch: (tabId) => ipcRenderer.invoke('switch-tab', tabId),
    close: (tabId) => ipcRenderer.invoke('close-tab', tabId),
    navigate: (tabId, url) => ipcRenderer.invoke('navigate-tab', { tabId, url }),
    goBack: (tabId) => ipcRenderer.invoke('tab-go-back', tabId),
    goForward: (tabId) => ipcRenderer.invoke('tab-go-forward', tabId),
    reload: (tabId) => ipcRenderer.invoke('tab-reload', tabId),
    
    // Подписка на события вкладок
    onNavigated: (callback) => {
      ipcRenderer.on('tab-navigated', (event, data) => callback(data));
    },
    onTitleUpdated: (callback) => {
      ipcRenderer.on('tab-title-updated', (event, data) => callback(data));
    }
  },
  
  // Проверка, что мы в Electron
  isElectron: true,
  
  // Информация о платформе
  platform: process.platform,
  
  // Версия Electron
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});
