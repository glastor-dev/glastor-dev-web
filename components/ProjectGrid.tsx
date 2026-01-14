
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchUserRepos } from '../services/github';
import { useTranslate } from './LanguageContext';

interface Project {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  tags: string[];
  status: 'stable' | 'beta' | 'archived';
  url: string;
  lastUpdate: string;
}

const ProjectGrid: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { t } = useTranslate();

  // Calculate freshness
  const freshness = useMemo(() => {
    if (!lastSyncedAt) return 'OFFLINE';
    const diff = (currentTime.getTime() - lastSyncedAt.getTime()) / 1000;
    if (diff < 30) return 'SYNCHRONIZED';
    if (diff < 300) return 'ACTIVE';
    if (diff < 900) return 'STALE_LINK';
    return 'DISCONNECTED';
  }, [lastSyncedAt, currentTime]);

  const loadProjects = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setIsSyncing(true);
    
    // Target user: glastor-dev
    const repos = await fetchUserRepos('glastor-dev');
    
    if (repos) {
      setProjects(repos.slice(0, 4));
      setError(false);
      setLastSyncedAt(new Date());
    } else {
      setError(true);
    }
    
    setLoading(false);
    setIsSyncing(false);
  }, []);

  useEffect(() => {
    loadProjects();
    
    // Auto sync every 5 minutes
    const syncInterval = setInterval(() => {
      loadProjects(true);
    }, 1000 * 60 * 5);
    
    // Update current time for freshness indicator every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(syncInterval);
      clearInterval(timeInterval);
    };
  }, [loadProjects]);

  const getStatusColor = () => {
    if (isSyncing) return 'bg-blue-500';
    switch (freshness) {
      case 'SYNCHRONIZED': return 'bg-emerald-500';
      case 'ACTIVE': return 'bg-emerald-500/60';
      case 'STALE_LINK': return 'bg-amber-500';
      case 'DISCONNECTED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-72 bg-white/[0.02] rounded-2xl border border-white/5 animate-pulse flex flex-col p-6 space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-lg"></div>
            <div className="h-6 w-1/2 bg-white/5 rounded"></div>
            <div className="h-16 w-full bg-white/5 rounded"></div>
            <div className="h-4 w-1/3 bg-white/5 rounded mt-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Telemetry Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()} transition-colors duration-1000 ${isSyncing || freshness === 'SYNCHRONIZED' ? 'animate-pulse' : ''}`}></div>
            {(isSyncing || freshness === 'SYNCHRONIZED') && (
              <div className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor()} animate-ping opacity-40`}></div>
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mono">
                {t('projects.telemetry')}
              </span>
              <span className={`text-[8px] mono font-bold px-1 rounded ${isSyncing ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500'}`}>
                {isSyncing ? 'BUSY' : freshness}
              </span>
            </div>
            <span className="text-[8px] text-gray-500 mono uppercase tracking-widest mt-0.5">
              {t('projects.source')}: api.github.com/glastor-dev
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[8px] text-gray-600 uppercase mono font-bold">Signal_Quality</span>
             <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1 h-2 rounded-full ${i < 5 ? 'bg-[var(--primary)]/60' : 'bg-white/10'}`}></div>
                ))}
             </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-gray-600 uppercase mono font-bold">Buffer_Update</span>
            <span className="text-[10px] text-white mono font-bold">
              {lastSyncedAt ? lastSyncedAt.toLocaleTimeString([], { hour12: false }) : '--:--:--'}
            </span>
          </div>
          
          <button 
            onClick={() => loadProjects()}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-[var(--primary)]/50 transition-all group ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg 
              className={`w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--primary)] ${isSyncing ? 'animate-spin text-[var(--primary)]' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[10px] mono font-black uppercase text-gray-500 group-hover:text-white">
              {t('projects.sync_now')}
            </span>
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-12 border border-red-500/20 bg-red-500/5 rounded-3xl text-center space-y-4">
          <div className="inline-flex p-3 bg-red-500/10 rounded-full text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <p className="text-red-400 mono text-sm uppercase tracking-widest font-black">Link_Interrupted</p>
            <p className="text-gray-500 text-xs mt-1">API rate limit reached or gateway timeout. Retrying in backdrop.</p>
          </div>
          <button onClick={() => loadProjects()} className="px-6 py-2 bg-red-500/10 text-red-500 text-[10px] mono font-black rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all uppercase tracking-widest">
            Force_Handshake
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {isSyncing && projects.length > 0 && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-20 rounded-3xl flex items-center justify-center animate-in fade-in duration-300">
               <div className="bg-[#0a0a0a]/90 border border-[var(--primary)]/30 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4">
                  <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] mono font-black text-white uppercase tracking-[0.2em]">{t('projects.updating')}</span>
                    <span className="text-[8px] mono text-gray-500 uppercase">Synchronizing_GitHub_Payload...</span>
                  </div>
               </div>
            </div>
          )}
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <a 
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 transition-all duration-500 hover:border-[var(--primary)]/40 hover:translate-y-[-6px] overflow-hidden shadow-xl"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--primary)]/5 blur-[80px] rounded-full group-hover:bg-[var(--primary)]/15 transition-all duration-700"></div>
      
      {/* Corner Brackets */}
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10 group-hover:border-[var(--primary)]/40 transition-colors rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10 group-hover:border-[var(--primary)]/40 transition-colors rounded-bl-lg"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 group-hover:border-[var(--primary)]/30 transition-all shadow-inner">
          <svg className="w-7 h-7 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col items-center gap-1 group/stat">
            <div className="flex items-center gap-1 text-[11px] mono text-gray-500 group-hover/stat:text-yellow-500 transition-colors font-bold">
              <svg className="w-3 h-3 group-hover/stat:animate-spin" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {project.stars}
            </div>
            <span className="text-[7px] mono text-gray-700 uppercase font-black tracking-tighter">STARS</span>
          </div>
          <div className="flex flex-col items-center gap-1 group/stat">
            <div className="flex items-center gap-1 text-[11px] mono text-gray-500 group-hover/stat:text-blue-400 transition-colors font-bold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V3m0 0l-4 4m4-4l4 4m-4 14v-8m0 8l-4-4m4 4l4-4" />
              </svg>
              {project.forks}
            </div>
            <span className="text-[7px] mono text-gray-700 uppercase font-black tracking-tighter">FORKS</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-10">
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <h3 className="text-2xl font-black text-white group-hover:text-[var(--primary)] transition-colors tracking-tighter uppercase italic">
            {project.name}
          </h3>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border tracking-widest ${project.status === 'stable' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' : 'border-blue-500/30 text-blue-500 bg-blue-500/5'}`}>
            {project.status.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed h-10 font-light italic">
          {project.desc}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] transition-transform group-hover:scale-125" style={{ backgroundColor: project.langColor, color: project.langColor }}></div>
            <span className="text-[10px] font-black mono text-gray-500 uppercase tracking-[0.2em]">{project.lang}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[7px] mono text-gray-700 font-black uppercase tracking-widest mb-0.5">Last_Push</span>
          <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors">
            {project.lastUpdate}
          </span>
        </div>
      </div>

      {/* Hover Pulse Scanline */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    </a>
  );
};

export default ProjectGrid;
