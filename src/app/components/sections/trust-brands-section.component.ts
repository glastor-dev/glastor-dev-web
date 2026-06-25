import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-brands-section',
  standalone: true,
  template: `
    <section class="w-full border-y border-white/5 bg-zinc-950/40 py-10 overflow-hidden relative group">
      <!-- Gradient Fades for infinite effect -->
      <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 mb-6">
        <span class="text-[10px] uppercase font-mono tracking-[0.2em] text-zinc-500 font-bold">Distribuidor Oficial Autorizado</span>
      </div>

      <div class="marquee-container flex overflow-hidden group">
        <!-- Original Track -->
        <div class="marquee-track flex shrink-0 gap-16 md:gap-24 items-center pr-16 md:pr-24 opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
          <img src="assets/logos/Honeywell_logo.svg" alt="Honeywell" class="h-6 md:h-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg" alt="Samsung" class="h-4 md:h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/Milwaukee_Logo.svg" alt="Milwaukee" class="h-8 md:h-10 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="AWS" class="h-6 md:h-8 object-contain invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/zebra-technologies-logo.svg" alt="Zebra" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/datalogic.svg" alt="Datalogic" class="h-10 md:h-14 object-contain invert" />
          <!-- Repeating to prevent gap -->
          <img src="assets/logos/Honeywell_logo.svg" alt="Honeywell" class="h-6 md:h-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg" alt="Samsung" class="h-4 md:h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/Milwaukee_Logo.svg" alt="Milwaukee" class="h-8 md:h-10 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="AWS" class="h-6 md:h-8 object-contain invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/zebra-technologies-logo.svg" alt="Zebra" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/datalogic.svg" alt="Datalogic" class="h-10 md:h-14 object-contain invert" />
        </div>
        <!-- Duplicate Track -->
        <div class="marquee-track flex shrink-0 gap-16 md:gap-24 items-center pr-16 md:pr-24 opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100" aria-hidden="true">
          <img src="assets/logos/Honeywell_logo.svg" alt="Honeywell" class="h-6 md:h-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg" alt="Samsung" class="h-4 md:h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/Milwaukee_Logo.svg" alt="Milwaukee" class="h-8 md:h-10 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="AWS" class="h-6 md:h-8 object-contain invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/zebra-technologies-logo.svg" alt="Zebra" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/datalogic.svg" alt="Datalogic" class="h-10 md:h-14 object-contain invert" />
          <!-- Repeating to prevent gap -->
          <img src="assets/logos/Honeywell_logo.svg" alt="Honeywell" class="h-6 md:h-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg" alt="Samsung" class="h-4 md:h-6 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/Milwaukee_Logo.svg" alt="Milwaukee" class="h-8 md:h-10 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="AWS" class="h-6 md:h-8 object-contain invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/zebra-technologies-logo.svg" alt="Zebra" class="h-6 md:h-8 object-contain invert" />
          <img src="assets/logos/datalogic.svg" alt="Datalogic" class="h-10 md:h-14 object-contain invert" />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .marquee-container {
      display: flex;
      width: 100%;
    }
    
    .marquee-track {
      animation: marquee 25s linear infinite;
    }

    .marquee-container:hover .marquee-track {
      animation-play-state: paused;
    }

    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `]
})
export class TrustBrandsSectionComponent {}
