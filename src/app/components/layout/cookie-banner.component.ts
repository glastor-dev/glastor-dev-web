import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Slim Cookie Banner Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-zinc-800 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">

        <!-- Brand + Message -->
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="w-1 h-10 bg-[#41BF84] rounded-full shrink-0"></div>
          <div class="min-w-0">
            <span class="text-[10px] font-mono font-black uppercase tracking-widest text-[#41BF84] block">GLASTOR® — Aviso de cookies</span>
            <p class="text-[11px] text-zinc-400 leading-snug">
              Usamos cookies propias y de terceros para mejorar tu experiencia y analítica.
              <button (click)="configure.emit()" class="text-zinc-300 underline hover:text-[#41BF84] transition-colors ml-1">Configurar preferencias</button>
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 shrink-0">
          <button (click)="reject.emit()"
                  class="h-8 px-4 rounded-full border border-zinc-700 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors whitespace-nowrap">
            Rechazar
          </button>
          <button (click)="accept.emit()"
                  class="h-8 px-5 rounded-full bg-[#41BF84] text-[11px] font-black text-zinc-950 hover:bg-[#6FDBA8] hover:shadow-[0_0_15px_rgba(65,191,132,0.4)] transition-all whitespace-nowrap">
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  `
})
export class CookieBannerComponent {
  @Output() configure = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();
}
