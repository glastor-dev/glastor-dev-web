import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { CallIcon, Mail01Icon, FavouriteIcon, ShoppingCart01Icon, Menu01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `


  <!-- HEADER NAVIGATION BAR (SLEEK & MINIMAL - VUE STYLE) -->
  <div class="sticky top-0 z-40 w-full transition-all duration-500">
    <nav [class]="'w-full px-4 md:px-6 py-2.5 border-b ' + 
                   (isCinematicGlow 
                    ? 'bg-[#1a1a1a] border-white/10 text-zinc-300' 
                    : 'bg-white border-zinc-200 text-zinc-600')">
      <div class="mx-auto flex flex-row items-center justify-between gap-4">
        
        <div class="flex items-center gap-6">
          <!-- Brand Identity Logo -->
          <button (click)="navigate.emit('inicio')" aria-label="Ir a inicio" class="flex items-center gap-2 cursor-pointer group text-left">
            <span class="w-7 h-7 flex items-center justify-center transition-all duration-500 overflow-hidden">
              <img src="/assets/logos/isologo-copm.webp" alt="Glastor Isologo" width="28" height="28" class="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(65,191,132,0.4)]">
            </span>
            <span class="font-bold text-base tracking-tight" [class.text-zinc-100]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">Glastor</span>
          </button>

          <!-- Search Bar Mock (Ctrl K) -->
          <button class="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors"
                  [class]="isCinematicGlow ? 'bg-[#000000]/30 hover:bg-[#000000]/60 border border-white/5' : 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-200'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-zinc-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span class="text-[13px] font-medium text-zinc-400 mr-2">Search</span>
            <span class="text-[10px] font-mono border rounded px-1.5 py-0.5 text-zinc-500" [class]="isCinematicGlow ? 'border-white/10' : 'border-zinc-300'">Ctrl K</span>
          </button>
        </div>

        <div class="flex items-center gap-5">
          <!-- Desktop Navigation Links -->
          <div class="hidden lg:flex items-center gap-5 text-[13px] font-semibold">
            <button (click)="navigate.emit('tienda')" class="hover:text-[#41BF84] transition-colors flex items-center gap-1">Catálogo</button>
            <button (click)="navigate.emit('legales')" class="hover:text-[#41BF84] transition-colors flex items-center gap-1">Legales</button>
            <a href="mailto:ventas@glastor.es" class="hover:text-[#41BF84] transition-colors flex items-center gap-1">Contacto</a>
          </div>

          <!-- Divider -->
          <div class="hidden lg:block w-[1px] h-4 mx-1" [class]="isCinematicGlow ? 'bg-white/10' : 'bg-zinc-300'"></div>

          <!-- Icons Right -->
          <div class="flex items-center gap-4">
            
            <button (click)="openWishlist.emit()" aria-label="Ver Lista de Favoritos"
                    class="relative flex items-center justify-center cursor-pointer transition-colors hover:text-white"
                    title="Ver Lista de Favoritos">
              <hugeicons-icon [icon]="FavouriteIcon" [size]="18" [strokeWidth]="1.5" />
              @if (wishlistCount > 0) {
                <span class="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-[#41BF84] rounded-full flex items-center justify-center text-[9px] font-bold text-black">
                  {{ wishlistCount }}
                </span>
              }
            </button>

            <button (click)="openCart.emit()" aria-label="Ver Cesta de Compras"
                    class="relative flex items-center justify-center cursor-pointer transition-colors hover:text-white"
                    title="Ver Cesta de Compras">
              <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="18" [strokeWidth]="1.5" />
              @if (cartCount > 0) {
                <span class="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] bg-[#41BF84] rounded-full flex items-center justify-center text-[9px] font-bold text-black">
                  {{ cartCount }}
                </span>
              }
            </button>

            <button (click)="openMenu.emit()" aria-label="Abrir Menú Principal"
                    class="lg:hidden flex items-center justify-center transition-colors hover:text-white"
                    title="Abrir Menú Principal">
              <hugeicons-icon [icon]="Menu01Icon" [size]="20" [strokeWidth]="1.5" />
            </button>
          </div>
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
