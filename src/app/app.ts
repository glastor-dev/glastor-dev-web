import { Component, OnInit, inject, afterNextRender } from '@angular/core';
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
        const cursor = document.getElementById('sodra-custom-cursor');
        if (cursor) {
          // Use GSAP quickTo for smooth performant interpolation
          const xTo = gsap.quickTo(cursor, "left", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(cursor, "top", { duration: 0.4, ease: "power3" });

          document.addEventListener('mousemove', (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
            cursor.style.opacity = '1';
          });

          document.addEventListener('mouseover', (e) => {
            const el = e.target as HTMLElement;
            if (el && (el.closest('button') || el.closest('a') || el.closest('.cursor-pointer') || el.closest('input') || el.closest('select') || el.closest('[role="button"]'))) {
              gsap.to(cursor, {
                width: 64,
                height: 64,
                backgroundColor: 'rgba(217, 119, 6, 0.45)',
                border: '1px solid rgba(217, 119, 6, 0.8)',
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
          document.addEventListener('mouseleave', () => {
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
          });
        }
      } catch (err) {
        console.warn('Custom cursor initialization failed:', err);
      }
    }
  }
}
