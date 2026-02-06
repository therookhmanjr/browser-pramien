// Поместите этот файл в client/types/electron.d.ts

interface ElectronTabsAPI {
  create: (url?: string) => Promise<{ tabId: string; url: string }>;
  switch: (tabId: string) => Promise<{ success: boolean }>;
  close: (tabId: string) => Promise<{ success: boolean }>;
  navigate: (tabId: string, url: string) => Promise<{ success: boolean }>;
  goBack: (tabId: string) => Promise<{ success: boolean }>;
  goForward: (tabId: string) => Promise<{ success: boolean }>;
  reload: (tabId: string) => Promise<{ success: boolean }>;
  onNavigated: (callback: (data: { tabId: string; url: string }) => void) => void;
  onTitleUpdated: (callback: (data: { tabId: string; title: string }) => void) => void;
}

interface ElectronAPI {
  tabs: ElectronTabsAPI;
  isElectron: boolean;
  platform: string;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
}

interface Window {
  electron?: ElectronAPI;
}
