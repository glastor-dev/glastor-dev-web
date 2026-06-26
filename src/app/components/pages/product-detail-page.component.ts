import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../../portal";
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ArrowLeft01Icon, StarIcon, StarHalfIcon, ArrowRight01Icon, ShoppingCart01Icon, FavouriteIcon, TruckIcon, Tick01Icon, Location01Icon, ShieldCheck, Shield01Icon, DeliveryBox01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: "app-product-detail-page",
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `
  
    <main class="max-w-6xl mx-auto px-4 py-8 pb-24 lg:pb-8 space-y-8 text-left page-transition">
      
      <!-- Back Breadcrumb tracker with premium border and gradient highlight -->
      <div [class]="'flex flex-wrap items-center justify-between gap-4 border-b pb-4 ' + (isCinematicGlow ? 'border-zinc-850' : 'border-zinc-100')">
        <div class="flex items-center gap-3">
          <button (click)="setView('tienda')" 
                  [class]="'inline-flex items-center gap-1.5 text-xs font-black transition-colors cursor-pointer px-3 py-1.5 rounded-lg border shadow-2xs ' + 
                           (isCinematicGlow 
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' 
                            : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-950')">
            <hugeicons-icon [icon]="ArrowLeft01Icon" [size]="16" class="scale-75"  [strokeWidth]="1.5" />
            Volver a la galería
          </button>
          <span class="text-zinc-350 text-xs">/</span>
          <span [class]="'text-[10px] font-mono font-black uppercase px-2 py-1 rounded-md ' + 
                         (isCinematicGlow ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-650')">{{ product?.category }}</span>
        </div>
        <div class="text-[10px] font-mono text-zinc-400">
          GLASTOR ® DIRECTCO v4.11 // <span [class]="'font-bold ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">CP-OPTIMIZER</span>
        </div>
      </div>

      <!-- Split Layout content detail -->
      @if (product; as product) {
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
          
          <!-- LEFT COLUMN: Image Gallery (4/12) -->
          <div class="lg:col-span-4 flex flex-col md:flex-row gap-4 lg:sticky lg:top-28">
            <!-- Thumbnails strip (Hidden on small, flex on md+) -->
            <div class="hidden md:flex flex-row md:flex-col gap-3 md:w-16 shrink-0 overflow-x-auto md:overflow-visible">
              @for (img of [product.image].concat(product.gallery || []); track img; let idx = $index) {
                <button (click)="selectedGalleryImageChange.emit(img); selectedPerspectiveIndexChange.emit(idx)"
                        [class]="'border rounded-lg overflow-hidden aspect-square p-1 transition-all flex items-center justify-center cursor-pointer relative shrink-0 w-16 md:w-full ' + 
                                 ((selectedGalleryImage || product.image) === img 
                                  ? (isCinematicGlow ? 'border-amber-500 bg-zinc-900 ring-2 ring-[#41BF84]/50' : 'border-zinc-950 bg-white ring-2 ring-zinc-900') 
                                  : (isCinematicGlow ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300'))">
                  <img [src]="img" referrerpolicy="no-referrer" 
                       [class]="'w-full h-full object-cover rounded-lg ' + 
                                ((!product.gallery || product.gallery.length === 0) && idx === 1 ? 'scale-125 saturate-110' : ((!product.gallery || product.gallery.length === 0) && idx === 2 ? 'contrast-115 sepia-20' : ((!product.gallery || product.gallery.length === 0) && idx === 3 ? 'scale-150 grayscale' : '')))">
                </button>
              }
            </div>

            <!-- 3D Perspective Viewport for Product Preview -->
            <div class="container-3d w-full flex-grow aspect-square md:aspect-[4/5] lg:aspect-square">
              <div class="tilt-card-3d w-full h-full relative border rounded-lg overflow-hidden shadow-sm group"
                   id="interactive-3d-tilt-preview"
                   [class.bg-zinc-950]="isCinematicGlow"
                   [class.bg-white]="!isCinematicGlow"
                   [class.border-zinc-800]="isCinematicGlow"
                   [class.border-zinc-200]="!isCinematicGlow">
                
                <img [src]="selectedGalleryImage || product.image" [alt]="product.name" referrerpolicy="no-referrer"
                     class="w-full h-full object-contain p-1 transition-all duration-700 ease-out select-none"
                     [class.scale-125]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex === 1"
                     [class.saturate-120]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex === 1"
                     [class.brightness-105]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex === 1"
                     [class.contrast-120]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex === 2"
                     [class.sepia-20]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex === 2"
                     [class.saturate-85]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex === 2">
                
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <!-- Perspective labels overlay -->
                <div class="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wide font-medium z-10 pointer-events-none">
                  @if (selectedPerspectiveIndex === 0) {
                    VISTA GENERAL
                  } @else if (selectedPerspectiveIndex === 1) {
                    DETALLE MACRO
                  } @else if (selectedPerspectiveIndex === 2) {
                    ALMACENAMIENTO GLASTOR
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE COLUMN: Product Info & Variations (5/12) -->
          <div class="lg:col-span-5 space-y-7 lg:px-4">
            
            <!-- Category & Brand -->
            <div class="space-y-1">
              <span class="text-xs text-[#41BF84] font-black tracking-widest uppercase cursor-pointer hover:underline" [class.text-[#41BF84]]="isCinematicGlow">GLASTOR ® DIRECTCO</span>
              <h1 [class]="'text-2xl md:text-3xl font-black tracking-tight leading-tight font-sans ' + 
                           (isCinematicGlow ? 'text-white' : 'text-zinc-950')">
                {{ product.name }}
              </h1>
            </div>

            <!-- Ratings & Badges -->
            <div class="flex flex-wrap items-center gap-3 border-b pb-4" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
              <div class="flex items-center gap-1 text-[#41BF84] cursor-pointer hover:text-[#41BF84]">
                <span class="text-sm font-black">{{ product.rating.toFixed(1) }}</span>
                <div class="flex gap-0.5">
                  @for (i of [1, 2, 3, 4, 5]; track i) {
                    @if (product.rating >= i) {
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-[14px] h-[14px] text-[#41BF84]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    } @else if (product.rating >= i - 0.5) {
                      <svg viewBox="0 0 24 24" class="w-[14px] h-[14px] text-[#41BF84]"><defs><linearGradient [id]="'half'+i" x1="0" y1="0" x2="1" y2="0"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path [attr.fill]="'url(#half'+i+')'" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    } @else {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" class="w-[14px] h-[14px] text-[#41BF84]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    }
                  }
                </div>
                <span class="text-xs text-[#41BF84] ml-1 hover:underline font-medium" [class.text-[#41BF84]]="isCinematicGlow">{{ totalReviewsCount }} valoraciones</span>
              </div>
              
              @if (product.badges && product.badges.length > 0) {
                <div class="px-3 py-1 bg-zinc-800/80 border border-white/5 rounded-md text-xs font-mono uppercase tracking-widest text-zinc-300">
                  {{ parseBadge(product.badges[0]) }}
                </div>
              }
            </div>

            <!-- Variations (Simulated mapping from customizerConfig) -->


            <!-- "Sobre este artículo" Bullets -->
            <div class="space-y-3 pt-4 max-w-full">
              <h3 class="text-sm font-black uppercase tracking-wider" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">Sobre este artículo</h3>
              <div class="text-xs leading-relaxed product-description-html break-words whitespace-normal overflow-hidden w-full" [class.text-zinc-300]="isCinematicGlow" [class.text-zinc-700]="!isCinematicGlow" [innerHTML]="product.description">
              </div>
            </div>

            <!-- Interactive Accordion -->
            <div class="mt-8 border-t" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
              
              <!-- Accordion Item 1: Acerca del Modelo -->
              <div class="border-b" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                <button (click)="toggleAccordion('ACERCA DEL MODELO')" 
                        class="w-full flex items-center gap-3 py-4 text-left focus:outline-none group">
                  <hugeicons-icon [icon]="ArrowRight01Icon" [size]="22" class="font-bold transition-transform duration-300"
                        [class.rotate-90]="expandedAccordion === 'ACERCA DEL MODELO'"
                        [class.text-cyan-500]="isCinematicGlow" [class.text-cyan-700]="!isCinematicGlow"  [strokeWidth]="1.5" />
                  <span class="text-xl font-black uppercase tracking-widest" 
                        [class.text-white]="isCinematicGlow" [class.text-black]="!isCinematicGlow">
                    ACERCA DEL MODELO
                  </span>
                </button>
                <div class="overflow-hidden transition-all duration-300"
                     [style.maxHeight]="expandedAccordion === 'ACERCA DEL MODELO' ? '1000px' : '0'">
                  <div class="pb-6 pl-10 pr-4 text-sm leading-relaxed product-description-html" [class.text-zinc-400]="isCinematicGlow" [class.text-zinc-600]="!isCinematicGlow">
                    @if (product.aboutModel) {
                      <div [innerHTML]="product.aboutModel"></div>
                    } @else {
                      Este producto pertenece a la línea profesional de <span class="font-bold text-[#41BF84] capitalize">{{ product.category }}</span>. Su ingeniería ha sido optimizada para garantizar la máxima durabilidad en condiciones de alta exigencia, combinando ergonomía de vanguardia con un rendimiento industrial ininterrumpido.
                    }
                  </div>
                </div>
              </div>

              <!-- Accordion Item 2: Caracteristicas -->
              <div class="border-b" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                <button (click)="toggleAccordion('CARACTERISTICAS')" 
                        class="w-full flex items-center gap-3 py-4 text-left focus:outline-none group">
                  <hugeicons-icon [icon]="ArrowRight01Icon" [size]="22" [strokeWidth]="1.5" class="font-bold transition-transform duration-300" [class.rotate-90]="expandedAccordion === 'CARACTERISTICAS' || expandedAccordion === 'ESPECIFICACIONES'" [class.text-cyan-500]="isCinematicGlow" [class.text-cyan-700]="!isCinematicGlow" />
                  <span class="text-xl font-black uppercase tracking-widest" 
                        [class.text-white]="isCinematicGlow" [class.text-black]="!isCinematicGlow">
                    CARACTERISTICAS
                  </span>
                </button>
                <div class="overflow-hidden transition-all duration-300"
                     [style.maxHeight]="expandedAccordion === 'CARACTERISTICAS' ? '1000px' : '0'">
                  <div class="pb-6 pl-10 pr-4 text-sm leading-relaxed product-description-html" [class.text-zinc-400]="isCinematicGlow" [class.text-zinc-600]="!isCinematicGlow">
                    @if (product.features) {
                      <div [innerHTML]="product.features"></div>
                    } @else {
                      <ul class="list-disc pl-4 space-y-2 marker:text-cyan-500">
                        @if (product.badges && product.badges.length > 0) {
                          @for (badge of product.badges; track badge) {
                            <li><span class="font-bold text-white">{{ parseBadge(badge).split(':')[0] }}</span>{{ parseBadge(badge).includes(':') ? ':' + parseBadge(badge).split(':')[1] : '' }}</li>
                          }
                        }
                        <li>Construido con <span class="font-bold text-white">{{ product.material || 'materiales de alta resistencia al impacto' }}</span>.</li>
                        <li>Sistema integrado de disipación térmica y protección contra sobrecargas.</li>
                      </ul>
                    }
                  </div>
                </div>
              </div>

              <!-- Accordion Item 3: Especificaciones -->
              <div class="border-b" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                <button (click)="toggleAccordion('ESPECIFICACIONES')" 
                        class="w-full flex items-center gap-3 py-4 text-left focus:outline-none group">
                  <hugeicons-icon [icon]="ArrowRight01Icon" [size]="22" [strokeWidth]="1.5" class="font-bold transition-transform duration-300" [class.rotate-90]="expandedAccordion === 'CARACTERISTICAS' || expandedAccordion === 'ESPECIFICACIONES'" [class.text-cyan-500]="isCinematicGlow" [class.text-cyan-700]="!isCinematicGlow" />
                  <span class="text-xl font-black uppercase tracking-widest" 
                        [class.text-white]="isCinematicGlow" [class.text-black]="!isCinematicGlow">
                    ESPECIFICACIONES
                  </span>
                </button>
                <div class="overflow-hidden transition-all duration-300"
                     [style.maxHeight]="expandedAccordion === 'ESPECIFICACIONES' ? '1000px' : '0'">
                  <div class="pb-6 pl-10 pr-4 text-sm product-description-html" [class.text-zinc-400]="isCinematicGlow" [class.text-zinc-600]="!isCinematicGlow">
                    @if (product.specifications) {
                      <div [innerHTML]="product.specifications"></div>
                    } @else {
                      <div class="grid grid-cols-2 gap-y-3 gap-x-4">
                        <div class="border-b pb-2" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                          <span class="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">DIMENSIONES</span>
                          <span class="font-mono text-white">{{ product.dimensions || 'Estándar' }}</span>
                        </div>
                        <div class="border-b pb-2" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                          <span class="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">PESO FÍSICO</span>
                          <span class="font-mono text-white">{{ product.weight || 'No especificado' }}</span>
                        </div>
                        <div class="border-b pb-2" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                          <span class="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">MATERIAL</span>
                          <span class="font-mono text-white">{{ product.material || 'Aleación Premium' }}</span>
                        </div>
                        <div class="border-b pb-2" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                          <span class="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">INVENTARIO</span>
                          <span class="font-mono text-white">{{ product.stock }} UND</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

            </div>


          </div>

          <!-- RIGHT COLUMN: Sticky Buy Box (3/12) -->
          <div class="lg:col-span-3 lg:sticky lg:top-28 space-y-4">
            
            <div id="product-detail-pricing-cta"
                 [class]="isCinematicGlow 
                    ? 'bg-zinc-900 border border-zinc-800 shadow-[0_0_40px_rgba(245,158,11,0.03)]' 
                    : 'bg-white border border-zinc-200 shadow-xl'"
                 class="rounded-lg p-6 flex flex-col space-y-5 transition-all">
              
              <!-- Price Block -->
              <div class="space-y-1 text-left">
                <span class="text-[10px] font-mono text-zinc-400 block font-bold tracking-wider">PRECIO DE INVERSIÓN</span>
                <span class="text-3xl font-black font-mono flex items-baseline gap-1.5" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">
                  {{ formatPrice((selectedVariantObj?.price || product.price)) }}
                </span>
                <span class="text-[9px] text-[#41BF84] block font-bold">IVA del 21% incluido y envío prioritario gratuito.</span>
              </div>

              <!-- Shipping Info Mini -->
              <div class="space-y-1.5 text-xs" [class.text-zinc-300]="isCinematicGlow" [class.text-zinc-700]="!isCinematicGlow">
                <div class="flex gap-2">
                  <hugeicons-icon [icon]="TruckIcon" [size]="16" [strokeWidth]="1.5" />
                  <span>Entrega GRATIS el <span class="font-bold">viernes, 26 de Junio</span>. Realiza el pedido en <span class="text-[#41BF84] font-bold">3 hrs 15 mins</span>.</span>
                </div>
                <div class="flex gap-2 text-[#41BF84] cursor-pointer hover:underline mt-1">
                  <hugeicons-icon [icon]="Location01Icon" [size]="14" [strokeWidth]="1.5" />
                  <span class="font-bold text-[11px]">Enviar a Zona Logística Primaria</span>
                </div>
              </div>

              <!-- Stock status -->
              @if ((selectedVariantObj?.stock ?? product.stock) > 0) {
                <div class="text-xl font-black text-[#41BF84]">Disponible</div>
              } @else {
                <div class="text-xl font-black text-rose-500">Agotado</div>
              }

              <!-- Variant Selector -->
              @if (product.variants && product.variants.length > 0) {
                <div class="flex flex-col gap-1 mt-2">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Variante</label>
                  <div class="flex flex-wrap gap-2">
                    @for (v of product.variants; track v.id) {
                      <button (click)="selectedVariantIdChange.emit(v.id)"
                              [class]="'px-3 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ' + 
                                       (selectedVariantId === v.id 
                                        ? (isCinematicGlow ? 'border-amber-500 text-[#41BF84] bg-[#41BF84]/10' : 'border-amber-500 text-[#41BF84] bg-[#41BF84]/10') 
                                        : (isCinematicGlow ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'))">
                        {{ v.name }}
                      </button>
                    }
                  </div>
                </div>
              }

              <!-- Quantity Selector (Simulated) -->
              <div class="flex flex-col gap-1">
                <select [class]="'w-full p-2.5 rounded-lg border text-sm font-bold cursor-pointer outline-none transition-colors ' + 
                                 (isCinematicGlow ? 'bg-zinc-950 border-zinc-800 text-white focus:border-[#41BF84]' : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-500')">
                  <option value="1">Cantidad: 1</option>
                  <option value="2">Cantidad: 2</option>
                  <option value="3">Cantidad: 3</option>
                  <option value="4">Cantidad: 4</option>
                  <option value="5">Cantidad: 5</option>
                </select>
              </div>

              <!-- Action buttons -->
              <div class="flex flex-col gap-3 pt-2">
                <button id="btn-detail-add-to-cart"
                        (click)="addToCart.emit(product)"
                        [class]="'w-full py-3.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ' + 
                                 (isCinematicGlow ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950' : 'bg-amber-400 hover:bg-[#41BF84]/200 text-zinc-950')">
                  Añadir al carrito
                </button>
                <button (click)="addToCart.emit(product); setView('checkout')"
                        [class]="'w-full py-3.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ' + 
                                 (isCinematicGlow ? 'bg-indigo-500 hover:bg-indigo-400 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white')">
                  Comprar ahora
                </button>
              </div>

              <!-- Seller Info Matrix -->
              <div class="grid grid-cols-[1fr_2fr] gap-x-2 gap-y-1 text-[10px] pt-4" [class.text-zinc-400]="isCinematicGlow" [class.text-zinc-600]="!isCinematicGlow">
                <span>Remitente</span>
                <span class="font-bold" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">GLASTOR ® Direct</span>
                <span>Vendedor</span>
                <span class="font-bold" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">GLASTOR ® Automations</span>
                <span>Devoluciones</span>
                <span class="text-[#41BF84] cursor-pointer hover:underline">Reembolso en 30 días</span>
                <span>Atención</span>
                <span class="text-[#41BF84] cursor-pointer hover:underline">Soporte GLASTOR Care</span>
              </div>

              <!-- Add to List -->
              <div class="pt-4 border-t" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                <button (click)="toggleWishlist(product.id, $event); "
                        class="w-full py-2.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                        [class.border-zinc-700]="isCinematicGlow" [class.hover:bg-zinc-800]="isCinematicGlow" [class.text-zinc-300]="isCinematicGlow"
                        [class.border-zinc-200]="!isCinematicGlow" [class.hover:bg-zinc-100]="!isCinematicGlow" [class.text-zinc-700]="!isCinematicGlow">
                  <hugeicons-icon [icon]="FavouriteIcon" [size]="14" [strokeWidth]="1.5" [class.text-rose-500]="isInWishlist(product.id)" [class.fill-rose-500]="isInWishlist(product.id)" />
                  Agregar a la Lista
                </button>
              </div>
            </div>

            <!-- GOURMET SERVICES STATS -->
            <div id="product-detail-gourmet-perks" 
                 [class]="'grid grid-cols-3 gap-2 py-4 px-2 text-center text-[9px] font-black uppercase ' + 
                          (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-500')">
              <div class="space-y-1.5 flex flex-col items-center">
                <hugeicons-icon [icon]="ShieldCheck" [size]="20" [strokeWidth]="1.5" class="text-zinc-400 block mb-1" />
                <span>Transacción<br>Segura</span>
              </div>
              <div class="space-y-1.5 border-x border-dashed flex flex-col items-center" [class.border-zinc-800]="isCinematicGlow" [class.border-zinc-200]="!isCinematicGlow">
                <hugeicons-icon [icon]="Shield01Icon" [size]="20" [strokeWidth]="1.5" class="text-zinc-400 block mb-1" />
                <span>Garantía de<br>5 años</span>
              </div>
              <div class="space-y-1.5 flex flex-col items-center">
                <hugeicons-icon [icon]="DeliveryBox01Icon" [size]="20" [strokeWidth]="1.5" class="text-zinc-400 block mb-1" />
                <span>Devoluciones<br>gratis</span>
              </div>
            </div>

          </div>
        </div>

        <!-- REVIEWS SUMMARY BLOCK & LIST SECTION -->
        <section id="product-reviews-section" 
                 [class]="'max-w-6xl mx-auto pt-10 border-t space-y-8 ' + (isCinematicGlow ? 'border-zinc-850' : 'border-zinc-200/80')">
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <!-- Rating overview header (4 cols) -->
            <div id="rating-overview-card"
                 [class]="isCinematicGlow ? 'bg-zinc-900 border-zinc-850 text-white' : 'bg-zinc-50 border-zinc-200'"
                 class="md:col-span-4 border p-6 rounded-lg text-center space-y-3 transition-colors">
              <h4 class="text-[10px] font-black uppercase font-mono text-zinc-400 tracking-wider">Calificación Global</h4>
              <div class="space-y-1">
                <span class="text-4xl font-black font-mono tracking-tight" [class.text-white]="isCinematicGlow" [class.text-zinc-950]="!isCinematicGlow">
                  {{ product.rating.toFixed(1) }}
                </span>
                <span class="text-zinc-400 text-[10px] block font-mono">SOBRE 5.0 ESTRELLAS</span>
              </div>
              <div class="flex justify-center gap-0.5 text-[#41BF84]">
                  @for (i of [1, 2, 3, 4, 5]; track i) {
                    @if (product.rating >= i) {
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-[16px] h-[16px] text-[#41BF84]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    } @else if (product.rating >= i - 0.5) {
                      <svg viewBox="0 0 24 24" class="w-[16px] h-[16px] text-[#41BF84]"><defs><linearGradient [id]="'half2'+i" x1="0" y1="0" x2="1" y2="0"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path [attr.fill]="'url(#half2'+i+')'" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    } @else {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" class="w-[16px] h-[16px] text-[#41BF84]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    }
                  }
              </div>
              <p class="text-[9px] text-[#41BF84] font-mono font-black uppercase tracking-widest bg-[#41BF84]/10 px-2 py-1 rounded-md inline-block">
                RECOMENDADO POR EL {{ recommendationPercent }}%
              </p>
            </div>

            <!-- Progress bars review ratios (8 cols) -->
            <div id="rating-breakdown-panel" class="md:col-span-8 space-y-3 font-mono text-[9px]">
              @for (item of ratingBreakdown; track item.stars) {
                <div class="flex items-center gap-4">
                  <span class="w-16 text-zinc-400 font-bold uppercase tracking-widest text-left">{{ item.stars }} Estrellas</span>
                  <div [class]="'flex-grow h-2.5 rounded-full overflow-hidden relative ' + (isCinematicGlow ? 'bg-zinc-850' : 'bg-zinc-200/40')">
                    <div class="bg-amber-400 h-full rounded-full transition-all duration-700" [style.width.%]="item.pct"></div>
                  </div>
                  <span class="w-8 text-right font-black" [class.text-white]="isCinematicGlow" [class.text-zinc-700]="!isCinematicGlow">{{ item.pct }}%</span>
                </div>
              }
            </div>

          </div>

          <div class="space-y-4">
            <div class="text-left space-y-1.5 border-b pb-3"
                 [class.border-zinc-850]="isCinematicGlow"
                 [class.border-zinc-150]="!isCinematicGlow">
              <h3 [class.text-white]="isCinematicGlow" [class.text-zinc-950]="!isCinematicGlow" class="text-sm font-black uppercase tracking-wider font-mono">
                Reseñas de clientes comerciales GLASTOR ®
              </h3>
              <p [class]="'text-xs font-medium ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-500')">Coleccionamos impresiones directas de ferreterías, empresas y comercios para auditar la calidad distribuidora.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (rev of dynamicReviews; track rev.author) {
                <div [class]="isCinematicGlow ? 'bg-zinc-900 border-zinc-850' : 'bg-white border-zinc-200/80'"
                     class="border rounded-lg p-5 space-y-3 shadow-2xs text-left transition-colors">
                  <div class="flex justify-between items-start gap-4">
                    <div class="space-y-0.5">
                      <span [class.text-white]="isCinematicGlow" [class.text-zinc-800]="!isCinematicGlow" class="block font-black text-xs">{{ rev.author }}</span>
                      <span class="block text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest">{{ rev.date }}</span>
                    </div>

                    <div class="flex gap-0.5 text-[#41BF84]">
                      @for (star of [1,2,3,4,5]; track star) {
                        @if (rev.stars >= star) {
                          <svg viewBox="0 0 24 24" fill="currentColor" class="w-[14px] h-[14px] text-[#41BF84]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        } @else if (rev.stars >= star - 0.5) {
                          <svg viewBox="0 0 24 24" class="w-[14px] h-[14px] text-[#41BF84]"><defs><linearGradient [id]="'half3'+star" x1="0" y1="0" x2="1" y2="0"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path [attr.fill]="'url(#half3'+star+')'" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        } @else {
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" class="w-[14px] h-[14px] text-[#41BF84]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        }
                      }
                    </div>
                  </div>
                  <p [class.text-zinc-300]="isCinematicGlow" [class.text-zinc-650]="!isCinematicGlow" class="text-xs leading-relaxed font-sans italic">
                    "{{ rev.comment }}"
                  </p>
                </div>
              }
            </div>
          </div>
        </section>
      }

      @if (product) {
        <!-- STICKY MOBILE BUY BAR (CRO) -->
        <div class="fixed bottom-0 left-0 right-0 lg:hidden px-4 py-3 z-50 flex items-center justify-between border-t transition-colors shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-fade-in"
             [class.bg-zinc-950]="isCinematicGlow"
             [class.border-zinc-800]="isCinematicGlow"
             [class.bg-white]="!isCinematicGlow"
             [class.border-zinc-200]="!isCinematicGlow">
          <div class="flex flex-col">
            <span class="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">Inversión Final</span>
            <span class="font-mono text-lg font-black leading-none" [class.text-white]="isCinematicGlow" [class.text-zinc-900]="!isCinematicGlow">
              {{ formatPrice((selectedVariantObj?.price || product.price)) }}
            </span>
          </div>
          <button (click)="addToCart.emit(product)"
                  class="bg-[#41BF84] hover:bg-white text-black font-black uppercase text-xs px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all active:scale-95">
            Añadir 
            <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="18" [strokeWidth]="1.5" />
          </button>
        </div>
      }
    </main>


`
})
export class ProductDetailPageComponent {
  Math = Math;
  @Input() isCinematicGlow = true;
  ArrowLeft01Icon = ArrowLeft01Icon;
  StarIcon = StarIcon;
  StarHalfIcon = StarHalfIcon;
  ArrowRight01Icon = ArrowRight01Icon;
  ShoppingCart01Icon = ShoppingCart01Icon;
  FavouriteIcon = FavouriteIcon;
  TruckIcon = TruckIcon;
  Tick01Icon = Tick01Icon;
  Location01Icon = Location01Icon;
  ShieldCheck = ShieldCheck;
  Shield01Icon = Shield01Icon;
  DeliveryBox01Icon = DeliveryBox01Icon;
  @Input() product!: Product | null;
  @Input() selectedVariantObj: any;
  @Input() dynamicReviews: any[] = [];
  @Input() ratingBreakdown: any[] = [];
  @Input() recommendationPercent: string = '0';
  @Input() wishlist: string[] = [];
  @Input() selectedVariantId: string | null = null;
  @Input() selectedGalleryImage: string | null = null;
  @Input() expandedAccordion: string | null = null;
  @Input() selectedPerspectiveIndex: number = 0;

  get totalReviewsCount(): number {
    if (!this.product) return 180;
    const nameLen = this.product.name ? this.product.name.length : 10;
    return 180 + (nameLen * 37) % 250 + (this.product.reviews?.length || 0) * 15;
  }

  @Output() navigate = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<any>();
  @Output() toggleWishlistEvent = new EventEmitter<{id: string, event: Event}>();
  @Output() selectedVariantIdChange = new EventEmitter<string | null>();
  @Output() selectedGalleryImageChange = new EventEmitter<string | null>();
  @Output() expandedAccordionChange = new EventEmitter<string | null>();
  @Output() selectedPerspectiveIndexChange = new EventEmitter<number>();

  isInWishlist(id: string): boolean {
    return this.wishlist ? this.wishlist.includes(id) : false;
  }

  formatPrice(value: number): string {
    if (value == null) return "";
    const parts = value.toFixed(2).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const decimalPart = parts[1];
    if (decimalPart === "00") return "$ " + integerPart;
    return "$ " + integerPart + "," + decimalPart;
  }

  parseBadge(badge: string): string {
    if (!badge) return "";
    if (badge.startsWith("{") && badge.endsWith("}")) {
      try {
        const parsed = JSON.parse(badge);
        return parsed.value ? parsed.value : badge;
      } catch (e) { return badge; }
    }
    return badge;
  }

  setView(view: string) { this.navigate.emit(view); }
  toggleWishlist(id: string, event: Event) { this.toggleWishlistEvent.emit({id, event}); }
  toggleAccordion(section: string) { this.expandedAccordionChange.emit(this.expandedAccordion === section ? null : section); }
}
