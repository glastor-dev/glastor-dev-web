
import React, { useState, useEffect } from 'react';
import { useTranslate } from './LanguageContext';


interface HeaderProps {
  debugMode?: boolean;
  setDebugMode?: (val: boolean) => void;
  theme?: string;
  setTheme?: (t: string) => void;
  openPalette?: () => void;
}

const Header: React.FC<HeaderProps> = ({ debugMode, theme, setTheme, openPalette }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const { language, setLanguage, t } = useTranslate();

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
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/5 transition-all" role="navigation" aria-label="Principal">
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-4 md:gap-8 mt-2" style={{minHeight:'5rem'}}>
        <a href="#" className="flex items-center gap-2 group cursor-pointer" style={{alignItems:'center', minHeight:'3.5rem'}} aria-label="Inicio">
          <img src="/img/isologo.png" alt="Glastor Isologo" className="w-40 h-12 object-contain" />
        </a>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink href="#experience" active={activeSection === 'experience'}>{t('nav.stack')}</NavLink>
          <NavLink href="#architecture" active={activeSection === 'architecture'}>{t('nav.architecture')}</NavLink>
          <NavLink href="#projects" active={activeSection === 'projects'}>{t('nav.projects')}</NavLink>
          
          <button 
            onClick={openPalette}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:border-white/30 transition-all group ml-4"
          >
            <span className="text-gray-500 group-hover:text-white">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t('nav.search')}</span>
            <span className="text-[9px] px-1 bg-white/10 rounded opacity-50 text-gray-400">⌘K</span>
          </button>

          <div className="flex bg-black/40 p-1 rounded-full border border-white/5 ml-2">
             <button 
               onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
               className="w-8 h-6 flex items-center justify-center text-[10px] font-black mono text-(--primary) hover:text-white transition-colors uppercase border-r border-white/10 pr-1 mr-1"
             >
              {language}
             </button>
             <ThemeDot current={theme === 'cyberpunk'} onClick={() => setTheme?.('cyberpunk')} color="bg-blue-500" label="C" />
             <ThemeDot current={theme === 'phosphor'} onClick={() => setTheme?.('phosphor')} color="bg-green-500" label="P" />
             <ThemeDot current={theme === 'amber'} onClick={() => setTheme?.('amber')} color="bg-orange-500" label="A" />
             <ThemeDot current={theme === 'high-contrast'} onClick={() => setTheme?.('high-contrast')} color="bg-white" label="H" />
          </div>

          <a href="mailto:glastor.info@gmail.com" className="px-7 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg font-bold hover:bg-emerald-500/20 transition-all ml-2 text-base shadow-[0_0_20px_rgba(16,185,129,0.1)]" style={{minWidth:'120px', textAlign:'center'}}>
            {t('nav.contact')}
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
    aria-current={active ? 'page' : undefined}
  >
    {children}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--primary) shadow-[0_0_8px_var(--primary)] animate-in fade-in zoom-in duration-300"></span>
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
