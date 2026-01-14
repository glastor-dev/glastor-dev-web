import React, { createContext, useContext, useState } from 'react';
import terminosMd from "../TERMINOS.md?raw";
import privacidadMd from "../PRIVACIDAD.md?raw";
import legalMd from "../LEGAL.md?raw";
import cookiesMd from "../COOKIES.md?raw";
import ReactMarkdown from 'react-markdown';

export const legalTabs = [
  { label: "Términos", id: "terminos", md: terminosMd, title: "Términos de Uso", lastUpdate: "2026-01-11" },
  { label: "Privacidad", id: "privacidad", md: privacidadMd, title: "Política de Privacidad", lastUpdate: "2026-01-11" },
  { label: "Legal", id: "legal", md: legalMd, title: "Aviso Legal", lastUpdate: "2026-01-11" },
  { label: "Cookies", id: "cookies", md: cookiesMd, title: "Política de Cookies", lastUpdate: "2026-01-11" },
];

interface LegalContextType {
  openLegal: (tabId: string) => void;
  closeLegal: () => void;
  activeTabId: string;
  isOpen: boolean;
}

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export const LegalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState("terminos");

  const openLegal = (tabId: string) => {
    setActiveTabId(tabId);
    setIsOpen(true);
  };

  const closeLegal = () => setIsOpen(false);

  return (
    <LegalContext.Provider value={{ openLegal, closeLegal, activeTabId, isOpen }}>
      {children}
    </LegalContext.Provider>
  );
};

export const StyledMarkdown: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown
    components={{
      h1: ({ children }) => (
        <h1 className="text-2xl md:text-4xl font-bold mono text-[var(--primary)] uppercase tracking-tighter mb-6 md:mb-10 mt-4 md:mt-6 border-b border-[var(--primary)]/20 pb-4">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-lg md:text-2xl font-bold mono text-white mt-8 md:mt-14 mb-4 md:mb-6 flex items-center gap-3">
          <span className="w-1.5 h-5 md:h-6 bg-[var(--primary)]"></span>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-base md:text-lg font-bold text-[var(--primary)]/90 mt-6 md:mt-10 mb-4 md:mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className="text-[var(--primary)]">&gt;&gt;</span>
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="text-gray-400 text-sm md:text-[17px] leading-relaxed md:leading-[1.8] mb-6 md:mb-10 font-light text-justify">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="space-y-4 md:space-y-6 mb-6 md:mb-12 ml-2 md:ml-4 border-l border-white/5 pl-4 md:pl-8">
          {children}
        </ul>
      ),
      li: ({ children }) => (
        <li className="text-gray-400 text-sm md:text-[16px] flex items-start gap-3">
          <span className="text-[var(--primary)] mt-1.5 text-xs">●</span>
          <span>{children}</span>
        </li>
      ),
      hr: () => <hr className="border-white/5 my-10 md:my-20" />,
      blockquote: ({ children }) => (
        <div className="bg-white/2 border-l-4 border-[var(--primary)] p-4 md:p-8 my-6 md:my-12 rounded-r-2xl backdrop-blur-sm shadow-inner italic text-gray-300 text-sm md:text-base">
          {children}
        </div>
      ),
      strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
      em: ({ children }) => <em className="text-[var(--primary)]/80 italic">{children}</em>,
    }}
  >
    {content}
  </ReactMarkdown>
);

export const useLegal = () => {
  const context = useContext(LegalContext);
  if (!context) throw new Error("useLegal must be used within a LegalProvider");
  return context;
};
