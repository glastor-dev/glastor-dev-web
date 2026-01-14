import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useTranslate } from './components/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegalTabs from './components/LegalTabs';
import LegalPage from './LegalPage';
import { LegalProvider, useLegal, legalTabs, StyledMarkdown } from './components/LegalContext';
import Modal from './components/Modal';
import CookiesBanner, { CookiesConfigContext } from './components/CookiesBanner';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import SystemMonitor from './components/SystemMonitor';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import LiveStatsPanel from './components/LiveStatsPanel';
import { fetchUserRepos } from './services/github';

// Lazy loaded heavy components
const AIChat = lazy(() => import('./components/AIChat'));
const StatsSection = lazy(() => import('./components/StatsSection'));
const ArchitectureDiagram = lazy(() => import('./components/ArchitectureDiagram'));
const BentoRoadmap = lazy(() => import('./components/BentoRoadmap'));
const Terminal = lazy(() => import('./components/Terminal'));
const ProjectGrid = lazy(() => import('./components/ProjectGrid'));
const TrustSection = lazy(() => import('./components/TrustSection'));

const Skeleton: React.FC<{ height?: string; className?: string }> = ({ height = "200px", className = "" }) => (
  <div className={`w-full bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse transition-all duration-500 ${className}`} style={{ height }}></div>
);

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
  const { t } = useTranslate();
  const [forceShowConfig, setForceShowConfig] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('glastor-theme') || 'cyberpunk');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (theme === 'cyberpunk') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
    localStorage.setItem('glastor-theme', theme);
  }, [theme]);

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
    }, 100);
    
    return () => clearTimeout(timeout);
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
            <Route path="/legal" element={<LegalPage tab="legal" />} />
            <Route path="/terminos" element={<LegalPage tab="terminos" />} />
            <Route path="/privacidad" element={<LegalPage tab="privacidad" />} />
            <Route path="/cookies" element={<LegalPage tab="cookies" />} />
            <Route path="*" element={
              <main className="container mx-auto px-4 md:px-8 py-8 space-y-40">
                <section id="experience" className="reveal">
                  <Hero />
                </section>
                
                <section id="roadmap" className="reveal">
                   <Suspense fallback={<Skeleton height="550px" />}>
                     <BentoRoadmap />
                   </Suspense>
                </section>

                <section id="architecture" className="reveal">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                      <h2 className="text-3xl md:text-4xl font-bold mono mb-2 text-white tracking-tight">
                        <span className="text-[var(--primary)]">~/</span>{t('app.backend_arch')}
                      </h2>
                      <p className="text-gray-300 text-lg max-w-2xl font-light leading-relaxed">
                        {t('app.backend_desc')}
                      </p>
                      <TechStack />
                      <div className="mt-8">
                        <SystemMonitor />
                      </div>
                    </div>
                    <div className="shadow-2xl rounded-2xl bg-black/80 border border-white/10 p-4 min-h-[400px]">
                      <Suspense fallback={<Skeleton height="400px" />}>
                        <Terminal />
                      </Suspense>
                    </div>
                  </div>
                </section>

                <section id="projects" className="reveal">
                  <Suspense fallback={<Skeleton height="800px" />}>
                    <ProjectGrid />
                  </Suspense>
                </section>

                <section className="reveal">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-12">
                      <Suspense fallback={<Skeleton height="350px" />}>
                        <StatsSection />
                      </Suspense>
                    </div>
                    <div className="shadow-2xl rounded-2xl bg-black/80 border border-white/10 p-4 flex flex-col">
                      <Suspense fallback={<Skeleton height="500px" />}>
                        <AIChat />
                      </Suspense>
                      <LiveStatsPanel />
                    </div>
                  </div>
                </section>

                <section className="reveal">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mono uppercase tracking-tight text-white italic">
                      {t('app.systems_design_p1')} <span className="text-[var(--primary)]">{t('app.systems_design_p2')}</span>
                    </h2>
                    <p className="text-gray-400 italic font-light mt-3">"{t('app.vibe_quote')}"</p>
                  </div>
                  <Suspense fallback={<Skeleton height="400px" />}>
                    <ArchitectureDiagram />
                  </Suspense>
                </section>

                <section className="reveal pb-20">
                  <Suspense fallback={<Skeleton height="300px" />}>
                    <TrustSection />
                  </Suspense>
                </section>
              </main>
            } />
          </Routes>
          <Footer />
          <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} projects={projects} />
          <LegalModalContainer />
        </BrowserRouter>
      </CookiesConfigContext.Provider>
    </LegalProvider>
  );
};

export default App;
