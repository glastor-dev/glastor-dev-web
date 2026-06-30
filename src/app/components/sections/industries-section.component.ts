import { Component, OnInit, HostListener } from '@angular/core';
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

      <!-- Catalog Intro -->
      <div class="relative overflow-hidden bg-zinc-900/40 border border-white/5 mb-12 flex flex-col md:flex-row items-center justify-between p-10 md:p-24 rounded-lg shadow-2xl">
        <div class="z-10 relative w-full md:w-3/5 text-center md:text-left">
          <h5 class="glastor-h5 mb-4">CATÁLOGO B2B</h5>
          <h2 class="glastor-h1 mb-6">Soluciones por<br><span class="italic font-serif text-white/70">Industria</span></h2>
          <h3 class="glastor-subtitle max-w-lg md:ml-0">
            Encuentra las soluciones tecnológicas perfectas para tu sector. Equipos de alto rendimiento para entornos exigentes.
          </h3>
          <button (click)="randomizeGrid()" 
                  class="mt-10 bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all duration-500 mx-auto md:ml-0 block md:inline-block font-mono">
            Reorganizar Cuadrícula
          </button>
        </div>
        
        <!-- Intro Background Image -->
        <div class="absolute right-0 top-0 h-full w-1/2 z-0 hidden md:block">
          <div class="absolute inset-0 bg-gradient-to-r from-zinc-900/40 to-transparent z-10"></div>
          <img [ngSrc]="'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'" fill
               class="object-cover opacity-30 grayscale mix-blend-luminosity" alt="Catalog Highlight">
        </div>
      </div>

      <!-- Grid Wrapper -->
      <div class="relative w-full">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] auto-rows-[250px] grid-flow-dense gap-6">
          
          @for (ind of industries; track ind.id) {
            <a class="relative overflow-hidden cursor-pointer bg-[#0a0a0a] rounded-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:z-10 group border border-white/5 hover:border-white/20"
               [style.grid-column]="'span ' + ind.spanCols" 
               [style.grid-row]="'span ' + ind.spanRows">
               
              <!-- Image Area (Full coverage, hidden until hover) -->
              <div class="absolute inset-0 overflow-hidden bg-zinc-900">
                <img [ngSrc]="ind.image" [alt]="ind.name" fill referrerpolicy="no-referrer"
                     class="object-cover transition-all duration-700 opacity-0 group-hover:opacity-40 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0">
              </div>

              <!-- Text Area (Center aligned, slides up on hover) -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                <h4 class="glastor-h4 m-0 transition-transform duration-500 group-hover:-translate-y-2">{{ ind.name }}</h4>
                <h5 class="glastor-h5 mt-3 transition-transform duration-500 group-hover:-translate-y-2 text-zinc-400">{{ ind.subtitle }}</h5>
                
                <!-- Reveal Link -->
                <div class="absolute bottom-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <span class="text-[11px] font-mono tracking-widest text-white border-b border-white/30 pb-1 uppercase hover:border-white transition-colors">VER SOLUCIONES &rarr;</span>
                </div>
              </div>
            </a>
          }

        </div>
      </div>

    </section>
  `
})
export class IndustriesSectionComponent implements OnInit {
  
  industries = [
    { id: 1, name: 'Logística', subtitle: 'Conectividad y Escaneo', image: 'assets/logos/logistica.webp', spanCols: 1, spanRows: 1 },
    { id: 2, name: 'Manufactura', subtitle: 'Automatización', image: 'assets/logos/manufactura.webp', spanCols: 2, spanRows: 2 },
    { id: 3, name: 'Retail', subtitle: 'Puntos de Venta POS', image: 'assets/logos/retail.webp', spanCols: 1, spanRows: 2 },
    { id: 4, name: 'Agencia', subtitle: 'Creative Studios', image: 'assets/logos/agencia.webp', spanCols: 1, spanRows: 1 },
    { id: 5, name: 'Corporativo', subtitle: 'Smart Workplaces', image: 'assets/logos/corporativo.webp', spanCols: 1, spanRows: 1 },
    { id: 6, name: 'Construcción', subtitle: 'Equipos Robustos', image: 'assets/logos/construccion.webp', spanCols: 1, spanRows: 2 }
  ];

  ngOnInit() {
    this.randomizeGrid();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 768) {
      // Reset spans on mobile
      this.industries = this.industries.map(ind => ({
        ...ind,
        spanCols: 1,
        spanRows: 1
      }));
    }
  }

  randomizeGrid() {
    if (window.innerWidth > 768) {
      this.industries = this.industries.map(ind => {
        // Randomize between 1 and 2 for columns, and 1 and 2 for rows to simulate the CodePen dense flow
        const colSpan = 1 + Math.floor(Math.random() * 2);
        const rowSpan = 1 + Math.floor(Math.random() * 2);
        return {
          ...ind,
          spanCols: colSpan,
          spanRows: rowSpan
        };
      });
    }
  }
}

