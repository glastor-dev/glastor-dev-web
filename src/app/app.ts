import { Component, OnInit, inject, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { CheckmarkCircle01Icon, InformationCircleIcon, Alert01Icon, CancelCircleIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { AppStateService } from './app-state.service';
import { LenisService } from './services/lenis.service';
import gsap from 'gsap';
export interface Product {
  id: string;
  name: string;
  category: 'tecnologia' | 'herramientas' | 'computacion' | 'accesorios';
  price: number;
  description: string;
  rating: number;
  image: string;
  badges?: string[];
  material: string;
  dimensions: string;
  weight: string;
  stock: number;
  reviews: Array<{ author: string; stars: number; date: string; comment: string }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface Order {
  id: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  status: 'completado' | 'procesando' | 'enviado';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HugeiconsIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  appState = inject(AppStateService);
  lenisService = inject(LenisService);
  CheckmarkCircle01Icon = CheckmarkCircle01Icon;
  InformationCircleIcon = InformationCircleIcon;
  Alert01Icon = Alert01Icon;
  CancelCircleIcon = CancelCircleIcon;
  Cancel01Icon = Cancel01Icon;

  constructor() {
    afterNextRender(() => {
      this.lenisService.init();
    });
  }

  ngOnInit() {
    // Initialize premium mix-blend custom cursor follower
    if (typeof window !== 'undefined') {
      try {
        if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
          // Skip cursor initialization on touch devices
        } else {
          const cursor = document.getElementById('sodra-custom-cursor');
        if (cursor) {
          // Use GSAP quickTo for smooth performant interpolation
          const xTo = gsap.quickTo(cursor, "left", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(cursor, "top", { duration: 0.4, ease: "power3" });

          let magneticEl: HTMLElement | null = null;

          document.addEventListener('mousemove', (e) => {
            if (magneticEl) {
              const rect = magneticEl.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const distX = e.clientX - centerX;
              const distY = e.clientY - centerY;
              
              gsap.to(magneticEl, {
                x: distX * 0.4,
                y: distY * 0.4,
                duration: 0.4,
                ease: "power2.out"
              });
              
              // Move cursor slightly towards center for magnetic pull feel
              xTo(e.clientX - distX * 0.1);
              yTo(e.clientY - distY * 0.1);
            } else {
              xTo(e.clientX);
              yTo(e.clientY);
            }
            cursor.style.opacity = '1';
          });

          document.addEventListener('mouseover', (e) => {
            const el = e.target as HTMLElement;
            
            // Magnetic button check
            const magneticBtn = el?.closest('.magnetic') as HTMLElement;
            if (magneticBtn && magneticBtn !== magneticEl) {
               magneticEl = magneticBtn;
            }

            if (el && (el.closest('button') || el.closest('a') || el.closest('.cursor-pointer') || el.closest('input') || el.closest('select') || el.closest('[role="button"]'))) {
              gsap.to(cursor, {
                width: 64,
                height: 64,
                backgroundColor: 'rgba(0, 255, 102, 0.2)',
                border: '1px solid rgba(0, 255, 102, 0.5)',
                marginLeft: -32,
                marginTop: -32,
                duration: 0.3,
                ease: 'back.out(1.5)'
              });
            } else {
              gsap.to(cursor, {
                width: 24,
                height: 24,
                backgroundColor: '#ffffff',
                border: 'none',
                marginLeft: -12,
                marginTop: -12,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });

          document.addEventListener('mouseout', (e) => {
            const el = e.target as HTMLElement;
            const magneticBtn = el?.closest('.magnetic') as HTMLElement;
            if (magneticBtn) {
               const related = e.relatedTarget as HTMLElement;
               if (!related || !magneticBtn.contains(related)) {
                  // Snap back to center
                  gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
                  magneticEl = null;
               }
            }
          });
          document.addEventListener('mouseleave', () => {
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
          });
        }
        } // Close else block
      } catch (err) {
        console.warn('Custom cursor initialization failed:', err);
      }
    }

    // Initialize Preloader
    if (typeof window !== 'undefined') {
      const preloader = document.getElementById('awwwards-preloader');
      const counterEl = document.getElementById('preloader-counter');
      const textEl = document.getElementById('preloader-text');
      
      if (preloader && counterEl && textEl) {
        // Scroll lock
        document.body.style.overflow = 'hidden';

        const counter = { val: 0 };
        gsap.to(counter, {
          val: 100,
          duration: 2.2,
          ease: 'power3.inOut',
          onUpdate: () => {
            counterEl.innerText = Math.round(counter.val) + '%';
          },
          onComplete: () => {
            const tl = gsap.timeline();
            tl.to(counterEl, { opacity: 0, y: -20, duration: 0.4 })
              .to(textEl, { scale: 1.5, opacity: 0, filter: 'blur(10px)', duration: 0.8, ease: 'power2.inOut' }, "-=0.2")
              .to(preloader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, "-=0.5")
              .set(preloader, { display: 'none' })
              .call(() => {
                // Unlock scroll
                document.body.style.overflow = '';
              });
          }
        });
      }
    }
  }
}
