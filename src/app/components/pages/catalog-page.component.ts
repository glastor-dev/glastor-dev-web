import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProductCardComponent } from '../ui/product-card.component';
import { Product } from '../../portal';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Search01Icon, ArrowDown01Icon, SearchRemoveIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent, HugeiconsIconComponent],
  template: `
    <main class="max-w-7xl mx-auto px-4 py-10 space-y-8 page-transition">
      
      <!-- Catalog Introduction page title -->
      <div class="text-left space-y-4 md:space-y-6 md:pb-8">
        <h1 [class]="'text-5xl md:text-7xl lg:text-[6rem] font-display font-medium tracking-tight uppercase leading-[0.9] ' + (isCinematicGlow ? 'text-white' : 'text-zinc-950')">
          Catálogo <span class="inline-flex items-start">GLASTOR<span class="text-[0.4em] mt-[0.1em] ml-1 font-black">®</span></span> Megastore
        </h1>
        <p [class]="'text-sm md:text-lg max-w-2xl leading-relaxed ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-500')">
          Nuestra selección premium de tecnología, componentes de computación avanzados y herramientas industriales para profesionales. Filtra por categoría o realiza búsquedas dinámicas en tiempo real.
        </p>
      </div>

      <!-- FILTER & SEARCH BAR BLOCK -->
      <div [class]="'border rounded-lg p-5 md:p-6 space-y-5 text-left ' + 
                     (isCinematicGlow ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200/60 shadow-sm')">
        
        <!-- Live Input search control (Full width) -->
        <div class="relative w-full">
          <hugeicons-icon [icon]="Search01Icon" [size]="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"  [strokeWidth]="1.5" />
          <input type="text" [formControl]="searchControl" placeholder="Buscar en el catálogo (Makita, iPhone, AMD, etc)..."
                 [class]="'w-full border rounded-xl pl-12 pr-4 py-3.5 text-sm font-semibold focus:outline-none transition-all ' + 
                          (isCinematicGlow 
                           ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 focus:border-amber-500/50 text-white placeholder:text-zinc-600 shadow-inner' 
                           : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-400 text-zinc-900 placeholder:text-zinc-400')">
        </div>

        <!-- Scrollable Category pills selection -->
        <div class="flex overflow-x-auto whitespace-nowrap hide-scrollbar gap-2 pb-2">
          <button (click)="categoryChange.emit('todos')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory === 'todos' 
                            ? (isCinematicGlow ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Todos
          </button>
          <button (click)="categoryChange.emit('tecnologia')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory === 'tecnologia' 
                            ? (isCinematicGlow ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Tecnología
          </button>
          <button (click)="categoryChange.emit('herramientas')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory === 'herramientas' 
                            ? (isCinematicGlow ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Herramientas
          </button>
          <button (click)="categoryChange.emit('computacion')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory === 'computacion' 
                            ? (isCinematicGlow ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Computación
          </button>
          <button (click)="categoryChange.emit('accesorios')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory === 'accesorios' 
                            ? (isCinematicGlow ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Accesorios
          </button>
          
          <!-- Dynamic Custom Categories -->
          @for (cat of customCategories; track cat.value) {
            <button (click)="categoryChange.emit(cat.value)"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                             (selectedCategory === cat.value 
                              ? (isCinematicGlow ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Meta info -->
        <div [class]="'flex items-center justify-between pt-4 border-t text-xs font-medium text-zinc-500 ' + (isCinematicGlow ? 'border-zinc-800/60' : 'border-zinc-200')">
          <span>Mostrando {{ publicProducts.slice(0, limit).length }} de {{ publicProducts.length }} {{ publicProducts.length === 1 ? 'producto' : 'productos' }}</span>
        </div>

      </div>

      <!-- PRODUCTS CATALOG GRID -->
      @if (publicProducts.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of publicProducts.slice(0, limit); track product.id) {
            <app-product-card
              [product]="product"
              [isCinematicGlow]="isCinematicGlow"
              [isInWishlist]="isInWishlist(product.id)"
              (viewDetails)="navigate.emit({view: 'detalle', id: $event})"
              (addToCart)="addToCart.emit($event)"
              (toggleWishlist)="toggleWishlist.emit($event)">
            </app-product-card>
          }
        </div>

        @if (publicProducts.length > limit) {
          <div class="pt-12 pb-4 flex justify-center">
            <button (click)="loadMore()"
                    [class]="'group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-black uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm border ' + 
                             (isCinematicGlow 
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700' 
                              : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300')">
              <hugeicons-icon [icon]="ArrowDown01Icon" [size]="18" class="mr-2 opacity-70 group-hover:translate-y-0.5 transition-transform"  [strokeWidth]="1.5" />
              Cargar más productos (Quedan {{ publicProducts.length - limit }})
            </button>
          </div>
        }

      } @else {
        <!-- Null Result state -->
        <div [class]="'border rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 ' + 
                       (isCinematicGlow ? 'bg-zinc-900/20 border-zinc-800/80' : 'bg-zinc-150/40 border-zinc-200/50')">
          <div class="flex justify-center text-zinc-300 scale-150 block mb-4">
            <hugeicons-icon [icon]="SearchRemoveIcon" [size]="24"  [strokeWidth]="1.5" />
          </div>
          <div class="space-y-1">
            <h3 [class]="'text-sm font-black uppercase tracking-wider ' + (isCinematicGlow ? 'text-white' : 'text-zinc-950')">No se encontraron artículos coincidentes</h3>
            <p [class]="'text-xs leading-normal ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-500')">
              No disponemos de piezas que coincidan con "{{ searchQuery }}". Por favor, intente redefinir los términos de búsqueda o limpie los selectores de categoría.
            </p>
          </div>
          <button (click)="clearFilters.emit()" 
                  [class]="'font-black text-xs px-5 py-2.5 rounded-lg cursor-pointer transition-all ' + 
                           (isCinematicGlow ? 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-950 hover:bg-zinc-900 text-white')">
            Limpiar Filtros
          </button>
        </div>
      }

    </main>
  `
})
export class CatalogPageComponent {
  @Input() isCinematicGlow = true;
  @Input() customCategories: {value: string, label: string}[] = [];
  @Input() selectedCategory = 'todos';
  @Input() searchControl!: FormControl;
  @Input() publicProducts: Product[] = [];
  @Input() searchQuery = '';
  @Input() wishlist: string[] = [];

  @Output() categoryChange = new EventEmitter<string>();
  @Output() clearFilters = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<{view: string, id?: string}>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() toggleWishlist = new EventEmitter<{id: string, event: Event}>();

  isInWishlist(id: string): boolean {
    return this.wishlist.includes(id);
  }

  limit = 12;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['publicProducts'] || changes['selectedCategory'] || changes['searchQuery']) {
      this.limit = 12;
    }
  }

  loadMore() {
    this.limit += 12;
  }

  Search01Icon = Search01Icon;
  ArrowDown01Icon = ArrowDown01Icon;
  SearchRemoveIcon = SearchRemoveIcon;
}
