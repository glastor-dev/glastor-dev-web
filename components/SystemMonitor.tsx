
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    val: Math.floor(Math.random() * (40 - 20 + 1)) + 20
  }));
};

const SystemMonitor: React.FC = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), { time: prev[prev.length - 1].time + 1, val: Math.floor(Math.random() * (45 - 15 + 1)) + 15 }];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold uppercase tracking-[0.2em] text-gray-100">Service Latency (ms)</h3>
        <span className="text-[12px] mono text-emerald-400 px-2 py-0.5 bg-emerald-400/20 rounded">Live: 24ms</span>
      </div>
      
      <div className="h-24 min-h-[96px] w-full">
        <ResponsiveContainer width="100%" height={96}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
            <YAxis hide domain={[0, 60]} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/5">
        <StatMini label="CPU" val="12.4%" />
        <StatMini label="RAM" val="2.1GB" />
        <StatMini label="Requests" val="4.2k/s" />
      </div>
    </div>
  );
};

const StatMini: React.FC<{ label: string; val: string }> = ({ label, val }) => (
  <div>
    <div className="text-[9px] uppercase text-gray-600 font-bold">{label}</div>
    <div className="text-xs mono text-white">{val}</div>
  </div>
);

export default SystemMonitor;
