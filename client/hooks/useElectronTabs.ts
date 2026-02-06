import { useState, useEffect, useCallback } from 'react';

interface Tab {
  id: string;
  url: string;
  title: string;
  active: boolean;
}

export function useElectronTabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Проверяем, запущены ли мы в Electron
    if (typeof window !== 'undefined' && window.electron) {
      setIsElectron(true);

      // Слушаем события навигации
      window.electron.tabs.onNavigated(({ tabId, url }) => {
        setTabs(prev => prev.map(tab => 
          tab.id === tabId ? { ...tab, url } : tab
        ));
      });

      // Слушаем обновления заголовков
      window.electron.tabs.onTitleUpdated(({ tabId, title }) => {
        setTabs(prev => prev.map(tab => 
          tab.id === tabId ? { ...tab, title } : tab
        ));
      });
    }
  }, []);

  const createTab = useCallback(async (url?: string) => {
    if (!window.electron) return;

    const { tabId, url: finalUrl } = await window.electron.tabs.create(url);
    
    const newTab: Tab = {
      id: tabId,
      url: finalUrl,
      title: 'New Tab',
      active: true
    };

    setTabs(prev => [...prev.map(t => ({ ...t, active: false })), newTab]);
    setActiveTabId(tabId);
  }, []);

  const switchTab = useCallback(async (tabId: string) => {
    if (!window.electron) return;

    await window.electron.tabs.switch(tabId);
    setTabs(prev => prev.map(tab => ({ ...tab, active: tab.id === tabId })));
    setActiveTabId(tabId);
  }, []);

  const closeTab = useCallback(async (tabId: string) => {
    if (!window.electron) return;

    await window.electron.tabs.close(tabId);
    setTabs(prev => {
      const filtered = prev.filter(tab => tab.id !== tabId);
      
      // Если закрыли активную вкладку, переключаемся на последнюю
      if (tabId === activeTabId && filtered.length > 0) {
        const lastTab = filtered[filtered.length - 1];
        switchTab(lastTab.id);
      }
      
      return filtered;
    });
  }, [activeTabId, switchTab]);

  const navigateTab = useCallback(async (url: string) => {
    if (!window.electron || !activeTabId) return;

    await window.electron.tabs.navigate(activeTabId, url);
  }, [activeTabId]);

  const goBack = useCallback(async () => {
    if (!window.electron || !activeTabId) return;
    await window.electron.tabs.goBack(activeTabId);
  }, [activeTabId]);

  const goForward = useCallback(async () => {
    if (!window.electron || !activeTabId) return;
    await window.electron.tabs.goForward(activeTabId);
  }, [activeTabId]);

  const reload = useCallback(async () => {
    if (!window.electron || !activeTabId) return;
    await window.electron.tabs.reload(activeTabId);
  }, [activeTabId]);

  return {
    tabs,
    activeTabId,
    isElectron,
    createTab,
    switchTab,
    closeTab,
    navigateTab,
    goBack,
    goForward,
    reload
  };
}
