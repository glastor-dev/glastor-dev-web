import { Routes } from '@angular/router';
import { PortalComponent } from './portal';

export const routes: Routes = [
  { 
    path: '', 
    component: PortalComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { 
        path: 'inicio', 
        loadComponent: () => import('./components/pages/home-page.component').then(m => m.HomePageComponent) 
      },
      { 
        path: 'tienda', 
        loadComponent: () => import('./components/pages/catalog-page.component').then(m => m.CatalogPageComponent) 
      },
      { 
        path: 'tienda/:id', 
        loadComponent: () => import('./components/pages/product-detail-page.component').then(m => m.ProductDetailPageComponent) 
      },
      { 
        path: 'checkout', 
        loadComponent: () => import('./components/pages/checkout-page.component').then(m => m.CheckoutPageComponent) 
      },
      { 
        path: 'admin', 
        loadComponent: () => import('./components/pages/admin-page.component').then(m => m.AdminPageComponent) 
      },
      { 
        path: 'legales', 
        loadComponent: () => import('./components/pages/legal-page.component').then(m => m.LegalPageComponent) 
      },
      { 
        path: 'arrepentimiento', 
        loadComponent: () => import('./components/pages/arrepentimiento-page.component').then(m => m.ArrepentimientoPageComponent) 
      }
    ]
  },
  { path: '**', redirectTo: 'inicio' }
];
