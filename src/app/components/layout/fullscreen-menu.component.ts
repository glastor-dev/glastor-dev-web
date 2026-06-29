import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Cancel01Icon, ArrowRight01Icon, ArrowUpRight01Icon, LockPasswordIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-fullscreen-menu',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `
    <div class="fixed inset-0 z-[10000] overflow-hidden pointer-events-auto select-none bg-black/60 backdrop-blur-sm flex justify-end items-start pt-20 pr-4 sm:pr-8 sm:pt-24 transition-all duration-500 ease-in-out">
      
      <!-- Black overlay for closing -->
      <div class="absolute inset-0 cursor-pointer" (click)="closeMenu.emit()"></div>

      <!-- Compact Menu Box -->
      <div class="w-full sm:w-[400px] bg-[#1a1a1a] h-full sm:h-auto sm:rounded-2xl flex flex-col p-8 sm:p-10 relative animate-fade-in-down shadow-2xl border border-white/10">
        
        <!-- Close Button (Top Right) -->
        <button (click)="closeMenu.emit()"
                class="magnetic absolute top-6 right-6 group text-white/50 hover:text-white transition-colors cursor-pointer focus:outline-none">
          <hugeicons-icon [icon]="Cancel01Icon" [size]="28" [strokeWidth]="1.5" class="group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <!-- Main Links -->
        <div class="flex flex-col mt-4">
          
          <button (click)="navigate.emit({view: 'inicio'})" 
                  class="magnetic group flex items-center justify-between py-3.5 border-b border-white/10 text-left focus:outline-none transition-colors hover:border-white/30">
            <span class="text-[20px] font-medium tracking-wide uppercase transition-colors group-hover:text-zinc-200"
                  [class.text-[#41BF84]]="currentView === 'inicio'">
              Inicio
            </span>
            <hugeicons-icon [icon]="ArrowRight01Icon" [size]="20" class="text-white/50 group-hover:text-white transition-all transform group-hover:translate-x-1" [strokeWidth]="2" />
          </button>

          <button (click)="navigate.emit({view: 'tienda'})" 
                  class="magnetic group flex items-center justify-between py-3.5 border-b border-white/10 text-left focus:outline-none transition-colors hover:border-white/30">
            <span class="text-[20px] font-medium tracking-wide uppercase transition-colors group-hover:text-zinc-200"
                  [class.text-[#41BF84]]="currentView === 'tienda'">
              Catálogo
            </span>
            <hugeicons-icon [icon]="ArrowRight01Icon" [size]="20" class="text-white/50 group-hover:text-white transition-all transform group-hover:translate-x-1" [strokeWidth]="2" />
          </button>

          <button (click)="navigate.emit({view: 'legales'})" 
                  class="magnetic group flex items-center justify-between py-3.5 border-b border-white/10 text-left focus:outline-none transition-colors hover:border-white/30">
            <span class="text-[20px] font-medium tracking-wide uppercase transition-colors group-hover:text-zinc-200"
                  [class.text-[#41BF84]]="currentView === 'legales'">
              Legales
            </span>
            <hugeicons-icon [icon]="ArrowRight01Icon" [size]="20" class="text-white/50 group-hover:text-white transition-all transform group-hover:translate-x-1" [strokeWidth]="2" />
          </button>



        </div>

        <!-- Footer Section -->


      </div>
    </div>
  `
})
export class FullscreenMenuComponent {
  Cancel01Icon = Cancel01Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  ArrowUpRight01Icon = ArrowUpRight01Icon;
  LockPasswordIcon = LockPasswordIcon;
  
  @Input() isCinematicGlow = true;
  @Input() currentView = 'inicio';
  @Input() activeAdminTab = 'crm';
  @Input() cartCount = 0;

  @Output() closeMenu = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<{view: string, tab?: string}>();
}
