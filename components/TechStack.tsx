
import React from 'react';
import { useTranslate } from './LanguageContext';

const Icons = {
  Backend: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a3 3 0 003 3m13.5-3a3 3 0 003 3m-19.5 0v3.75a3 3 0 003 3h13.5a3 3 0 003-3V11.25M6.75 6.75h.008v.008H6.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm1.875 0h.008v.008H9V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  Data: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  DevOps: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.59 8.51m5.84 5.86a14.98 14.98 0 01-6.16 12.12A14.98 14.98 0 013.59 8.51m0 0a15.01 15.01 0 0112-6.159m-12 6.16a15.01 15.01 0 0012 6.16" />
    </svg>
  ),
  Frontend: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  )
};

const SkillCard: React.FC<{ title: string; skills: string[]; icon: React.ReactNode }> = ({ title, skills, icon }) => (
  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[var(--primary)]/30 transition-all duration-500 group shadow-lg">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-black transition-all duration-500 text-[var(--primary)]">
        {icon}
      </div>
      <h4 className="text-white font-black text-lg uppercase tracking-wider mono group-hover:text-[var(--primary)] transition-colors">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-3 py-1 text-[11px] mono font-bold text-gray-500 bg-white/5 rounded-lg border border-white/5 group-hover:border-[var(--primary)]/10 group-hover:text-gray-300 transition-all">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TechStack: React.FC = () => {
  const { t } = useTranslate();
  const categories = [
    { title: t('tech_stack.backend'), icon: Icons.Backend, skills: ["Python", "FastAPI", "Django", "Deno", "NodeJS"] },
    { title: t('tech_stack.data'), icon: Icons.Data, skills: ["PostgreSQL", "MongoDB", "Redis", "ElasticSearch"] },
    { title: t('tech_stack.devops'), icon: Icons.DevOps, skills: ["Docker", "K8s", "AWS", "GitHub Actions"] },
    { title: t('tech_stack.frontend'), icon: Icons.Frontend, skills: ["React", "TypeScript", "Tailwind", "Vite"] },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {categories.map((cat, idx) => (
        <SkillCard key={idx} {...cat} />
      ))}
    </div>
  );
};

export default TechStack;
