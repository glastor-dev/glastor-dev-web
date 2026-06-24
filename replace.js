const fs = require('fs');
const portalHtml = fs.readFileSync('src/app/portal.html', 'utf-8');
const lines = portalHtml.split('\n');
const start = lines.findIndex(l => l.includes('<!-- ================= VIEW 3: PRODUCT DETAIL (DYNAMIC PAGE) ================= -->'));
const end = lines.findIndex(l => l.includes('<!-- ================= VIEW 4: PROCESS CHECKOUT / CHECKUP ================= -->'));

const replaceWith = `    <app-product-detail-page
      [isCinematicGlow]="isCinematicGlow()"
      [product]="selectedProductObj()"
      [selectedVariantObj]="selectedVariantObj()"
      [dynamicReviews]="dynamicReviews()"
      [ratingBreakdown]="ratingBreakdown()"
      [recommendationPercent]="recommendationPercent()"
      [wishlist]="wishlist()"
      [selectedVariantId]="selectedVariantId()"
      [selectedGalleryImage]="selectedGalleryImage()"
      [expandedAccordion]="expandedAccordion()"
      [selectedPerspectiveIndex]="selectedPerspectiveIndex()"
      (navigate)="setView($event)"
      (addToCart)="addToCart($event)"
      (toggleWishlistEvent)="toggleWishlist($event.id, $event.event)"
      (selectedVariantIdChange)="selectedVariantId.set($event)"
      (selectedGalleryImageChange)="selectedGalleryImage.set($event)"
      (expandedAccordionChange)="expandedAccordion.set($event)"
      (selectedPerspectiveIndexChange)="selectedPerspectiveIndex.set($event)">
    </app-product-detail-page>`;

const newLines = [...lines.slice(0, start + 1), '  @if (currentView() === \'detalle\') {', replaceWith, '  }', lines[end - 1] === '' ? '' : '', ...lines.slice(end)];
fs.writeFileSync('src/app/portal.html', newLines.join('\n'));
console.log('Replaced VIEW 3 with app-product-detail-page');
