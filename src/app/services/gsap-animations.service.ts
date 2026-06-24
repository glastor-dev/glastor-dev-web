import { Injectable, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class GsapAnimationsService {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /**
   * Safe execution inside Angular, running GSAP outside Zone.js to avoid performance hits
   */
  public runOutsideAngular(fn: () => void) {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(fn);
    }
  }

  /**
   * Applies a physics-based entrance animation (tactile spring).
   * Note: Should be used within an afterNextRender or ngAfterViewInit hook.
   */
  public physicsEnter(element: Element | Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween | undefined {
    if (!this.isBrowser) return;
    
    let tween: gsap.core.Tween | undefined;
    this.runOutsideAngular(() => {
      tween = gsap.fromTo(element, 
        { scale: 0.9, opacity: 0, y: 30 },
        { 
          scale: 1, opacity: 1, y: 0, 
          duration: 1.2, 
          ease: "elastic.out(1, 0.5)",
          ...options
        }
      );
    });
    return tween;
  }

  /**
   * Setup a fade-in up scroll trigger
   */
  public scrollFadeInUp(element: Element | Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween | undefined {
    if (!this.isBrowser) return;
    
    let tween: gsap.core.Tween | undefined;
    this.runOutsideAngular(() => {
      tween = gsap.fromTo(element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          ...options
        }
      );
    });
    return tween;
  }
}
