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
      <section class="relative w-full overflow-hidden text-left flex flex-col justify-end min-h-[400px] md:min-h-[500px] border-b transition-colors -mt-[140px] pt-[140px]"
               [class]="isCinematicGlow() ? 'bg-[#050505] border-white/5' : 'bg-zinc-50 border-zinc-200'">
           
        <!-- Brutalist SVG Noise Texture Overlay -->
        <div class="absolute inset-0 z-0 opacity-[0.06] mix-blend-screen pointer-events-none" *ngIf="isCinematicGlow()"
             style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);">
        </div>
        
        <!-- Gradient Overlay for readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" *ngIf="isCinematicGlow()"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/60 to-transparent z-10" *ngIf="!isCinematicGlow()"></div>

        <div class="z-20 relative max-w-7xl mx-auto w-full px-4 pb-12 pt-24">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div class="space-y-6 flex-1 text-left relative z-20">
              
              <!-- Technical HUD Label -->
              <div class="flex items-center gap-4 animate-fade-in-up">
                <div class="h-px bg-[#41BF84] w-12"></div>
                <span class="text-[#41BF84] font-mono text-[10px] uppercase font-black tracking-widest">SISTEMA DE INVENTARIO B2B</span>
              </div>

              <h1 [class]="'text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-black tracking-tighter uppercase leading-[0.85] ' + (isCinematicGlow() ? 'text-white' : 'text-zinc-950')">
                Catálogo <br class="hidden md:block"> 
                <span class="inline-flex items-start text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">GLASTOR<span class="text-[0.3em] mt-[0.1em] ml-2 font-black text-[#41BF84] -translate-y-2 inline-block">®</span></span><br class="hidden lg:block"> 
                Megastore
              </h1>
              
              <p [class]="'text-sm md:text-lg max-w-xl leading-relaxed font-light ' + (isCinematicGlow() ? 'text-zinc-400' : 'text-zinc-500')">
                Nuestra selección premium de tecnología, componentes de computación avanzados y herramientas industriales para profesionales. Filtra por categoría o realiza búsquedas dinámicas en tiempo real.
              </p>
              
              <!-- Data metrics -->
              <div class="flex gap-6 pt-4 border-t border-white/10 max-w-sm mt-6">
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
            
            <div class="hidden md:block shrink-0 relative w-full max-w-[300px] lg:max-w-[450px] animate-fade-in-up group" style="animation-delay: 150ms;">
              <!-- Glow sutil detrás de la imagen para integrarla mejor con la oscuridad -->
              <div class="absolute inset-0 bg-[#41BF84]/20 blur-[80px] rounded-full scale-150 -z-10 transition-all duration-700 group-hover:bg-[#41BF84]/30" *ngIf="isCinematicGlow()"></div>
              
              <!-- Floating HUD Element -->
              <div class="absolute top-10 -left-10 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded text-[10px] font-mono font-black text-[#41BF84] uppercase tracking-widest z-20 shadow-2xl animate-pulse">
                [ LXT SYSTEM ]
              </div>
              
              <img src="/assets/logos/catalogo1.webp" alt="Glastor Megastore" class="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 relative z-10">
            </div>
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-4 py-10 space-y-8">
      
      <!-- FILTER & SEARCH BAR BLOCK -->
      <div [class]="'border rounded-lg p-5 md:p-6 space-y-5 text-left ' + 
                     (isCinematicGlow() ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200/60 shadow-sm')">
        
        <!-- Live Input search control (Full width) -->
        <div class="relative w-full">
          <hugeicons-icon [icon]="Search01Icon" [size]="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"  [strokeWidth]="1.5" />
          <input type="text" [formControl]="searchControl" placeholder="Buscar en el catálogo (Makita, iPhone, AMD, etc)..."
                 [class]="'w-full border rounded-xl pl-12 pr-4 py-3.5 text-sm font-semibold focus:outline-none transition-all ' + 
                          (isCinematicGlow() 
                           ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 focus:border-amber-500/50 text-white placeholder:text-zinc-600 shadow-inner' 
                           : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-400 text-zinc-900 placeholder:text-zinc-400')">
        </div>

        <!-- Scrollable Category pills selection -->
        <div class="flex overflow-x-auto whitespace-nowrap hide-scrollbar gap-2 pb-2">
          <button (click)="setCategory('todos')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory() === 'todos' 
                            ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Todos
          </button>
          <button (click)="setCategory('tecnologia')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory() === 'tecnologia' 
                            ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Tecnología
          </button>
          <button (click)="setCategory('herramientas')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory() === 'herramientas' 
                            ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Herramientas
          </button>
          <button (click)="setCategory('computacion')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory() === 'computacion' 
                            ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Computación
          </button>
          <button (click)="setCategory('accesorios')"
                  [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                           (selectedCategory() === 'accesorios' 
                            ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                            : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
            Accesorios
          </button>
          
          <!-- Dynamic Custom Categories -->
          @for (cat of customCategories(); track cat.value) {
            <button (click)="setCategory(cat.value)"
                    [class]="'px-4 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shrink-0 border ' + 
                             (selectedCategory() === cat.value 
                              ? (isCinematicGlow() ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 border-zinc-900 text-white shadow-sm') 
                              : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'))">
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Meta info -->
        <div [class]="'flex items-center justify-between pt-4 border-t text-xs font-medium text-zinc-500 ' + (isCinematicGlow() ? 'border-zinc-800/60' : 'border-zinc-200')">
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
            <h3 [class]="'text-sm font-black uppercase tracking-wider ' + (isCinematicGlow() ? 'text-white' : 'text-zinc-950')">No se encontraron artículos coincidentes</h3>
            <p [class]="'text-xs leading-normal ' + (isCinematicGlow() ? 'text-zinc-400' : 'text-zinc-500')">
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
  publicProducts = this.appState.publicProducts;
  
  searchControl = new FormControl(this.appState.searchQuery());
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);

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

  clearFilters() {
    this.appState.selectedCategory.set('todos');
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
