import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input('appParallax') yOffset: number = 100;
  
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Create parallax effect
      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: this.el.nativeElement,
        start: 'top bottom', // Start when the element enters the bottom of the viewport
        end: 'bottom top',   // End when the element leaves the top of the viewport
        animation: gsap.fromTo(
          this.el.nativeElement,
          { y: -this.yOffset },
          { y: this.yOffset, ease: 'none' }
        ),
        scrub: true
      });
    });
  }

  ngOnDestroy() {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
  }
}
