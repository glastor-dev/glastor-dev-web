
import React, { useState, useEffect } from 'react';

const PerformanceDiagnostic: React.FC = () => {
  const [metrics, setMetrics] = useState({ load: '0ms', dom: '0ms', status: 'Optimal' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const perf = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perf) {
        setMetrics({
          load: `${Math.round(perf.duration)}ms`,
          dom: `${Math.round(perf.domInteractive)}ms`,
          status: perf.duration < 1000 ? 'Optimal' : 'Checking'
        });
      }
    }
  }, []);

  return (
    <div className="flex items-center gap-4 md:gap-6 bg-white/[0.02] border border-white/5 py-1.5 px-4 rounded-xl">
      <div className="flex flex-col">
        <span className="text-[7px] mono text-gray-600 font-black uppercase tracking-tighter">Core_Load</span>
        <span className="text-[10px] mono text-[var(--primary)] font-bold">{metrics.load}</span>
      </div>
      <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
      <div className="flex flex-col hidden sm:flex">
        <span className="text-[7px] mono text-gray-600 font-black uppercase tracking-tighter">DOM_Interaction</span>
        <span className="text-[10px] mono text-white font-bold">{metrics.dom}</span>
      </div>
      <div className="w-px h-4 bg-white/10"></div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981] animate-pulse"></div>
        <span className="text-[9px] mono text-emerald-500 font-bold uppercase">{metrics.status}</span>
      </div>
    </div>
  );
};

export default PerformanceDiagnostic;
