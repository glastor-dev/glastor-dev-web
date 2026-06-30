import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-industries-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <section class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 font-sans bg-transparent relative">
      
      <!-- Radial masked texture background (Awwwards Style Option B) -->
      <div class="absolute inset-[-100px] bg-vanishing-stripes opacity-60 pointer-events-none -z-10" 
           style="-webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 65%); mask-image: radial-gradient(ellipse at center, black 10%, transparent 65%);">
      </div>

      <!-- Catalog Intro (High-Impact Style) -->
      <div class="relative overflow-hidden bg-[#050505] border-l-4 border-[#41BF84] mb-12 flex flex-col md:flex-row items-center justify-between p-10 md:p-20 rounded-r-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div class="z-10 relative w-full md:w-3/5 text-center md:text-left flex flex-col items-center md:items-start">
          
          <!-- High-Impact Tag -->
          <div class="mb-6 transform -skew-x-6 origin-left">
            <span class="bg-[#41BF84] text-black font-black uppercase tracking-widest text-xs px-4 py-1.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] border border-[#41BF84]/50">CATÁLOGO B2B</span>
          </div>
          
          <!-- Massive Skewed Title -->
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-white transform -skew-x-6 leading-[0.85] mb-6 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            SOLUCIONES<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#41BF84] inline-block pr-4 py-1">POR INDUSTRIA</span>
          </h2>
          
          <h3 class="glastor-subtitle max-w-lg md:ml-0 text-zinc-400 uppercase tracking-wide text-xs md:text-sm font-bold border-l-2 border-white/20 pl-4 mt-2">
            Encuentra las soluciones tecnológicas perfectas para tu sector. Equipos de alto rendimiento para entornos exigentes.
          </h3>
        </div>
        
        <!-- Intro Background Image (Harsh Contrast) -->
        <div class="absolute right-0 top-0 h-full w-full md:w-1/2 z-0 opacity-20 md:opacity-40">
          <div class="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 hidden md:block"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10 md:hidden"></div>
          <img [ngSrc]="'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'" fill
               class="object-cover grayscale contrast-150 mix-blend-screen" alt="Catalog Highlight">
        </div>
      </div>

      <!-- High-Impact Thumbnail Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4 sm:px-0">
        @for (ind of industries; track ind.id) {
          <a class="relative flex overflow-hidden cursor-pointer bg-[#050505] rounded-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(65,191,132,0.4)] hover:scale-[1.02] group border border-zinc-800 hover:border-[#41BF84] aspect-video z-0">
            
            <!-- Intense Background Glow (YouTube Style) -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#41BF84]/30 via-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen z-10 pointer-events-none"></div>

            <!-- The Image (Treated as dramatic background) -->
            <div class="absolute inset-0 z-0">
              <img [ngSrc]="ind.image" [alt]="ind.name" fill referrerpolicy="no-referrer"
                   class="object-cover w-full h-full opacity-60 grayscale-[80%] contrast-125 transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110">
              
              <!-- Vignette & Darkening overlay for text readability -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            </div>

            <!-- Massive Impact Text Area -->
            <div class="relative z-20 flex flex-col justify-end p-6 md:p-8 h-full w-full">
              <!-- Subtitle Badge (Floating tag style) -->
              <div class="mb-3 transform -skew-x-6 origin-left transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                <span class="bg-[#41BF84] text-black font-black uppercase tracking-widest text-[10px] md:text-xs px-3 py-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">{{ ind.subtitle }}</span>
              </div>
              
              <!-- Main Title (Massive 3D text style) -->
              <h4 class="text-2xl md:text-3xl xl:text-4xl font-black uppercase italic tracking-tighter text-white transform -skew-x-6 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#b8f0d4] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-[0.9] group-hover:scale-105 origin-left">
                {{ ind.name }}
              </h4>
            </div>
            
            <!-- Floating "Play" or Action Icon -->
            <div class="absolute top-4 right-4 z-20 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
              <div class="w-10 h-10 rounded-full bg-[#41BF84] text-black flex items-center justify-center shadow-[0_0_20px_rgba(65,191,132,0.6)]">
                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </a>
        }
      </div>

    </section>
  `
})
export class IndustriesSectionComponent {
  industries = [
    { id: 1, name: 'Logística', subtitle: 'Conectividad y Escaneo', image: 'assets/logos/logistica.webp' },
    { id: 2, name: 'Manufactura', subtitle: 'Automatización', image: 'assets/logos/manufactura.webp' },
    { id: 3, name: 'Retail', subtitle: 'Puntos de Venta POS', image: 'assets/logos/retail.webp' },
    { id: 4, name: 'Agencia', subtitle: 'Creative Studios', image: 'assets/logos/agencia.webp' },
    { id: 5, name: 'Corporativo', subtitle: 'Smart Workplaces', image: 'assets/logos/corporativo.webp' },
    { id: 6, name: 'Construcción', subtitle: 'Equipos Robustos', image: 'assets/logos/construccion.webp' }
  ];
}
