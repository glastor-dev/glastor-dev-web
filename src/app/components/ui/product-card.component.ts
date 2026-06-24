import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../portal';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'tilt-card-3d container-3d rounded-lg p-1.5 transition-all duration-300 hover:-translate-y-2 border hover:shadow-2xl ' + 
                   (isCinematicGlow 
                    ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80 hover:shadow-black/30' 
                    : 'bg-zinc-100/50 border-zinc-200/80 hover:border-zinc-300 hover:shadow-zinc-200/40')">
      <article [class]="(isCinematicGlow ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900') + ' bezel-core rounded-lg overflow-hidden h-full flex flex-col text-left group'">
        
        <!-- Product image core frame -->
        <div [class]="'relative aspect-square overflow-hidden shrink-0 ' + (isCinematicGlow ? 'bg-zinc-900/20' : 'bg-zinc-150')">
          <img [src]="product.image" [alt]="product.name" referrerpolicy="no-referrer"
               class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-90">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <!-- Wishlist Toggle overlay -->
          <button (click)="toggleWishlist.emit({id: product.id, event: $event})"
                  [class]="'absolute top-4 right-4 z-10 w-8.5 h-8.5 rounded-full backdrop-blur-xs flex items-center justify-center hover:text-rose-500 shadow-sm transition-all border hover:scale-110 cursor-pointer ' + 
                           (isCinematicGlow 
                            ? 'bg-zinc-900/95 text-zinc-500 border-white/5' 
                            : 'bg-white/95 text-zinc-400 border-black/5')"
                  title="Favorito">
            <span class="material-icons text-sm" [class.text-rose-600]="isInWishlist">
              {{ isInWishlist ? 'favorite' : 'favorite_border' }}
            </span>
          </button>

          <!-- Overlay Badges (Including Low Stock 'Quick Buy' Alerts) -->
          @if ((product.stock > 0 && product.stock <= 5) || (product.badges && product.badges.length > 0)) {
            <div class="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              @if (product.stock > 0 && product.stock <= 5) {
                <span class="bg-[#41BF84]/10 text-[#41BF84] border border-[#41BF84]/20 text-[8px] font-mono font-black uppercase tracking-wider px-2.5 py-1.5 rounded-md shadow-sm flex items-center gap-1.5 select-none max-w-[120px] truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-650 animate-pulse shrink-0"></span>
                  <span class="truncate">QUICK BUY</span>
                </span>
              }
              @if (product.badges && product.badges.length > 0) {
                @for (b of product.badges; track b) {
                  <span class="bg-zinc-950/90 backdrop-blur-sm text-white text-[8px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-md max-w-[120px] truncate">
                    {{ parseBadge(b) }}
                  </span>
                }
              }
            </div>
          }

          <!-- Star Score card badge -->
          <div [class]="'absolute bottom-4 right-4 z-10 backdrop-blur-sm shadow-sm rounded-lg px-2.5 py-1 flex items-center gap-1 border ' + 
                         (isCinematicGlow 
                          ? 'bg-zinc-900/95 border-white/5' 
                          : 'bg-white/95 border-black/5')">
            <span class="material-icons text-[#41BF84] scale-60 font-black">star</span>
            <span [class]="'text-[10px] font-bold font-mono ' + (isCinematicGlow ? 'text-zinc-200' : 'text-zinc-800')">{{ product.rating.toFixed(1) }}</span>
          </div>
        </div>

        <!-- General Meta Details -->
        <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div class="space-y-1.5">
            <span class="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">{{ product.category }}</span>
            <h3 class="text-sm font-black tracking-tight leading-snug group-hover:text-[#41BF84] transition-colors" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">{{ product.name }}</h3>
            <p [class]="'text-xs line-clamp-2 leading-relaxed font-sans ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-600')">{{ stripHtml(product.description) }}</p>
          </div>

          <!-- Price and interaction bar -->
          <div [class]="'pt-3.5 border-t flex items-center justify-between gap-3 ' + (isCinematicGlow ? 'border-zinc-850' : 'border-zinc-100')">
            <div>
              <span class="text-[9px] text-zinc-400 block -mb-0.5 font-bold">PRECIO NETO</span>
              <span class="text-base font-black font-mono" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">{{ formatPrice(product.price) }}</span>
            </div>

            <div class="flex gap-2">
              <button (click)="viewDetails.emit(product.id)"
                      [class]="'px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ' + 
                               (isCinematicGlow 
                                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800' 
                                : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-650 border-transparent')">
                <span class="material-icons scale-75">visibility</span>
                Detalles
              </button>
              <button (click)="addToCart.emit(product)"
                      [class]="'px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-colors ' + 
                               (isCinematicGlow 
                                ? 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950' 
                                : 'bg-zinc-900 hover:bg-zinc-800 text-white')">
                <span class="material-icons scale-75">add_shopping_cart</span>
                Añadir
              </button>
            </div>
          </div>
        </div>

      </article>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isCinematicGlow = true;
  @Input() isInWishlist = false;

  @Output() viewDetails = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() toggleWishlist = new EventEmitter<{id: string, event: Event}>();

  formatPrice(value: number): string {
    if (value == null) return '';
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1];
    if (decimalPart === '00') {
      return `$ ${integerPart}`;
    }
    return `$ ${integerPart},${decimalPart}`;
  }

  parseBadge(badge: string): string {
    if (!badge) return '';
    if (badge.startsWith('{') && badge.endsWith('}')) {
      try {
        const parsed = JSON.parse(badge);
        return parsed.value ? parsed.value : badge;
      } catch (e) {
        return badge;
      }
    }
    return badge;
  }

  stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  }
}
