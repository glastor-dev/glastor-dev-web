import { Routes } from '@angular/router';
import { PortalComponent } from './portal';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PortalComponent },
  { path: '**', redirectTo: 'home' }
];
