
import React, { useState, useEffect, useRef } from 'react';
import { useTranslate } from './LanguageContext';

const partners = [
  { 
    name: 'Nexperia', 
    industryKey: 'semiconductors', 
    logo: 'NX', 
    img: 'https://camo.githubusercontent.com/575b6bc125c335c92e1028519a90acac870cea587b8808cbc5c1c12c2118d7de/68747470733a2f2f692e706f7374696d672e63632f6e72517a6e5964322f6e657870657269612d6c6f676f2e706e67',
    color: '#ff6b00',
    span: 'md:col-span-2 md:row-span-2'
  },
  { 
    name: 'Aspid Cars', 
    industryKey: 'automotive', 
    logo: 'AC', 
    img: 'https://camo.githubusercontent.com/e763c77aa984ce5328e93867dcebed291c854e5d0be590a3d9cbcd97658a9195/68747470733a2f2f692e706f7374696d672e63632f463174746d7144482f41737069642e706e67',
    color: '#ffffff',
    span: 'md:col-span-2'
  },
  { 
    name: 'Rizin', 
    industryKey: 'motorsports', 
    logo: 'RZ', 
    img: '/img/rizin.png',
    color: '#e91e63',
    span: 'md:col-span-1'
  },
  { 
    name: 'Route4Me', 
    industryKey: 'logistics', 
    logo: 'R4', 
    img: '/img/route4me-logo.png',
    color: '#007aff',
    span: 'md:col-span-1'
  },
  { 
    name: 'Neovim', 
    industryKey: 'opensource', 
    logo: 'NV', 
    img: '/img/neovim-logo.png',
    color: '#57a143',
    span: 'md:col-span-1'
  },
  { 
    name: 'FENETRE', 
    industryKey: 'ml', 
    logo: 'GA', 
    img: '/img/logo.png',
    color: '#00f2ff',
    span: 'md:col-span-2'
  },
  { 
    name: 'Fathom Analytics', 
    industryKey: 'analytics', 
    logo: 'FA', 
    img: 'https://automation.vuejs.org/images/fathom_analytics.svg',
    color: '#8e44ad',
    span: 'md:col-span-1'
  },
];

const TrustSection: React.FC = () => {
  const { t } = useTranslate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--primary)]"></div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-400">
              {t('trust.strategic')} <span className="text-white">{t('trust.partnerships')}</span>
            </h3>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--primary)]"></div>
          </div>
          <p className="text-lg text-gray-200 max-w-2xl font-light italic leading-relaxed">
            "{t('trust.title')}"
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]">
          {partners.map((partner, idx) => (
            <div 
              key={idx}
              className={`${partner.span} group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-700 hover:border-[var(--primary)]/30 hover:-translate-y-1 shadow-2xl flex flex-col items-center justify-center p-8`}
            >
              {/* Dynamic Aura */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at center, ${partner.color}, transparent 70%)` 
                }}
              ></div>
              
              {/* Logo Container */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 group-hover:scale-105 transition-transform duration-500">
                <div className="relative w-full h-full max-h-[100px] flex items-center justify-center">
                  <img 
                    src={partner.img} 
                    alt={partner.name} 
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  />
                  {/* Highlight Glow */}
                  <div 
                    className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ backgroundColor: partner.color }}
                  ></div>
                </div>
                
                {/* Meta Info (Hidden on mobile if card is small) */}
                <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-black mono text-white uppercase tracking-widest">{partner.name}</span>
                  <span className="text-[8px] mono text-gray-500 uppercase mt-0.5" style={{ color: `${partner.color}99` }}>{t(`industries.${partner.industryKey}`)}</span>
                </div>
              </div>

              {/* Technical Scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}

          {/* Call to Action Tile */}
          <div className="md:col-span-1 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center group hover:bg-[var(--primary)]/10 transition-all">
            <span className="text-[8px] mono font-bold text-[var(--primary)] uppercase tracking-widest mb-2">{t('trust.build_with_me')}</span>
            <span className="text-[10px] text-white mono leading-tight">{t('trust.handshake')}</span>
            <div className="mt-4 w-8 h-8 rounded-full border border-[var(--primary)]/30 flex items-center justify-center animate-pulse group-hover:scale-125 transition-transform">
              <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 group">
          <div className="flex flex-col items-center">
            <span className="text-[10px] mono font-bold text-white">{t('trust.uptime_label')}</span>
            <span className="text-[8px] mono text-gray-500 mt-1">{t('trust.verified')}</span>
          </div>
          <div className="flex flex-col items-center border-l border-white/10 pl-8 md:pl-16">
            <span className="text-[10px] mono font-bold text-white">{t('trust.precision_label')}</span>
            <span className="text-[8px] mono text-gray-500 mt-1">{t('trust.industrial')}</span>
          </div>
          <div className="flex flex-col items-center border-l border-white/10 pl-8 md:pl-16">
            <span className="text-[10px] mono font-bold text-white">{t('trust.sync_label')}</span>
            <span className="text-[8px] mono text-gray-500 mt-1">12_JAN_2026_16:04</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustStat: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [displayValue, setDisplayValue] = useState<string | number>('0');
  const countRef = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Parsing the value to extract numeric part and suffix
    const match = value.match(/(\d+\.?\d*)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes('.');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          let startTime: number | null = null;
          const duration = 2000; // 2 seconds

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Ease out function
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = easedProgress * targetNumber;
            
            setDisplayValue(isDecimal ? currentCount.toFixed(1) + suffix : Math.floor(currentCount) + suffix);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
              setHasAnimated(true);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col items-center group cursor-default">
      <span className="text-2xl font-black mono text-white group-hover:text-[var(--primary)] transition-colors min-w-[3ch] text-center">
        {displayValue}
      </span>
      <span className="text-[12px] uppercase tracking-[0.3em] text-gray-200 font-bold mt-1">
        {label}
      </span>
    </div>
  );
};

export default TrustSection;
