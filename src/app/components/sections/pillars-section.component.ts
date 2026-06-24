import { Component, inject, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import gsap from 'gsap';

@Component({
  selector: 'app-pillars-section',
  standalone: true,
  imports: [CommonModule],
  template: `
      <!-- SCANDINAVIAN BRAND PILLARS -->
      <section class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Pillar 1: 01. PRECISIÓN -->
        <div [class]="'tilt-card-3d container-3d rounded-lg p-1.5 transition-all duration-300 hover:-translate-y-2 border hover:shadow-2xl ' + 
                       (isCinematicGlow() 
                        ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-amber-500/50 hover:shadow-amber-950/20' 
                        : 'bg-zinc-100/50 border-zinc-200/80 hover:border-amber-600/50 hover:shadow-amber-500/5')">
          <div [class]="(isCinematicGlow() ? 'bg-gradient-to-b from-zinc-950 to-zinc-900 border-zinc-900' : 'bg-white border-zinc-200/80') + ' bezel-core rounded-lg relative overflow-hidden group h-full text-left border flex flex-col min-h-[340px]'">
            
            <div class="p-7.5 md:p-9 space-y-6 flex-1 relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
              <!-- Glossy subtle top highlight -->
              <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="flex items-start justify-between gap-4">
                <span class="flex items-center justify-center text-[#41BF84] font-black transition-transform duration-500 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </span>
                <span class="inline-flex items-center text-[7.5px] font-mono tracking-[0.2em] uppercase font-black px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 select-none">
                  CALIDAD ISO A+
                </span>
              </div>

              <div class="space-y-2.5 relative z-10">
                <h3 [class]="isCinematicGlow() ? 'text-sm font-black text-white uppercase tracking-wider font-mono' : 'text-sm font-black text-zinc-900 uppercase tracking-wider font-mono'">
                  Garantía Certificada
                </h3>
                <p [class]="isCinematicGlow() ? 'text-xs text-zinc-400 leading-relaxed font-sans' : 'text-xs text-zinc-650 leading-relaxed font-sans font-medium'">
                  Componentes importados bajo estrictas directivas de calidad, con manuales técnicos, calibración directa de fábrica y empaque debidamente sellado de origen.
                </p>
              </div>
            </div>

            <!-- Slide-up Data Block -->
            <div class="absolute bottom-0 inset-x-0 translate-y-[calc(100%+1px)] group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
              <div [class]="(isCinematicGlow() ? 'bg-zinc-900 border-t border-zinc-850' : 'bg-white border-t border-zinc-100') + ' p-7.5 md:p-9 pt-5 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.3)]'">
                <div class="grid grid-cols-2 gap-y-3.5 gap-x-2 text-[10px] font-mono">
                  <div class="space-y-1">
                    <span class="block text-zinc-550 uppercase font-bold tracking-wider text-[8px]">Garantía oficial:</span>
                    <span class="flex font-black items-center gap-1" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                      3 Años S.L.
                    </span>
                  </div>
                  <div class="space-y-1">
                    <span class="block text-zinc-550 uppercase font-bold tracking-wider text-[8px]">Procedencia:</span>
                    <span class="flex font-black items-center gap-1" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      Unión Europea
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pillar 2: Soporte Técnico Directo -->
        <div [class]="'tilt-card-3d container-3d rounded-lg p-1.5 transition-all duration-300 hover:-translate-y-2 border hover:shadow-2xl ' + 
                       (isCinematicGlow() 
                        ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-amber-500/50 hover:shadow-amber-950/20' 
                        : 'bg-zinc-100/50 border-zinc-200/80 hover:border-amber-600/50 hover:shadow-amber-500/5')">
          <div [class]="(isCinematicGlow() ? 'bg-gradient-to-b from-zinc-950 to-zinc-900 border-zinc-900' : 'bg-white border-zinc-200/80') + ' bezel-core rounded-lg relative overflow-hidden group h-full text-left border flex flex-col min-h-[340px]'">
            
            <div class="p-7.5 md:p-9 space-y-6 flex-1 relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
              <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-50 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="flex items-start justify-between gap-4">
                <span class="flex items-center justify-center text-[#41BF84] font-black transition-transform duration-500 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></svg>
                </span>
                <span class="inline-flex items-center text-[7.5px] font-mono tracking-[0.2em] uppercase font-black px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 select-none">
                  RESPUESTA 24HS
                </span>
              </div>

              <div class="space-y-2.5">
                <h3 [class]="isCinematicGlow() ? 'text-sm font-black text-white uppercase tracking-wider font-mono' : 'text-sm font-black text-zinc-900 uppercase tracking-wider font-mono'">
                  Soporte Técnico Directo
                </h3>
                <p [class]="isCinematicGlow() ? 'text-xs text-zinc-400 leading-relaxed font-sans' : 'text-xs text-zinc-650 leading-relaxed font-sans font-medium'">
                  Asistencia posventa, repuestos directos y asesoría técnica para instaladores, constructores o empresas de logística. Resolvemos tus dudas en menos de 24 horas.
                </p>
              </div>
            </div>

            <!-- Slide-up Data Block -->
            <div class="absolute bottom-0 inset-x-0 translate-y-[calc(100%+1px)] group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
              <div [class]="(isCinematicGlow() ? 'bg-zinc-900 border-t border-zinc-850' : 'bg-white border-t border-zinc-100') + ' p-7.5 md:p-9 pt-5 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.3)]'">
                <div class="grid grid-cols-2 gap-y-3.5 gap-x-2 text-[10px] font-mono">
                  <div class="space-y-1">
                    <span class="block text-zinc-550 uppercase font-bold tracking-wider text-[8px]">Asistencia:</span>
                    <span class="flex font-black items-center gap-1" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                      Técnica Directa
                    </span>
                  </div>
                  <div class="space-y-1">
                    <span class="block text-zinc-550 uppercase font-bold tracking-wider text-[8px]">Canal Oficial:</span>
                    <span class="flex font-black items-center gap-1" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      Soporte Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pillar 3: Suministro Mayorista Continuo -->
        <div [class]="'tilt-card-3d container-3d rounded-lg p-1.5 transition-all duration-300 hover:-translate-y-2 border hover:shadow-2xl ' + 
                       (isCinematicGlow() 
                        ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-amber-500/50 hover:shadow-amber-950/20' 
                        : 'bg-zinc-100/50 border-zinc-200/80 hover:border-amber-600/50 hover:shadow-amber-505/5')">
          <div [class]="(isCinematicGlow() ? 'bg-gradient-to-b from-zinc-950 to-zinc-900 border-zinc-900' : 'bg-white border-zinc-200/80') + ' bezel-core rounded-lg relative overflow-hidden group h-full text-left border flex flex-col min-h-[340px]'">
            
            <div class="p-7.5 md:p-9 space-y-6 flex-1 relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
              <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="flex items-start justify-between gap-4">
                <span class="flex items-center justify-center text-[#41BF84] font-black transition-transform duration-500 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                </span>
                <span class="inline-flex items-center text-[7.5px] font-mono tracking-[0.2em] uppercase font-black px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 select-none">
                  SUMINISTRO B2B
                </span>
              </div>

              <div class="space-y-2.5">
                <h3 [class]="isCinematicGlow() ? 'text-sm font-black text-white uppercase tracking-wider font-mono' : 'text-sm font-black text-zinc-900 uppercase tracking-wider font-mono'">
                  Suministro Mayorista Continuo
                </h3>
                <p [class]="isCinematicGlow() ? 'text-xs text-zinc-400 leading-relaxed font-sans' : 'text-xs text-zinc-650 leading-relaxed font-sans font-medium'">
                  Fletes optimizados, control dinámico de stock de alto volumen e integración de logística para garantizar que tu ferretería o negocio no pierda ventas por quiebre de stock.
                </p>
              </div>
            </div>

            <!-- Slide-up Data Block -->
            <div class="absolute bottom-0 inset-x-0 translate-y-[calc(100%+1px)] group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
              <div [class]="(isCinematicGlow() ? 'bg-zinc-900 border-t border-zinc-850' : 'bg-white border-t border-zinc-100') + ' p-7.5 md:p-9 pt-5 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.3)]'">
                <div class="grid grid-cols-2 gap-y-3.5 gap-x-2 text-[10px] font-mono">
                  <div class="space-y-1">
                    <span class="block text-zinc-550 uppercase font-bold tracking-wider text-[8px]">Fletes & Portes:</span>
                    <span class="flex font-black items-center gap-1" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="12" x="4" y="2" rx="2"/><path d="M4 8h16"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M4 14h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z"/></svg>
                      Despacho Directo
                    </span>
                  </div>
                  <div class="space-y-1">
                    <span class="block text-zinc-550 uppercase font-bold tracking-wider text-[8px]">Alta prioridad:</span>
                    <span class="flex font-black items-center gap-1" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      Baja Latencia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
  `
})
export class PillarsSectionComponent implements AfterViewInit, OnDestroy {
  private appState = inject(AppStateService);
  private el = inject(ElementRef);
  isCinematicGlow = this.appState.isCinematicGlow;

  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.tilt-card-3d');
      const cleanups: (() => void)[] = [];

      cards.forEach(card => {
        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const x = (e.clientX - centerX) / (rect.width / 2);
          const y = (e.clientY - centerY) / (rect.height / 2);
          
          gsap.to(card, {
            rotateX: -y * 10,
            rotateY: x * 10,
            transformPerspective: 1000,
            duration: 0.4,
            ease: 'power2.out'
          });
        };
        
        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.3)'
          });
        };
        
        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
        
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMouseMove);
          card.removeEventListener('mouseleave', onMouseLeave);
        });
      });

      return () => {
        cleanups.forEach(fn => fn());
      };
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
