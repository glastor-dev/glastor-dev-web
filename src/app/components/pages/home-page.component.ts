import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStateService } from '../../app-state.service';
import { HeroSectionComponent } from '../sections/hero-section.component';
import { TrustBrandsSectionComponent } from '../sections/trust-brands-section.component';
import { PillarsSectionComponent } from '../sections/pillars-section.component';
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
    PillarsSectionComponent,
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
      <app-trust-brands-section appScrollReveal></app-trust-brands-section>
      
      <!-- CURATED PIECES DISCOVER GRID -->
      <app-icons-of-the-month-section class="block mt-24 sm:mt-32"
        appScrollReveal
        [appScrollReveal]="100"
        [products]="iconsOfTheMonth()"
        [wishlist]="wishlist()"
        (navigate)="navigate($any($event.view), $event.id)"
        (addToCart)="addToCart($event)"
        (toggleWishlist)="toggleWishlist($event.id, $event.event)"
      ></app-icons-of-the-month-section>

      <!-- B2B INDUSTRIES GRID -->
      <app-industries-section class="block mt-24 sm:mt-32" appScrollReveal></app-industries-section>

      <!-- I BUILD BECAUSE / STORIES SECTION -->
      <app-builder-stories-section class="block mt-24 sm:mt-32"
        appScrollReveal
        [tools]="iconsOfTheMonth()"
        [wishlist]="wishlist()"
        (navigate)="navigate($any($event.view), $event.id)"
        (addToCart)="addToCart($event)"
        (toggleWishlist)="toggleWishlist($event.id, $event.event)"
      ></app-builder-stories-section>

      <!-- SCANDINAVIAN BRAND PILLARS -->
      <app-pillars-section class="block mt-24 sm:mt-32" appScrollReveal [appScrollReveal]="100"></app-pillars-section>


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
