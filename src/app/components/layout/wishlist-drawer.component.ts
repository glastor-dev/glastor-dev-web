import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { AppStateService } from '../../app-state.service';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { FavouriteIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { Product } from '../../portal'; // Reusing Product interface

@Component({
  selector: 'app-wishlist-drawer',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent, A11yModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none" role="dialog" aria-modal="true" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
      
      <!-- Backdrop translucent filter -->
      <div class="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity cursor-pointer"
           (click)="handleClose()"></div>
      
      <!-- Slide body drawer -->
      <div class="absolute inset-y-0 right-0 max-w-md w-full bg-[#161616] border-l border-zinc-800 shadow-2xl flex flex-col justify-between select-none">
        
        <!-- Header close row -->
        <div class="p-5 border-b border-zinc-800/80 flex items-center justify-between gap-4 bg-zinc-950/50">
          <div class="flex items-center gap-2">
            <hugeicons-icon [icon]="FavouriteIcon" [size]="20" class="text-rose-500 scale-95 font-bold" [strokeWidth]="1.5" />
            <h2 class="text-xs font-black uppercase text-white tracking-wider">Lista de Favoritos ({{ wishlistCount() }})</h2>
          </div>
          
          <button (click)="handleClose()" 
                  class="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer flex items-center justify-center transition-colors">
            <hugeicons-icon [icon]="Cancel01Icon" [size]="20" class="scale-75" [strokeWidth]="1.5" />
          </button>
        </div>

        <!-- Scrollable Items collection -->
        <div class="flex-grow overflow-y-auto p-5 space-y-4">
          @if (wishlistProducts().length > 0) {
            <div class="space-y-4 text-left font-sans">
              @for (product of wishlistProducts(); track product.id) {
                <div class="flex items-start gap-4 bg-[#1a1a1a] border border-zinc-800 p-4 rounded-lg relative group">
                  
                  <img [src]="product.image" [alt]="product.name" referrerpolicy="no-referrer"
                       class="w-14 h-14 object-cover rounded-lg bg-white shrink-0 border border-zinc-700 cursor-pointer hover:opacity-80 transition-opacity"
                       (click)="handleNavigateDetail(product.id)">

                  <div class="flex-grow min-w-0 space-y-1">
                    <h4 class="text-xs font-black text-white tracking-tight leading-tight truncate cursor-pointer hover:text-[#41BF84] transition-colors"
                        (click)="handleNavigateDetail(product.id)">{{ product.name }}</h4>
                    <span class="block text-[11px] font-mono font-bold text-[#41BF84]">{{ formatPrice(product.price) }}</span>
                    
                    <!-- Quick Actions -->
                    <div class="flex items-center gap-2 pt-2">
                      <button (click)="addToCart(product)"
                              class="bg-[#41BF84] hover:bg-white text-black px-2.5 py-1.5 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors leading-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        Añadir
                      </button>
                      <button (click)="handleNavigateDetail(product.id)"
                              class="bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors leading-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        Ver Ficha
                      </button>
                    </div>
                  </div>

                  <!-- Item Remove heart icon -->
                  <button (click)="appState.toggleWishlist(product.id, $event)" 
                          class="absolute top-2.5 right-2.5 w-6 h-6 rounded-md hover:bg-rose-500/10 flex items-center justify-center text-rose-500 cursor-pointer transition-colors"
                          title="Eliminar de favoritos">
                    <hugeicons-icon [icon]="FavouriteIcon" [size]="20" class="scale-75" [strokeWidth]="1.5" />
                  </button>
                </div>
              }
            </div>
          } @else {
            <div class="h-full flex flex-col items-center justify-center p-8 text-center space-y-3.5">
              <hugeicons-icon [icon]="FavouriteIcon" [size]="20" class="text-zinc-800 scale-150" [strokeWidth]="1.5" />
              <h3 class="text-xs font-black uppercase text-white tracking-wider">No hay favoritos</h3>
              <p class="text-xs text-zinc-500 max-w-xs leading-normal">
                Su lista de deseos se encuentra vacía. Pulse sobre el icono de corazón en cualquiera de nuestras exclusivas piezas del catálogo para guardarla para más tarde.
              </p>
            </div>
          }
        </div>

        <!-- Draw close back-to-boutique notice -->
        <div class="p-5 border-t border-zinc-800/80 bg-zinc-950/50">
          <button (click)="handleClose()"
                  class="w-full bg-transparent border border-zinc-700 hover:border-[#41BF84] text-zinc-400 hover:text-[#41BF84] hover:bg-[#41BF84]/10 font-bold uppercase tracking-wider text-xs py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1">
            <span>Continuar Explorando</span>
          </button>
        </div>

      </div>
    </div>
  `
})
export class WishlistDrawerComponent {
  appState = inject(AppStateService);

  @Output() closeDrawer = new EventEmitter<void>();
  @Output() navigateDetail = new EventEmitter<string>();

  FavouriteIcon = FavouriteIcon;
  Cancel01Icon = Cancel01Icon;

  wishlistCount = computed(() => this.appState.wishlist().length);
  wishlistProducts = computed(() => {
    return this.appState.products().filter((p: Product) => this.appState.wishlist().includes(p.id));
  });

  formatPrice(value: number): string {
    if (value == null) return '';
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] || '00';
    if (decimalPart === '00') {
      return `$ ${integerPart}`;
    }
    return `$ ${integerPart},${decimalPart}`;
  }

  handleClose() {
    this.closeDrawer.emit();
  }

  handleNavigateDetail(productId: string) {
    this.navigateDetail.emit(productId);
  }

  addToCart(product: Product) {
    this.appState.addToCart({ product, quantity: 1 });
  }
}
