
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegalTabs from './components/LegalTabs';
import { LegalProvider, useLegal, legalTabs, StyledMarkdown } from './components/LegalContext';
import Modal from './components/Modal';
import CookiesBanner, { CookiesConfigContext } from './components/CookiesBanner';
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
import LiveStatsPanel from './components/LiveStatsPanel';
import { fetchUserRepos } from './services/github';

const LegalModalContainer: React.FC = () => {
  const { isOpen, closeLegal, activeTabId } = useLegal();
  const currentTab = legalTabs.find(t => t.id === activeTabId) || legalTabs[0];

  return (
    <Modal open={isOpen} onClose={closeLegal} title={currentTab.title}>
      <StyledMarkdown content={currentTab.md} />
    </Modal>
  );
};

const App: React.FC = () => {
  const [forceShowConfig, setForceShowConfig] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('glastor-theme') || 'cyberpunk');

    useEffect(() => {
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('glastor-theme', theme);
    }, [theme]);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchUserRepos('glastor-dev').then((repos) => {
      if (repos) setProjects(repos);
    });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px" 
    });
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => observer.observe(el));
      setTimeout(() => {
        if (elements.length > 0 && !elements[0].classList.contains('active')) {
          elements.forEach(el => el.classList.add('active'));
        }
      }, 2000);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const openConfig = () => setForceShowConfig(true);
  return (
    <LegalProvider>
      <CookiesConfigContext.Provider value={{ openConfig }}>
        <BrowserRouter>
          <CookiesBanner forceShowConfig={forceShowConfig} />
          <Analytics />
          <Header openPalette={() => setIsPaletteOpen(true)} theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/legal" element={<LegalTabs initialTab="legal" />} />
            <Route path="/terminos" element={<LegalTabs initialTab="terminos" />} />
            <Route path="/privacidad" element={<LegalTabs initialTab="privacidad" />} />
            <Route path="/cookies" element={<LegalTabs initialTab="cookies" />} />
            <Route path="*" element={
              <main className="container mx-auto px-4 md:px-8 py-8 space-y-40">
                <section id="experience" className="reveal">
                  <Hero />
                </section>
                <section id="architecture" className="reveal">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Columna izquierda: descripción, stack y monitor */}
                    <div className="space-y-8">
                      <h2 className="text-3xl md:text-4xl font-bold mono mb-2 text-white tracking-tight">
                        <span className="text-[var(--primary)]">~/</span>backend_arch
                      </h2>
                      <p className="text-gray-300 text-lg max-w-2xl font-light">
                        Ingeniero especializado en infraestructuras robustas con Python. Arquitecto de APIs escalables, pipelines de CI/CD automatizados y entornos reproducibles con Docker.
                      </p>
                      <TechStack />
                      <div className="mt-8">
                        <SystemMonitor />
                      </div>
                    </div>
                    {/* Columna derecha: terminal */}
                    <div className="shadow-2xl rounded-2xl bg-black/80 border border-white/10 p-4">
                      <Terminal />
                    </div>
                  </div>
                </section>
                <section id="projects" className="reveal">
                  <ProjectGrid />
                </section>
                <section className="reveal">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Columna izquierda: Stats y gráfico de lenguajes */}
                    <div className="space-y-12">
                      <StatsSection />
                      {/* Aquí se asume que StatsSection ya incluye el gráfico de lenguajes, si no, agregar el componente correspondiente */}
                    </div>
                    {/* Columna derecha: AIChat */}
                    <div className="shadow-2xl rounded-2xl bg-black/80 border border-white/10 p-4 flex flex-col">
                      <AIChat />
                      <LiveStatsPanel />
                    </div>
                  </div>
                </section>
                <section className="reveal">
                  <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mono uppercase tracking-tight">
                      DISEÑO DE <span className="text-[var(--primary)]">SISTEMAS</span>
                    </h2>
                    <p className="text-gray-400 italic font-light mt-2">"La redundancia es el seguro de vida de la disponibilidad."</p>
                  </div>
                  <ArchitectureDiagram />
                </section>
                <section className="reveal">
                  <TrustSection />
                </section>
              </main>
            } />
          </Routes>
          <Footer />
          <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} projects={projects} />
          <KernelStatusBar />
          <LegalModalContainer />
        </BrowserRouter>
      </CookiesConfigContext.Provider>
    </LegalProvider>
  );
};

export default App;
