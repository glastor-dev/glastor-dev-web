import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';

@Component({
  selector: 'app-icons-of-the-month-section',
  standalone: true,
  imports: [CommonModule],
  template: `
      <!-- CURATED PIECES DISCOVER GRID -->
      <section class="max-w-7xl mx-auto px-4 space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-5">
          <div class="text-left space-y-2">
            <span class="text-[10px] font-mono tracking-widest text-[#41BF84] uppercase font-black block">EQUIPOS DESTACADOS</span>
            <h2 [class]="'text-5xl md:text-[4.5rem] leading-[0.9] font-display font-medium tracking-tight uppercase ' + (isCinematicGlow() ? 'text-white' : 'text-zinc-950')">Productos Estrella del Mes</h2>
            <p class="text-sm md:text-base text-zinc-500 max-w-lg mt-4">Nuestra selección de herramientas y tecnología con la mejor calificación en rendimiento y durabilidad industrial.</p>
          </div>
          <button (click)="onNavigate('tienda')" 
                  class="bg-zinc-900 hover:bg-zinc-850 text-white pl-6 pr-2 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all self-start md:self-auto hover:-translate-y-0.5 shadow-md flex items-center gap-4 cursor-pointer btn-shimmer group whitespace-nowrap w-fit shrink-0">
            <span>Ver catálogo completo</span>
            <span class="shrink-0 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <span class="material-icons text-sm">arrow_forward</span>
            </span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          @for (product of products; track product.id) {
            <div class="relative group rounded-lg flex flex-col bg-black overflow-hidden transition-all duration-300 hover:shadow-2xl hover:z-10" style="min-height: 380px;">
              
              <!-- Top Header (Badge) -->
              <div class="absolute top-5 left-5 right-5 flex justify-end items-center z-20">
                <span class="text-[#2ecc71] text-xs font-semibold tracking-wide drop-shadow-md bg-black/50 px-2 py-0.5 rounded-sm backdrop-blur-sm animate-pulse">
                  {{ parseBadge(product.badges && product.badges.length > 0 ? product.badges[0] : null) }}
                </span>
              </div>

              <!-- Product Image (Full Cover) -->
              <div class="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent z-10"></div>
                <img [src]="product.image" [alt]="product.name" referrerpolicy="no-referrer"
                     class="w-full h-full object-cover group-hover:scale-110 opacity-80 group-hover:opacity-100 transition-all duration-1000">
              </div>

              <!-- Bottom Drawer Section -->
              <div class="absolute bottom-0 left-0 w-full bg-[#2a2a2c]/90 backdrop-blur-md rounded-b-lg p-6 flex flex-col justify-start transition-all duration-500 ease-in-out h-[85px] group-hover:h-[150px] z-20">
                
                <!-- Title & Heart -->
                <div class="flex justify-between items-center w-full">
                  <h3 class="text-white text-lg font-bold truncate pr-4">{{ product.name }}</h3>
                  <button (click)="onToggleWishlist(product.id, $event)" class="text-white hover:text-rose-500 transition-colors shrink-0">
                    <span class="material-icons text-[18px]" [class.text-rose-500]="wishlist.includes(product.id)">
                      {{ wishlist.includes(product.id) ? 'favorite' : 'favorite_border' }}
                    </span>
                  </button>
                </div>

                <!-- Hidden Details (Revealed on Hover) -->
                <div class="flex justify-between items-end w-full mt-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <span class="text-white text-xl font-medium tracking-wide">{{ formatPrice(product.price) }}</span>
                  <button (click)="onAddToCart(product)"
                          class="flex items-center justify-center border border-white text-white rounded-full w-9 h-9 hover:bg-emerald-400 hover:border-emerald-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 active:bg-emerald-600 shadow-[0_0_0_rgba(52,211,153,0)] hover:shadow-[0_0_15px_rgba(52,211,153,0.6)]">
                    <span class="material-icons text-[18px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
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
