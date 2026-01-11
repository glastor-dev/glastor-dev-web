
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import TechStack from './components/TechStack';
import ProjectGrid from './components/ProjectGrid';
import AIChat from './components/AIChat';
import StatsSection from './components/StatsSection';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import SystemMonitor from './components/SystemMonitor';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import KernelStatusBar from './components/KernelStatusBar';

const App: React.FC = () => {
  const [debugMode, setDebugMode] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('glastor-theme') || 'cyberpunk');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('glastor-theme', theme);
  }, [theme]);

  // Robust intersection observer for "reveal" effects
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Una vez activado, dejamos de observar para ahorrar recursos
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.05, // Umbral más bajo para asegurar activación temprana
      rootMargin: "0px 0px -50px 0px" 
    });

    // Pequeño delay para asegurar que el DOM está listo
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => observer.observe(el));
      
      // Fallback: Si después de 2 segundos no se ha activado el primero, activamos todo
      setTimeout(() => {
        if (elements.length > 0 && !elements[0].classList.contains('active')) {
          elements.forEach(el => el.classList.add('active'));
        }
      }, 2000);
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col pt-6 selection:bg-blue-500/30 ${debugMode ? 'debug-grid' : ''}`}>
      <KernelStatusBar />
      <Header 
        debugMode={debugMode} 
        setDebugMode={setDebugMode} 
        theme={theme} 
        setTheme={setTheme} 
        openPalette={() => setIsPaletteOpen(true)}
      />
      
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 space-y-40">
        <section className="reveal">
          <Hero />
        </section>
        
        <div id="experience" className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mono mb-4">
                <span className="text-[var(--primary)]">~/</span>backend_arch
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-2xl text-lg">
                Ingeniero especializado en infraestructuras robustas con Python. 
                Arquitecto de APIs escalables, pipelines de CI/CD automatizados y entornos reproducibles con Docker. 
              </p>
            </div>
            <TechStack />
            <SystemMonitor />
          </div>
          <Terminal />
        </div>

        <section id="architecture" className="reveal space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold mono uppercase tracking-tight">Diseño de <span className="text-[var(--primary)]">Sistemas</span></h2>
            <p className="text-gray-500 italic font-light">"La redundancia es el seguro de vida de la disponibilidad."</p>
          </div>
          <ArchitectureDiagram />
        </section>

        <section id="projects" className="reveal">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold mono uppercase tracking-tight">
                <span className="text-[var(--accent)]">01.</span> Pipeline_Proyectos
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#161b22] border border-[#30363d] rounded-full text-sm font-bold shadow-lg">
                 <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                 </svg>
                 <span className="text-white">Repositories</span>
                 <span className="bg-[#30363d] text-[#c9d1d9] px-2 py-0.5 rounded-full text-[10px] tabular-nums">25</span>
              </div>
            </div>
          </div>
          <ProjectGrid />
        </section>

        <section id="analytics" className="reveal grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <StatsSection />
           </div>
           <div className="lg:col-span-1 h-full">
              <AIChat setTheme={setTheme} />
           </div>
        </section>

        <section className="reveal">
          <TrustSection />
        </section>
      </main>

      <Footer />

      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        setTheme={setTheme}
        setDebugMode={setDebugMode}
      />

      <SpeedInsights />
    </div>
  );
};

export default App;
