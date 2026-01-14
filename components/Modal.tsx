import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0d0d0d] border border-[var(--primary)]/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cyberpunk corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--primary)] -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--primary)] translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--primary)] -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--primary)] translate-x-1 translate-y-1"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-6 bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"></div>
            <h2 className="text-xl md:text-2xl font-bold mono uppercase tracking-wider text-white">
              {title || "Documento"}
            </h2>
          </div>
          <button
            className="group relative p-2 text-gray-400 hover:text-[var(--primary)] transition-colors focus:outline-none"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <span className="text-3xl leading-none">&times;</span>
            <div className="absolute inset-0 border border-transparent group-hover:border-[var(--primary)]/50 rounded transition-all"></div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar bg-[#0a0a0a]">
          <div className="max-w-none">
            {children}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-[var(--primary)] text-black font-bold mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 active:scale-95 shadow-[0_0_15px_var(--primary)]/30"
          >
            Cerrar [ESC]
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Modal;
