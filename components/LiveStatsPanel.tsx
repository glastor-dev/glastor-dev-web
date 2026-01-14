import React, { useState, useEffect } from "react";


const LiveStatsPanel: React.FC = () => {
  const [stats, setStats] = useState({ uptime: '', requests: '', cpu: '', ram: '' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        // Si falla, mantener los valores actuales
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 p-4 rounded-xl bg-black/70 border border-white/10 flex flex-col items-center justify-center shadow-lg">
      <div className="flex gap-8 text-center">
        <div>
          <div className="text-xs text-gray-400 uppercase mb-1">Uptime del sistema</div>
          <div className="text-lg font-bold text-blue-400 mono">{stats.uptime}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase mb-1">Requests/s</div>
          <div className="text-lg font-bold text-green-400 mono">{stats.requests}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase mb-1">CPU (%)</div>
          <div className="text-lg font-bold text-yellow-400 mono">{stats.cpu}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase mb-1">RAM (GB)</div>
          <div className="text-lg font-bold text-purple-400 mono">{stats.ram}</div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatsPanel;
