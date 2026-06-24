import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.html'
})
export class PreloaderComponent implements OnInit {
  appState = inject(AppStateService);
  private router = inject(Router);

  isPreloadingFading = signal<boolean>(false);
  isPreloadComplete = signal<boolean>(false);
  preloadPercent = signal<number>(0);
  private autoEnterTimeout: any = null;

  preloaderStatus = computed(() => {
    const pct = this.preloadPercent();
    if (pct < 15) return 'Calibrando interfaz fotométrica y cuadrícula analítica...';
    if (pct < 35) return 'Instanciando base de datos industrial de co-inversión y lotes...';
    if (pct < 55) return 'Sincronizando osciladores para síntesis de audio de alta fidelidad...';
    if (pct < 75) return 'Compilando coeficientes arancelarios y tiempos de tránsito del courier...';
    if (pct < 95) return 'Optimizando jerarquía de renderizado acelerado por GPU...';
    if (pct < 100) return 'Configuración precisa completada correctamente.';
    return 'Bienvenido a GLASTOR ®. Iniciando secuencia de revelado.';
  });

  ngOnInit() {
    // Autostart simulation
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 8) + 3;
      if (percent >= 100) {
        percent = 100;
        this.preloadPercent.set(100);
        clearInterval(interval);
        this.isPreloadComplete.set(true);
        this.autoEnterTimeout = setTimeout(() => {
          this.enterWebsite();
        }, 3200);
      } else {
        this.preloadPercent.set(percent);
      }
    }, 35);
  }

  enterWebsite() {
    if (this.isPreloadingFading()) return;
    if (this.autoEnterTimeout) {
      clearTimeout(this.autoEnterTimeout);
      this.autoEnterTimeout = null;
    }
    
    // Play enter beeps
    this.appState.playSynthBeep(261.63, 'sine', 0.1, 0.01);
    setTimeout(() => {
      this.appState.playSynthBeep(523.25, 'sine', 0.18, 0.05);
    }, 120);

    this.isPreloadingFading.set(true);
    this.appState.isTransitioning.set(true);
    
    setTimeout(() => {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          this.appState.isTransitioning.set(false);
        }, 600);
      });
    }, 600);
  }
}
