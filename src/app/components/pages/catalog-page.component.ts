import { Component, inject, OnInit, ChangeDetectionStrategy, DestroyRef, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../../app-state.service';
import { ProductCardComponent } from '../ui/product-card.component';
import { Product } from '../../models';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Search01Icon, ArrowDown01Icon, SearchRemoveIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent, HugeiconsIconComponent, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-transition">
      <!-- Full-Width Catalog Introduction Hero -->
      <section class="relative w-full overflow-hidden text-left flex flex-col justify-end min-h-[400px] md:min-h-[500px] border-b transition-colors pt-[80px]"
               [class]="isCinematicGlow() ? 'bg-[#050505] border-white/5' : 'bg-zinc-50 border-zinc-200'">
           
        <!-- Brutalist SVG Noise Texture Overlay -->
        <div class="absolute inset-0 z-0 opacity-[0.06] mix-blend-screen pointer-events-none" *ngIf="isCinematicGlow()"
             style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);">
        </div>
        
        <!-- Background Image (Blueprint style) -->
        <div class="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden" *ngIf="isCinematicGlow()">
           <img src="/assets/logos/catalogo1.webp" class="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[70%] lg:w-[50%] h-auto object-contain mix-blend-screen filter blur-[1px]">
        </div>

        <!-- Gradient Overlay for readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10" *ngIf="isCinematicGlow()"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" *ngIf="isCinematicGlow()"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/60 to-transparent z-10" *ngIf="!isCinematicGlow()"></div>

        <div class="z-20 relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 pt-24">
          <div class="flex flex-col justify-end gap-12 border-l-4 border-[#41BF84] pl-6 md:pl-10">
            <div class="space-y-6 flex-1 text-left relative z-20">
              
              <!-- Technical HUD Label -->
              <div class="mb-4 transform -skew-x-6 origin-left w-fit animate-fade-in-up">
                <span class="bg-[#41BF84] text-black font-black uppercase tracking-widest text-xs px-3 py-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">CATÁLOGO B2B</span>
              </div>

              <h1 class="font-display font-black text-[clamp(2rem,8vw,5.5rem)] max-w-full break-words uppercase italic leading-[0.85] tracking-tighter transform -skew-x-6 origin-left drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] animate-fade-in-up"
                  [class]="isCinematicGlow() ? 'text-white' : 'text-zinc-950'" style="display: inline-block; padding-right: 0.15em;">
                CATÁLOGO<br />MEGASTORE
              </h1>
              
              <div class="border-l border-white/20 pl-4 mt-6 animate-fade-in-up">
                <p [class]="'font-mono text-[11px] uppercase font-bold tracking-widest max-w-xl leading-relaxed ' + (isCinematicGlow() ? 'text-zinc-400' : 'text-zinc-600')">
                  ENCUENTRA LAS SOLUCIONES TECNOLÓGICAS PERFECTAS PARA TU SECTOR. EQUIPOS DE ALTO RENDIMIENTO PARA ENTORNOS EXIGENTES.
                </p>
              </div>
              
              <!-- Data metrics -->
              <div class="flex gap-8 pt-6 animate-fade-in-up">
                <div>
                  <span class="block text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">Disponibilidad</span>
                  <span class="block text-white font-mono text-sm uppercase font-bold mt-1">Inmediata</span>
                </div>
                <div>
                  <span class="block text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest">Latencia DB</span>
                  <span class="block text-[#41BF84] font-mono text-sm uppercase font-bold mt-1">~12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-4 py-10 space-y-8">
      
      <!-- FILTER & SEARCH BAR BLOCK -->
      <div [class]="'sticky top-[80px] z-40 backdrop-blur-xl border rounded-lg p-5 md:p-6 space-y-5 text-left ' + 
                     (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800/80 shadow-black/30' : 'bg-white/80 border-zinc-200/60 shadow-sm')">
        
        <!-- Live Input search control and sort (Full width) -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <div class="relative flex-grow">
            <hugeicons-icon [icon]="Search01Icon" [size]="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"  [strokeWidth]="1.5" />
            <input type="text" [formControl]="searchControl" placeholder="Buscar en el catálogo (Makita, iPhone, AMD, etc)..."
                   [class]="'w-full border rounded-xl pl-12 pr-4 py-3.5 text-sm font-semibold focus:outline-none transition-all ' + 
                            (isCinematicGlow() 
                             ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 focus:border-amber-500/50 text-white placeholder:text-zinc-400 shadow-inner' 
                             : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-400 text-zinc-900 placeholder:text-zinc-400')">
          </div>
          
          <!-- Sort Dropdown -->
          <div class="shrink-0 relative">
             <select #sortSelect (change)="setSortOrder(sortSelect.value)"
                     [class]="'w-full md:w-auto appearance-none border rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none transition-all cursor-pointer ' + 
                              (isCinematicGlow() 
                               ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 focus:border-amber-500/50 text-white shadow-inner' 
                               : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-400 text-zinc-900')">
               <option value="default" [selected]="sortOrder() === 'default'">Orden por Relevancia</option>
               <option value="price-asc" [selected]="sortOrder() === 'price-asc'">Precio: Menor a Mayor</option>
               <option value="price-desc" [selected]="sortOrder() === 'price-desc'">Precio: Mayor a Menor</option>
               <option value="name-asc" [selected]="sortOrder() === 'name-asc'">Nombre: A - Z</option>
             </select>
             <hugeicons-icon [icon]="ArrowDown01Icon" [size]="16" class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"  [strokeWidth]="2" />
          </div>
        </div>

        <!-- Scrollable Category pills selection -->
        <div class="flex overflow-x-auto whitespace-nowrap hide-scrollbar gap-2 pb-2">
          @for (cat of allCategories(); track cat.value) {
            <button (click)="setCategory(cat.value)"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                             (selectedCategory() === cat.value 
                              ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:border-zinc-300'))">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Meta info -->
        <div [class]="'flex items-center justify-between pt-4 border-t text-xs font-medium text-zinc-400 ' + (isCinematicGlow() ? 'border-zinc-800/60' : 'border-zinc-200')">
          <span>Mostrando {{ publicProducts().length }} {{ publicProducts().length === 1 ? 'producto' : 'productos' }}</span>
        </div>

      </div>

      <!-- PRODUCTS RESULTS GRID (VIRTUAL SCROLLING) -->
      @if (chunkedProducts().length > 0) {
        
        <!-- Virtual Scroll Viewport -->
        <cdk-virtual-scroll-viewport itemSize="430" minBufferPx="450" maxBufferPx="900" class="w-full h-[800px] rounded-lg overflow-x-hidden hide-scrollbar">
          
          <div *cdkVirtualFor="let row of chunkedProducts(); trackBy: trackRow" 
               class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6 px-1">
               
            @for (product of row; track product.id) {
              <app-product-card 
                [product]="product"
                [isCinematicGlow]="isCinematicGlow()"
                [isInWishlist]="isInWishlist(product.id)"
                (viewDetails)="navigate(product.id)"
                (addToCart)="addToCart($event)"
                (toggleWishlist)="toggleWishlist($event.id, $event.event)">
              </app-product-card>
            }
          </div>

        </cdk-virtual-scroll-viewport>

      } @else {
        <!-- Null Result state -->
        <div [class]="'border rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 ' + 
                       (isCinematicGlow() ? 'bg-zinc-900/20 border-zinc-800/80' : 'bg-zinc-150/40 border-zinc-200/50')">
          <div class="flex justify-center text-zinc-300 scale-150 mb-4">
            <hugeicons-icon [icon]="SearchRemoveIcon" [size]="24"  [strokeWidth]="1.5" />
          </div>
          <div class="space-y-1">
            <h6 [class]="'glastor-h6 ' + (isCinematicGlow() ? 'text-white' : 'text-zinc-950')">No se encontraron artículos coincidentes</h6>
            <p [class]="'glastor-desc ' + (isCinematicGlow() ? 'text-zinc-400' : 'text-zinc-400')">
              No disponemos de piezas que coincidan con "{{ appState.searchQuery() }}". Por favor, intente redefinir los términos de búsqueda o limpie los selectores de categoría.
            </p>
          </div>
          <button (click)="clearFilters()" 
                  [class]="'font-black text-xs px-5 py-2.5 rounded-lg cursor-pointer transition-all ' + 
                           (isCinematicGlow() ? 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-950 hover:bg-zinc-900 text-white')">
            Limpiar Filtros
          </button>
        </div>
      }

    </main>
    </div>
  `
})
export class CatalogPageComponent implements OnInit {
  appState = inject(AppStateService);
  router = inject(Router);

  isCinematicGlow = this.appState.isCinematicGlow;
  customCategories = this.appState.customCategories;
  selectedCategory = this.appState.selectedCategory;
  sortOrder = this.appState.sortOrder;
  publicProducts = this.appState.publicProducts;
  
  searchControl = new FormControl(this.appState.searchQuery());
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);

  standardCategories = [
    { value: 'todos', label: 'Todos' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'herramientas', label: 'Herramientas' },
    { value: 'computacion', label: 'Computación' },
    { value: 'accesorios', label: 'Accesorios' }
  ];

  allCategories = computed(() => {
    return [...this.standardCategories, ...this.customCategories()];
  });

  columns = signal(4);
  
  // Computed signal that chunks products into rows based on current columns
  chunkedProducts = computed(() => {
    const products = this.publicProducts();
    const cols = this.columns();
    const chunks = [];
    for (let i = 0; i < products.length; i += cols) {
      chunks.push(products.slice(i, i + cols));
    }
    return chunks;
  });

  trackRow(index: number, row: any[]) {
    return index;
  }

  ngOnInit() {
    // Dynamic column calculation for responsive Virtual Scroll
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
        this.columns.set(1);
      } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
        this.columns.set(2);
      } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
        this.columns.set(3);
      } else {
        this.columns.set(4);
      }
    });

    this.searchControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => {
      this.appState.searchQuery.set(val || '');
    });
  }

  setCategory(cat: string) {
    this.appState.selectedCategory.set(cat);
  }

  setSortOrder(order: string) {
    this.appState.sortOrder.set(order as any);
  }

  clearFilters() {
    this.appState.selectedCategory.set('todos');
    this.appState.sortOrder.set('default');
    this.searchControl.setValue('');
  }

  navigate(id: string) {
    this.router.navigate(['/tienda', id]);
  }

  addToCart(product: Product) {
    this.appState.addToCart({ product, quantity: 1 });
  }

  toggleWishlist(id: string, event: Event) {
    this.appState.toggleWishlist(id, event as MouseEvent);
  }

  isInWishlist(id: string): boolean {
    return this.appState.wishlist().includes(id);
  }



  Search01Icon = Search01Icon;
  ArrowDown01Icon = ArrowDown01Icon;
  SearchRemoveIcon = SearchRemoveIcon;
}
