import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
}

const shortcuts: ShortcutConfig[] = [
  {
    key: 'd',
    altKey: true,
    action: () => window.location.href = '/dashboard',
  },
  {
    key: 's',
    altKey: true,
    action: () => window.location.href = '/signals',
  },
  {
    key: 'p',
    altKey: true,
    action: () => window.location.href = '/providers',
  },
  {
    key: 'a',
    altKey: true,
    action: () => window.location.href = '/accounts',
  },
  {
    key: 'k',
    ctrlKey: true,
    action: () => {
      const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
      searchInput?.focus();
    },
  },
];

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.altKey ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export function KeyboardShortcutsHelp() {
  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 border border-slate-800 rounded-lg p-4 text-sm text-gray-300 shadow-lg max-w-xs">
      <h3 className="font-semibold text-gray-100 mb-2">Keyboard Shortcuts</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-400">Alt + D</span>
          <span>Dashboard</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Alt + S</span>
          <span>Signals</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Alt + P</span>
          <span>Providers</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Alt + A</span>
          <span>Accounts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Ctrl + K</span>
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}
