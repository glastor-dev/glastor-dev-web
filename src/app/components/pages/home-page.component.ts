import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStateService } from '../../app-state.service';
import { HeroSectionComponent } from '../sections/hero-section.component';
import { TrustBrandsSectionComponent } from '../sections/trust-brands-section.component';
import { IndustriesSectionComponent } from '../sections/industries-section.component';
import { IconsOfTheMonthSectionComponent } from '../sections/icons-of-the-month-section.component';
import { BuilderStoriesSectionComponent } from '../sections/builder-stories-section.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Product } from '../../models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    TrustBrandsSectionComponent,
    IndustriesSectionComponent,
    IconsOfTheMonthSectionComponent,
    BuilderStoriesSectionComponent,
    ScrollRevealDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="space-y-24 sm:space-y-32 -mt-[140px] pb-32 sm:pb-48 page-transition">

      <!-- HERO MODULAR -->
      <app-hero-section (navigate)="navigate($event)"></app-hero-section>

      <!-- TRUST BRANDS (B2B Authority) -->
      @defer (on viewport) {
        <app-trust-brands-section appScrollReveal></app-trust-brands-section>
      } @placeholder {
        <div class="h-[120px] w-full animate-pulse bg-zinc-900/60 rounded-lg mx-auto my-4 flex items-center justify-center">
          <div class="w-32 h-2 bg-zinc-800 rounded-full"></div>
        </div>
      }
      
      <!-- CURATED PIECES DISCOVER GRID -->
      @defer (on viewport) {
        <app-icons-of-the-month-section class="block mt-24 sm:mt-32"
          appScrollReveal
          [appScrollReveal]="100"
          [products]="iconsOfTheMonth()"
          [wishlist]="wishlist()"
          (navigate)="navigate($any($event.view), $event.id)"
          (addToCart)="addToCart($event)"
          (toggleWishlist)="toggleWishlist($event.id, $event.event)"
        ></app-icons-of-the-month-section>
      } @placeholder {
        <div class="h-[600px] w-full mt-24 sm:mt-32 animate-pulse">
          <div class="max-w-7xl mx-auto px-4">
            <div class="h-8 w-48 bg-zinc-900 rounded mb-6"></div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              @for (i of [1,2,3,4]; track i) {
                <div class="aspect-video bg-zinc-900/80 rounded-lg"></div>
              }
            </div>
          </div>
        </div>
      }

      <!-- B2B INDUSTRIES GRID -->
      @defer (on viewport) {
        <app-industries-section class="block mt-24 sm:mt-32" appScrollReveal></app-industries-section>
      } @placeholder {
        <div class="h-[800px] w-full mt-24 sm:mt-32 animate-pulse">
          <div class="max-w-7xl mx-auto px-4">
            <div class="h-8 w-56 bg-zinc-900 rounded mb-6"></div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              @for (i of [1,2,3,4,5,6]; track i) {
                <div class="h-48 bg-zinc-900/80 rounded-xl"></div>
              }
            </div>
          </div>
        </div>
      }

      <!-- I BUILD BECAUSE / STORIES SECTION -->
      @defer (on viewport) {
        <app-builder-stories-section class="block mt-24 sm:mt-32"
          appScrollReveal
          [tools]="iconsOfTheMonth()"
          [wishlist]="wishlist()"
          (navigate)="navigate($any($event.view), $event.id)"
          (addToCart)="addToCart($event)"
          (toggleWishlist)="toggleWishlist($event.id, $event.event)"
        ></app-builder-stories-section>
      } @placeholder {
        <div class="h-[800px] w-full mt-24 sm:mt-32 animate-pulse">
          <div class="max-w-7xl mx-auto px-4">
            <div class="h-8 w-64 bg-zinc-900 rounded mb-8"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (i of [1,2,3,4]; track i) {
                <div class="h-56 bg-zinc-900/80 rounded-xl"></div>
              }
            </div>
          </div>
        </div>
      }


    </main>
  `
})
export class HomePageComponent {
  private appState = inject(AppStateService);
  private router = inject(Router);

  wishlist = this.appState.wishlist;

  starProduct = computed(() => {
    const list = this.appState.products();
    if (list.length === 0) return null;
    return list.slice().sort((a, b) => b.rating - a.rating)[0] || list[0] || null;
  });

  iconsOfTheMonth = computed(() => {
    const list = this.appState.products();
    const star = this.starProduct();
    if (!star) return list.slice(0, 4);
    return list.filter(p => p.id !== star.id && p.rating >= 4.5).slice(0, 4);
  });

  navigate(view: string, id?: string) {
    if (view === 'detalle' && id) {
      this.router.navigate(['/tienda', id]);
    } else {
      this.router.navigate([`/${view === 'inicio' ? '' : view}`]);
    }
  }

  addToCart(product: Product) {
    this.appState.addToCart({ product, quantity: 1 });
  }

  toggleWishlist(id: string, event: Event) {
    this.appState.toggleWishlist(id, event as MouseEvent);
  }
}
