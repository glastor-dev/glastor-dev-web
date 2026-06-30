import { Component, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { NgOptimizedImage } from '@angular/common';

interface Slide {
  id: string;
  tag: string;
  title1: string;
  title2: string;
  description: string;
  bgImage: string;
}

interface HeroDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  offsetTop: number;
  offsetLeft: number;
  cardWidth: number;
  cardHeight: number;
  gap: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgOptimizedImage],
  styleUrl: './hero-section.component.css',
  template: `
    <div #heroContainer class="hero-container relative w-full h-[650px] md:h-[750px] overflow-hidden bg-[#0D0D0D] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5">
      
      <!-- Mobile Static Hero (Visible only on small screens) -->
      <div class="block md:hidden absolute inset-0 bg-[#050505] z-50">
        <img [ngSrc]="slides[0].bgImage" fill priority class="absolute inset-0 object-cover" alt="Glastor" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        
        <div class="absolute inset-0 flex flex-col justify-end px-6 pb-12 z-10">
          <div class="mb-4 transform -skew-x-6 origin-left w-fit">
            <span class="bg-[#41BF84] text-black font-black uppercase tracking-widest text-xs px-3 py-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">{{ slides[0].tag }}</span>
          </div>
          <h1 class="font-display font-black text-[clamp(2rem,10vw,4.5rem)] max-w-full break-words whitespace-normal text-white uppercase italic leading-[0.85] tracking-tighter mb-4 transform -skew-x-6 origin-left drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            {{ slides[0].title1 }}<br/>{{ slides[0].title2 }}
          </h1>
          <p class="text-zinc-400 text-xs mb-6">{{ slides[0].description }}</p>
          <div class="flex flex-col gap-3">
            <a href="/tienda" class="w-full bg-[#41BF84] text-black font-black uppercase tracking-widest py-3.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex justify-center items-center transform -skew-x-6 active:scale-95 transition-transform" (click)="onNavigate('tienda'); $event.preventDefault()">
              Explorar Catálogo
            </a>
            <a href="mailto:ventas@glastor.es" class="w-full border border-[#41BF84]/40 text-[#41BF84] font-mono font-bold uppercase tracking-widest py-3 flex justify-center items-center text-xs transform -skew-x-6 active:scale-95 transition-all hover:bg-[#41BF84]/10">
              Solicitar cotización →
            </a>
          </div>
        </div>
      </div>

      <!-- Desktop Interactive Hero -->
      <div class="hidden md:block absolute inset-0">
        <div class="indicator"></div>

      @for (slide of slides; track slide.id; let i = $index) {
        <div class="card" [id]="'card' + i">
          <img [ngSrc]="slide.bgImage" fill [priority]="i === 0" class="object-cover object-center" alt="" />
        </div>
        <div class="card-content hidden md:block" [id]="'card-content-' + i">
          <div class="content-start"></div>
          <div class="content-place">{{ slide.tag }}</div>
          <div class="content-title-1">{{ slide.title1 }}</div>
          <div class="content-title-2">{{ slide.title2 }}</div>
        </div>
      }

      <div class="details" id="details-even">
        <div class="place-box"><div class="text"></div></div>
        <h1 class="title-box-1"><div class="title-1"></div></h1>
        <h2 class="title-box-2"><div class="title-2"></div></h2>
        <div class="desc"></div>
        <div class="cta">
          <button class="bookmark" (click)="onNavigate('tienda')" aria-label="Guardar Favorito">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
            </svg>
          </button>
          <a href="/tienda" class="discover flex items-center justify-center" (click)="onNavigate('tienda'); $event.preventDefault()">Explorar Catálogo</a>
          <a href="mailto:ventas@glastor.es" class="quote-cta">Cotizar →</a>
        </div>
      </div>

      <div class="details" id="details-odd">
        <div class="place-box"><div class="text"></div></div>
        <h1 class="title-box-1"><div class="title-1"></div></h1>
        <h2 class="title-box-2"><div class="title-2"></div></h2>
        <div class="desc"></div>
        <div class="cta">
          <button class="bookmark" (click)="onNavigate('tienda')" aria-label="Guardar Favorito">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
            </svg>
          </button>
          <a href="/tienda" class="discover flex items-center justify-center" (click)="onNavigate('tienda'); $event.preventDefault()">Explorar Catálogo</a>
          <a href="mailto:ventas@glastor.es" class="quote-cta">Cotizar →</a>
        </div>
      </div>

      <div class="pagination" id="pagination">
        <div class="arrow arrow-left hidden md:grid">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div class="arrow arrow-right hidden md:grid">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div class="progress-sub-container hidden md:flex">
          <div class="progress-sub-background">
            <div class="progress-sub-foreground"></div>
          </div>
        </div>
        <div class="slide-numbers hidden md:block" id="slide-numbers">
          @for (slide of slides; track slide.id; let i = $index) {
            <div class="item" [id]="'slide-item-' + i">{{ i + 1 }}</div>
          }
        </div>
      </div>

        <div class="cover"></div>
      </div>
    </div>
  `
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {
  @Output() navigate = new EventEmitter<string>();
  @ViewChild('heroContainer') heroContainer!: ElementRef<HTMLDivElement>;

  private ctx!: gsap.Context;
  private order: number[] = [0, 1, 2, 3];
  private detailsEven = true;
  private isAnimating = false;
  private resizeTimer: any;

  slides: Slide[] = [
    {
      id: 'slide-1',
      tag: 'INGENIERÍA DE VANGUARDIA',
      title1: 'PURA',
      title2: 'FUERZA',
      description: 'Potencia algorítmica y física al servicio de la construcción moderna. Equipos de ultra-alto rendimiento.',
      bgImage: 'assets/logos/h1.webp'
    },
    {
      id: 'slide-2',
      tag: 'ARQUITECTURA LXT',
      title1: 'ALTO',
      title2: 'DESEMPEÑO',
      description: 'El sistema de baterías más versátil del mundo. Una sola batería, infinitas posibilidades para la industria pesada.',
      bgImage: 'assets/logos/h2.webp'
    },
    {
      id: 'slide-3',
      tag: 'PROTOCOLO XGT',
      title1: 'FUERZA',
      title2: 'CINÉTICA',
      description: 'Soluciones de 40V Max diseñadas para aplicaciones de alta demanda. La transición definitiva hacia el futuro inalámbrico.',
      bgImage: 'assets/logos/h3.webp'
    },
    {
      id: 'slide-4',
      tag: 'CALIDAD GLASTOR®',
      title1: 'INTEGRIDAD',
      title2: 'ABSOLUTA',
      description: 'Ingeniería de precisión con motores magnéticos sin escobillas. Mayor vida útil, menor mantenimiento y eficiencia premium.',
      bgImage: 'assets/logos/h4.webp'
    }
  ];

  onNavigate(view: string) {
    this.navigate.emit(view);
  }

  ngAfterViewInit() {
    // Delay GSAP initialization slightly to unblock the main thread during initial render (TBT optimization)
    setTimeout(() => {
      this.ctx = gsap.context(() => {
        this.initAnimation();
        window.addEventListener('resize', this.onResize);
      }, this.heroContainer.nativeElement);
    }, 100);
  }

  ngOnDestroy() {
    clearTimeout(this.resizeTimer);
    window.removeEventListener('resize', this.onResize);
    this.ctx?.revert();
  }

  // ── Debounced resize to avoid triggering on every pixel change ──
  private onResize = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.ctx.revert();
      this.order = [0, 1, 2, 3];
      this.detailsEven = true;
      this.isAnimating = false;
      this.initAnimation();
    }, 200);
  };

  // ── Single source of truth for all layout dimensions ──
  private getDimensions(): HeroDimensions {
    const { width, height } = this.heroContainer.nativeElement.getBoundingClientRect();
    const isMobile = width < 768;
    return {
      width,
      height,
      isMobile,
      offsetTop:  isMobile ? height - 200 : height - 320,
      offsetLeft: isMobile ? width - 150  : width - 600,
      cardWidth:  isMobile ? 120 : 160,
      cardHeight: isMobile ? 160 : 240,
      gap:        isMobile ? 15  : 30,
    };
  }

  // ── Cached DOM helpers — query once, reuse everywhere ──
  private getCard        = (i: number) => `#card${i}`;
  private getCardContent = (i: number) => `#card-content-${i}`;
  private getSliderItem  = (i: number) => `#slide-item-${i}`;

  private initAnimation() {
    const { width, height, isMobile, offsetTop, offsetLeft, cardWidth, cardHeight, gap } = this.getDimensions();
    const ease = 'sine.inOut';
    const numberSize = 50;

    const [active, ...rest] = this.order;
    const detailsActive   = this.detailsEven ? '#details-even' : '#details-odd';
    const detailsInactive = this.detailsEven ? '#details-odd'  : '#details-even';

    gsap.set('#pagination', {
      top: isMobile ? height - 80 : offsetTop + cardHeight + 20,
      left: isMobile ? 20 : offsetLeft,
      y: 200, opacity: 0, zIndex: 60,
    });

    gsap.set(this.getCard(active),        { x: 0, y: 0, width, height, borderRadius: 0 });
    gsap.set(this.getCardContent(active), { x: 0, y: 0, opacity: 0 });

    gsap.set(detailsActive,                { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive,              { opacity: 0, zIndex: 12 });
    gsap.set(detailsInactive + ' .text',   { y: 100 });
    gsap.set(detailsInactive + ' .title-1',{ y: 100 });
    gsap.set(detailsInactive + ' .title-2',{ y: 100 });
    gsap.set(detailsInactive + ' .desc',   { y: 50 });
    gsap.set(detailsInactive + ' .cta',    { y: 60 });

    gsap.set('.progress-sub-foreground', {
      width: ((1 / this.order.length) * (active + 1) * 100) + '%',
    });

    rest.forEach((i, index) => {
      const x = offsetLeft + 400 + index * (cardWidth + gap);
      gsap.set(this.getCard(i),        { x, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 20 });
      gsap.set(this.getCardContent(i), { x, zIndex: 40, y: offsetTop + cardHeight - 60 });
      gsap.set(this.getSliderItem(i),  { x: (index + 1) * numberSize });
    });

    gsap.set('.indicator', { x: -width });

    const startDelay = 0.6;
    const initialDuration = 1.2;
    gsap.to('.cover', {
      x: width + 400, delay: 0.5, ease, duration: 1.5,
      onComplete: () => this.startLoop(),
    });

    rest.forEach((i, index) => {
      const x = offsetLeft + index * (cardWidth + gap);
      gsap.to(this.getCard(i),        { x, zIndex: 30, delay: startDelay + 0.05 * index, ease, duration: initialDuration });
      gsap.to(this.getCardContent(i), { x, zIndex: 40, delay: startDelay + 0.05 * index, ease, duration: initialDuration });
    });

    gsap.to('#pagination',   { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive,   { opacity: 1, x: 0,  ease, delay: startDelay });

    this.updateDetailsText(detailsActive, active);
  }

  private updateDetailsText(selector: string, activeIndex: number) {
    const el   = this.heroContainer.nativeElement;
    const data = this.slides[activeIndex];
    const set  = (q: string, v: string) => { const n = el.querySelector(selector + q); if (n) n.textContent = v; };
    set(' .place-box .text', data.tag);
    set(' .title-1',          data.title1);
    set(' .title-2',          data.title2);
    set(' .desc',             data.description);
  }

  private startLoop() { this.step(); }

  private step() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const { width, height, isMobile, offsetTop, offsetLeft, cardWidth, cardHeight, gap } = this.getDimensions();
    const ease       = 'sine.inOut';
    const numberSize = 50;
    const animDuration = 1.2;

    gsap.fromTo('.indicator', { x: -width }, {
      x: 0, duration: 4, ease: 'none',
      onComplete: () => {
        gsap.to('.indicator', {
          x: width, duration: 0.8, ease,
          onComplete: () => {
            this.order.push(this.order.shift()!);
            this.detailsEven = !this.detailsEven;

            const detailsActive   = this.detailsEven ? '#details-even' : '#details-odd';
            const detailsInactive = this.detailsEven ? '#details-odd'  : '#details-even';
            const [active, ...rest] = this.order;
            const prv = rest[rest.length - 1];

            this.updateDetailsText(detailsActive, active);

            gsap.set(detailsActive,  { zIndex: 22 });
            gsap.to(detailsActive,   { opacity: 1, delay: 0.4, ease, duration: animDuration });
            gsap.to(detailsActive + ' .text',    { y: 0, delay: 0.10, duration: 1, ease });
            gsap.to(detailsActive + ' .title-1', { y: 0, delay: 0.15, duration: 1, ease });
            gsap.to(detailsActive + ' .title-2', { y: 0, delay: 0.15, duration: 1, ease });
            gsap.to(detailsActive + ' .desc',    { y: 0, delay: 0.30, duration: 0.8, ease });
            gsap.to(detailsActive + ' .cta',     { y: 0, delay: 0.35, duration: 0.8, ease });

            gsap.set(detailsInactive, { zIndex: 12 });

            gsap.set(this.getCard(prv),  { zIndex: 10 });
            gsap.set(this.getCard(active),{ zIndex: 20 });
            gsap.to(this.getCard(prv),   { scale: 1.5, ease, duration: animDuration });
            gsap.to(this.getCardContent(active), { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.5, ease });

            gsap.to(this.getSliderItem(active), { x: 0, ease, duration: animDuration });
            gsap.to(this.getSliderItem(prv),    { x: -numberSize, ease, duration: animDuration });
            gsap.to('.progress-sub-foreground', {
              width: ((1 / this.order.length) * (active + 1) * 100) + '%', ease, duration: animDuration
            });

            gsap.to(this.getCard(active), {
              x: 0, y: 0, width, height, borderRadius: 0, ease, duration: animDuration,
              onComplete: () => {
                const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                gsap.set(this.getCard(prv),        { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 30, borderRadius: 20, scale: 1 });
                gsap.set(this.getCardContent(prv), { x: xNew, y: offsetTop + cardHeight - 60, opacity: 1, zIndex: 40 });
                gsap.set(this.getSliderItem(prv),  { x: rest.length * numberSize });

                gsap.set(detailsInactive,              { opacity: 0 });
                gsap.set(detailsInactive + ' .text',   { y: 100 });
                gsap.set(detailsInactive + ' .title-1',{ y: 100 });
                gsap.set(detailsInactive + ' .title-2',{ y: 100 });
                gsap.set(detailsInactive + ' .desc',   { y: 50 });
                gsap.set(detailsInactive + ' .cta',    { y: 60 });

                this.isAnimating = false;
                this.step();
              }
            });

            rest.forEach((i, index) => {
              if (i !== prv) {
                const xNew = offsetLeft + index * (cardWidth + gap);
                gsap.set(this.getCard(i), { zIndex: 30 });
                gsap.to(this.getCard(i),        { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, ease, duration: animDuration, delay: 0.1 * (index + 1) });
                gsap.to(this.getCardContent(i), { x: xNew, y: offsetTop + cardHeight - 60, opacity: 1, zIndex: 40, ease, duration: animDuration, delay: 0.1 * (index + 1) });
                gsap.to(this.getSliderItem(i),  { x: (index + 1) * numberSize, ease, duration: animDuration });
              }
            });
          }
        });
      }
    });
  }
}
