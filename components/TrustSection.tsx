
import React, { useState, useEffect, useRef } from 'react';

const partners = [
  { name: 'Nexperia', industry: 'Semiconductors', logo: 'NX', status: '0x44A' },
  { name: 'Aspid Cars', industry: 'Automotive', logo: 'AC', status: '0x92F' },
  { name: 'Rizin', industry: 'Motorsports', logo: 'RZ', status: '0x11B' },
  { name: 'Route4Me', industry: 'Logistics', logo: 'R4', status: '0x77C' },
  { name: 'Neovim', industry: 'Open Source', logo: 'NV', status: '0x001' },
  { name: 'Glastor-AI', industry: 'Machine Learning', logo: 'GA', status: '0xEE2' },
  { name: 'DeepScale', industry: 'Infrastructure', logo: 'DS', status: '0xFFF' },
];

const TrustSection: React.FC = () => {
  // Triplemos la lista para asegurar que el scroll nunca muestre huecos en pantallas anchas
  const fullList = [...partners, ...partners, ...partners];

  return (
    <div className="py-24 relative overflow-hidden bg-black/20">
      {/* Background decoration - Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="mb-16 flex flex-col items-center text-center px-4 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--primary)]"></div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-500 flex items-center gap-2">
            Strategic <span className="text-[var(--primary)]">Partnerships</span> & Integrations
          </h3>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--primary)]"></div>
        </div>
        <p className="text-sm text-gray-400 max-w-xl font-light italic leading-relaxed">
          "Arquitecturas validadas bajo protocolos de alta disponibilidad para líderes industriales."
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Edge Masks for smooth fade out */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[var(--bg)] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[var(--bg)] to-transparent z-20 pointer-events-none"></div>

        {/* Marquee Container with forced horizontal layout */}
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {fullList.map((partner, idx) => (
            <div 
              key={idx} 
              className="inline-flex mx-6 flex-shrink-0 w-72 group/card relative"
            >
              {/* Card Body */}
              <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-lg p-5 flex items-center gap-5 transition-all duration-500 group-hover/card:border-[var(--primary)]/40 group-hover/card:bg-[#0f0f0f] relative overflow-hidden">
                
                {/* Circuit decorations */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover/card:border-[var(--primary)]/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover/card:border-[var(--primary)]/30 rounded-bl-lg"></div>

                {/* Logo Box with Scale and Tooltip */}
                <div className="relative group/logo">
                  <div className="w-14 h-14 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative transition-transform duration-500 group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <span className="text-xl font-black mono text-white/20 group-hover/card:text-[var(--primary)] transition-colors">
                      {partner.logo}
                    </span>
                    {/* Status LED */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover/card:animate-pulse"></div>
                  </div>

                  {/* Tooltip Technical Style */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/card:opacity-100 transition-all duration-300 pointer-events-none z-30">
                    <div className="bg-[#050505] border border-[var(--primary)]/50 px-3 py-2 rounded shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center">
                       <div className="text-[9px] mono font-black text-white uppercase tracking-tighter truncate max-w-[120px]">
                         {partner.name}
                       </div>
                       <div className="text-[7px] mono text-[var(--primary)] font-bold uppercase tracking-widest mt-0.5">
                         {partner.industry}
                       </div>
                       {/* Arrow */}
                       <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[var(--primary)]/50"></div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight truncate group-hover/card:text-[var(--primary)] transition-colors">
                      {partner.name}
                    </h4>
                    <span className="text-[7px] mono text-emerald-500/50 hidden group-hover/card:block animate-in fade-in slide-in-from-left-2">
                      {partner.status}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 font-mono mt-1">
                    {partner.industry}
                  </p>
                </div>

                {/* Interactive Scanline on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-transparent -translate-y-full group-hover/card:translate-y-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Stats Footer */}
      <div className="mt-20 container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
            <TrustStat label="Project Lifetime" value="14Y" />
            <TrustStat label="System Uptime" value="99.9%" />
            <TrustStat label="Client Retention" value="92%" />
            <TrustStat label="Stack Precision" value="High" />
        </div>
      </div>
    </div>
  );
};

const TrustStat: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [displayValue, setDisplayValue] = useState<string | number>('0');
  const countRef = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Parsing the value to extract numeric part and suffix
    const match = value.match(/(\d+\.?\d*)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes('.');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          let startTime: number | null = null;
          const duration = 2000; // 2 seconds

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Ease out function
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = easedProgress * targetNumber;
            
            setDisplayValue(isDecimal ? currentCount.toFixed(1) + suffix : Math.floor(currentCount) + suffix);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
              setHasAnimated(true);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col items-center group cursor-default">
      <span className="text-2xl font-black mono text-white group-hover:text-[var(--primary)] transition-colors min-w-[3ch] text-center">
        {displayValue}
      </span>
      <span className="text-[8px] uppercase tracking-[0.3em] text-gray-600 font-bold mt-1">
        {label}
      </span>
    </div>
  );
};

export default TrustSection;
