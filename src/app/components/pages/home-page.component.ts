import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../sections/hero-section.component';
import { TrustBrandsSectionComponent } from '../sections/trust-brands-section.component';
import { PillarsSectionComponent } from '../sections/pillars-section.component';
import { IndustriesSectionComponent } from '../sections/industries-section.component';
import { IconsOfTheMonthSectionComponent } from '../sections/icons-of-the-month-section.component';
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
    IconsOfTheMonthSectionComponent
  ],
  template: `
    <main class="space-y-20 py-8 page-transition">

      <!-- HERO MODULAR -->
      <app-hero-section (navigate)="navigate.emit({view: $event})"></app-hero-section>

      <!-- TRUST BRANDS (B2B Authority) -->
      <app-trust-brands-section></app-trust-brands-section>
      
      <!-- SCANDINAVIAN BRAND PILLARS -->
      <app-pillars-section class="block"></app-pillars-section>

      <!-- B2B INDUSTRIES GRID -->
      <app-industries-section class="block mt-24 sm:mt-32"></app-industries-section>

      <!-- CURATED PIECES DISCOVER GRID -->
      <app-icons-of-the-month-section class="block"
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
