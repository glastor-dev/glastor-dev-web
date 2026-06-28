import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bento-categories-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 mt-24 sm:mt-32 mb-10 font-sans relative z-10">
      
      <!-- Section Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="h-px bg-[#41BF84] w-8 md:w-12"></div>
        <span class="text-[#41BF84] font-mono text-[10px] uppercase font-black tracking-widest">
          EXPLORAR POR CATEGORÍA
        </span>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        
        <!-- Category 1 (Large) -->
        <div (click)="onCategoryClick('herramientas')"
             class="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer">
          <img src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1200&auto=format&fit=crop" 
               alt="Herramientas" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6">
            <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase tracking-widest mb-2 block">// CATEGORÍA 01</span>
            <h3 class="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none">Herramientas</h3>
          </div>
        </div>

        <!-- Category 2 (Small) -->
        <div (click)="onCategoryClick('computacion')"
             class="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" 
               alt="Computación" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-5 left-5 right-5">
            <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase tracking-widest mb-1 block">// CATEGORÍA 02</span>
            <h3 class="text-xl md:text-2xl font-black uppercase text-white tracking-tighter leading-none">Computación</h3>
          </div>
        </div>

        <!-- Category 3 (Tall) -->
        <div (click)="onCategoryClick('tecnologia')"
             class="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
               alt="Tecnología" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6">
            <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase tracking-widest mb-2 block">// CATEGORÍA 03</span>
            <h3 class="text-2xl md:text-4xl font-black uppercase text-white tracking-tighter leading-none">Tecnología</h3>
          </div>
        </div>

        <!-- Category 4 (Small) -->
        <div (click)="onCategoryClick('accesorios')"
             class="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer">
          <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop" 
               alt="Accesorios" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-5 left-5 right-5">
            <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase tracking-widest mb-1 block">// CATEGORÍA 04</span>
            <h3 class="text-xl md:text-2xl font-black uppercase text-white tracking-tighter leading-none">Accesorios</h3>
          </div>
        </div>

        <!-- Category 5 (Medium/Wide) -->
        <div (click)="onCategoryClick('construccion')"
             class="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer">
          <img src="https://images.unsplash.com/photo-1541888081622-63b71db421bd?q=80&w=1200&auto=format&fit=crop" 
               alt="Construcción" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6">
            <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase tracking-widest mb-2 block">// CATEGORÍA 05</span>
            <h3 class="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter leading-none">Construcción</h3>
          </div>
        </div>

        <!-- Category 6 (Medium/Wide) -->
        <div (click)="onCategoryClick('industrial')"
             class="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
               alt="Industrial" 
               class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-6 left-6 right-6">
            <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase tracking-widest mb-2 block">// CATEGORÍA 06</span>
            <h3 class="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter leading-none">Industrial</h3>
          </div>
        </div>

      </div>
    </section>
  `
})
export class BentoCategoriesSectionComponent {
  @Output() navigateToCategory = new EventEmitter<string>();

  onCategoryClick(categoryId: string) {
    this.navigateToCategory.emit(categoryId);
  }
}
