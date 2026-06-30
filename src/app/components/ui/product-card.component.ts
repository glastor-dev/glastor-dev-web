import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../portal';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { FavouriteIcon, StarIcon, ViewIcon, ShoppingCart01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent, NgOptimizedImage],
  template: `
    <div [class]="'tilt-card-3d container-3d rounded-lg p-1.5 transition-all duration-300 hover:-translate-y-2 border hover:shadow-2xl ' + 
                   (isCinematicGlow 
                    ? 'bg-[#050505]/40 border-white/5 hover:border-[#41BF84]/30 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]' 
                    : 'bg-zinc-100/50 border-zinc-200/80 hover:border-zinc-300 hover:shadow-zinc-200/40')">
      <article [class]="(isCinematicGlow ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900') + ' bezel-core rounded-lg overflow-hidden h-full flex flex-col text-left group'">
        
        <!-- Product image core frame -->
        <div [class]="'relative aspect-video overflow-hidden shrink-0 ' + (isCinematicGlow ? 'bg-[#050505]' : 'bg-zinc-150')">
          <img [ngSrc]="product.image" [alt]="product.name" width="400" height="225" referrerpolicy="no-referrer"
               class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <!-- Wishlist Toggle overlay -->
          <button (click)="toggleWishlist.emit({id: product.id, event: $event})"
                  [class]="'absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:text-rose-500 transition-all hover:scale-110 cursor-pointer border ' + 
                           (isCinematicGlow 
                            ? 'bg-[#050505]/40 backdrop-blur-md border-white/10 text-white hover:border-rose-500/50 hover:bg-[#050505]/80' 
                            : 'bg-white/80 backdrop-blur-md border-zinc-200 text-zinc-700 hover:border-rose-500/30')"
                  title="Favorito">
            <hugeicons-icon [icon]="FavouriteIcon" [size]="16" [strokeWidth]="isInWishlist ? 2.5 : 2" [class.text-rose-600]="isInWishlist" />
          </button>

          <!-- Overlay Badges (Including Low Stock 'Quick Buy' Alerts) -->
          @if ((product.stock > 0 && product.stock <= 5) || (product.badges && product.badges.length > 0)) {
            <div class="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              @if (product.stock > 0 && product.stock <= 5) {
                <span class="bg-[#41BF84]/10 backdrop-blur-md text-[#41BF84] border border-[#41BF84]/30 text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(0,255,102,0.15)] flex items-center gap-1.5 select-none max-w-[120px] truncate">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#41BF84] animate-pulse shrink-0"></span>
                  <span class="truncate">QUICK BUY</span>
                </span>
              }
              @if (product.badges && product.badges.length > 0) {
                @for (b of product.badges; track b) {
                  <span class="bg-[#050505]/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-md max-w-[120px] truncate shadow-sm">
                    {{ parseBadge(b) }}
                  </span>
                }
              }
            </div>
          }

          <!-- Star Score card badge -->
          <div [class]="'absolute bottom-4 right-4 z-10 shadow-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 border ' + 
                         (isCinematicGlow 
                          ? 'bg-[#050505]/50 backdrop-blur-md border-white/10' 
                          : 'bg-white/95 border-black/5')">
            <hugeicons-icon [icon]="StarIcon" [size]="12" class="text-[#41BF84]"  [strokeWidth]="2" />
            <span [class]="'text-[9px] font-bold font-mono ' + (isCinematicGlow ? 'text-zinc-200' : 'text-zinc-800')">{{ displayRating }}</span>
          </div>
        </div>

        <!-- General Meta Details -->
        <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div class="space-y-1.5">
            <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">{{ product.category }}</span>
            <h3 class="text-sm font-black tracking-tight leading-snug group-hover:text-[#41BF84] transition-colors" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">{{ product.name }}</h3>
          </div>

          <!-- Price and interaction bar -->
          <div [class]="'pt-3.5 border-t flex flex-wrap items-end justify-between gap-2 ' + (isCinematicGlow ? 'border-white/5' : 'border-zinc-100')">
            <div class="shrink-0 max-w-[45%]">
              <span class="text-[10px] text-zinc-400 block -mb-0.5 font-bold font-mono tracking-widest uppercase">PRECIO NETO</span>
              <span class="text-sm font-black font-mono truncate block" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">{{ formatPrice(product.price) }}</span>
            </div>

            <div class="flex gap-1.5 shrink-0 ml-auto">
              <button (click)="viewDetails.emit(product.id)"
                      [class]="'px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer border ' + 
                               (isCinematicGlow 
                                ? 'bg-transparent hover:bg-white/5 text-zinc-300 border-white/10 hover:border-white/30' 
                                : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-650 border-transparent')">
                <hugeicons-icon [icon]="ViewIcon" [size]="14"  [strokeWidth]="1.5" />
                Ver
              </button>
              <button (click)="addToCart.emit(product)"
                      [class]="'px-2.5 py-1.5 rounded-md text-[11px] font-black flex items-center gap-1 cursor-pointer transition-colors ' + 
                               (isCinematicGlow 
                                ? 'bg-[#41BF84] hover:bg-[#359f6b] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]' 
                                : 'bg-zinc-900 hover:bg-zinc-800 text-white')">
                <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="14"  [strokeWidth]="1.5" />
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
  FavouriteIcon = FavouriteIcon;
  StarIcon = StarIcon;
  ViewIcon = ViewIcon;
  ShoppingCart01Icon = ShoppingCart01Icon;

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

  get displayRating(): string {
    if (this.product.rating && this.product.rating !== 4.5) {
      return this.product.rating.toFixed(1);
    }
    let hash = 0;
    if (this.product.id) {
      for (let i = 0; i < this.product.id.length; i++) {
        hash += this.product.id.charCodeAt(i);
      }
    }
    const pseudoRandom = 4.0 + ((hash % 11) / 10.0); 
    return pseudoRandom.toFixed(1);
  }
}
