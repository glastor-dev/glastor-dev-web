
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  debugMode?: boolean;
  setDebugMode?: (val: boolean) => void;
  theme?: string;
  setTheme?: (t: string) => void;
  openPalette?: () => void;
}

const Header: React.FC<HeaderProps> = ({ debugMode, theme, setTheme, openPalette }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = ['experience', 'architecture', 'projects'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Offset para mayor precisión

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Si estamos muy arriba, no hay sección activa
      if (window.scrollY < 200) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] rounded flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12 overflow-hidden">
            <img src="/img/isologo.png" alt="Isologo Glastor" className="w-7 h-7 object-contain" />
          </div>
          {/* Eliminado GLASTOR® */}
        </a>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink href="#experience" active={activeSection === 'experience'}>Stack</NavLink>
          <NavLink href="#architecture" active={activeSection === 'architecture'}>Arquitectura</NavLink>
          <NavLink href="#projects" active={activeSection === 'projects'}>Proyectos</NavLink>
          
          <button 
            onClick={openPalette}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:border-white/30 transition-all group ml-4"
          >
            <span className="text-gray-500 group-hover:text-white">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Search</span>
            <span className="text-[9px] px-1 bg-white/10 rounded opacity-50 text-gray-400">⌘K</span>
          </button>

          <div className="flex bg-black/40 p-1 rounded-full border border-white/5 ml-2">
             <ThemeDot current={theme === 'cyberpunk'} onClick={() => setTheme?.('cyberpunk')} color="bg-blue-500" label="C" />
             <ThemeDot current={theme === 'phosphor'} onClick={() => setTheme?.('phosphor')} color="bg-green-500" label="P" />
             <ThemeDot current={theme === 'amber'} onClick={() => setTheme?.('amber')} color="bg-orange-500" label="A" />
          </div>

          <a href="mailto:glastor.info@gmail.com" className="px-4 py-2 bg-[var(--primary)] text-black rounded font-bold hover:brightness-110 transition-all shadow-lg shadow-[var(--primary)]/20 ml-2">
            Contactar
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ href: string; active: boolean; children: React.ReactNode }> = ({ href, active, children }) => (
  <a 
    href={href} 
    className={`relative py-2 transition-colors ${active ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] animate-in fade-in zoom-in duration-300"></span>
    )}
  </a>
);

const ThemeDot: React.FC<{ current: boolean; onClick: () => void; color: string; label: string }> = ({ current, onClick, color, label }) => (
  <button 
    onClick={onClick}
    className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${current ? `${color} text-black scale-110 shadow-lg` : 'text-gray-600 hover:text-gray-400'}`}
  >
    {label}
  </button>
);

export default Header;
