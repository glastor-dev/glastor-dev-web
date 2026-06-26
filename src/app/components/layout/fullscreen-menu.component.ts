import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Cancel01Icon, LockPasswordIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-fullscreen-menu',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `
    <div class="fixed inset-0 z-[10000] overflow-hidden pointer-events-auto select-none flex flex-col justify-between p-6 md:p-12 transition-all duration-500 ease-in-out"
         [class.bg-[#060608]]="isCinematicGlow"
         [class.text-white]="isCinematicGlow"
         [class.bg-zinc-50]="!isCinematicGlow"
         [class.text-zinc-900]="!isCinematicGlow">

      <!-- Decorative background glow (Awwwards style) -->
      @if (isCinematicGlow) {
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      }

      <!-- Menu Header -->
      <div class="flex justify-between items-center relative z-10 animate-fade-in-down">
        <!-- Logo -->
        <div class="flex flex-col cursor-pointer group" (click)="navigate.emit({view: 'inicio'})">
          <div class="flex items-start">
            <span class="text-xl font-black tracking-[0.25em] uppercase font-display">GLASTOR</span>
            <span class="-ml-1.5 mt-0.5 text-[10px] font-black font-sans" [class]="isCinematicGlow ? 'text-white' : 'text-zinc-400'">®</span>
          </div>
          <span class="text-[8px] font-mono uppercase font-bold tracking-widest" [class]="isCinematicGlow ? 'text-[#41BF84]/70' : 'text-zinc-400'">
            Navegación Interactiva
          </span>
        </div>

        <!-- Close Menu Trigger -->
        <button (click)="closeMenu.emit()"
                class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer shadow-lg active:scale-90 group bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/30"
                title="Cerrar Menú">
          <hugeicons-icon [icon]="Cancel01Icon" [size]="24" [strokeWidth]="1.5" class="select-none scale-125 group-hover:rotate-180 transition-transform duration-700" />
        </button>
      </div>

      <!-- Menu Body (Giant Typography Links) -->
      <div class="flex-grow flex flex-col justify-center items-start space-y-4 md:space-y-6 lg:space-y-8 relative z-10 ml-4 md:ml-12 lg:ml-24">
        
        <button (click)="navigate.emit({view: 'inicio'})" class="group text-left focus:outline-none w-auto overflow-visible">
          <h2 class="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] leading-none font-black uppercase tracking-tighter transition-all duration-500 transform origin-left hover:scale-105 pr-2"
              [class.text-transparent]="isCinematicGlow"
              [class.bg-clip-text]="isCinematicGlow"
              [class.bg-gradient-to-r]="isCinematicGlow"
              [class.from-white]="isCinematicGlow"
              [class.to-zinc-500]="isCinematicGlow"
              [class.hover:from-amber-400]="isCinematicGlow"
              [class.hover:to-amber-600]="isCinematicGlow"
              [class.text-zinc-900]="!isCinematicGlow && currentView === 'inicio'"
              [class.text-zinc-300]="!isCinematicGlow && currentView !== 'inicio'"
              [class.hover:text-zinc-900]="!isCinematicGlow">
            Inicio
          </h2>
        </button>

        <button (click)="navigate.emit({view: 'tienda'})" class="group text-left focus:outline-none w-auto overflow-visible">
          <h2 class="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] leading-none font-black uppercase tracking-tighter transition-all duration-500 transform origin-left hover:scale-105 pr-2"
              [class.text-transparent]="isCinematicGlow"
              [class.bg-clip-text]="isCinematicGlow"
              [class.bg-gradient-to-r]="isCinematicGlow"
              [class.from-white]="isCinematicGlow"
              [class.to-zinc-500]="isCinematicGlow"
              [class.hover:from-amber-400]="isCinematicGlow"
              [class.hover:to-amber-600]="isCinematicGlow"
              [class.text-zinc-900]="!isCinematicGlow && currentView === 'tienda'"
              [class.text-zinc-300]="!isCinematicGlow && currentView !== 'tienda'"
              [class.hover:text-zinc-900]="!isCinematicGlow">
            Catálogo
          </h2>
        </button>

        <button (click)="navigate.emit({view: 'checkout'})" class="group text-left focus:outline-none w-auto overflow-visible flex items-center gap-6">
          <h2 class="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] leading-none font-black uppercase tracking-tighter transition-all duration-500 transform origin-left hover:scale-105 pr-2"
              [class.text-transparent]="isCinematicGlow"
              [class.bg-clip-text]="isCinematicGlow"
              [class.bg-gradient-to-r]="isCinematicGlow"
              [class.from-white]="isCinematicGlow"
              [class.to-zinc-500]="isCinematicGlow"
              [class.hover:from-amber-400]="isCinematicGlow"
              [class.hover:to-amber-600]="isCinematicGlow"
              [class.text-zinc-900]="!isCinematicGlow && currentView === 'checkout'"
              [class.text-zinc-300]="!isCinematicGlow && currentView !== 'checkout'"
              [class.hover:text-zinc-900]="!isCinematicGlow">
            Checkup
          </h2>
          @if (cartCount > 0) {
            <span class="hidden md:flex w-16 h-16 md:w-20 md:h-20 rounded-full bg-rose-600 items-center justify-center text-white text-2xl md:text-4xl font-black shrink-0 animate-pulse">
              {{ cartCount }}
            </span>
          }
        </button>

        <button (click)="navigate.emit({view: 'admin', tab: 'crm'})" class="group text-left focus:outline-none w-auto overflow-visible flex items-center gap-2 md:gap-3">
          <hugeicons-icon [icon]="LockPasswordIcon" [size]="32" [strokeWidth]="1.5" class="text-zinc-500 group-hover:text-[#41BF84] transition-colors" />
          <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-none font-black uppercase tracking-tighter transition-all duration-500 transform origin-left hover:scale-105 pr-2"
              [class.text-transparent]="isCinematicGlow"
              [class.bg-clip-text]="isCinematicGlow"
              [class.bg-gradient-to-r]="isCinematicGlow"
              [class.from-zinc-400]="isCinematicGlow"
              [class.to-zinc-600]="isCinematicGlow"
              [class.hover:from-amber-400]="isCinematicGlow"
              [class.hover:to-amber-600]="isCinematicGlow"
              [class.text-zinc-900]="!isCinematicGlow && currentView === 'admin' && activeAdminTab === 'crm'"
              [class.text-zinc-300]="!isCinematicGlow && (currentView !== 'admin' || activeAdminTab !== 'crm')"
              [class.hover:text-zinc-900]="!isCinematicGlow">
            Portal
          </h2>
        </button>

      </div>
    </div>
  `
})
export class FullscreenMenuComponent {
  Cancel01Icon = Cancel01Icon;
  LockPasswordIcon = LockPasswordIcon;
  @Input() isCinematicGlow = true;
  @Input() currentView = 'inicio';
  @Input() activeAdminTab = 'crm';
  @Input() cartCount = 0;

  @Output() closeMenu = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<{view: string, tab?: string}>();
}
