import React, { useState, useEffect } from "react";
import { useTranslate } from "./LanguageContext";
import { useLegal } from "./LegalContext";

export const CookiesConfigContext = React.createContext<{ openConfig: () => void } | undefined>(undefined);

interface CookiesBannerProps {
  forceShowConfig?: boolean;
}

const CookiesBanner: React.FC<CookiesBannerProps> = ({ forceShowConfig }) => {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const { openLegal } = useLegal();
  const { t } = useTranslate();

  const [summary, setSummary] = useState<string | null>(null);
  
  useEffect(() => {
    const pref = typeof window !== 'undefined' ? localStorage.getItem('glastor-cookies-pref') : null;
    setVisible(!pref);
    if (pref) {
      try {
        const obj = JSON.parse(pref);
        if (typeof obj === 'object') {
          let s = 'Configuración: ';
          s += obj.analytics ? 'Analíticas [ON], ' : 'Analíticas [OFF], ';
          s += obj.ads ? 'Publicitarias [ON]' : 'Publicitarias [OFF]';
          setSummary(s);
        }
      } catch { setSummary(null); }
    } else {
      setSummary(null);
    }
  }, []);

  useEffect(() => {
    if (forceShowConfig) {
      setShowConfig(true);
      setVisible(true);
    }
  }, [forceShowConfig]);

  // Opciones de cookies (CUMPLIMIENTO: Inicializar en FALSE)
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    if (showConfig) {
      const pref = localStorage.getItem('glastor-cookies-pref');
      if (pref) {
        try {
          const obj = JSON.parse(pref);
          setAnalytics(obj.analytics ?? false);
          setAds(obj.ads ?? false);
        } catch {}
      }
    }
  }, [showConfig]);

  const handleAcceptAll = () => {
    setVisible(false);
    setShowConfig(false);
    localStorage.setItem('glastor-cookies-pref', JSON.stringify({ accepted: true, analytics: true, ads: true }));
  };

  const handleSavePreferences = () => {
    setVisible(false);
    setShowConfig(false);
    localStorage.setItem('glastor-cookies-pref', JSON.stringify({ accepted: true, analytics, ads }));
  };

  const handleRejectAll = () => {
    setVisible(false);
    setShowConfig(false);
    localStorage.setItem('glastor-cookies-pref', JSON.stringify({ accepted: false, analytics: false, ads: false }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-black/95 text-white px-4 py-3 shadow-2xl flex flex-col items-center justify-between gap-3 border-t border-[var(--primary)]/30 backdrop-blur-xl animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-xs md:text-sm">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.223 5.99 5.99 0 003 10.5a8.966 8.966 0 005.982 8.411 11.963 11.963 0 000 3.339 8.966 8.966 0 005.982-8.411 5.99 5.99 0 00-.598-4.277A11.959 11.959 0 0115 2.714" />
            </svg>
            <strong className="text-white uppercase mono tracking-wider text-[10px]">{t('cookies.title')}</strong>
          </div>
          <p className="text-gray-400 font-light leading-snug">
            {t('cookies.description')} 
            <button 
              onClick={() => openLegal('cookies')}
              className="ml-1 text-[var(--primary)] hover:underline transition-all"
            >
              {t('cookies.link')}
            </button>
          </p>
          <div className="mt-2 flex items-center gap-2 text-[8px] text-gray-600 uppercase tracking-widest mono">
            <span>AEPD_LSSI_GDPR_COMPLIANT</span>
            {summary && (
              <>
                <span>•</span>
                <span className="text-[var(--primary)]/50">{summary}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            onClick={handleRejectAll} 
            className="px-4 py-1.5 bg-white/5 text-gray-400 font-bold mono uppercase text-[10px] tracking-widest border border-white/5 hover:bg-white/10 hover:text-white transition-all rounded-md"
          >
            {t('cookies.reject')}
          </button>
          <button 
            onClick={() => setShowConfig(!showConfig)} 
            className="px-4 py-1.5 bg-white/5 text-[var(--primary)] font-bold mono uppercase text-[10px] tracking-widest border border-white/5 hover:border-[var(--primary)]/30 transition-all rounded-md"
          >
            {t('cookies.config')}
          </button>
          <button 
            onClick={handleAcceptAll} 
            className="px-5 py-2 bg-[var(--primary)] text-black font-black mono uppercase text-[10px] tracking-widest hover:scale-105 transition-all rounded-md shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>

      {showConfig && (
        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <h4 className="text-xl font-bold mono text-white uppercase tracking-tighter">
              <span className="text-[var(--primary)] mr-2">&gt;</span>Preferencias_Cookies
            </h4>
            <button onClick={() => setShowConfig(false)} className="text-gray-500 hover:text-white text-2xl">&times;</button>
          </div>
          
          <div className="grid gap-6 mb-10">
            <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex-1 pr-4">
                <h5 className="font-bold text-white mb-1">Cookies Técnicas <span className="text-[10px] bg-[var(--primary)]/20 text-[var(--primary)] px-2 py-0.5 rounded ml-2 uppercase">Obligatorias</span></h5>
                <p className="text-xs text-gray-400">Esenciales para el escalado de sesión y navegación base. No pueden desactivarse.</p>
              </div>
              <div className="h-6 w-12 bg-[var(--primary)]/20 rounded-full flex items-center px-1 border border-[var(--primary)]/30">
                <div className="h-4 w-4 bg-[var(--primary)] rounded-full shadow-[0_0_8px_var(--primary)]"></div>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-white/2 hover:bg-white/5 rounded-xl border border-white/5 transition-colors group">
              <div className="flex-1 pr-4">
                <h5 className="font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">Cookies Analíticas</h5>
                <p className="text-xs text-gray-400">Nos permiten auditar los tiempos de respuesta y optimizar la DX (Developer Experience).</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]/60 peer-checked:after:bg-[var(--primary)]"></div>
              </label>
            </div>

            <div className="flex items-start justify-between p-4 bg-white/2 hover:bg-white/5 rounded-xl border border-white/5 transition-colors group">
              <div className="flex-1 pr-4">
                <h5 className="font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">Cookies Publicitarias</h5>
                <p className="text-xs text-gray-400">Orientadas a la personalización de contenidos y ofertas basadas en tu perfil técnico.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={ads} onChange={e => setAds(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]/60 peer-checked:after:bg-[var(--primary)]"></div>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleSavePreferences} 
              className="flex-1 py-3 bg-white/5 text-white font-bold mono uppercase text-xs tracking-widest border border-white/10 hover:bg-white hover:text-black transition-all rounded-lg"
            >
              Guardar Configuración
            </button>
            <button 
              onClick={handleAcceptAll} 
              className="flex-1 py-3 bg-[var(--primary)] text-black font-extrabold mono uppercase text-xs tracking-widest hover:bg-white transition-all rounded-lg"
            >
              Aceptar Todas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookiesBanner;
