import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Tick02Icon, Tick01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `
    <div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[480px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[9999] p-7 text-zinc-300 font-sans transform transition-all duration-500 animate-in slide-in-from-bottom-8 fade-in opacity-100">
      
      <!-- Watermark Background Graphic -->
      <div class="absolute -top-6 -right-6 w-32 h-32 text-zinc-800/30 pointer-events-none rotate-12">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-[120px] h-[120px]"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-1.39 0-2.67.28-3.83.78C9 5.39 9.57 6 10.3 6h.2c1.23 0 2.22.95 2.22 2.12v.16c0 1.25.96 2.27 2.19 2.38l.19.01h.4c1.1 0 2 1 2 2.22v.19c0 1.27.97 2.32 2.2 2.45l.17.01c.07.64.12 1.3.12 1.97 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8zm-3.5 11c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm5.5 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM8.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7 11.33 7 10.5 7.67 9 8.5 9z"/></svg>
      </div>
      
      <!-- Header -->
      <div class="relative z-10 mb-6">
        <h2 class="text-2xl font-black uppercase tracking-tighter text-white mb-1">GLASTOR®</h2>
        <h3 class="text-lg font-medium text-white/90">¿Aceptas que utilicemos cookies?</h3>
      </div>
      
      <!-- Body -->
      <div class="relative z-10 space-y-5 mb-8">
        <p class="text-sm font-medium">Nosotros y <a href="#" class="text-[#41BF84] font-semibold hover:text-emerald-300 hover:underline transition-colors">nuestros 25 socios</a> utilizamos cookies y rastreadores para:</p>
        
        <ul class="space-y-3.5 text-xs text-zinc-400">
          <li class="flex gap-3 items-start">
            <hugeicons-icon [icon]="Tick02Icon" [size]="16" class="text-[#41BF84] mt-0.5" [strokeWidth]="2"></hugeicons-icon>
            <span>Proporcionar asistencia en directo y acceso a nuestro <strong>help center</strong></span>
          </li>
          <li class="flex gap-3 items-start">
            <hugeicons-icon [icon]="Tick02Icon" [size]="16" class="text-[#41BF84] mt-0.5" [strokeWidth]="2"></hugeicons-icon>
            <span>Generar información para <strong>mejorar la interfaz</strong> y las funcionalidades</span>
          </li>
          <li class="flex gap-3 items-start">
            <hugeicons-icon [icon]="Tick02Icon" [size]="16" class="text-[#41BF84] mt-0.5" [strokeWidth]="2"></hugeicons-icon>
            <span>Ayudarte a navegar en la consola y <strong>mostrarte información importante</strong>, como las actualizaciones</span>
          </li>
          <li class="flex gap-3 items-start">
            <hugeicons-icon [icon]="Tick02Icon" [size]="16" class="text-[#41BF84] mt-0.5" [strokeWidth]="2"></hugeicons-icon>
            <span>Medir la eficacia de las campañas de marketing y <strong>ofrecer actualizaciones</strong> sobre nuestros productos</span>
          </li>
          <li class="flex gap-3 items-start">
            <hugeicons-icon [icon]="Tick02Icon" [size]="16" class="text-[#41BF84] mt-0.5" [strokeWidth]="2"></hugeicons-icon>
            <span>Gestionar la <strong>autenticación</strong> y controlar los errores técnicos de nuestro producto</span>
          </li>
        </ul>
        
        <p class="text-[10px] leading-relaxed text-zinc-500 pt-4 border-t border-zinc-800">
          Algunas cookies son necesarias para fines técnicos, por lo que están exentas de consentimiento. Otras, no obligatorias, pueden utilizarse para anuncios y contenidos personalizados, medición de anuncios y contenidos, conocimiento de la audiencia y desarrollo de productos, datos precisos de geolocalización e identificación a través del escaneo de dispositivos, almacenar y/o acceder a información en un dispositivo. Si da su consentimiento, este será válido en todos los subdominios de GLASTOR®. Si rechaza las cookies, no podrá utilizar el chatbot de la consola. Puede retirar su consentimiento en cualquier momento haciendo clic en Aviso de consentimiento en la parte inferior derecha de la página.
        </p>
      </div>
      
      <!-- Actions -->
      <div class="relative z-10 flex flex-col sm:flex-row gap-3">
        <button (click)="configure.emit()" class="flex-1 py-2.5 px-4 rounded-full border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-center">Configurar</button>
        <button (click)="reject.emit()" class="flex-1 py-2.5 px-4 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors text-center">No estoy de acuerdo</button>
        <button (click)="accept.emit()" class="flex-1 py-2.5 px-4 rounded-full bg-emerald-600 text-xs font-semibold text-white hover:bg-[#41BF84]/200 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all text-center">Estoy de acuerdo</button>
      </div>
    </div>
  `
})
export class CookieBannerComponent {
  Tick02Icon = Tick02Icon;
  Tick01Icon = Tick01Icon;
  
  @Output() configure = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();
}
