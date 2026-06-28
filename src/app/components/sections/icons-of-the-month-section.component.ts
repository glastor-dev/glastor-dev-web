import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ShoppingCart01Icon, FavouriteIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { GlassCardComponent } from '../ui/design-system/glass-card/glass-card.component';

@Component({
  selector: 'app-icons-of-the-month-section',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent, GlassCardComponent],
  template: `
      <!-- CURATED PIECES DISCOVER GRID -->
      <section class="max-w-7xl mx-auto px-4 space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-5">
          <div class="text-left space-y-2">
            <span class="text-[10px] font-mono tracking-widest text-[#41BF84] uppercase font-black block">EQUIPOS DESTACADOS</span>
            <h2 [class]="'text-5xl md:text-[4.5rem] leading-[0.9] font-medium tracking-tight uppercase ' + (isCinematicGlow() ? 'text-white' : 'text-zinc-950')">Productos Estrella del Mes</h2>
            <p class="text-sm md:text-base text-zinc-500 max-w-lg mt-4">Nuestra selección de herramientas y tecnología con la mejor calificación en rendimiento y durabilidad industrial.</p>
          </div>
          <button (click)="onNavigate('tienda')" 
                  class="bg-zinc-900 hover:bg-zinc-850 text-white pl-6 pr-2 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all self-start md:self-auto hover:-translate-y-0.5 shadow-md flex items-center gap-4 cursor-pointer btn-shimmer group whitespace-nowrap w-fit shrink-0">
            <span>Ver catálogo completo</span>
            <span class="shrink-0 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <hugeicons-icon [icon]="ArrowRight01Icon" [size]="18"  [strokeWidth]="1.5" />
            </span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          @for (product of products; track product.id) {
            <app-glass-card
              [product]="product"
              [isWishlisted]="wishlist.includes(product.id)"
              (onAddToCart)="onAddToCart(product)"
              (onToggleWishlist)="onToggleWishlist(product.id, $event.event)">
            </app-glass-card>
          }
        </div>
      </section>
  `
})
export class IconsOfTheMonthSectionComponent {
  formatPrice(value: number): string {
    if (value == null) return '';
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1];
    if (decimalPart === '00') return `$ ${integerPart}`;
    return `$ ${integerPart},${decimalPart}`;
  }
  private appState = inject(AppStateService);
  isCinematicGlow = this.appState.isCinematicGlow;

  @Input() products: any[] = [];
  @Input() wishlist: string[] = [];

  @Output() navigate = new EventEmitter<{view: string, id?: string}>();
  @Output() addToCart = new EventEmitter<any>();
  @Output() toggleWishlist = new EventEmitter<{id: string, event: Event}>();

  ShoppingCart01Icon = ShoppingCart01Icon;
  FavouriteIcon = FavouriteIcon;
  ArrowRight01Icon = ArrowRight01Icon;

  parseBadge(badgeStr: string | null): string {
    if (!badgeStr) return 'TOP VENTAS';
    try {
      const parsed = JSON.parse(badgeStr);
      return parsed.value || badgeStr;
    } catch {
      return badgeStr;
    }
  }

  onNavigate(view: string, id?: string) {
    this.navigate.emit({view, id});
  }

  onAddToCart(product: any) {
    this.addToCart.emit(product);
  }

  onToggleWishlist(id: string, event: Event) {
    this.toggleWishlist.emit({id, event});
  }
}
