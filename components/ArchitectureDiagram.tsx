
import React, { useState } from 'react';

const ArchIcons = {
  Clients: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 017.2 3.6m-7.2-3.6a9.015 9.015 0 00-7.2 3.6" />
    </svg>
  ),
  Gateway: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.905c-.321-.11-.659-.184-1.007-.221a3.369 3.369 0 00-1.743.167 3.38 3.38 0 00-1.246.908l-1.004 1.13c-.237.266-.452.548-.642.845a3.735 3.735 0 00-.339.63 3.356 3.356 0 00-.31 1.774 3.374 3.374 0 00.316 1.765 3.379 3.379 0 001.258.9 3.366 3.366 0 001.737.163 3.367 3.367 0 001.012-.225l1.002-.341a3.39 3.39 0 001.248-.908l1.004-1.13c.237-.266.452-.548.642-.845a3.735 3.735 0 00.339-.63 3.356 3.356 0 00.31-1.774 3.374 3.374 0 00-.316-1.765 3.379 3.379 0 00-1.258-.9 3.366 3.366 0 00-1.737-.163 3.367 3.367 0 00-1.012.225l-1.002.341z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h.75c.621 0 1.125.504 1.125 1.125v6.75C6 20.496 5.496 21 4.875 21h-.75A1.125 1.125 0 013 19.875v-6.75zM17.25 13.125c0-.621.504-1.125 1.125-1.125h.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-.75a1.125 1.125 0 01-1.125-1.125v-6.75z" />
    </svg>
  ),
  API: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.128l1.41-.513M5.106 17.785l1.15-.964m11.49-9.592l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.06 13.399l.146.151l.147-1.493m0-10.511l-.147-1.493" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.59 8.51m5.84 5.86a14.98 14.98 0 01-6.16 12.12A14.98 14.98 0 013.59 8.51m0 0a15.01 15.01 0 0112-6.159m-12 6.16a15.01 15.01 0 0012 6.16" />
    </svg>
  ),
  Cache: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Database: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  )
};

interface NodeDetail {
  title: string;
  specs: string[];
  tech: string;
}

const NodeDetails: Record<string, NodeDetail> = {
  'Clients': { title: 'User Interface Layer', tech: 'Next.js / React Native', specs: ['TLS 1.3 Encryption', 'Edge Caching (Cloudflare)', 'Websocket Support'] },
  'Gateway': { title: 'Ingress Controller', tech: 'Nginx / Traefik', specs: ['Rate Limiting: 1k/s', 'SSL Termination', 'Load Balancing (Round Robin)'] },
  'FastAPI Node 01': { title: 'Application Worker', tech: 'Python 3.12 (Uvicorn)', specs: ['Gunicorn Worker Cluster', 'Pydantic V2 Validation', 'AsyncIO I/O Operations'] },
  'Redis': { title: 'Cache & Pub/Sub', tech: 'Redis Stack', specs: ['Session Persistence', 'Query Caching (TTL: 3600s)', 'Atomic Counters'] },
  'PostgreSQL': { title: 'Primary Database', tech: 'PostgreSQL 16', specs: ['ACID Compliant', 'JSONB Storage Support', 'Read Replicas Configured'] },
};

const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="relative w-full p-4 md:p-12 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
      {/* Simulation Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <TrafficLane top="30%" delay="0s" />
         <TrafficLane top="50%" delay="1.5s" />
         <TrafficLane top="70%" delay="0.8s" />
      </div>

      <div className="overflow-x-auto lg:overflow-x-hidden pb-4 lg:pb-0 scrollbar-hide">
        <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6 lg:gap-4 max-w-7xl mx-auto relative z-10 min-w-max lg:min-w-0 px-8 py-4">
        <Node 
          title="Clients" 
          subtitle="Edge Layer" 
          icon={ArchIcons.Clients} 
          color="blue" 
          onClick={() => setSelectedNode('Clients')}
          active={selectedNode === 'Clients'}
        />

        <Arrow animated direction="right" />

        <Node 
          title="Gateway" 
          subtitle="Load Balancer" 
          icon={ArchIcons.Gateway} 
          color="purple" 
          onClick={() => setSelectedNode('Gateway')}
          active={selectedNode === 'Gateway'}
        />

        <Arrow animated direction="right" />

        <div className="flex flex-col gap-4">
           <Node 
             title="FastAPI Node 01" 
             subtitle="Core API" 
             icon={ArchIcons.API} 
             color="green" 
             onClick={() => setSelectedNode('FastAPI Node 01')}
             active={selectedNode === 'FastAPI Node 01'}
           />
        </div>

        <Arrow animated direction="right" />

        <div className="flex flex-col gap-4">
          <Node 
            title="Redis" 
            subtitle="Cache Tier" 
            icon={ArchIcons.Cache} 
            color="red" 
            onClick={() => setSelectedNode('Redis')}
            active={selectedNode === 'Redis'}
          />
          <div className="flex justify-center lg:hidden h-4 -my-2 relative z-0">
             <div className="w-px h-full bg-blue-500/20"></div>
          </div>
          <Node 
            title="PostgreSQL" 
            subtitle="Storage Tier" 
            icon={ArchIcons.Database} 
            color="blue" 
            onClick={() => setSelectedNode('PostgreSQL')}
            active={selectedNode === 'PostgreSQL'}
          />
        </div>
        </div>
      </div>

      {selectedNode && (
        <div className="mt-12 p-6 bg-black/60 border border-[var(--primary)] rounded-2xl animate-in fade-in slide-in-from-bottom-4">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h4 className="text-[var(--primary)] font-bold mono text-lg">{NodeDetails[selectedNode].title}</h4>
                 <p className="text-gray-400 text-sm">Stack: <span className="text-white mono">{NodeDetails[selectedNode].tech}</span></p>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white text-xl leading-none">&times;</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NodeDetails[selectedNode].specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-gray-300 bg-white/5 p-2 rounded border border-white/5 mono">
                   <span className="text-[var(--primary)]">✔</span> {spec}
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

const TrafficLane: React.FC<{ top: string; delay: string }> = ({ top, delay }) => (
  <div 
    className="absolute lg:left-0 lg:w-full lg:h-px h-full w-px lg:bg-transparent bg-transparent lg:flow-horizontal flow-vertical" 
    style={{ 
      top: '0', 
      left: '50%',
      height: '100%',
      '--top-offset': top 
    } as any}
  >
     <div className="hidden lg:block absolute w-full h-px bg-white/5" style={{ top: top }}>
        <div className="data-packet" style={{ animationDelay: delay }}></div>
        <div className="data-packet" style={{ animationDelay: `calc(${delay} + 1s)` }}></div>
     </div>
     <div className="lg:hidden absolute left-0 h-full w-px bg-white/5">
        <div className="data-packet" style={{ animationDelay: delay }}></div>
        <div className="data-packet" style={{ animationDelay: `calc(${delay} + 1.5s)` }}></div>
     </div>
  </div>
);


const Node: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; color: string; active?: boolean; onClick?: () => void }> = ({ title, subtitle, icon, color, active, onClick }) => {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5 text-blue-400 hover:border-blue-500 shadow-blue-500/10',
    purple: 'border-purple-500/30 bg-purple-500/5 text-purple-400 hover:border-purple-500 shadow-purple-500/10',
    green: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500 shadow-emerald-500/10',
    red: 'border-red-500/30 bg-red-500/5 text-red-400 hover:border-red-500 shadow-red-500/10',
    gray: 'border-white/10 bg-white/5 text-gray-500',
  };

  return (
    <button 
      onClick={onClick}
      className={`p-4 border rounded-2xl w-40 flex-shrink-0 text-center transition-all duration-500 group relative overflow-hidden backdrop-blur-sm ${colorMap[color]} ${active ? 'ring-2 ring-[var(--primary)] bg-white/10 shadow-2xl scale-105' : 'hover:scale-102'}`}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-current opacity-[0.03] blur-xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-500 text-current">
        {icon}
      </div>
      <div className="font-bold text-[13px] mono tracking-tighter mb-1 text-white group-hover:text-current transition-colors">
        {title}
      </div>
      <div className="text-[8px] opacity-50 uppercase tracking-[0.2em] font-black">
        {subtitle}
      </div>
    </button>
  );
};

const Arrow: React.FC<{ animated?: boolean; direction: 'right' | 'down' }> = ({ animated, direction }) => (
  <div className={`flex items-center justify-center text-white/20 ${animated ? 'animate-pulse' : ''} transition-all lg:w-8`}>
    <div className="lg:block hidden">
       <svg className="w-5 h-5 rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
       </svg>
    </div>
    <div className="lg:hidden block">
       <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
       </svg>
    </div>
  </div>
);

export default ArchitectureDiagram;

