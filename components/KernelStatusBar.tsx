
import React, { useState, useEffect } from 'react';

const KernelStatusBar: React.FC = () => {
  const [latency, setLatency] = useState(24);
  const [log, setLog] = useState('SYS_INIT_SUCCESS');

  useEffect(() => {
    const logs = [
      'WORKER_THREAD_POOL_SCALED', 
      'TCP_HANDSHAKE_COMPLETED', 
      'DB_REPLICA_SYNC_0.2ms',
      'AES_256_ENCRYPTION_ACTIVE',
      'FASTAPI_UVICORN_STABLE',
      'REDIS_CACHE_HIT_RATE_98%'
    ];
    
    const interval = setInterval(() => {
      setLatency(prev => Math.max(12, Math.min(80, prev + (Math.random() * 10 - 5))));
      setLog(logs[Math.floor(Math.random() * logs.length)]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] h-6 bg-black border-b border-white/5 flex items-center justify-between px-4 text-[9px] mono uppercase tracking-widest overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-gray-400">Integrity: <span className="text-white">99.99%</span></span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-gray-500">Latency:</span>
          <span className={`${latency > 50 ? 'text-yellow-500' : 'text-emerald-500'}`}>{latency.toFixed(0)}ms</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-gray-500 italic truncate max-w-[40%]">
        <span className="text-[var(--primary)] mr-1">[$]</span> {log}
      </div>

      <div className="flex items-center gap-6">
        <span className="hidden md:inline">Region: <span className="text-white">AR-SA-01</span></span>
        <span className="text-gray-400">Nodes: <span className="text-white">12/12</span></span>
      </div>
    </div>
  );
};

export default KernelStatusBar;
