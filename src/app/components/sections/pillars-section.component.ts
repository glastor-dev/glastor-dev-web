import { Component, inject, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { FeatureCardComponent } from '../ui/design-system/feature-card/feature-card.component';
import gsap from 'gsap';

@Component({
  selector: 'app-pillars-section',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  template: `
      <!-- SCANDINAVIAN BRAND PILLARS -->
      <section class="max-w-7xl mx-auto px-4">
        
        <!-- Section Header -->
        <div class="flex flex-col items-center justify-center text-center mb-16 animate-fade-in-up">
          <div class="h-px bg-[#41BF84] w-12 mb-6"></div>
          <span class="text-[#41BF84] font-mono text-[10px] uppercase font-black tracking-widest mb-2 block">// ESTÁNDARES GLASTOR</span>
          <h2 class="font-sans font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">Pilares de <span class="text-zinc-500">Confianza</span></h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Pillar 1: Garantía Certificada -->
        <app-feature-card class="block" 
                          title="Garantía Certificada" 
                          description="Componentes importados bajo estrictas directivas de calidad, con manuales técnicos, calibración directa de fábrica y empaque debidamente sellado de origen."
                          badgeText="CALIDAD ISO A+">
          <!-- Main Icon -->
          <svg card-icon xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          
          <!-- Metrics Data Block -->
          <ng-container card-metrics>
            <div class="space-y-1">
              <span class="block text-zinc-500 uppercase font-bold tracking-widest text-[10px] font-mono">Garantía oficial:</span>
              <span class="flex font-black items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                3 Años S.L.
              </span>
            </div>
            <div class="space-y-1">
              <span class="block text-zinc-500 uppercase font-bold tracking-widest text-[10px] font-mono">Procedencia:</span>
              <span class="flex font-black items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Unión Europea
              </span>
            </div>
          </ng-container>
        </app-feature-card>

        <!-- Pillar 2: Soporte Técnico Directo -->
        <app-feature-card class="block" 
                          title="Soporte Técnico Directo" 
                          description="Asistencia posventa, repuestos directos y asesoría técnica para instaladores, constructores o empresas de logística. Resolvemos tus dudas en menos de 24 horas."
                          badgeText="RESPUESTA 24HS">
          <!-- Main Icon -->
          <svg card-icon xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></svg>
          
          <!-- Metrics Data Block -->
          <ng-container card-metrics>
            <div class="space-y-1">
              <span class="block text-zinc-500 uppercase font-bold tracking-widest text-[10px] font-mono">Asistencia:</span>
              <span class="flex font-black items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                Técnica Directa
              </span>
            </div>
            <div class="space-y-1">
              <span class="block text-zinc-500 uppercase font-bold tracking-widest text-[10px] font-mono">Canal Oficial:</span>
              <span class="flex font-black items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Soporte Online
              </span>
            </div>
          </ng-container>
        </app-feature-card>

        <!-- Pillar 3: Suministro Mayorista Continuo -->
        <app-feature-card class="block" 
                          title="Suministro Mayorista Continuo" 
                          description="Fletes optimizados, control dinámico de stock de alto volumen e integración de logística para garantizar que tu ferretería o negocio no pierda ventas por quiebre de stock."
                          badgeText="SUMINISTRO B2B">
          <!-- Main Icon -->
          <svg card-icon xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
          
          <!-- Metrics Data Block -->
          <ng-container card-metrics>
            <div class="space-y-1">
              <span class="block text-zinc-500 uppercase font-bold tracking-widest text-[10px] font-mono">Fletes & Portes:</span>
              <span class="flex font-black items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="12" x="4" y="2" rx="2"/><path d="M4 8h16"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M4 14h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z"/></svg>
                Despacho Directo
              </span>
            </div>
            <div class="space-y-1">
              <span class="block text-zinc-500 uppercase font-bold tracking-widest text-[10px] font-mono">Alta prioridad:</span>
              <span class="flex font-black items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#41BF84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Baja Latencia
              </span>
            </div>
          </ng-container>
        </app-feature-card>

        </div>
      </section>
  `
})
export class PillarsSectionComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      // Any other future GSAP animations can go here
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
