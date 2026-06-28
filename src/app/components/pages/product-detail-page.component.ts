import { Component, Input, OnInit, OnDestroy, inject, computed, signal, ChangeDetectionStrategy, PLATFORM_ID } from "@angular/core";
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule, DOCUMENT, isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AppStateService } from "../../app-state.service";
import { Product } from "../../models";
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ArrowLeft01Icon, StarIcon, StarHalfIcon, ArrowRight01Icon, ShoppingCart01Icon, FavouriteIcon, TruckIcon, Tick01Icon, Location01Icon, ShieldCheck, Shield01Icon, DeliveryBox01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: "app-product-detail-page",
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  
    <main class="max-w-6xl mx-auto px-4 py-8 pb-24 lg:pb-8 space-y-8 text-left page-transition">
      
      <!-- Back Breadcrumb tracker with premium border and gradient highlight -->
      <div [class]="'flex flex-wrap items-center justify-between gap-4 border-b pb-4 ' + (isCinematicGlow() ? 'border-zinc-850' : 'border-zinc-100')">
        <div class="flex items-center gap-3">
          <button (click)="goBack()" 
                  [class]="'inline-flex items-center gap-1.5 text-xs font-black transition-colors cursor-pointer px-3 py-1.5 rounded-lg border shadow-2xs ' + 
                           (isCinematicGlow() 
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' 
                            : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-950')">
            <hugeicons-icon [icon]="ArrowLeft01Icon" [size]="16" class="scale-75"  [strokeWidth]="1.5" />
            Volver a la galería
          </button>
          <span class="text-zinc-350 text-xs">/</span>
          <span [class]="'text-[10px] font-mono font-black uppercase px-2 py-1 rounded-md ' + 
                         (isCinematicGlow() ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-650')">{{ product()?.category }}</span>
        </div>
        <div class="text-[10px] font-mono text-zinc-400">
          GLASTOR ® DIRECTCO v4.11 // <span [class]="'font-bold ' + (isCinematicGlow() ? 'text-white' : 'text-zinc-900')">CP-OPTIMIZER</span>
        </div>
      </div>

      <!-- Split Layout content detail -->
      @if (product(); as product) {
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
          
          <!-- LEFT COLUMN: Image Gallery (4/12) -->
          <div class="lg:col-span-4 flex flex-col md:flex-row gap-4 lg:sticky lg:top-28">
            <!-- Thumbnails strip (Hidden on small, flex on md+) -->
            <div class="hidden md:flex flex-row md:flex-col gap-3 md:w-16 shrink-0 overflow-x-auto md:overflow-visible">
              @for (img of [product.image].concat(product.gallery || []); track img; let idx = $index) {
                <button (click)="selectedGalleryImage.set(img); selectedPerspectiveIndex.set(idx)"
                        [class]="'border rounded-lg overflow-hidden aspect-square p-1 transition-all flex items-center justify-center cursor-pointer relative shrink-0 w-16 md:w-full ' + 
                                 ((selectedGalleryImage() || product.image) === img 
                                  ? (isCinematicGlow() ? 'border-amber-500 bg-zinc-900 ring-2 ring-[#41BF84]/50' : 'border-zinc-950 bg-white ring-2 ring-zinc-900') 
                                  : (isCinematicGlow() ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300'))">
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
                   [class.bg-zinc-950]="isCinematicGlow()"
                   [class.bg-white]="!isCinematicGlow()"
                   [class.border-zinc-800]="isCinematicGlow()"
                   [class.border-zinc-200]="!isCinematicGlow()">
                
                <img [src]="selectedGalleryImage() || product.image" [alt]="product.name" referrerpolicy="no-referrer"
                     class="w-full h-full object-contain p-1 transition-all duration-700 ease-out select-none"
                     [class.scale-125]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex() === 1"
                     [class.saturate-120]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex() === 1"
                     [class.brightness-105]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex() === 1"
                     [class.contrast-120]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex() === 2"
                     [class.sepia-20]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex() === 2"
                     [class.saturate-85]="(!product.gallery || product.gallery.length === 0) && selectedPerspectiveIndex() === 2">
                
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <!-- Perspective labels overlay -->
                <div class="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wide font-medium z-10 pointer-events-none uppercase">
                  @if (selectedPerspectiveIndex() === 0) {
                    VISTA GENERAL
                  } @else if (selectedPerspectiveIndex() === 1) {
                    DETALLE MACRO
                  } @else if (selectedPerspectiveIndex() === 2) {
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
              <span class="text-xs text-[#41BF84] font-black tracking-widest uppercase cursor-pointer hover:underline" [class.text-[#41BF84]]="isCinematicGlow()">GLASTOR ® DIRECTCO</span>
              <h1 [class]="'text-2xl md:text-3xl font-black tracking-tight leading-tight font-sans ' + 
                           (isCinematicGlow() ? 'text-white' : 'text-zinc-950')">
                {{ product.name }}
              </h1>
            </div>

            <!-- Ratings & Badges -->
            <div class="flex flex-wrap items-center gap-3 border-b pb-4" [class.border-zinc-800]="isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
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
                <span class="text-xs text-[#41BF84] ml-1 hover:underline font-medium" [class.text-[#41BF84]]="isCinematicGlow()">{{ totalReviewsCount }} valoraciones</span>
              </div>
              
              @if (product.badges && product.badges.length > 0) {
                <div class="px-3 py-1 bg-zinc-800/80 border border-white/5 rounded-md text-xs font-mono uppercase tracking-widest text-zinc-300">
                  {{ parseBadge(product.badges[0]) }}
                </div>
              }
            </div>

            <!-- Variations (Simulated mapping from customizerConfig) -->


            <!-- "Sobre este artículo" Bullets -->
            <div class="space-y-4 pt-4 max-w-full">
              <h3 class="text-lg font-black uppercase tracking-widest" [class.text-white]="isCinematicGlow()" [class.text-zinc-900]="!isCinematicGlow()">Sobre este artículo</h3>
              <div class="product-description-html break-words whitespace-normal overflow-hidden w-full" 
                   [class]="'prose prose-sm max-w-none ' + (isCinematicGlow() ? 'prose-invert prose-p:text-zinc-400 prose-strong:text-white' : 'prose-p:text-zinc-600 prose-strong:text-zinc-900')" 
                   [innerHTML]="product.description">
              </div>
            </div>

            <!-- Interactive Accordion -->
            <div class="mt-8 border-t" [class.border-zinc-800]="isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
              
              <!-- Accordion Item 1: Acerca del Modelo -->
              <div class="border-b" [class.border-zinc-800]="isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
                <button (click)="toggleAccordion('ACERCA DEL MODELO')" 
                        class="w-full flex items-center gap-3 py-4 text-left focus:outline-none group">
                  <hugeicons-icon [icon]="ArrowRight01Icon" [size]="22" class="font-bold transition-transform duration-300"
                        [class.rotate-90]="expandedAccordion() === 'ACERCA DEL MODELO'"
                        [class.text-cyan-500]="isCinematicGlow()" [class.text-cyan-700]="!isCinematicGlow()"  [strokeWidth]="1.5" />
                  <span class="text-xl font-black uppercase tracking-widest" 
                        [class.text-white]="isCinematicGlow()" [class.text-black]="!isCinematicGlow()">
                    ACERCA DEL MODELO
                  </span>
                </button>
                <div class="grid transition-all duration-300"
                     [style.gridTemplateRows]="expandedAccordion() === 'ACERCA DEL MODELO' ? '1fr' : '0fr'">
                  <div class="overflow-hidden">
                    <div class="pb-6 pl-10 pr-4 text-sm leading-relaxed product-description-html" [class.text-zinc-400]="isCinematicGlow()" [class.text-zinc-600]="!isCinematicGlow()">
                      @if (product.aboutModel) {
                        <div [innerHTML]="product.aboutModel"></div>
                      } @else {
                        Este producto pertenece a la línea profesional de <span class="font-bold text-[#41BF84] capitalize">{{ product.category }}</span>. Su ingeniería ha sido optimizada para garantizar la máxima durabilidad en condiciones de alta exigencia, combinando ergonomía de vanguardia con un rendimiento industrial ininterrumpido.
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- Accordion Item 2: Caracteristicas -->
              <div class="border-b" [class.border-zinc-800]="isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
                <button (click)="toggleAccordion('FEATURES')" 
                        class="w-full flex items-center gap-3 py-4 text-left focus:outline-none group">
                  <hugeicons-icon [icon]="ArrowRight01Icon" [size]="22" class="font-bold transition-transform duration-300"
                        [class.rotate-90]="expandedAccordion() === 'FEATURES'"
                        [class.text-cyan-500]="isCinematicGlow()" [class.text-cyan-700]="!isCinematicGlow()"  [strokeWidth]="1.5" />
                  <span class="text-xl font-black uppercase tracking-widest" 
                        [class.text-white]="isCinematicGlow()" [class.text-black]="!isCinematicGlow()">
                    CARACTERÍSTICAS PRINCIPALES
                  </span>
                </button>
                <div class="grid transition-all duration-300"
                     [style.gridTemplateRows]="expandedAccordion() === 'FEATURES' ? '1fr' : '0fr'">
                  <div class="overflow-hidden">
                    <div class="pb-6 pl-10 pr-4 text-sm leading-relaxed product-description-html" [class.text-zinc-400]="isCinematicGlow()" [class.text-zinc-600]="!isCinematicGlow()">
                      <div [class]="'prose prose-sm ' + (isCinematicGlow() ? 'prose-invert' : '')" [innerHTML]="product.features"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Accordion Item 3: Especificaciones -->
              <div class="border-b" [class.border-zinc-800]="isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
                <button (click)="toggleAccordion('SPECS')" 
                        class="w-full flex items-center gap-3 py-4 text-left focus:outline-none group">
                  <hugeicons-icon [icon]="ArrowRight01Icon" [size]="22" class="font-bold transition-transform duration-300"
                        [class.rotate-90]="expandedAccordion() === 'SPECS'"
                        [class.text-cyan-500]="isCinematicGlow()" [class.text-cyan-700]="!isCinematicGlow()"  [strokeWidth]="1.5" />
                  <span class="text-xl font-black uppercase tracking-widest" 
                        [class.text-white]="isCinematicGlow()" [class.text-black]="!isCinematicGlow()">
                    ESPECIFICACIONES TÉCNICAS
                  </span>
                </button>
                <div class="grid transition-all duration-300"
                     [style.gridTemplateRows]="expandedAccordion() === 'SPECS' ? '1fr' : '0fr'">
                  <div class="overflow-hidden">
                    <div class="pb-6 pl-10 pr-4 text-sm leading-relaxed product-description-html" [class.text-zinc-400]="isCinematicGlow()" [class.text-zinc-600]="!isCinematicGlow()">
                      <div [class]="'prose prose-sm ' + (isCinematicGlow() ? 'prose-invert' : '')" [innerHTML]="product.specifications"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>

          <!-- RIGHT COLUMN: Sticky Buy Box (3/12) -->
          <div class="lg:col-span-3 lg:sticky lg:top-28 space-y-4">
            
            <div id="product-detail-pricing-cta"
                 [class]="isCinematicGlow() 
                    ? 'bg-[#050505]/60 backdrop-blur-xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]' 
                    : 'bg-white border border-zinc-200 shadow-xl'"
                 class="rounded-lg p-6 flex flex-col space-y-5 transition-all">
              
              <!-- Price Block -->
              <div class="space-y-1 text-left">
                <span class="text-[10px] font-mono text-zinc-400 block font-bold tracking-wider">PRECIO DE INVERSIÓN</span>
                <span class="text-3xl font-black font-mono flex items-baseline gap-1.5" [class.text-white]="isCinematicGlow()" [class.text-zinc-900]="!isCinematicGlow()">
                  {{ formatPrice((selectedVariantObj()?.price || product.price)) }}
                </span>
                <span class="text-[10px] text-[#41BF84] block font-bold font-mono uppercase tracking-widest">IVA del 21% incluido y envío prioritario gratuito.</span>
              </div>

              <!-- Shipping Info Mini -->
              <div class="space-y-1.5 text-xs" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">
                <div class="flex gap-2">
                  <hugeicons-icon [icon]="TruckIcon" [size]="16" [strokeWidth]="1.5" />
                  <span>Entrega GRATIS el <span class="font-bold">{{ deliveryDate() }}</span>. Realiza el pedido en <span class="text-[#41BF84] font-bold">{{ orderCountdown() }}</span>.</span>
                </div>
                <div class="flex gap-2 text-[#41BF84] cursor-pointer hover:underline mt-1">
                  <hugeicons-icon [icon]="Location01Icon" [size]="14" [strokeWidth]="1.5" />
                  <span class="font-bold text-[11px]">Enviar a Zona Logística Primaria</span>
                </div>
              </div>

              <!-- Stock status -->
              @if ((selectedVariantObj()?.stock ?? product.stock) > 0) {
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
                      <button (click)="selectedVariantId.set(v.id)"
                              [class]="'px-3 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ' + 
                                       (selectedVariantId() === v.id 
                                        ? (isCinematicGlow() ? 'border-[#41BF84] text-[#41BF84] bg-[#41BF84]/10' : 'border-[#41BF84] text-[#41BF84] bg-[#41BF84]/10') 
                                        : (isCinematicGlow() ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'))">
                        {{ v.name }}
                      </button>
                    }
                  </div>
                </div>
              }

              <!-- Quantity Selector -->
              <div class="flex flex-col gap-1">
                <select [class]="'w-full p-2.5 rounded-lg border text-sm font-bold cursor-pointer outline-none transition-colors ' + 
                                 (isCinematicGlow() ? 'bg-zinc-950 border-zinc-800 text-white focus:border-[#41BF84]' : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-500')"
                        [disabled]="(selectedVariantObj()?.stock ?? product.stock) === 0"
                        (change)="selectedQuantity.set(+$any($event.target).value)">
                  @for (qty of getQuantityOptions(selectedVariantObj()?.stock ?? product.stock); track qty) {
                    <option [value]="qty">Cantidad: {{ qty }}</option>
                  }
                </select>
              </div>

              <!-- Action buttons -->
              <div class="flex flex-col gap-3 pt-2">
                <button id="btn-detail-add-to-cart"
                        (click)="addToCart(product)"
                        [class]="'w-full py-3.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ' + 
                                 (isCinematicGlow() ? 'bg-[#41BF84] hover:bg-[#359f6b] text-black shadow-[0_0_20px_rgba(0,255,102,0.25)]' : 'bg-[#41BF84] hover:bg-[#359f6b] text-black')">
                  Añadir al carrito
                </button>
                <button (click)="addToCart(product)"
                        [class]="'w-full py-3.5 rounded-full text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ' + 
                                 (isCinematicGlow() ? 'bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-white')">
                  Comprar ahora
                </button>
              </div>

              <!-- Seller Info Matrix -->
              <div class="grid grid-cols-[1fr_2fr] gap-x-2 gap-y-1 text-[10px] pt-4" [class.text-zinc-400]="isCinematicGlow()" [class.text-zinc-600]="!isCinematicGlow()">
                <span>Remitente</span>
                <span class="font-bold" [class.text-white]="isCinematicGlow()" [class.text-zinc-900]="!isCinematicGlow()">GLASTOR ® Direct</span>
                <span>Vendedor</span>
                <span class="font-bold" [class.text-white]="isCinematicGlow()" [class.text-zinc-900]="!isCinematicGlow()">GLASTOR ® Automations</span>
                <span>Devoluciones</span>
                <span class="text-[#41BF84] cursor-pointer hover:underline">Reembolso en 30 días</span>
                <span>Atención</span>
                <span class="text-[#41BF84] cursor-pointer hover:underline">Soporte GLASTOR Care</span>
              </div>

              <!-- Add to List -->
              <div class="pt-4 border-t flex items-center gap-3" [class.border-white/10]="isCinematicGlow()">
                <button (click)="toggleWishlist(product.id, $event)"
                        [class]="'h-12 w-12 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 cursor-pointer active:scale-95 ' + 
                                 (isInWishlist(product.id) 
                                  ? (isCinematicGlow() ? 'bg-[#050505]/80 backdrop-blur-md border-[#41BF84]/30 text-[#41BF84] shadow-[0_0_15px_rgba(0,255,102,0.2)]' : 'bg-zinc-950 border-zinc-950 text-white shadow-md') 
                                  : (isCinematicGlow() ? 'bg-[#050505]/40 backdrop-blur-md border-white/10 text-zinc-400 hover:text-white hover:border-white/30' : 'bg-white border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:border-zinc-300'))">
                  <hugeicons-icon [icon]="FavouriteIcon" [size]="20" [strokeWidth]="1.5" [class]="isInWishlist(product.id) ? 'fill-current scale-110' : ''" />
                </button>
                <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold leading-tight">
                    Agregar este equipo <br> a mi lista de deseos
                </div>
              </div>
            </div>

            <!-- GOURMET SERVICES STATS -->
            <div id="product-detail-gourmet-perks" 
                 [class]="'grid grid-cols-3 gap-2 py-4 px-2 text-center text-[9px] font-black uppercase ' + 
                          (isCinematicGlow() ? 'text-zinc-400' : 'text-zinc-500')">
              <div class="space-y-1.5 flex flex-col items-center">
                <hugeicons-icon [icon]="ShieldCheck" [size]="20" [strokeWidth]="1.5" class="text-zinc-400 block mb-1" />
                <span>Transacción<br>Segura</span>
              </div>
              <div class="space-y-1.5 border-x border-dashed flex flex-col items-center" [class.border-zinc-800]="isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
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
                 [class]="'max-w-6xl mx-auto pt-10 border-t space-y-8 ' + (isCinematicGlow() ? 'border-zinc-850' : 'border-zinc-200/80')">
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <!-- Rating overview header (4 cols) -->
            <div id="rating-overview-card"
                 [class]="isCinematicGlow() ? 'bg-[#050505] border-white/5 text-white' : 'bg-zinc-50 border-zinc-200'"
                 class="md:col-span-4 border p-6 rounded-lg text-center space-y-3 transition-colors">
              <h4 class="text-[10px] font-black uppercase font-mono text-zinc-400 tracking-wider">Calificación Global</h4>
              <div class="space-y-1">
                <span class="text-4xl font-black font-mono tracking-tight" [class.text-white]="isCinematicGlow()" [class.text-zinc-950]="!isCinematicGlow()">
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
              <p class="text-[10px] text-[#41BF84] font-mono font-black uppercase tracking-widest bg-[#41BF84]/10 px-2 py-1 rounded-md inline-block">
                RECOMENDADO POR EL {{ recommendationPercent() }}%
              </p>
            </div>

            <!-- Progress bars review ratios (8 cols) -->
            <div id="rating-breakdown-panel" class="md:col-span-8 space-y-3 font-mono text-[10px]">
              @for (item of ratingBreakdown(); track item.stars) {
                <div class="flex items-center gap-4">
                  <span class="w-16 text-zinc-400 font-bold uppercase tracking-widest text-left">{{ item.stars }} Estrellas</span>
                  <div [class]="'flex-grow h-2.5 rounded-full overflow-hidden relative ' + (isCinematicGlow() ? 'bg-zinc-850' : 'bg-zinc-200/40')">
                    <div class="bg-[#41BF84] shadow-[0_0_8px_rgba(0,255,102,0.4)] h-full rounded-full transition-all duration-700" [style.width.%]="item.pct"></div>
                  </div>
                  <span class="w-8 text-right font-black" [class.text-white]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">{{ item.pct }}%</span>
                </div>
              }
            </div>

          </div>

          <div class="space-y-4">
            <div class="text-left space-y-1.5 border-b pb-3"
                 [class.border-white/5]="isCinematicGlow()"
                 [class.border-zinc-150]="!isCinematicGlow()">
              <h3 [class.text-white]="isCinematicGlow()" [class.text-zinc-950]="!isCinematicGlow()" class="text-sm font-black uppercase tracking-wider font-mono">
                Reseñas de clientes comerciales GLASTOR ®
              </h3>
              <p [class]="'text-xs font-medium ' + (isCinematicGlow() ? 'text-zinc-400' : 'text-zinc-500')">Coleccionamos impresiones directas de ferreterías, empresas y comercios para auditar la calidad distribuidora.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (rev of dynamicReviews(); track rev.author) {
                <div [class]="isCinematicGlow() ? 'bg-[#050505] border-white/5' : 'bg-white border-zinc-200/80'"
                     class="border rounded-lg p-5 space-y-3 shadow-2xs text-left transition-colors">
                  <div class="flex justify-between items-start gap-4">
                    <div class="space-y-0.5">
                      <span [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()" class="block font-black text-xs">{{ rev.author }}</span>
                      <span class="block text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">{{ rev.date }}</span>
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
                  <p [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-650]="!isCinematicGlow()" class="text-xs leading-relaxed font-sans italic">
                    "{{ rev.comment }}"
                  </p>
                </div>
              }
            </div>
          </div>
        </section>
      }

      @if (product()) {
        <!-- STICKY MOBILE BUY BAR (CRO) -->
        <div class="fixed bottom-0 left-0 right-0 lg:hidden px-4 py-3 z-50 flex items-center justify-between border-t transition-colors shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-fade-in"
             [class.bg-[#050505]]="isCinematicGlow()"
             [class.border-white/5]="isCinematicGlow()"
             [class.bg-white]="!isCinematicGlow()"
             [class.border-zinc-200]="!isCinematicGlow()">
          <div class="flex flex-col">
            <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Inversión Final</span>
            <span class="font-mono text-lg font-black leading-none" [class.text-white]="isCinematicGlow()" [class.text-zinc-900]="!isCinematicGlow()">
              {{ formatPrice((selectedVariantObj()?.price || product()!.price)) }}
            </span>
          </div>
          <button (click)="addToCart(product()!)"
                  class="bg-[#41BF84] hover:bg-[#359f6b] text-black font-black uppercase text-xs px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.4)] flex items-center gap-2 transition-all active:scale-95">
            Añadir 
            <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="18" [strokeWidth]="1.5" />
          </button>
        </div>
      }
    </main>
`
})
export class ProductDetailPageComponent implements OnInit, OnDestroy {
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  appState = inject(AppStateService);

  isCinematicGlow = this.appState.isCinematicGlow;
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

  product = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return this.appState.products().find(p => p.id === id) || null;
  });

  selectedVariantObj = computed(() => {
    const p = this.product();
    const vid = this.selectedVariantId();
    if (!p || !vid || !p.variants) return null;
    return p.variants.find((v: any) => v.id === vid) || null;
  });

  selectedVariantId = signal<string | null>(null);
  selectedGalleryImage = signal<string | null>(null);
  expandedAccordion = signal<string | null>('ACERCA DEL MODELO');
  selectedPerspectiveIndex = signal<number>(0);

  private sub: any;
  schemaScript: HTMLScriptElement | null = null;
  private timer: any;
  private platformId = inject(PLATFORM_ID);
  selectedQuantity = signal<number>(1);

  deliveryDate = signal<string>('');
  orderCountdown = signal<string>('');

  ngOnInit() {
    this.updateDynamicDelivery();
    if (typeof window !== 'undefined') {
      this.timer = setInterval(() => this.updateDynamicDelivery(), 60000);
    }
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const prod = this.product();
      if (prod) {
        // Standard Meta
        this.title.setTitle(prod.name + ' - Glastor');
        this.meta.updateTag({ name: 'description', content: prod.description });
        
        // OpenGraph & Twitter
        this.meta.updateTag({ property: 'og:title', content: prod.name + ' - Glastor' });
        this.meta.updateTag({ property: 'og:description', content: prod.description });
        if (prod.image) {
          this.meta.updateTag({ property: 'og:image', content: prod.image });
          this.meta.updateTag({ name: 'twitter:image', content: prod.image });
        }
        this.meta.updateTag({ property: 'og:type', content: 'product' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        
        if (prod.seo) {
          this.meta.updateTag({ name: 'keywords', content: prod.seo.metaTitle });
        }
        
        // Canonical (simulated)
        const canonicalUrl = 'https://glastor.com/producto/' + prod.id;
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });

        // Schema.org JSON-LD
        this.injectSchema(prod);
      }
    });
  }

  injectSchema(prod: Product) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.removeSchema(); // Clean previous if any
    
    const schema: any = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": prod.name,
      "image": prod.gallery && prod.gallery.length ? [prod.image, ...prod.gallery] : [prod.image],
      "description": prod.description,
      "sku": prod.id,
      "brand": {
        "@type": "Brand",
        "name": "GLASTOR"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://glastor.com/producto/" + prod.id,
        "priceCurrency": "ARS",
        "price": prod.price,
        "availability": prod.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
    
    // Add reviews to schema if any
    if (prod.reviews && prod.reviews.length > 0) {
      schema["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": prod.rating,
        "reviewCount": prod.reviews.length
      };
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
    this.schemaScript = script;
  }

  removeSchema() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.schemaScript && this.document.head.contains(this.schemaScript)) {
      this.document.head.removeChild(this.schemaScript);
      this.schemaScript = null;
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.timer) clearInterval(this.timer);
    this.removeSchema();
  }

  updateDynamicDelivery() {
    const now = new Date();
    const delivery = new Date(now);
    delivery.setDate(delivery.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.deliveryDate.set(delivery.toLocaleDateString('es-ES', options));

    let target = new Date(now);
    target.setHours(17, 0, 0, 0);
    if (now.getTime() > target.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    const diff = target.getTime() - now.getTime();
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.orderCountdown.set(`${hrs} hrs ${mins} mins`);
  }

  get totalReviewsCount(): number {
    const p = this.product();
    if (!p) return 180;
    const nameLen = p.name ? p.name.length : 10;
    return 180 + (nameLen * 37) % 250 + (p.reviews?.length || 0) * 15;
  }

  dynamicReviews = computed(() => {
    const product = this.product();
    if (!product) return [];

    const dbReviews = product.reviews || [];
    const extraReviews: Array<{ author: string; stars: number; date: string; comment: string }> = [];
    const name = product.name;
    const cat = product.category;

    const r = product.rating || 4.8;
    const stars1 = Math.max(3, Math.min(5, Math.round(r)));
    const stars2 = Math.max(3, Math.min(5, Math.ceil(r - 0.5)));

    if (cat === 'tecnologia' || cat === 'computacion') {
      extraReviews.push({
        author: 'Valeria G.',
        stars: stars1,
        date: '28 de May, 2026',
        comment: `La integración tecnológica de este ${name} es insuperable. La fidelidad, el ensamblaje y los acabados premium cumplen con creces los estándares digitales.`
      });
      extraReviews.push({
        author: 'Álvaro S.',
        stars: stars2,
        date: '10 de Jun, 2026',
        comment: `El ciclo térmico y la velocidad de respuesta de ${name} son de primer nivel. Un equipo robusto totalmente recomendado para flujos de trabajo avanzados.`
      });
    } else if (cat === 'herramientas') {
      extraReviews.push({
        author: 'Matías L.',
        stars: stars1,
        date: '02 de Jun, 2026',
        comment: `Increíble fuerza de apriete en todo momento. He usado este ${name} a nivel profesional diario y el motor brushless responde impecable bajo estrés industrial.`
      });
      extraReviews.push({
        author: 'Sebastián T.',
        stars: stars2,
        date: '17 de May, 2026',
        comment: `La ergonomía física de ${name} es perfecta. Balance de masas equilibrado, blindaje de carcasa de alta densidad resistente a impactos. Compra segura.`
      });
    } else {
      extraReviews.push({
        author: 'Lucía M.',
        stars: stars1,
        date: '04 de Jun, 2026',
        comment: `El ${name} es una absoluta obra de arte táctil. Queda súper minimalista y los materiales nobles empleados se sienten de altísima calidad.`
      });
      extraReviews.push({
        author: 'Fernando P.',
        stars: stars2,
        date: '12 de May, 2026',
        comment: `Sobrio, resistente y muy práctico en el día a día. Se integra perfecto en un espacio de diseño premium cuidando la ergonomía global.`
      });
    }
    return [...dbReviews, ...extraReviews];
  });

  ratingBreakdown = computed(() => {
    const product = this.product();
    if (!product) return [];

    const r = product.rating || 4.8;
    const seed = product.name ? product.name.length : 10;
    const variance = (seed % 15) - 7;

    let p5 = 0, p4 = 0, p3 = 0, p2 = 0, p1 = 0;

    if (r >= 4.8) {
      p5 = 85 + variance;
      p4 = 100 - p5 - 2 - (seed % 2);
      p3 = 100 - p5 - p4;
    } else if (r >= 4.5) {
      p5 = 70 + variance;
      p4 = 20 - Math.floor(variance / 2);
      p3 = 100 - p5 - p4 - 1 - (seed % 2);
      p2 = 100 - p5 - p4 - p3;
    } else if (r >= 4.0) {
      p5 = 55 + variance;
      p4 = 25 - Math.floor(variance / 2);
      p3 = 100 - p5 - p4 - 3 - (seed % 3);
      p2 = 100 - p5 - p4 - p3 - 1;
      p1 = 1;
    } else {
      p5 = 40 + variance;
      p4 = 30 - Math.floor(variance / 2);
      p3 = 15;
      p2 = 10;
      p1 = 100 - p5 - p4 - p3 - p2;
    }

    p5 = Math.max(0, p5);
    p4 = Math.max(0, p4);
    p3 = Math.max(0, p3);
    p2 = Math.max(0, p2);
    p1 = Math.max(0, p1);

    const diff = 100 - (p5 + p4 + p3 + p2 + p1);
    if (diff !== 0) p4 += diff; 

    return [
      { stars: 5, pct: p5 },
      { stars: 4, pct: p4 },
      { stars: 3, pct: p3 },
      { stars: 2, pct: p2 },
      { stars: 1, pct: p1 }
    ];
  });

  recommendationPercent = computed(() => {
    const breakdown = this.ratingBreakdown();
    if (breakdown.length === 0) return '0.0';
    const p5 = breakdown.find(b => b.stars === 5)?.pct || 0;
    const p4 = breakdown.find(b => b.stars === 4)?.pct || 0;
    const product = this.product();
    const decimal = product ? (product.name.length % 9) : 0;
    return `${p5 + p4}.${decimal}`;
  });

  isInWishlist(id: string): boolean {
    return this.appState.wishlist().includes(id);
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

  goBack() { this.router.navigate(['/tienda']); }
  addToCart(product: Product) { this.appState.addToCart({ product, quantity: this.selectedQuantity() }); }

  getQuantityOptions(stock: number): number[] {
    const limit = Math.min(stock, 10);
    return Array.from({ length: limit }, (_, i) => i + 1);
  }
  toggleWishlist(id: string, event: Event) { this.appState.toggleWishlist(id, event as MouseEvent); }
  toggleAccordion(section: string) { this.expandedAccordion.set(this.expandedAccordion() === section ? null : section); }
}
