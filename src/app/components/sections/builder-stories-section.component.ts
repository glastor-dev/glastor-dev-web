import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ShoppingCart01Icon, FavouriteIcon, PlayIcon } from '@hugeicons/core-free-icons';

interface Story {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-builder-stories-section',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent, NgOptimizedImage],
  template: `
    <section class="w-full bg-[#050505] relative border-y border-white/5 font-sans overflow-hidden py-12 md:py-16">
      
      <!-- Subtle grunge/noise background overlay -->
      <div class="absolute inset-0 z-0 opacity-[0.04] mix-blend-screen pointer-events-none"
           style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);">
      </div>

      <!-- Section Header -->
      <div class="max-w-7xl mx-auto px-4 relative z-10 mb-12">
        <div class="text-left space-y-2">
          <span class="text-[10px] font-mono tracking-widest text-[#41BF84] uppercase font-black block">HISTORIAS GLASTOR</span>
          <h2 class="glastor-h1 text-white">
            CONSTRUYO PORQUE
          </h2>
          <p class="text-sm md:text-base text-zinc-400 max-w-lg mt-6 font-light">
            Descubre las historias de los profesionales que desafían los límites. Conoce sus proyectos, su pasión y por qué eligen Glastor para construir su legado.
          </p>
        </div>
      </div>

      <!-- Thumbnails Strip -->
      <div class="max-w-7xl mx-auto px-4 relative z-10 mb-12 hidden md:block">
        <div class="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x">
          
          @for (story of stories; track story.id) {
            <div (click)="setActiveStory(story)" 
                 class="w-48 h-28 shrink-0 relative rounded-sm overflow-hidden cursor-pointer group transition-all snap-start"
                 [ngClass]="activeStory().id === story.id ? 'border-b-4 border-[#41BF84] grayscale-0' : 'border-b-4 border-transparent hover:border-zinc-500 grayscale hover:grayscale-0'">
              
              @if (story.isNew) {
                <div class="absolute top-0 left-0 bg-white text-black text-[10px] font-mono font-black uppercase px-2 py-0.5 z-20 tracking-wider">NUEVO</div>
              }
              <div class="absolute inset-0 transition-all z-10"
                   [ngClass]="activeStory().id === story.id ? 'bg-black/40 group-hover:bg-transparent' : 'bg-black/60 group-hover:bg-transparent'"></div>
              <img [ngSrc]="story.image" [alt]="story.name" fill class="object-cover">
              <div class="absolute bottom-2 left-0 w-full text-center z-20">
                <span class="text-white text-[10px] font-bold uppercase tracking-wider drop-shadow-md">{{ story.name }}</span>
              </div>
            </div>
          }

        </div>
      </div>

      <!-- Featured Story Section -->
      <div class="max-w-7xl mx-auto px-4 relative z-10 mb-20 flex flex-col md:flex-row gap-8 md:gap-16 items-center min-h-[400px]">
        
        <!-- Left: Text content -->
        <div class="w-full md:w-5/12 text-left animate-fade-in">
          <h2 class="glastor-h1 text-white mb-6">
            {{ activeStory().title }}
          </h2>
          <p class="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-8 max-w-md">
            {{ activeStory().description }}
          </p>
        </div>

        <!-- Right: Main Video Cover -->
        <div class="w-full md:w-7/12 relative group cursor-pointer animate-fade-in">
          <!-- The Badge Overlapping -->
          <div class="absolute -top-6 -left-6 md:-left-12 z-30">
            <div class="bg-[#41BF84] text-black font-black uppercase text-2xl md:text-3xl px-4 py-1 italic transform -skew-x-12 inline-block shadow-lg">
              CONSTRUIMOS
            </div>
            <br>
            <div class="bg-black text-white font-black uppercase text-2xl md:text-3xl px-4 py-1 italic transform -skew-x-12 inline-block shadow-lg border-l-4 border-[#41BF84] mt-1">
              PORQUE
            </div>
            <br>
            <div class="bg-zinc-900 text-[#41BF84] font-mono font-bold uppercase text-[10px] tracking-widest px-3 py-1 inline-block mt-2">
              FIRE RISK MANAGEMENT
            </div>
          </div>

          <!-- Video Image -->
          <div (click)="isVideoModalOpen.set(true)" class="relative overflow-hidden border border-white/10 shadow-2xl block group cursor-pointer w-full h-full aspect-video">
            <img [ngSrc]="activeStory().image" fill
                 [alt]="activeStory().title" class="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700">
            
            <!-- Play Overlay -->
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div class="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:bg-[#41BF84] group-hover:border-[#41BF84] group-hover:text-black text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 ml-2">
                  <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Tool Exhibition Divider (Restored small divider for tools) -->
      <div class="max-w-7xl mx-auto px-4 relative z-10 mb-10 flex items-center justify-center">
        <div class="h-px bg-white/20 w-12 md:w-24"></div>
        <h3 class="font-bold text-xl md:text-2xl text-white uppercase tracking-wider mx-6 text-center">
          HERRAMIENTAS UTILIZADAS
        </h3>
        <div class="h-px bg-white/20 w-12 md:w-24"></div>
      </div>

      <!-- Tools Grid (Adapted to Glastor Dark Theme) -->
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          @for (product of tools; track product.id) {
            <div class="bg-[#0a0a0a] border border-white/5 hover:border-white/20 rounded-lg p-5 flex flex-col items-center justify-between group cursor-pointer transition-all duration-300 relative h-full">
              
              <!-- Heart -->
              <button (click)="onToggleWishlist(product.id, $event)" class="absolute top-4 right-4 text-zinc-500 hover:text-rose-500 z-10 transition-colors">
                <hugeicons-icon [icon]="FavouriteIcon" [size]="18" [class.text-rose-500]="wishlist.includes(product.id)" [strokeWidth]="1.5" />
              </button>

              <!-- Image Area -->
              <div class="w-full h-32 md:h-40 relative flex items-center justify-center mb-6">
                <!-- Drop shadow behind image for depth -->
                <div class="absolute inset-0 bg-[#41BF84]/10 blur-xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img [src]="product.image" [alt]="product.name" class="max-h-full max-w-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
              </div>

              <!-- Product Info -->
              <div class="w-full text-left space-y-2 mt-auto">
                <span class="text-[10px] font-mono text-[#41BF84] font-bold uppercase">{{ product.category || 'INDUSTRIAL' }}</span>
                <h4 class="text-white text-sm font-bold leading-tight">{{ product.name }}</h4>
                <!-- Price and Cart -->
                <div class="flex justify-between items-end pt-2">
                  <span class="text-zinc-300 font-mono text-xs font-bold">{{ formatPrice(product.price) }}</span>
                  <button (click)="onAddToCart(product); $event.stopPropagation()" 
                          class="text-zinc-400 hover:text-[#41BF84] transition-colors">
                    <hugeicons-icon [icon]="ShoppingCart01Icon" [size]="18" [strokeWidth]="1.5" />
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- VIDEO MODAL OVERLAY -->
      @if (isVideoModalOpen() && safeVideoUrl()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <!-- Close button -->
          <button (click)="isVideoModalOpen.set(false)" 
                  class="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-[#41BF84] flex items-center justify-center text-white hover:text-black transition-colors z-50 cursor-pointer border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <!-- Iframe container -->
          <div class="w-full max-w-5xl aspect-video px-4 md:px-0">
            <iframe [src]="safeVideoUrl()" 
                    class="w-full h-full rounded-lg shadow-2xl border border-white/10 bg-black" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture" 
                    allowfullscreen>
            </iframe>
          </div>
        </div>
      }

    </section>
  `
})
export class BuilderStoriesSectionComponent {
  private appState = inject(AppStateService);
  private sanitizer = inject(DomSanitizer);

  @Input() tools: any[] = [];
  @Input() wishlist: string[] = [];

  @Output() navigate = new EventEmitter<{view: string, id?: string}>();
  @Output() addToCart = new EventEmitter<any>();
  @Output() toggleWishlist = new EventEmitter<{id: string, event: Event}>();

  ShoppingCart01Icon = ShoppingCart01Icon;
  FavouriteIcon = FavouriteIcon;

  stories: Story[] = [
    {
      id: 'mitch',
      name: 'Mitch Kelly',
      title: 'MITCH KELLY',
      description: 'Mitch Kelly, de Kelly & Son Crazy Painters, ha creado arte automotriz por décadas en Bellflower, California. Descubra porque Mitch y su padre Tom construyen, al combinar sus talentos únicos para crear autos de exposición exquisitamente detallados en este breve clip.',
      image: 'https://cdn.makitatools.com/apps/wms/stories/ibuildbecause/img/builders/thumbnail/thumb-mitch.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=eNTCdcNHtIQ',
      isNew: true
    },
    {
      id: 'betties',
      name: 'Build It Betties',
      title: 'BUILD IT BETTIES',
      description: 'Megan Pogoda es la impulsora de Build it Betties, un taller de manualidades y construcción que enseña a las mujeres habilidades prácticas de construcción. Las habilidades de Megan en materia de construcción y diseño se combinan con una amplia experiencia creativa. La inspiración para crear Build It Betties surgió de forma natural cuando Megan decidió embarcarse en la construcción de su propia minicasa. En esta nueva edición de Build Because, descubre cómo Megan llega a mujeres de todos los ámbitos de la vida para compartir su pasión.',
      image: 'https://cdn.makitatools.com/apps/wms/stories/ibuildbecause/img/builders/thumbnail/thumb-betties.jpg',
      videoUrl: 'https://youtube.com/watch?v=-1H9LoSPS5c'
    },
    {
      id: 'levi',
      name: 'Levi Hylton',
      title: 'LEVI HYLTON',
      description: 'Como director de programa para Skate Wild, Levi Hylton ha creado un espacio donde puede combinar su amor por el skateboarding con su sed de conocimiento y le brinda la oportunidad de compartir esta pasión con otros. En este episodio de "Build Because" Levi nos lleva a las zonas boscosas del norte de California para compartir su pasión por el skateboarding y ser un buen guardián de la naturaleza. Vea cómo Levi utiliza las herramientas Glastor para inspirar a la juventud a deslizarse por rampas de skateboard y conectar con la naturaleza.',
      image: 'https://cdn.makitatools.com/apps/wms/stories/ibuildbecause/img/builders/thumbnail/thumb-levi.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=NT9SsoY6jR0'
    },
    {
      id: 'jeremy',
      name: 'Jeremy Mack',
      title: 'JEREMY MACK',
      description: 'Viaje al norte del estado de Nueva York y conozca a Jeremy Mack, quien tenía un plan sencillo: comprar una propiedad para renovar una estructura existente y rejuvenecer la tierra utilizando herramientas y equipos Glastor. En este episodio de "Build Because", Jeremy nos lleva a un viaje que es mucho más que el destino. Descubra cómo Jeremy utiliza las herramientas Glastor para reconstruir una estructura, rejuvenecer la tierra y crecer como persona.',
      image: 'https://cdn.makitatools.com/apps/wms/stories/ibuildbecause/img/builders/thumbnail/thumb-jeremy.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=JgwRlr_eFC4'
    },
    {
      id: 'megz',
      name: 'Aunty Megz',
      title: 'AUNTY MEGZ',
      description: 'Entra en el vibrante taller de Megan Godinez, también conocida como la Tía Megz, en Kaneohe, Oahu, donde la cultura del surf se fusiona con la artesanía. En este episodio de "Build Because", Megz comparte su pasión por moldear tablas de surf, surfear con el alma y romper barreras en una industria dominada por hombres. Con las herramientas Glastor y su padre Rex a su lado, ella construye más que tablas: construye confianza, comunidad y cambio. Míralo ahora y súbete a la ola del empoderamiento, el amor propio y la creatividad.',
      image: 'https://cdn.makitatools.com/apps/wms/stories/ibuildbecause/img/builders/thumbnail/thumb-megz.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Aeju0xt8sNo'
    }
  ];

  activeStory = signal<Story>(this.stories[0]);
  isVideoModalOpen = signal(false);

  safeVideoUrl = computed(() => {
    const url = this.activeStory().videoUrl;
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    if (videoId) {
      // Usar URL embed con autoplay y otras opciones limpias
      const embedUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return null;
  });

  setActiveStory(story: Story) {
    this.activeStory.set(story);
  }

  formatPrice(value: number): string {
    if (value == null) return '';
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1];
    if (decimalPart === '00') return '$ ' + integerPart;
    return '$ ' + integerPart + ',' + decimalPart;
  }

  onAddToCart(product: any) {
    this.addToCart.emit(product);
  }

  onToggleWishlist(id: string, event: Event) {
    this.toggleWishlist.emit({id, event});
  }
}
