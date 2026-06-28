import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { CallIcon, Mail01Icon, FavouriteIcon, ShoppingCart01Icon, Menu01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `
  <!-- TOP B2B CONTACT BAR -->
  <div class="text-[9px] font-mono uppercase tracking-widest py-1.5 px-6 border-b flex justify-between items-center transition-all z-50 relative"
       [class.bg-[#050505]]="isCinematicGlow"
       [class.border-white/5]="isCinematicGlow"
       [class.text-zinc-500]="isCinematicGlow"
       [class.bg-zinc-100]="!isCinematicGlow"
       [class.border-zinc-200]="!isCinematicGlow"
       [class.text-zinc-500]="!isCinematicGlow">
    <div class="hidden md:flex items-center gap-4">
      <span class="flex items-center gap-2">
        <span class="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#41BF84]/10 border border-[#41BF84]/30 text-[#41BF84] shadow-[0_0_10px_rgba(0,255,102,0.15)]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#41BF84] animate-pulse"></span> 
          <span>Operaciones en línea</span>
        </span>
      </span>
      <span class="text-zinc-800">/</span>
      <span class="hover:text-zinc-300 transition-colors cursor-default">Logística Oficial 24/48h</span>
    </div>
    <div class="flex items-center gap-5 mx-auto md:mx-0">
      <a href="tel:+34900123456" class="group hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
        <hugeicons-icon [icon]="CallIcon" [size]="12" [strokeWidth]="2" class="group-hover:text-[#41BF84] group-hover:drop-shadow-[0_0_8px_rgba(0,255,102,0.8)] transition-all" /> 
        <span>Asesoramiento Comercial</span>
      </a>
      <a href="mailto:b2b@glastor.com" class="group hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
        <hugeicons-icon [icon]="Mail01Icon" [size]="12" [strokeWidth]="2" class="group-hover:text-[#41BF84] group-hover:drop-shadow-[0_0_8px_rgba(0,255,102,0.8)] transition-all" /> 
        <span>b2b@glastor.com</span>
      </a>
      <span class="text-zinc-800 hidden sm:block">/</span>
      <a href="#" class="group hover:text-white transition-colors hidden sm:flex items-center gap-2 cursor-pointer">
        <span class="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-[#41BF84] transition-colors"></span>
        <span>Soporte Técnico Oficial</span>
      </a>
    </div>
  </div>

  <!-- HEADER NAVIGATION BAR (DOCK GLASSMORPHIC) -->
  <div class="sticky top-4 z-40 px-4 w-full transition-all duration-500">
    <nav [class]="'mx-auto max-w-7xl transition-all duration-500 px-6 py-3 border shadow-lg backdrop-blur-xl ' + 
                   (isScrolled ? 'scrolled scale-[0.99] rounded-lg md:rounded-full ' : 'rounded-lg ') + 
                   (isCinematicGlow 
                    ? (isScrolled ? 'bg-[#050505]/75 border-white/10 text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.8)]' : 'bg-[#050505]/90 border-white/5 text-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,0.6)]') 
                    : (isScrolled ? 'bg-white/80 border-zinc-200/65 text-zinc-900 shadow-[0_12px_40px_rgba(0,0,0,0.06)]' : 'bg-white/95 border-zinc-200/40 text-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.03)]'))">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Brand Identity Logo -->
        <div class="flex items-center justify-between w-full md:w-auto">
          <button (click)="navigate.emit('inicio')" class="flex items-center gap-3 cursor-pointer group text-left">
            <span class="w-10 h-10 flex items-center justify-center transition-all duration-500 overflow-hidden"
                  [class]="isCinematicGlow 
                           ? 'drop-shadow-[0_0_8px_rgba(0,255,102,0.3)]' 
                           : 'drop-shadow-sm'">
              <img src="/assets/logos/isologo-copm.webp" alt="Glastor Isologo" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
            </span>
          </button>

          <!-- Quick Mobile Navigation Icon Controls -->
          <div class="flex items-center gap-2 md:hidden">
            <button (click)="openWishlist.emit()"
                    [class]="'relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ' + 
                             (isCinematicGlow 
                              ? 'bg-[#050505] border-[#ff0055]/30 text-zinc-400 hover:text-white hover:border-[#ff0055]' 
                              : 'bg-zinc-100 border-zinc-200/50 text-zinc-700 hover:text-zinc-950')"
                    title="Lista de Favoritos">
              <hugeicons-icon [icon]="FavouriteIcon" [size]="20" [strokeWidth]="1.5" class="group-hover:drop-shadow-[0_0_8px_rgba(255,0,85,0.6)] text-[#ff0055]" />
              @if (wishlistCount > 0) {
                <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#050505] border border-[#ff0055] rounded-full flex items-center justify-center text-[9px] font-mono font-black text-white shadow-[0_0_10px_rgba(255,0,85,0.4)]">
                  {{ wishlistCount }}
                </span>
              }
            </button>

            <button (click)="openCart.emit()"
                    [class]="'relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ' + 
                             (isCinematicGlow 
                              ? 'bg-[#050505] border-[#41BF84]/30 text-zinc-400 hover:text-white hover:border-[#41BF84]' 
                              : 'bg-zinc-100 border-zinc-200/50 text-zinc-700 hover:text-zinc-950')">
              <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="20" [strokeWidth]="1.5" class="group-hover:drop-shadow-[0_0_8px_rgba(0,255,102,0.6)] text-[#41BF84]" />
              @if (cartCount > 0) {
                <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#050505] border border-[#41BF84] rounded-full flex items-center justify-center text-[9px] font-mono font-black text-white shadow-[0_0_10px_rgba(0,255,102,0.4)]">
                  {{ cartCount }}
                </span>
              }
            </button>
          </div>
        </div>

        <!-- Live Search / Cart trigger -->
        <div class="hidden md:flex items-center gap-4">
          
          <button (click)="openWishlist.emit()"
                  [class]="'group relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 border ' + 
                           (isCinematicGlow 
                            ? 'bg-[#050505]/40 border-white/5 text-zinc-400 hover:text-white hover:bg-[#050505] hover:border-[#ff0055]/50' 
                            : 'bg-transparent border-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60')"
                  title="Ver Lista de Favoritos">
            <hugeicons-icon [icon]="FavouriteIcon" [size]="20" [strokeWidth]="1.5" class="text-[#ff0055] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,0,85,0.4)]" />
            @if (wishlistCount > 0) {
              <span class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#050505] border border-[#ff0055] rounded-full flex items-center justify-center text-[9px] font-mono font-black text-[#ff0055] shadow-[0_0_10px_rgba(255,0,85,0.4)] animate-pulse">
                {{ wishlistCount }}
              </span>
            }
          </button>

          <button (click)="openCart.emit()"
                  [class]="'group relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 border ' + 
                           (isCinematicGlow 
                            ? 'bg-[#050505]/40 border-white/5 text-[#41BF84] hover:text-[#41BF84] hover:bg-[#050505] hover:border-[#41BF84]/50' 
                            : 'bg-transparent border-transparent text-zinc-800 hover:text-zinc-950 hover:bg-zinc-200/60')"
                  title="Ver Cesta de Compras">
            <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="20" [strokeWidth]="1.5" class="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]" />
            @if (cartCount > 0) {
              <span [class]="'absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-mono font-black border ' + 
                              (isCinematicGlow ? 'bg-[#050505] border-[#41BF84] text-[#41BF84] shadow-[0_0_10px_rgba(0,255,102,0.4)] animate-pulse' : 'bg-[#41BF84] border-zinc-950 text-zinc-950')">
                {{ cartCount }}
              </span>
            }
          </button>

          <button (click)="openMenu.emit()"
                  [class]="'relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95 group border ' + 
                           (isCinematicGlow 
                            ? 'bg-[#050505] border-[#41BF84]/30 text-white hover:bg-[#41BF84]/10 hover:border-[#41BF84] hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]' 
                            : 'bg-zinc-900 border-transparent text-white hover:bg-zinc-800')"
                  title="Abrir Menú Principal">
            <hugeicons-icon [icon]="Menu01Icon" [size]="20" [strokeWidth]="2" class="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,255,102,0.6)] group-hover:text-[#41BF84] transition-all duration-500" />
          </button>

        </div>
      </div>
    </nav>
  </div>
  `
})
export class NavbarComponent {
  @Input() isCinematicGlow = true;
  @Input() isScrolled = false;
  @Input() wishlistCount = 0;
  @Input() cartCount = 0;

  @Output() openMenu = new EventEmitter<void>();
  @Output() openCart = new EventEmitter<void>();
  @Output() openWishlist = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

  CallIcon = CallIcon;
  Mail01Icon = Mail01Icon;
  FavouriteIcon = FavouriteIcon;
  ShoppingCart01Icon = ShoppingCart01Icon;
  Menu01Icon = Menu01Icon;
}
