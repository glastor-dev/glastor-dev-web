import { Injectable, OnDestroy, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class LenisService implements OnDestroy {
  private lenis: Lenis | null = null;
  private isBrowser: boolean;
  private rafTicker: (time: number) => void;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Bind the raf function so we can remove it later
    this.rafTicker = (time: number) => {
      this.lenis?.raf(time * 1000);
    };
  }

  init() {
    if (!this.isBrowser || this.lenis) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      this.lenis = new Lenis({
        lerp: 0.1, // Smooth, tactile feel
        wheelMultiplier: 1,
        smoothWheel: true,
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add(this.rafTicker);
      gsap.ticker.lagSmoothing(0);
    });
  }

  getLenis(): Lenis | null {
    return this.lenis;
  }

  start() {
    this.lenis?.start();
  }

  stop() {
    this.lenis?.stop();
  }

  scrollTo(target: any, options?: any) {
    this.lenis?.scrollTo(target, options);
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        gsap.ticker.remove(this.rafTicker);
        if (this.lenis) {
          this.lenis.destroy();
          this.lenis = null;
        }
      });
    }
  }
}
