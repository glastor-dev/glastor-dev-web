
import React, { useState, useEffect, useRef } from 'react';

interface Action {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setTheme: (t: string) => void;
  setDebugMode: (val: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, setTheme, setDebugMode }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = [
    { id: 'theme-cyber', title: 'Switch to Cyberpunk', subtitle: 'Modern Blue/Purple aesthetic', icon: '🎨', action: () => setTheme('cyberpunk') },
    { id: 'theme-phosphor', title: 'Switch to Phosphor', subtitle: 'Classic Retro Green CRT', icon: '📟', action: () => setTheme('phosphor') },
    { id: 'theme-amber', title: 'Switch to Amber', subtitle: 'Mainframe Amber glow', icon: '💾', action: () => setTheme('amber') },
    { id: 'nav-stack', title: 'Go to Tech Stack', subtitle: 'View skills and tools', icon: '🛠️', action: () => { window.location.hash = 'experience'; onClose(); } },
    { id: 'nav-arch', title: 'System Architecture', subtitle: 'Inspect system design', icon: '🏛️', action: () => { window.location.hash = 'architecture'; onClose(); } },
    { id: 'toggle-debug', title: 'Toggle Debug Mode', subtitle: 'Show/Hide system logs', icon: '🪲', action: () => setDebugMode(true) },
    { id: 'contact-mail', title: 'Send Email', subtitle: 'glastor.info@gmail.com', icon: '✉️', action: () => window.open('mailto:glastor.info@gmail.com') },
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      filteredActions[selectedIndex]?.action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center px-4 py-4 border-b border-white/5 gap-3">
          <span className="text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-grow bg-transparent border-none outline-none text-white text-lg mono"
            placeholder="Search commands (e.g. 'theme', 'contact')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/20 text-gray-500 mono">ESC</span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredActions.length > 0 ? (
            filteredActions.map((action, index) => (
              <button
                key={action.id}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-colors ${index === selectedIndex ? 'bg-[var(--primary)] text-black font-bold' : 'hover:bg-white/5 text-gray-300'}`}
                onClick={() => { action.action(); onClose(); }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="text-xl">{action.icon}</span>
                <div className="flex-grow">
                  <div className="text-sm">{action.title}</div>
                  <div className={`text-[10px] uppercase tracking-tighter ${index === selectedIndex ? 'text-black/70' : 'text-gray-500'}`}>
                    {action.subtitle}
                  </div>
                </div>
                {action.shortcut && <span className="text-[10px] opacity-50 mono">{action.shortcut}</span>}
              </button>
            ))
          ) : (
            <div className="px-4 py-12 text-center text-gray-500 text-sm mono">
              No results found for "{search}"
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex justify-between items-center">
            <div className="text-[9px] text-gray-600 uppercase tracking-widest flex gap-4">
               <span><span className="text-white">↑↓</span> to navigate</span>
               <span><span className="text-white">ENTER</span> to select</span>
            </div>
            <div className="text-[9px] text-gray-600 font-bold italic">GLASTOR-OS v3.2_omnibox</div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
