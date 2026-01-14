import React, { useState, useEffect } from "react";
import { useLegal, legalTabs } from "./LegalContext";

interface LegalTabsProps {
  initialTab?: string;
}

const LegalTabs: React.FC<LegalTabsProps> = ({ initialTab }) => {
  const { openLegal } = useLegal();
  const [active, setActive] = useState(initialTab && legalTabs.some(t => t.id === initialTab) ? initialTab : "terminos");
  
  // Sync state if initialTab prop changes (e.g., navigating between legal routes)
  useEffect(() => {
    if (initialTab && legalTabs.some(t => t.id === initialTab)) {
      setActive(initialTab);
    }
  }, [initialTab]);

  const currentTab = legalTabs.find(t => t.id === active) || legalTabs[0];

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 mb-20 px-4 reveal">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-bold mono uppercase tracking-tighter text-white">
            <span className="text-[var(--primary)]">/</span>centro_legal
          </h2>
          <p className="text-gray-400 font-light mt-1">Documentación y cumplimiento normativo de la plataforma.</p>
        </div>
        
        <div className="flex overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl whitespace-nowrap" role="tablist" aria-label="Documentación legal">
            {legalTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`px-4 md:px-6 py-2 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 focus:outline-none ${
                  active === tab.id
                    ? "bg-[var(--primary)] text-black shadow-[0_0_15px_var(--primary)]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setActive(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Info & Actions */}
        <div className="md:col-span-1 space-y-6" role="tabpanel" id={`panel-${currentTab.id}`} aria-labelledby={`tab-${currentTab.id}`}>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/5 blur-3xl rounded-full transition-all group-hover:bg-[var(--primary)]/10"></div>
            <div className="relative">
              <div className="w-10 h-10 bg-[var(--primary)]/20 rounded-lg flex items-center justify-center mb-4 border border-[var(--primary)]/30">
                <span className="text-[var(--primary)] text-xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{currentTab.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Consulta los detalles específicos sobre {currentTab.title.toLowerCase()} para entender tus derechos y responsabilidades.
              </p>
              <button
                className="w-full py-3 bg-white/5 hover:bg-[var(--primary)] border border-white/10 hover:border-[var(--primary)] text-white hover:text-black font-bold mono uppercase text-xs tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2 group/btn"
                onClick={() => openLegal(active)}
              >
                Explorar Documento
                <span className="transition-transform group-hover/btn:translate-x-1">→</span>
              </button>
            </div>
          </div>
          
          <div className="p-6 border-l-2 border-[var(--primary)]/30 bg-white/2 backdrop-blur-sm rounded-r-xl">
            <h4 className="text-[var(--primary)] font-bold text-xs uppercase tracking-widest mb-2">Última Actualización</h4>
            <p className="text-white font-mono text-sm">
              {currentTab.lastUpdate ? currentTab.lastUpdate.replace(/-/g, '.') : '2026.01.12'}
            </p>
          </div>
        </div>

        {/* Right Column: Preview/Summary */}
        <div className="md:col-span-2 p-8 bg-black/40 border border-white/5 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10 max-w-sm">
            <div className="text-6xl mb-6 opacity-20 font-serif">"</div>
            <p className="text-gray-300 italic text-lg mb-8 leading-relaxed">
              "Nos comprometemos con la transparencia y la seguridad de tus datos en cada interacción."
            </p>
            <div className="h-0.5 w-12 bg-[var(--primary)] mx-auto mb-8"></div>
            <div className="flex justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalTabs;
