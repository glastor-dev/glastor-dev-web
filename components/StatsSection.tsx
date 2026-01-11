
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchGlobalLanguages, fetchUserProfile } from '../services/github';

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  Java: '#b07219',
};

const DEFAULT_COLOR = '#4b5563';

const StatsSection: React.FC = () => {
  const [langData, setLangData] = useState<any[]>([]);
  const [totalRepos, setTotalRepos] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [globalLangs, profile] = await Promise.all([
        fetchGlobalLanguages('glastor-dev'),
        fetchUserProfile('glastor-dev')
      ]);

      if (globalLangs) {
        setLangData(globalLangs.map(l => ({
          ...l,
          color: LANG_COLORS[l.name] || DEFAULT_COLOR
        })));
      }
      
      if (profile) {
        setTotalRepos(profile.public_repos);
      }

      setLoading(false);
    }
    loadData();
  }, []);

  const vercelStatsUrl = "https://github-readme-stats-theta-woad-23.vercel.app/api?username=glastor-dev&show_icons=true&theme=transparent&title_color=3b82f6&text_color=9ca3af&icon_color=3b82f6&hide_border=true&bg_color=00000000";

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-56 bg-white/5 rounded-3xl border border-white/10"></div>
        <div className="h-80 bg-white/5 rounded-3xl border border-white/10"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* MÓDULO PRO: Account_Activity_Telemetry */}
      <div className="max-w-3xl mx-auto group">
        <div className="flex items-center justify-between mb-3 px-2">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-4 bg-[var(--primary)] rounded-full"></div>
              <span className="text-[10px] mono font-black uppercase tracking-[0.4em] text-gray-400">Telemetry_Node_Stats</span>
           </div>
           <div className="flex items-center gap-4 text-[9px] mono text-gray-600 uppercase">
              <span className="animate-pulse">● Live_Feed</span>
              <span>Ref: GL-STAT-99</span>
           </div>
        </div>

        <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-1 overflow-hidden transition-all duration-700 hover:border-[var(--primary)]/40 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
           {/* Grid Pattern Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Industrial Brackets (Corners) */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-2xl"></div>
           <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-2xl"></div>
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-2xl"></div>
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-2xl"></div>

           {/* Content Container */}
           <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col items-center">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20"></div>

              <img 
                src={vercelStatsUrl} 
                alt="GitHub Stats" 
                className="max-w-full h-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Status Bar UI */}
              <div className="w-full mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                       <span className="text-[8px] text-gray-600 uppercase mono font-bold">Sync_Status</span>
                       <div className="flex gap-0.5 mt-1">
                          {[1,2,3,4,5,6].map(i => <div key={i} className={`w-3 h-1 rounded-full ${i < 5 ? 'bg-blue-500/60' : 'bg-white/10'}`}></div>)}
                       </div>
                    </div>
                    <div className="h-6 w-px bg-white/5"></div>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-gray-600 uppercase mono font-bold">Encryption</span>
                       <span className="text-[10px] text-emerald-500/80 mono font-bold">AES-256-GCM</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                    <span className="text-[9px] mono text-blue-400 font-bold tracking-tighter">DATA_FETCH_COMPLETED</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Dominio de Lenguajes PRO */}
      <div className="p-10 bg-[#070707] border border-white/5 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent"></div>
        
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[var(--primary)]/5 blur-[80px] rounded-full"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
           <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                   <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                   <h3 className="text-2xl font-black italic mono uppercase tracking-tight text-white">Dominio_Lenguajes_Global</h3>
                   <div className="h-px w-full bg-gradient-to-r from-[var(--primary)] to-transparent mt-1"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mono font-medium max-w-md">Análisis heurístico del stack tecnológico basado en la totalidad de la base de código pública.</p>
           </div>
           
           <div className="flex items-center gap-6 bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-right">
                 <div className="text-[9px] text-gray-600 mono uppercase font-black tracking-widest">Total_Repos</div>
                 <div className="text-3xl font-black text-white mono tabular-nums">
                    {totalRepos || '25'}
                 </div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col justify-center">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 <span className="text-[8px] mono text-gray-500 mt-2 uppercase">Kernel_Ok</span>
              </div>
           </div>
        </div>
        
        <div className="h-[350px] min-h-[200px] w-full relative z-10">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={langData} layout="vertical" margin={{ left: 0, right: 60 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#4b5563" 
                fontSize={12} 
                width={120} 
                axisLine={false} 
                tickLine={false} 
                className="mono font-bold uppercase tracking-tighter"
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid rgba(59,130,246,0.3)', 
                  borderRadius: '16px', 
                  fontSize: '12px',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' 
                }}
                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                labelStyle={{ color: '#fff', marginBottom: '4px', fontWeight: 'black' }}
                formatter={(val: any, name: any, props: any) => [`${val}% de implementación`, `Muestreo: ${props.payload.count} repos`]}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                {langData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    fillOpacity={0.85}
                    className="transition-all duration-300 hover:fill-opacity-100"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer info line */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
           <span className="text-[9px] mono uppercase tracking-[0.3em]">Telemetry_Protocol_v4.2</span>
           <span className="text-[9px] mono">LATENCY_SYNC: 0.0042s</span>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
