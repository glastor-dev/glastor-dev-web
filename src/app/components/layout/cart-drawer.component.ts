import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { AppStateService } from '../../app-state.service';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ShoppingBag01Icon, Cancel01Icon, Delete01Icon, ShoppingCart01Icon, Settings01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent, A11yModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none" role="dialog" aria-modal="true" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
      
      <!-- Backdrop translucent filter -->
      <div class="absolute inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
           (click)="handleClose()"></div>
      
      <!-- Slide body drawer -->
      <div class="absolute inset-y-0 right-0 max-w-md w-full bg-[#161616] border-l border-zinc-800 shadow-2xl flex flex-col justify-between select-none">
        
        <!-- Header close row -->
        <div class="p-5 border-b border-zinc-800/80 flex items-center justify-between gap-4 bg-zinc-950/50">
          <div class="flex items-center gap-2">
            <hugeicons-icon [icon]="ShoppingBag01Icon" [size]="20" class="text-white scale-95 font-bold" [strokeWidth]="1.5" />
            <h2 class="text-xs font-black uppercase text-white tracking-wider">Cesta de Compra</h2>
          </div>
          
          <button (click)="handleClose()" 
                  class="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer flex items-center justify-center transition-colors">
            <hugeicons-icon [icon]="Cancel01Icon" [size]="20" class="scale-75" [strokeWidth]="1.5" />
          </button>
        </div>

        <!-- Scrollable Items collection -->
        <div class="flex-grow overflow-y-auto p-5 space-y-4">
          @if (appState.cart().length > 0) {
            <div class="space-y-4 text-left">
              @for (item of appState.cart(); track item.product.id) {
                <div class="flex items-start gap-3.5 bg-[#1a1a1a] border border-zinc-800 p-3.5 rounded-lg relative">
                  
                  <img [src]="item.product.image" [alt]="item.product.name" referrerpolicy="no-referrer"
                       class="w-14 h-14 object-cover rounded-lg bg-white shrink-0 border border-zinc-700">

                  <div class="flex-grow min-w-0 space-y-1 pr-8">
                    <h4 class="text-xs font-black text-white tracking-tight leading-tight truncate">{{ item.product.name }}</h4>
                    <span class="block text-[11px] font-mono font-bold text-[#41BF84]">{{ formatPrice(item.product.price) }} u.</span>
                    
                    <!-- Quantity adjustments -->
                    <div class="flex items-center gap-2 pt-1 font-mono text-white">
                      <button (click)="appState.updateQuantity(item.product.id, -1)" 
                              class="w-5 h-5 rounded bg-zinc-800 hover:bg-[#41BF84] hover:text-black flex items-center justify-center text-zinc-300 cursor-pointer font-bold text-xs transition-colors">-</button>
                      <span class="text-xs font-bold px-1">{{ item.quantity }}</span>
                      <button (click)="appState.updateQuantity(item.product.id, 1)" 
                              class="w-5 h-5 rounded bg-zinc-800 hover:bg-[#41BF84] hover:text-black flex items-center justify-center text-zinc-300 cursor-pointer font-bold text-xs transition-colors">+</button>
                    </div>
                  </div>

                  <!-- Item Delete trash icon -->
                  <button (click)="appState.removeFromCart(item.product.id)" 
                          class="absolute top-2.5 right-2.5 w-6 h-6 rounded-md hover:bg-rose-500/10 flex items-center justify-center text-zinc-500 hover:text-rose-500 cursor-pointer transition-colors">
                    <hugeicons-icon [icon]="Delete01Icon" [size]="20" class="scale-75" [strokeWidth]="1.5" />
                  </button>
                </div>
              }
            </div>
          } @else {
            <div class="h-full flex flex-col items-center justify-center p-8 text-center space-y-3.5">
              <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="20" class="text-zinc-800 scale-150" [strokeWidth]="1.5" />
              <h3 class="text-xs font-black uppercase text-white tracking-wider">Tu selección está vacía</h3>
              <p class="text-xs text-zinc-500 max-w-xs leading-normal">
                Descubre la ingeniería que transformará tu espacio.
              </p>
            </div>
          }
        </div>

        <!-- Draw totals summary -->
        <div class="p-5 border-t border-zinc-800/80 bg-zinc-950/50 space-y-4">
          <div class="space-y-2 text-xs text-zinc-400">
            <div class="flex justify-between">
              <span>Subtotal <span class="text-[9px] text-zinc-500 font-bold uppercase tracking-wider ml-1">(IVA 21% INCLUIDO)</span></span>
              <span class="font-mono text-white font-bold">{{ formatPrice(appState.subtotal()) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Envío</span>
              @if (appState.shipping() === 0) {
                <span class="text-[#41BF84] font-bold uppercase text-[10px] tracking-wider">¡Gratuito!</span>
              } @else {
                <span class="font-mono text-white font-bold">{{ formatPrice(appState.shipping()) }}</span>
              }
            </div>
            
            <div class="pt-3 pb-1 mt-1 border-t border-zinc-800 flex justify-between items-center">
              <span class="text-xs font-black text-white uppercase tracking-wider">Total a Pagar</span>
              <span class="font-mono text-base font-black text-[#41BF84]">{{ formatPrice(appState.total()) }}</span>
            </div>
          </div>

          <!-- Checkout actions inside drawer -->
          <button (click)="handleOpenCheckout()" [disabled]="appState.cart().length === 0"
                  class="w-full bg-[#41BF84] hover:bg-white text-black disabled:bg-zinc-800 disabled:text-zinc-500 font-black text-xs py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md uppercase tracking-wider">
            <hugeicons-icon [icon]="Settings01Icon" [size]="20" class="scale-75" [strokeWidth]="1.5" />
            Proceder a mi Orden
          </button>
        </div>

      </div>
    </div>
  `
})
export class CartDrawerComponent {
  appState = inject(AppStateService);

  @Output() closeDrawer = new EventEmitter<void>();
  @Output() openCheckout = new EventEmitter<void>();

  ShoppingBag01Icon = ShoppingBag01Icon;
  Cancel01Icon = Cancel01Icon;
  Delete01Icon = Delete01Icon;
  ShoppingCart01Icon = ShoppingCart01Icon;
  Settings01Icon = Settings01Icon;

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

  handleOpenCheckout() {
    this.openCheckout.emit();
  }
}
