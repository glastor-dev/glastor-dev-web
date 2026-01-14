
import React, { useState, useEffect, useRef } from 'react';

interface Action {
  id: string;
  category: 'SYSTEM' | 'NAVIGATION' | 'PROJECTS';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface Project {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  tags: string[];
  status: 'stable' | 'beta' | 'archived';
  url: string;
  lastUpdate: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setTheme?: (t: string) => void;
  setDebugMode?: (val: boolean) => void;
  projects?: Project[];
}

const CommandPaletteIcons = {
  Theme: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.156-9.156a1.5 1.5 0 112.122 2.122l-10.217 10.217a1.5 1.5 0 01-2.122 0L3.93 14.766a1.5 1.5 0 112.122-2.122l3.478 3.478z" />
    </svg>
  ),
  Monitor: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  Storage: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  Tools: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m-5.83 5.83a2.652 2.652 0 11-3.75-3.75l5.83-5.83m5.83 5.83V9m0 0l-5.83-5.83m0 0l-5.83 5.83M3 12h18" />
    </svg>
  ),
  Arch: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 18l-9-9m9 9l9-9M3 9h18M3 15h18" />
    </svg>
  ),
  Bug: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  ),
  Mail: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  Project: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-19.5 0A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25m-19.5 0v.25C2.25 14.122 3.128 15 4.213 15h15.574c1.085 0 1.963-.878 1.963-1.95V12.75" />
    </svg>
  )
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, setTheme, setDebugMode, projects = [] }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = [
    { id: 'theme-cyber', category: 'SYSTEM', title: 'Switch to Cyberpunk', subtitle: 'Modern Blue/Purple aesthetic', icon: CommandPaletteIcons.Theme, action: () => setTheme?.('cyberpunk') },
    { id: 'theme-phosphor', category: 'SYSTEM', title: 'Switch to Phosphor', subtitle: 'Classic Retro Green CRT', icon: CommandPaletteIcons.Monitor, action: () => setTheme?.('phosphor') },
    { id: 'theme-amber', category: 'SYSTEM', title: 'Switch to Amber', subtitle: 'Mainframe Amber glow', icon: CommandPaletteIcons.Storage, action: () => setTheme?.('amber') },
    { id: 'nav-stack', category: 'NAVIGATION', title: 'Go to Tech Stack', subtitle: 'View skills and tools', icon: CommandPaletteIcons.Tools, action: () => { window.location.hash = 'experience'; onClose(); } },
    { id: 'nav-arch', category: 'NAVIGATION', title: 'System Architecture', subtitle: 'Inspect system design', icon: CommandPaletteIcons.Arch, action: () => { window.location.hash = 'architecture'; onClose(); } },
    { id: 'toggle-debug', category: 'SYSTEM', title: 'Toggle Debug Mode', subtitle: 'Show/Hide system logs', icon: CommandPaletteIcons.Bug, action: () => setDebugMode?.(true) },
    { id: 'contact-mail', category: 'PROJECTS', title: 'Send Email', subtitle: 'glastor.info@gmail.com', icon: CommandPaletteIcons.Mail, action: () => window.open('mailto:glastor.info@gmail.com') },
  ];

  const projectActions: Action[] = (projects || []).map((p) => ({
    id: `project-${p.name}`,
    category: 'PROJECTS',
    title: p.name,
    subtitle: `${p.desc} [${p.lang}]`,
    icon: CommandPaletteIcons.Project,
    action: () => window.open(p.url, '_blank'),
  }));

  const allActions = [...actions, ...projectActions];

  const filteredActions = allActions.filter(a =>
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
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

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

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={i} className="text-[var(--primary)] font-black">{part}</span> 
        : part
    );
  };

  if (!isOpen) return null;

  // Grouping logic for rendering
  const groupedActions: Record<string, Action[]> = filteredActions.reduce((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, Action[]>);

  const categories = Object.keys(groupedActions) as (keyof typeof groupedActions)[];
  let absoluteIndex = 0;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4 bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-300">
      <div 
        className="w-full max-w-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all border-glow"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-6 py-5 border-b border-white/5 gap-4 bg-white/2">
          <svg className="w-5 h-5 text-[var(--primary)] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-grow bg-transparent border-none outline-none text-white text-xl font-medium placeholder:text-gray-600"
            placeholder="Search commands, projects, actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <span className="text-[9px] px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-500 font-bold mono">ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {filteredActions.length > 0 ? (
            categories.map((cat) => (
              <div key={cat} className="py-2">
                <div className="px-6 py-2 text-[10px] uppercase font-black tracking-[0.2em] text-[var(--primary)]/50 bg-white/[0.02]">
                  {cat}
                </div>
                {groupedActions[cat].map((action) => {
                  const isSelected = allActions.indexOf(action) === allActions.indexOf(filteredActions[selectedIndex]);
                  // Note: absoluteIndex tracking is tricky with categories, better to use the index in filteredActions directly
                  const globalIdx = filteredActions.indexOf(action);
                  const active = globalIdx === selectedIndex;

                  return (
                    <button
                      key={action.id}
                      className={`w-full flex items-center gap-4 px-6 py-4 transition-all relative group ${active ? 'bg-[var(--primary)]/10' : 'hover:bg-white/[0.02]'}`}
                      onClick={() => { action.action(); onClose(); }}
                      onMouseEnter={() => setSelectedIndex(globalIdx)}
                    >
                      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" />}
                      
                      <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-[var(--primary)] text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                        {action.icon}
                      </div>

                      <div className="flex-grow">
                        <div className={`text-[15px] font-bold transition-colors ${active ? 'text-[var(--primary)]' : 'text-gray-200'}`}>
                          {highlightMatch(action.title, search)}
                        </div>
                        <div className={`text-[11px] font-medium transition-colors ${active ? 'text-white/60' : 'text-gray-500'}`}>
                          {action.subtitle}
                        </div>
                      </div>

                      {active && (
                        <div className="text-[10px] font-black text-[var(--primary)] mono animate-pulse">
                          ENTER ↵
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="px-6 py-20 text-center">
              <div className="text-4xl mb-4 opacity-20">🚫</div>
              <div className="text-gray-500 text-sm mono uppercase tracking-widest">
                No matching results found for <span className="text-white italic">"{search}"</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
           <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white text-[9px] mono">↑↓</kbd>
                <span className="text-[9px] text-gray-600 uppercase font-black">Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white text-[9px] mono">↵</kbd>
                <span className="text-[9px] text-gray-600 uppercase font-black">Execute</span>
              </div>
           </div>
           <div className="text-[9px] text-gray-700 font-bold mono">OMNIBOX_V3.5</div>
        </div>
      </div>
      
      <style>{`
        .border-glow {
          box-shadow: 0 0 40px -10px rgba(var(--primary-rgb), 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--primary); }
      `}</style>
    </div>
  );
};

export default CommandPalette;
