import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <!-- TOP B2B CONTACT BAR -->
  <div class="text-[10px] uppercase font-bold tracking-widest py-1.5 px-6 border-b flex justify-between items-center transition-all z-50 relative"
       [class.bg-zinc-950]="isCinematicGlow"
       [class.border-zinc-850]="isCinematicGlow"
       [class.text-zinc-400]="isCinematicGlow"
       [class.bg-zinc-100]="!isCinematicGlow"
       [class.border-zinc-200]="!isCinematicGlow"
       [class.text-zinc-600]="!isCinematicGlow">
    <div class="hidden md:flex items-center gap-4">
      <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Operaciones en línea</span>
      <span class="opacity-40">|</span>
      <span>Logística Oficial 24/48h</span>
    </div>
    <div class="flex items-center gap-6 mx-auto md:mx-0">
      <a href="tel:+34900123456" class="hover:text-[#41BF84] transition-colors flex items-center gap-1.5 cursor-pointer"><span class="material-icons text-[12px]">phone</span> Asesoramiento Comercial</a>
      <a href="mailto:b2b@glastor.com" class="hover:text-[#41BF84] transition-colors flex items-center gap-1.5 cursor-pointer"><span class="material-icons text-[12px]">email</span> b2b@glastor.com</a>
      <span class="opacity-40 hidden sm:block">|</span>
      <a href="#" class="hover:text-[#41BF84] transition-colors hidden sm:block cursor-pointer">Soporte Técnico Oficial</a>
    </div>
  </div>

  <!-- HEADER NAVIGATION BAR (DOCK GLASSMORPHIC) -->
  <div class="sticky top-4 z-40 px-4 w-full transition-all duration-500">
    <nav [class]="'mx-auto max-w-7xl transition-all duration-500 px-6 py-3 border shadow-lg backdrop-blur-md ' + 
                   (isScrolled ? 'scrolled scale-[0.99] rounded-lg md:rounded-full ' : 'rounded-lg ') + 
                   (isCinematicGlow 
                    ? (isScrolled ? 'bg-black/75 border-zinc-800/80 text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.6)]' : 'bg-zinc-950/85 border-zinc-900/60 text-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,0.4)]') 
                    : (isScrolled ? 'bg-white/80 border-zinc-200/65 text-zinc-900 shadow-[0_12px_40px_rgba(0,0,0,0.06)]' : 'bg-white/95 border-zinc-200/40 text-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.03)]'))">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Brand Identity Logo -->
        <div class="flex items-center justify-between w-full md:w-auto">
          <button (click)="navigate.emit('inicio')" class="flex items-center gap-3 cursor-pointer group text-left">
            <span class="w-10 h-10 flex items-center justify-center transition-all duration-500 overflow-hidden"
                  [class]="isCinematicGlow 
                           ? 'drop-shadow-[0_0_8px_rgba(65,191,132,0.3)]' 
                           : 'drop-shadow-sm'">
              <img src="/assets/logos/isologo-copm.webp" alt="Glastor Isologo" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
            </span>
          </button>

          <!-- Quick Mobile Navigation Icon Controls -->
          <div class="flex items-center gap-2 md:hidden">
            <button (click)="openWishlist.emit()"
                    [class]="'relative p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer border ' + 
                             (isCinematicGlow 
                              ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-100 hover:text-white' 
                              : 'bg-zinc-100 border-zinc-200/50 text-zinc-700 hover:text-zinc-950')"
                    title="Lista de Favoritos">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              @if (wishlistCount > 0) {
                <span class="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-rose-500 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-sm shadow-rose-500/20">
                  {{ wishlistCount }}
                </span>
              }
            </button>

            <button (click)="openCart.emit()"
                    [class]="'relative p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer border ' + 
                             (isCinematicGlow 
                              ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-100 hover:text-white' 
                              : 'bg-zinc-100 border-zinc-200/50 text-zinc-700 hover:text-zinc-950')">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              @if (cartCount > 0) {
                <span class="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] font-black text-zinc-950 shadow-sm shadow-amber-500/20">
                  {{ cartCount }}
                </span>
              }
            </button>
          </div>
        </div>

        <!-- Live Search / Cart trigger -->
        <div class="hidden md:flex items-center gap-4">
          
          <button (click)="openWishlist.emit()"
                  [class]="'group relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 ' + 
                           (isCinematicGlow 
                            ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80' 
                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60')"
                  title="Ver Lista de Favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            @if (wishlistCount > 0) {
              <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-sm shadow-rose-500/40 border-2 border-zinc-950">
                {{ wishlistCount }}
              </span>
            }
          </button>

          <button (click)="openCart.emit()"
                  [class]="'group relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 ' + 
                           (isCinematicGlow 
                            ? 'text-[#41BF84] hover:text-[#41BF84] hover:bg-[#41BF84]/10' 
                            : 'text-zinc-800 hover:text-zinc-950 hover:bg-zinc-200/60')"
                  title="Ver Cesta de Compras">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(65,191,132,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            @if (cartCount > 0) {
              <span [class]="'absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] font-black tracking-tighter shadow-sm border-2 border-zinc-950 ' + 
                              (isCinematicGlow ? 'bg-amber-500 text-zinc-950 shadow-[0_0_10px_rgba(65,191,132,0.4)]' : 'bg-amber-500 text-zinc-950')">
                {{ cartCount }}
              </span>
            }
          </button>

          <button (click)="openMenu.emit()"
                  [class]="'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-95 group ' + 
                           (isCinematicGlow 
                            ? 'bg-amber-600 text-zinc-950 hover:bg-[#41BF84]/200 shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                            : 'bg-zinc-900 text-white hover:bg-zinc-800')"
                  title="Abrir Menú Principal">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="4" height="4" rx="1"/><rect x="10" y="3" width="4" height="4" rx="1"/><rect x="17" y="3" width="4" height="4" rx="1"/><rect x="3" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/><rect x="17" y="10" width="4" height="4" rx="1"/><rect x="3" y="17" width="4" height="4" rx="1"/><rect x="10" y="17" width="4" height="4" rx="1"/><rect x="17" y="17" width="4" height="4" rx="1"/></svg>
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
}
