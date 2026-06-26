import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../sections/hero-section.component';
import { TrustBrandsSectionComponent } from '../sections/trust-brands-section.component';
import { PillarsSectionComponent } from '../sections/pillars-section.component';
import { IndustriesSectionComponent } from '../sections/industries-section.component';
import { IconsOfTheMonthSectionComponent } from '../sections/icons-of-the-month-section.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { Product } from '../../portal';

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
    ScrollRevealDirective
  ],
  template: `
    <main class="space-y-24 sm:space-y-32 pt-8 pb-32 sm:pb-48 page-transition">

      <!-- HERO MODULAR -->
      <app-hero-section (navigate)="navigate.emit({view: $event})"></app-hero-section>

      <!-- TRUST BRANDS (B2B Authority) -->
      <app-trust-brands-section appScrollReveal></app-trust-brands-section>
      
      <!-- SCANDINAVIAN BRAND PILLARS -->
      <app-pillars-section class="block" appScrollReveal [appScrollReveal]="100"></app-pillars-section>

      <!-- B2B INDUSTRIES GRID -->
      <app-industries-section class="block mt-24 sm:mt-32" appScrollReveal></app-industries-section>

      <!-- CURATED PIECES DISCOVER GRID -->
      <app-icons-of-the-month-section class="block"
        appScrollReveal
        [appScrollReveal]="100"
        [products]="iconsOfTheMonth"
        [wishlist]="wishlist"
        (navigate)="navigate.emit({view: $any($event.view), id: $event.id})"
        (addToCart)="addToCart.emit($event)"
        (toggleWishlist)="toggleWishlist.emit($event)"
      ></app-icons-of-the-month-section>

    </main>
  `
})
export class HomePageComponent {
  @Input() iconsOfTheMonth: Product[] = [];
  @Input() wishlist: string[] = [];

  @Output() navigate = new EventEmitter<{view: string, id?: string}>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() toggleWishlist = new EventEmitter<{id: string, event: Event}>();
}
