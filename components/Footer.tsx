import React, { useState, useEffect, useContext } from 'react';
import { useTranslate } from './LanguageContext';
import { CookiesConfigContext } from './CookiesBanner';
import { useLegal } from './LegalContext';
import PerformanceDiagnostic from './PerformanceDiagnostic';

const Footer: React.FC = () => {
  const { t } = useTranslate();
  const [uptime, setUptime] = useState('00:00:00:00');
  const [currentYear] = useState(new Date().getFullYear());
  const { openLegal } = useLegal();
  const cookiesConfig = useContext(CookiesConfigContext);

  useEffect(() => {
    // Simulación de contador de Uptime desde una fecha de inicio ficticia
    const startTime = new Date('2010-01-01').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startTime;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      setUptime(`${days.toString().padStart(4, '0')}:${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background Technical Decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Column 1: Core Branding & Identity */}
          <div className="lg:col-span-5 space-y-8">
             <div className="flex flex-col items-start gap-1">
                <img src="/img/GLASTOR-SVG.svg" alt="Glastor Logo" className="w-32 h-14 object-contain -ml-2" />
               <p className="text-[10px] text-[var(--primary)] mono font-bold uppercase tracking-[0.3em] mt-1">{t('footer.branding_mission')}</p>
             </div>

             <p className="text-gray-500 text-sm leading-relaxed max-w-md font-light">
               {t('footer.tagline')}
             </p>

             <div className="flex flex-col gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-[10px] mono text-gray-400 font-bold uppercase tracking-widest">
                   <span>{t('footer.uptime_label')}</span>
                   <span className="text-[var(--primary)]">{uptime}</span>
                </div>
                <button
                  onClick={() => cookiesConfig?.openConfig()}
                  className="mt-4 px-4 py-2 bg-[var(--primary)] text-black rounded-lg text-xs font-bold hover:bg-white transition self-start"
                  aria-label={t('footer.config_cookies')}
                >
                  {t('footer.config_cookies')}
                </button>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-[var(--primary)] w-full animate-[pulse_2s_infinite]"></div>
                </div>
                <div className="flex justify-between text-[8px] mono text-gray-600 font-black">
                   <span>{t('footer.boot_date')}</span>
                   <span>{t('footer.region')}</span>
                </div>
             </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
               <span className="w-1 h-1 bg-[var(--primary)] rounded-full"></span>
               {t('footer.directory_title')}
            </h4>
            <ul className="space-y-4 text-sm mono">
              <FooterLink href="#experience" label="/usr/local/bin/stack" />
              <FooterLink href="#roadmap" label="/var/log/roadmap" />
              <FooterLink href="#architecture" label="/var/www/architecture" />
              <FooterLink href="#projects" label="/home/glastor/projects" />
            </ul>
          </div>

          {/* Column 3: Legal & Resources */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl relative">
               <div className="absolute -top-3 left-6 px-3 bg-[#050505] text-[9px] mono font-bold text-[var(--primary)] uppercase tracking-widest">
                 {t('footer.compliance_seal')}
               </div>
               <div className="space-y-4">
                  <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    {t('footer.legal_disclaimer')}
                  </p>
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-[10px] text-white mono font-black">{t('footer.inpi_info')}</span>
                    <span className="text-[10px] text-gray-600 mono">{t('footer.gpl_info')}</span>
                  </div>
                  <ul className="flex flex-col gap-1 mt-2">
                    <FooterLink label={t('footer.legal')} onClick={() => openLegal('legal')} />
                    <FooterLink label={t('footer.terms')} onClick={() => openLegal('terminos')} />
                    <FooterLink label={t('footer.privacy')} onClick={() => openLegal('privacidad')} />
                    <FooterLink label={t('footer.cookies')} onClick={() => openLegal('cookies')} />
                  </ul>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex gap-3">
                  <SocialIcon icon="github" href="https://github.com/glastor-dev" />
                  <SocialIcon icon="youtube" href="https://www.youtube.com/@glastor-es" />
                  <SocialIcon icon="telegram" href="https://t.me/zerhocool" />
                  <SocialIcon icon="mail" href="mailto:glastor.info@gmail.com" />
               </div>
               <button 
                  onClick={scrollToTop}
                  className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:border-[var(--primary)] transition-all"
               >
                  <span className="text-[10px] mono text-gray-500 group-hover:text-white font-bold">cd ..</span>
                  <svg className="w-3 h-3 text-[var(--primary)] group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Telemetry Info */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-8 opacity-60 hover:opacity-100 transition-all">
             <div className="flex items-center gap-4 border-r border-white/10 pr-4 md:pr-8">
               <img src="https://i.postimg.cc/PxWYdHPN/gplv3-with-text-136x68.png" alt="GPLv3" className="h-8" />
               <div className="flex flex-col">
                 <span className="text-[12px] text-white mono font-bold leading-tight">GL-CORE-V3</span>
                 <span className="text-[9px] text-gray-500 mono leading-tight">Stable_v3.2.1</span>
               </div>
             </div>
             <PerformanceDiagnostic />
           </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-4 md:justify-end text-center md:text-right">
            <div>
              <p className="text-gray-600 text-[10px] mono uppercase tracking-[0.3em]">
                © {currentYear} GLASTOR. <span className="text-white font-black">{t('footer.rights')}</span>
              </p>
               <p className="text-gray-800 text-[11px] md:text-[12px] mono mt-1">{t('footer.secure_channel')}</p>
            </div>
            <a
              href="http://qr.afip.gob.ar/?qr=NJzaKjxSmLLLxv6I0U-Blg,,"
              target="_F960AFIPInfo"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="Data Fiscal - AFIP"
            >
              <img
                src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg"
                alt="Data Fiscal AFIP"
                className="h-16 w-auto md:h-20 object-contain ml-auto"
                style={{ minWidth: '60px' }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Edge Decor eliminado */}
    </footer>
  );
};

const FooterLink: React.FC<{ href?: string; label: string; onClick?: () => void }> = ({ href, label, onClick }) => (
  <li>
    {onClick ? (
      <button 
        onClick={onClick}
        className="text-gray-500 hover:text-[var(--primary)] transition-all flex items-center gap-2 group w-full text-left focus:outline-none"
      >
        <span className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all font-black">❯</span>
        <span className="group-hover:translate-x-1 transition-transform">{label}</span>
      </button>
    ) : (
      <a 
        href={href} 
        className="text-gray-500 hover:text-[var(--primary)] transition-all flex items-center gap-2 group"
      >
        <span className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all font-black">❯</span>
        <span className="group-hover:translate-x-1 transition-transform">{label}</span>
      </a>
    )}
  </li>
);

const SocialIcon: React.FC<{ icon: string; href: string }> = ({ icon, href }) => {
  const getIcon = () => {
    switch (icon) {
      case 'github': return <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />;
      case 'youtube': return <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />;
      case 'telegram': return <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.033 5.518-4.98c.24-.213-.054-.33-.37-.12L6.829 13.5l-2.94-.917c-.64-.2-.65-.64.133-.946l11.49-4.428c.533-.193 1 .126.882.812z" />;
      case 'mail': return <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
      default: return null;
    }
  };

  const cookiesConfig = useContext(CookiesConfigContext);
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[var(--primary)] hover:text-black transition-all border border-white/10 text-gray-400 group relative"
    >
      <div className="absolute inset-0 bg-[var(--primary)] rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <svg className="w-5 h-5 relative z-10" fill={icon === 'mail' ? 'none' : 'currentColor'} stroke={icon === 'mail' ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth="2">
        {getIcon()}
      </svg>
    </a>
  );
};

export default Footer;
