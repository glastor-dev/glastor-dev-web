
import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  content: React.ReactNode;
  type: 'command' | 'response' | 'system' | 'arch';
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [booted, setBooted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = [
      { text: ":: GRUB loading stage2...", type: 'system' },
      { text: ":: Loading Linux linux-hardened ...", type: 'system' },
      { text: ":: Loading initial ramdisk ...", type: 'system' },
      { text: "[  OK  ] Finished Load Kernel Modules.", type: 'arch' },
      { text: "[  OK  ] Reached target Local File Systems.", type: 'arch' },
      { text: "[  0.000000] Linux version 6.8.0-arch1-1 (glastor@archlinux) ", type: 'system' },
      { text: "[  OK  ] Started Network Configuration.", type: 'arch' },
      { text: "[  OK  ] Reached target Network is Online.", type: 'arch' },
      { text: "[  2.102341] systemd[1]: Set hostname to <glastor-dev-arch>", type: 'system' },
      { text: ":: Reached target Graphical Interface.", type: 'system' },
      { text: "Arch Linux 6.8.0-arch1-1 (tty1)", type: 'arch' },
      { text: "glastor-dev-arch login: glastor (automatic login)", type: 'arch' },
      { text: "------------------------------------------------------------", type: 'system' },
      { text: "Welcome to GLASTOR-OS. Type 'projects' to see my work.", type: 'arch' },
    ];

    const runBoot = (idx: number) => {
      if (idx < bootSequence.length) {
        setLines(prev => [...prev, { content: bootSequence[idx].text, type: bootSequence[idx].type as any }]);
        setTimeout(() => runBoot(idx + 1), idx < 5 ? 50 : 250);
      } else {
        setIsBooting(false);
        setBooted(true);
      }
    };
    runBoot(0);
  }, []);

  useEffect(() => {
    if (booted) {
      // Solo ejecuta neofetch si el primer comando del usuario NO es neofetch
      setTimeout(() => {
        if (history.length === 0 || history[0].trim().toLowerCase() !== "neofetch") {
          executeCommand("neofetch");
        }
      }, 300);
    }
  }, [booted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [lines, isBooting]);

  const focusInput = () => inputRef.current?.focus();

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response: React.ReactNode = "";

    switch (trimmedCmd) {
      case "neofetch":
        response = (
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-2 animate-in fade-in duration-700 overflow-hidden">
            {/* Logo Responsivo */}
            <div className="text-[#1793d1] font-bold leading-none mono text-[12px] md:text-[14px] shrink-0">
              <pre className="hidden md:block">
{`                   -\`
                  .o+o.
                 +ooooo+
                +ooooooo:
               +ooooooooo:
              +ooooooooooo:
             +ooooooooooooo:
            +ooooooooooooooo:
           +ooooooo-::::-oooo:
          +oooooo-      -ooooo:
         +ooooo:         :oooooo:
        +ooooo:           :oooooo:
       +ooooo:             :oooooo:
      +ooooo:               :oooooo:
     +ooooo:                 :oooooo:
    +ooooo:                   :oooooo:
   :ooooo.                     .oooooo+
  .ooooo:                       :oooooo+
 .oooooo.                       .ooooooo+
 :oooooo:                       :ooooooo+
 .oooooo:                       :ooooooo+`}
              </pre>
              <pre className="md:hidden">
{`      /\\
     /  \\
    /    \\
   /      \\
  /   ,,   \\
 /   |  |   \\
/____|__|____\\`}
              </pre>
            </div>
            <div className="space-y-1 text-xs md:text-sm">
                <p className="flex gap-2"><span className="text-[#1793d1] font-bold">glastor</span>@<span className="text-[#1793d1] font-bold">archlinux</span></p>
                <p className="opacity-50">-------------------------</p>
                <p><span className="text-[#1793d1] font-bold">OS:</span> Arch Linux x86_64</p>
                <p><span className="text-[#1793d1] font-bold">Host:</span> GLASTOR-Kernel-Node v4.2</p>
                <p><span className="text-[#1793d1] font-bold">Kernel:</span> 6.8.0-arch1-1-hardened</p>
                <p><span className="text-[#1793d1] font-bold">Uptime:</span> 14 years, 5 months</p>
                <p><span className="text-[#1793d1] font-bold">Packages:</span> 25 (pacman)</p>
                <p><span className="text-[#1793d1] font-bold">Shell:</span> zsh 5.9</p>
                <p><span className="text-[#1793d1] font-bold">Resolution:</span> 3840x2160</p>
                <p><span className="text-[#1793d1] font-bold">Memory:</span> 42.1GB / 64GB</p>
                <p><span className="text-[#1793d1] font-bold">CPU:</span> AMD Ryzen Threadripper PRO 5995WX (64) @ 4.5GHz</p>
                <p><span className="text-[#1793d1] font-bold">GPU:</span> NVIDIA RTX 4090 24GB GDDR6X</p>
                <p><span className="text-[#1793d1] font-bold">Storage:</span> 4TB NVMe Gen4 + 8TB SSD RAID</p>
                <p><span className="text-[#1793d1] font-bold">Network:</span> 10GbE Intel X550-T2</p>
                <p><span className="text-[#1793d1] font-bold">Motherboard:</span> ASUS PRO WS WRX80E-SAGE SE WIFI</p>
                <p><span className="text-[#1793d1] font-bold">PSU:</span> Corsair AX1600i Digital</p>
                <div className="flex gap-1 mt-3">
                  {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`w-4 h-3 bg-ansi-${i}`}></div>)}
                </div>
            </div>
          </div>
        );
        break;
      case "projects":
      case "ls projects":
        response = (
          <div className="space-y-3 py-2 border-l-2 border-[#1793d1]/30 pl-4 ml-2">
            <p className="text-[#1793d1] font-black uppercase text-[10px] tracking-widest">Active_Deployments</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="text-white font-bold">01. GLASTOR_Core</span>
                <span className="text-[12px] text-emerald-400 mono">[STABLE]</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="text-white font-bold">02. Neural_API_V4</span>
                <span className="text-[12px] text-blue-400 mono">[ACTIVE]</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="text-white font-bold">03. Arch_Portfolio</span>
                <span className="text-[12px] text-purple-400 mono">[LATEST]</span>
              </div>
            </div>
            <p className="text-[12px] text-gray-200 italic">Tip: Scrolea hacia abajo para ver el Grid completo de 25 repositorios.</p>
          </div>
        );
        break;
      case "ls":
        response = (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <span className="text-blue-400 font-bold">drwxr-xr-x  projects/</span>
            <span className="text-blue-400 font-bold">drwxr-xr-x  stack/</span>
            <span className="text-blue-400 font-bold">drwxr-xr-x  core/</span>
            <span className="text-gray-300">-rw-r--r--  resume.pdf</span>
          </div>
        );
        break;
      case "uname -a":
        response = "Linux glastor-dev-arch 6.8.0-arch1-1 #1 SMP PREEMPT_DYNAMIC Thu, 11 Apr 2024 12:45:01 +0000 x86_64 GNU/Linux";
        break;
      case "whoami":
        response = "glastor (Senior Backend Engineer / Architect)";
        break;
      case "clear":
        setLines([]);
        return;
      case "help":
        response = (
          <div className="text-gray-400">
            <p className="text-white mb-2 font-bold underline">AVAILABLE COMMANDS:</p>
            <ul className="space-y-1">
              <li><span className="text-[#1793d1] font-bold">projects</span> - Show major repositories</li>
              <li><span className="text-[#1793d1] font-bold">neofetch</span> - System Information</li>
              <li><span className="text-[#1793d1] font-bold">ls</span> - List directory contents</li>
              <li><span className="text-[#1793d1] font-bold">whoami</span> - Print current user</li>
              <li><span className="text-[#1793d1] font-bold">clear</span> - Clear screen</li>
            </ul>
          </div>
        );
        break;
      default:
        response = <span className="text-red-400">zsh: command not found: {trimmedCmd}</span>;
    }

    setLines(prev => [
      ...prev,
      { content: <PromptDisplay cmd={cmd} />, type: 'command' },
      { content: response, type: 'response' }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory(prev => [...prev, input]);
    setHistoryIdx(-1);
    executeCommand(input);
    setInput("");
  };

  return (
    <div className="w-full relative group" onClick={focusInput}>
      <div className="w-full bg-[#0c0c0c] border border-white/5 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-[13px] leading-relaxed transition-all duration-500 hover:border-[#1793d1]/30">
        {/* Arch Header Bar */}
        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-200 text-[12px] uppercase font-black tracking-widest">
            <span className="text-[#1793d1]">archlinux</span>@glastor-dev: ~
          </div>
          <div className="text-[12px] text-[#1793d1]/70 font-bold">ZSH</div>
        </div>
        {/* Terminal Screen */}
        <div ref={scrollRef} className="p-6 min-h-[200px] max-h-[700px] overflow-y-auto space-y-2 custom-scrollbar relative bg-[#0c0c0c] scroll-smooth">
          {/* CRT scanline simulation */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.02] bg-[length:100%_3px] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)]"></div>
          
          {lines.map((line, i) => (
            <div key={i} className={`
              ${line.type === 'system' ? 'text-gray-600' : ''}
              ${line.type === 'arch' ? 'text-white font-bold' : ''}
              ${line.type === 'response' ? 'text-gray-400 py-1' : ''}
              break-words
            `}>
              {line.content}
            </div>
          ))}

          {!isBooting && (
            <form onSubmit={handleSubmit} className="flex items-start gap-0 w-full pt-2">
              <PromptDisplay />
              <div className="relative flex-grow ml-2 overflow-hidden">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      if (historyIdx < history.length - 1) {
                        const nextIdx = historyIdx + 1;
                        setHistoryIdx(nextIdx);
                        setInput(history[history.length - 1 - nextIdx]);
                      }
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      if (historyIdx > 0) {
                        const nextIdx = historyIdx - 1;
                        setHistoryIdx(nextIdx);
                        setInput(history[history.length - 1 - nextIdx]);
                      } else {
                        setHistoryIdx(-1);
                        setInput("");
                      }
                    }
                  }}
                  autoFocus
                  className="bg-transparent border-none outline-none w-full text-white caret-transparent"
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="absolute left-0 top-0 pointer-events-none text-white whitespace-pre">
                  {input}
                  <span className="w-2 h-4 bg-[#1793d1] inline-block align-middle ml-0.5 animate-pulse"></span>
                </span>
              </div>
            </form>
          )}

          {isBooting && (
            <div className="flex items-center gap-3 text-[#1793d1] text-xs font-bold animate-pulse mt-4">
               <span className="w-4 h-4 border-2 border-[#1793d1] border-t-transparent rounded-full animate-spin"></span>
               KERNEL: Mounting modules...
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .bg-ansi-1 { background-color: #000; }
        .bg-ansi-2 { background-color: #f00; }
        .bg-ansi-3 { background-color: #0f0; }
        .bg-ansi-4 { background-color: #ff0; }
        .bg-ansi-5 { background-color: #00f; }
        .bg-ansi-6 { background-color: #f0f; }
        .bg-ansi-7 { background-color: #0ff; }
        .bg-ansi-8 { background-color: #fff; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

const PromptDisplay: React.FC<{ cmd?: string }> = ({ cmd }) => {
  return (
    <div className="flex items-center select-none shrink-0">
      <div className="flex items-center">
        {/* Arch Segment */}
        <div className="relative">
          <span className="bg-[#1793d1] text-white px-2 py-0.5 font-black text-[9px] rounded-l-sm flex items-center gap-1 z-20">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.215 1.554C11.66 2.94 11.234 4.144 11.234 4.144c-1.127 2.87-2.126 5.395-3.13 7.842-1.004 2.447-1.996 4.887-2.935 7.155-.94 2.268-1.815 4.354-2.52 6.002h4.59s.434-.943.99-2.227c.556-1.284 1.25-2.915 1.956-4.636.707-1.722 1.41-3.473 2.016-5.013.606-1.54 1.107-2.843 1.107-2.843l.004-.002s.5 1.303 1.107 2.843c.606 1.54 1.31 3.29 2.016 5.013.706 1.721 1.4 3.352 1.956 4.636.556 1.284.99 2.227.99 2.227h4.59c-.704-1.648-1.58-3.734-2.52-6.002-.939-2.268-1.93-4.708-2.934-7.155-1.004-2.447-2.004-4.972-3.13-7.842 0 0-.427-1.204-.982-2.59z"/>
            </svg>
            ARCH
          </span>
          <div className="absolute top-0 right-[-8px] w-0 h-0 border-l-[8px] border-l-[#1793d1] border-y-[9.5px] border-y-transparent z-10"></div>
        </div>

        {/* Path Segment */}
        <div className="relative ml-2 hidden sm:block">
          <span className="bg-white/10 text-gray-100 px-3 py-0.5 text-[12px] font-bold italic z-20 flex items-center gap-2">
            ~/glastor
            <span className="text-[#1793d1] text-[7px] font-black">git:(main)</span>
          </span>
          <div className="absolute top-0 right-[-8px] w-0 h-0 border-l-[8px] border-l-white/5 border-y-[9.5px] border-y-transparent z-10"></div>
        </div>

        {/* Separator */}
        <span className="text-[#1793d1] ml-4 font-black">❯</span>
      </div>
      {cmd && <span className="text-white ml-2">{cmd}</span>}
    </div>
  );
};

export default Terminal;
