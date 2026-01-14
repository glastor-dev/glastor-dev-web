
import React from 'react';
import { useTranslate } from './LanguageContext';

const Icons = {
  Architecture: (
    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 18l-9-9m9 9l9-9M3 9h18M3 15h18" />
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.2" />
      <path d="M9 3v18M15 3v18" strokeOpacity="0.3" />
    </svg>
  ),
  Cloud: (
    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path d="M8 13h8M8 15h5" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  ),
  OpenSource: (
    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" strokeOpacity="0.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M15 15l3.5 3.5M15 9l3.5-3.5M9 15l-3.5 3.5M9 9l-3.5-3.5" strokeWidth="1" />
    </svg>
  ),
  IA: (
    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      <path d="M9 7h6M9 11h6M9 15h3" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="3" className="animate-pulse" />
    </svg>
  ),
  Rocket: (
    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.59 8.51m5.84 5.86a14.98 14.98 0 01-6.16 12.12A14.98 14.98 0 013.59 8.51m0 0a15.01 15.01 0 0112-6.159m-12 6.16a15.01 15.01 0 0012 6.16" />
    </svg>
  ),
  Security: (
    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeWidth="1.5" />
    </svg>
  )
};

const RoadmapItem: React.FC<{ title: string; date: string; desc: string; icon: React.ReactNode; size?: string; color?: string }> = ({ title, date, desc, icon, size = "col-span-1", color = "var(--primary)" }) => (
  <div className={`${size} p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[var(--primary)]/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm shadow-xl`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 blur-[50px] rounded-full group-hover:bg-[var(--primary)]/10 transition-all"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <span className="text-[10px] mono font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{date}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--primary)] transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 font-light leading-relaxed">{desc}</p>
    </div>
    <div className="absolute bottom-0 left-0 h-1 bg-[var(--primary)]/20 transition-all group-hover:w-full" style={{ width: '0%', backgroundColor: color }}></div>
  </div>
);

const BentoRoadmap: React.FC = () => {
  const { t, language } = useTranslate();
  const isEn = language === 'en';

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold mono uppercase tracking-tighter text-white">
            <span className="text-[var(--primary)]">_</span>{t('roadmap.title')}
          </h2>
          <p className="text-gray-400 mt-2 font-light">{t('roadmap.subtitle')}</p>
        </div>
        <div className="text-[10px] mono text-gray-600 font-bold uppercase tracking-[0.2em] border-l border-white/10 pl-4 py-1">
          {t('roadmap.last_updated')}: 12_JAN_2026
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <RoadmapItem 
          title={t('roadmap.items.architecture.title')} 
          date="2010 - 2014" 
          desc={t('roadmap.items.architecture.desc')} 
          icon={Icons.Architecture}
          size="md:col-span-2"
        />
        <RoadmapItem 
          title={t('roadmap.items.cloud.title')} 
          date="2015 - 2019" 
          desc={t('roadmap.items.cloud.desc')} 
          icon={Icons.Cloud}
        />
        <RoadmapItem 
          title={t('roadmap.items.opensource.title')} 
          date={t('roadmap.items.opensource.date')} 
          desc={t('roadmap.items.opensource.desc')} 
          icon={Icons.OpenSource}
        />
        
        <RoadmapItem 
          title={t('roadmap.items.ia.title')} 
          date="2024 - 2026" 
          desc={t('roadmap.items.ia.desc')} 
          icon={Icons.IA}
        />
        <RoadmapItem 
          title={t('roadmap.items.glastorv3.title')} 
          date={t('roadmap.items.glastorv3.date')} 
          desc={t('roadmap.items.glastorv3.desc')} 
          icon={Icons.Rocket}
          size="md:col-span-2"
        />
         <RoadmapItem 
          title={t('roadmap.items.security.title')} 
          date={t('roadmap.items.security.date')} 
          desc={t('roadmap.items.security.desc')} 
          icon={Icons.Security}
        />
      </div>
    </div>
  );
};

export default BentoRoadmap;
