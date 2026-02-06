"use client";

import { useState, useEffect } from 'react';
import { useElectronTabs } from '@/hooks/useElectronTabs';
import { BiArrowBack, BiRightArrowAlt, BiRefresh, BiX, BiPlus, BiSearch } from 'react-icons/bi';

export default function BrowserHeader() {
  const {
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
  } = useElectronTabs();

  const [urlInput, setUrlInput] = useState('');
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  // Обновляем title страницы
  useEffect(() => {
    if (activeTab && activeTab.title) {
      document.title = activeTab.title + ' - Primal';
    } else {
      document.title = 'Primal Browser';
    }
  }, [activeTab]);

  // Обновляем input когда меняется активная вкладка
  useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url);
    }
  }, [activeTab]);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();

    let url = urlInput.trim();
    if (!url) return;

    // Добавляем протокол если его нет
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Проверяем, это URL или поисковый запрос
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        // Поиск через ваш поисковик
        url = `http://localhost:3000/search?q=${encodeURIComponent(url)}`;
      }
    }

    if (isElectron && activeTabId) {
      navigateTab(url);
    } else {
      window.location.href = url;
    }
  };

  const handleNewTab = () => {
    createTab('http://localhost:3000');
  };

  if (!isElectron) {
    // В обычном браузере - не показываем этот header
    return null;
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      {/* Верхняя панель с вкладками */}
      <div className="flex items-center bg-gray-800 px-2 pt-2 gap-1">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={`
              group flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer
              min-w-[120px] max-w-[200px] transition-colors
              ${tab.active
                ? 'bg-gray-900 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <BiSearch className="flex-shrink-0 w-4 h-4" />
            <span className="truncate flex-1 text-sm">
              {tab.title || 'Новая вкладка'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className={`
                flex-shrink-0 p-1 rounded hover:bg-gray-600 transition-opacity
                ${tab.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}
            >
              <BiX className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Кнопка новой вкладки */}
        <button
          onClick={handleNewTab}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
        >
          <BiPlus className="w-5 h-5" />
        </button>
      </div>

      {/* Нижняя панель с навигацией и адресной строкой */}
      <div className="flex items-center gap-2 px-4 py-3">
        {/* Кнопки навигации */}
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            disabled={!activeTabId}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Назад"
          >
            <BiArrowBack className="w-5 h-5" />
          </button>

          <button
            onClick={goForward}
            disabled={!activeTabId}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Вперед"
          >
            <BiRightArrowAlt className="w-5 h-5" />
          </button>

          <button
            onClick={reload}
            disabled={!activeTabId}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Обновить"
          >
            <BiRefresh className="w-5 h-5" />
          </button>
        </div>

        {/* Адресная строка */}
        <form onSubmit={handleNavigate} className="flex-1">
          <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
            <BiSearch className="ml-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Введите URL или поисковый запрос"
              className="flex-1 px-3 py-2 bg-transparent text-white focus:outline-none"
            />
          </div>
        </form>

        {/* Кнопка меню (опционально) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.href = 'http://localhost:3000'}
            className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            title="Домой"
          >
            Главная
          </button>
        </div>
      </div>
    </div>
  );
}
