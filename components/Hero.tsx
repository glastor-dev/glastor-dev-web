
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-12 pb-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          @glastor-dev en GitHub
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Arquitecto de <span className="gradient-text">APIs</span> &<br />
          Sistemas Distribuidos.
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl font-light">
          Especializado en el ecosistema Python (FastAPI/Django), 
          automatización industrial, DevOps y seguridad informática. 
          Construyendo el futuro del backend, commit a commit.
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          <Badge text="Python Expert" color="blue" />
          <Badge text="DevOps & CI/CD" color="purple" />
          <Badge text="API Security" color="green" />
          <Badge text="Docker Orchestration" color="cyan" />
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-900/30 text-blue-400 border-blue-800/50',
    purple: 'bg-purple-900/30 text-purple-400 border-purple-800/50',
    green: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50',
    cyan: 'bg-cyan-900/30 text-cyan-400 border-cyan-800/50',
  };

  return (
    <span className={`px-4 py-1.5 rounded border text-sm font-medium ${colors[color] || colors.blue}`}>
      {text}
    </span>
  );
};

export default Hero;
