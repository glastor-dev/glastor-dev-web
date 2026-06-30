import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NeonBadgeComponent } from '../neon-badge/neon-badge.component';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ShoppingCart01Icon, FavouriteIcon } from '@hugeicons/core-free-icons';
import { ParallaxDirective } from '../../../../directives/parallax.directive';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule, NeonBadgeComponent, HugeiconsIconComponent, ParallaxDirective, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative group rounded-lg flex flex-col bg-[#050505] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:z-10" style="min-height: 380px;">
      
      <!-- Top Header (Neon Badge) -->
      <div class="absolute top-5 left-5 right-5 flex justify-end items-center z-20">
        <app-neon-badge [text]="parseBadge(product.badges && product.badges.length > 0 ? product.badges[0] : null)"></app-neon-badge>
      </div>

      <!-- Product Image (Full Cover with Vignette) -->
      <div class="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] z-0">
        <!-- Top shadow for badge visibility -->
        <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
        <!-- Bottom shadow for text visibility -->
        <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none"></div>
        
        <div class="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute" [appParallax]="40">
          <img [ngSrc]="product.image" [alt]="product.name" fill referrerpolicy="no-referrer"
               class="object-cover group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out">
        </div>
      </div>

      <!-- Bottom Drawer Section (Glassmorphism) -->
      <!-- The drawer slides up on hover using GSAP-like CSS spring transitions -->
      <div class="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-xl border-t border-white/10 rounded-b-lg p-6 flex flex-col justify-start transition-all duration-[400ms] cubic-bezier-[0.25,1,0.5,1] h-[85px] group-hover:h-[150px] z-20">
        
        <!-- Title & Heart -->
        <div class="flex justify-between items-center w-full">
          <h3 class="text-white text-lg font-bold truncate pr-4 drop-shadow-md">{{ product.name }}</h3>
          <button (click)="onToggleWishlist.emit({ id: product.id, event: $event })" class="text-white hover:text-rose-500 transition-colors shrink-0">
            <hugeicons-icon [icon]="FavouriteIcon" [size]="18" [class.text-rose-500]="isWishlisted" [strokeWidth]="1.5" />
          </button>
        </div>

        <!-- Hidden Details (Revealed on Hover) -->
        <div class="flex justify-between items-end w-full mt-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
          <span class="text-[#41BF84] drop-shadow-[0_0_8px_rgba(0,255,102,0.3)] text-xl font-medium tracking-wide">{{ formatPrice(product.price) }}</span>
          
          <button (click)="onAddToCart.emit(product)"
                  class="flex items-center justify-center border border-white/20 bg-white/5 text-white rounded-full w-10 h-10 hover:bg-[#41BF84] hover:border-[#41BF84] hover:text-black transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]">
            <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="18" [strokeWidth]="2" />
          </button>
        </div>
      </div>
    </div>
  `
})
export class GlassCardComponent {
  @Input({ required: true }) product!: any;
  @Input() isWishlisted: boolean = false;

  @Output() onAddToCart = new EventEmitter<any>();
  @Output() onToggleWishlist = new EventEmitter<{id: string, event: Event}>();

  ShoppingCart01Icon = ShoppingCart01Icon;
  FavouriteIcon = FavouriteIcon;

  formatPrice(value: number): string {
    if (value == null) return '';
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1];
    if (decimalPart === '00') return `$ ${integerPart}`;
    return `$ ${integerPart},${decimalPart}`;
  }

  parseBadge(badgeStr: string | null): string {
    if (!badgeStr) return 'TOP VENTAS';
    try {
      const parsed = JSON.parse(badgeStr);
      return parsed.length > 0 ? parsed[0].toUpperCase() : 'TOP VENTAS';
    } catch {
      return badgeStr.toUpperCase();
    }
  }
}
