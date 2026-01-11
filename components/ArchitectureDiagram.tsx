
import React, { useState } from 'react';

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

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto relative z-10">
        <Node 
          title="Clients" 
          subtitle="Edge Layer" 
          icon="🌐" 
          color="blue" 
          onClick={() => setSelectedNode('Clients')}
          active={selectedNode === 'Clients'}
        />

        <Arrow animated direction="right" />

        <Node 
          title="Gateway" 
          subtitle="Load Balancer" 
          icon="⚖️" 
          color="purple" 
          onClick={() => setSelectedNode('Gateway')}
          active={selectedNode === 'Gateway'}
        />

        <Arrow animated direction="right" />

        <div className="flex flex-col gap-4">
           <Node 
             title="FastAPI Node 01" 
             subtitle="Core API" 
             icon="⚙️" 
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
            icon="⚡" 
            color="red" 
            onClick={() => setSelectedNode('Redis')}
            active={selectedNode === 'Redis'}
          />
          <Node 
            title="PostgreSQL" 
            subtitle="Storage Tier" 
            icon="🐘" 
            color="blue" 
            onClick={() => setSelectedNode('PostgreSQL')}
            active={selectedNode === 'PostgreSQL'}
          />
        </div>
      </div>

      {selectedNode && (
        <div className="mt-12 p-6 bg-black/60 border border-[var(--primary)] rounded-2xl animate-in fade-in slide-in-from-bottom-4">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h4 className="text-[var(--primary)] font-bold mono text-lg">{NodeDetails[selectedNode].title}</h4>
                 <p className="text-gray-400 text-sm">Stack: <span className="text-white mono">{NodeDetails[selectedNode].tech}</span></p>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white">✕</button>
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
  <div className="absolute left-0 w-full h-px bg-white/5" style={{ top }}>
    <div className="data-packet" style={{ animationDelay: delay }}></div>
    <div className="data-packet" style={{ animationDelay: `calc(${delay} + 1s)` }}></div>
  </div>
);

const Node: React.FC<{ title: string; subtitle: string; icon: string; color: string; active?: boolean; onClick?: () => void }> = ({ title, subtitle, icon, color, active, onClick }) => {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5 text-blue-400 hover:border-blue-500',
    purple: 'border-purple-500/30 bg-purple-500/5 text-purple-400 hover:border-purple-500',
    green: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500',
    red: 'border-red-500/30 bg-red-500/5 text-red-400 hover:border-red-500',
    gray: 'border-white/10 bg-white/5 text-gray-500',
  };

  return (
    <button 
      onClick={onClick}
      className={`p-4 border rounded-xl w-44 text-center transition-all group ${colorMap[color]} ${active ? 'ring-2 ring-[var(--primary)] bg-white/10 shadow-2xl' : ''}`}
    >
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="font-bold text-xs mono tracking-tighter">{title}</div>
      <div className="text-[9px] opacity-60 uppercase tracking-[0.2em] font-bold">{subtitle}</div>
    </button>
  );
};

const Arrow: React.FC<{ animated?: boolean; direction: 'right' | 'down' }> = ({ animated, direction }) => (
  <div className={`hidden md:flex items-center text-white/10 ${animated ? 'animate-pulse' : ''}`}>
    <span className="text-2xl">→</span>
  </div>
);

export default ArchitectureDiagram;
