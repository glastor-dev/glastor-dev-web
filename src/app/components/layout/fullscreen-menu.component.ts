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

          <button (click)="navigate.emit({view: 'checkout'})" 
                  class="magnetic group flex items-center justify-between py-3.5 border-b border-white/10 text-left focus:outline-none transition-colors hover:border-white/30">
            <div class="flex items-center gap-3">
              <span class="text-[20px] font-medium tracking-wide uppercase transition-colors group-hover:text-zinc-200"
                    [class.text-[#41BF84]]="currentView === 'checkout'">
                Checkup
              </span>
              @if (cartCount > 0) {
                <span class="bg-[#41BF84] text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  {{ cartCount }}
                </span>
              }
            </div>
            <hugeicons-icon [icon]="ArrowRight01Icon" [size]="20" class="text-white/50 group-hover:text-white transition-all transform group-hover:translate-x-1" [strokeWidth]="2" />
          </button>



        </div>

        <!-- Footer Section -->
        <div class="flex flex-col space-y-6 mt-8">
          
          <!-- Small Links -->
          <div class="flex items-center justify-center gap-6 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <a href="#" class="group flex items-center gap-1.5 hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
              Privacy <hugeicons-icon [icon]="ArrowRight01Icon" [size]="12" [strokeWidth]="2" />
            </a>
            <a href="#" class="group flex items-center gap-1.5 hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
              Políticas <hugeicons-icon [icon]="ArrowRight01Icon" [size]="12" [strokeWidth]="2" />
            </a>
          </div>

          <!-- Bottom bar: Toggle & Socials -->
          <div class="flex items-center justify-between pt-2">
            <!-- Mock Toggle Switch -->
            <button class="w-[42px] h-[22px] border border-white/20 rounded-full p-1 cursor-pointer transition-colors"
                    [class.bg-[#41BF84]]="isCinematicGlow"
                    [class.border-[#41BF84]]="isCinematicGlow"
                    (click)="isCinematicGlow = !isCinematicGlow"
                    title="Toggle Theme">
              <div class="w-[12px] h-[12px] rounded-full shadow-md transform transition-transform duration-300"
                   [class.translate-x-[20px]]="isCinematicGlow"
                   [class.bg-white]="isCinematicGlow"
                   [class.bg-zinc-400]="!isCinematicGlow"></div>
            </button>

            <!-- Socials (Using raw SVGs for Github, Mail, Whatsapp) -->
            <div class="flex items-center gap-5 text-white">
              <a href="#" class="hover:text-zinc-400 transition-colors hover:scale-110 transform" aria-label="GitHub">
                <!-- GitHub -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="#" class="hover:text-zinc-400 transition-colors hover:scale-110 transform" aria-label="Mail">
                <!-- Mail -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a href="#" class="hover:text-zinc-400 transition-colors hover:scale-110 transform" aria-label="WhatsApp">
                <!-- WhatsApp -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.84.485 3.593 1.406 5.15L2 22l4.97-1.306A9.98 9.98 0 0012.031 22c5.541 0 10.031-4.49 10.031-10.031C22.062 6.49 17.572 2 12.031 2zm5.412 14.542c-.22.617-1.272 1.182-1.745 1.258-.432.069-1.002.132-3.155-.762-2.585-1.074-4.225-3.69-4.354-3.863-.129-.172-1.04-1.385-1.04-2.64 0-1.255.654-1.874.887-2.124.232-.25.503-.314.67-.314.167 0 .334.004.479.011.155.008.361-.06.565.434.209.505.714 1.743.777 1.871.063.129.105.281.02.45-.084.17-.128.275-.255.422-.128.147-.27.32-.387.43-.129.117-.266.248-.124.494.143.247.636 1.053 1.365 1.7.937.832 1.722 1.09 1.968 1.21.247.12.391.099.537-.067.147-.168.636-.74.806-.995.17-.254.34-.213.565-.128.225.084 1.424.671 1.667.792.243.121.405.18.464.281.059.101.059.584-.161 1.201z"/></svg>
              </a>
            </div>
          </div>

        </div>

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
