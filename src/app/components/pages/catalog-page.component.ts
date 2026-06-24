import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProductCardComponent } from '../ui/product-card.component';
import { Product } from '../../portal';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
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
      <div [class]="'border rounded-lg p-5 md:p-6 space-y-4 text-left ' + 
                     (isCinematicGlow ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200/60 shadow-sm')">
        
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <!-- Category pills selection -->
          <div class="flex flex-wrap gap-1.5 order-2 lg:order-1">
            <button (click)="categoryChange.emit('todos')"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ' + 
                             (selectedCategory === 'todos' 
                              ? (isCinematicGlow ? 'bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow ? 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-200/60'))">
              Todos
            </button>
            <button (click)="categoryChange.emit('tecnologia')"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ' + 
                             (selectedCategory === 'tecnologia' 
                              ? (isCinematicGlow ? 'bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow ? 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-200/60'))">
              Tecnología
            </button>
            <button (click)="categoryChange.emit('herramientas')"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ' + 
                             (selectedCategory === 'herramientas' 
                              ? (isCinematicGlow ? 'bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow ? 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-200/60'))">
              Herramientas
            </button>
            <button (click)="categoryChange.emit('computacion')"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ' + 
                             (selectedCategory === 'computacion' 
                              ? (isCinematicGlow ? 'bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow ? 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-200/60'))">
              Computación
            </button>
            <button (click)="categoryChange.emit('accesorios')"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ' + 
                             (selectedCategory === 'accesorios' 
                              ? (isCinematicGlow ? 'bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow ? 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-200/60'))">
              Accesorios
            </button>
            
            <!-- Dynamic Custom Categories -->
            @for (cat of customCategories; track cat.value) {
              <button (click)="categoryChange.emit(cat.value)"
                      [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ' + 
                               (selectedCategory === cat.value 
                                ? (isCinematicGlow ? 'bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 text-white shadow-sm') 
                                : (isCinematicGlow ? 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-200/60'))">
                {{ cat.label }}
              </button>
            }
          </div>

          <!-- Live Input search control -->
          <div class="relative w-full lg:max-w-xs order-1 lg:order-2">
            <span class="material-icons absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 scale-90">search</span>
            <input type="text" [formControl]="searchControl" placeholder="Buscar en el catálogo (Makita, iPhone, AMD, etc)..."
                   [class]="'w-full border rounded-lg pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-all ' + 
                            (isCinematicGlow 
                             ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-600' 
                             : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
          </div>

        </div>

        <div [class]="'flex items-center justify-between pt-3 border-t text-[11px] font-mono text-zinc-400 ' + (isCinematicGlow ? 'border-zinc-850' : 'border-zinc-150')">
          <span>COINCIDENCIAS: {{ publicProducts.length }} OBJETOS ENCONTRADOS</span>
          <span>FILTRADO: {{ selectedCategory.toUpperCase() }}</span>
        </div>

      </div>

      <!-- PRODUCTS CATALOG GRID -->
      @if (publicProducts.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of publicProducts; track product.id) {
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
      } @else {
        <!-- Null Result state -->
        <div [class]="'border rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 ' + 
                       (isCinematicGlow ? 'bg-zinc-900/20 border-zinc-800/80' : 'bg-zinc-150/40 border-zinc-200/50')">
          <span class="material-icons text-zinc-300 scale-150 block">sentiment_neutral</span>
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
}
