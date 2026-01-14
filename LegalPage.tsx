import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LegalTabs from "./components/LegalTabs";

const LegalPage: React.FC<{ tab?: string }> = ({ tab }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      {/* Breadcrumbs / Back button */}
      <div className="max-w-4xl mx-auto mb-8 reveal">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-gray-500 hover:text-[var(--primary)] transition-colors mono text-xs uppercase tracking-widest"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          regresar_al_inicio.exe
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        <LegalTabs initialTab={tab} />
      </div>
    </div>
  );
};

export default LegalPage;
