import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input('appScrollReveal') delay: number | string = 0; // ms delay
  private observer!: IntersectionObserver;
  private hasRevealed = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const delayMs = parseInt(this.delay as string, 10) || 0;
    // Set initial styles
    const element = this.el.nativeElement as HTMLElement;
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`;
    element.style.willChange = 'opacity, transform';

    // Wait a tick to ensure layout is ready
    setTimeout(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.hasRevealed) {
              this.hasRevealed = true;
              requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              });
              this.observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      this.observer.observe(element);
    }, 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
