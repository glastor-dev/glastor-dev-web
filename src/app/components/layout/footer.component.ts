import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-transparent text-zinc-300 pt-20 pb-8 px-6 sm:px-12 relative overflow-hidden font-sans border-t border-white/5 selection:bg-amber-500 selection:text-white">
      



      <div class="max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        <!-- Left: Huge Typography & Button -->
        <div class="lg:col-span-7 flex flex-col justify-start">
          <p class="text-[10px] font-mono tracking-[0.25em] text-[#41BF84] uppercase mb-4">Empecemos algo grande</p>
          <h2 class="text-[1.75rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] leading-none tracking-tighter font-medium text-white mb-8">
            ¿QUÉ TAL SI<br>
            CONSTRUIMOS UN PAR<br>
            DE COSAS JUNTOS?
          </h2>
          <div class="flex flex-wrap gap-4">
            <!-- WhatsApp -->
            <a href="https://wa.me/5491132578591" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center w-12 h-12 bg-transparent text-zinc-400 border border-zinc-700 rounded-full hover:bg-[#00ff66] hover:text-[#050505] hover:border-[#00ff66] transition-all duration-300 cursor-pointer"
               aria-label="WhatsApp">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <!-- Email -->
            <a href="mailto:ventas@glastor.es"
               class="flex items-center justify-center w-12 h-12 bg-transparent text-zinc-400 border border-zinc-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
               aria-label="Email">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <!-- GitHub -->
            <a href="https://github.com/glastor-dev" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center w-12 h-12 bg-transparent text-zinc-400 border border-zinc-700 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
               aria-label="GitHub">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>

        <!-- Right: Columns -->
        <div class="lg:col-span-5 flex flex-col gap-12 mt-4 lg:mt-8">
          
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[11px] uppercase tracking-[0.15em] font-medium">

          <!-- Column 1: SITEMAP -->
          <div class="space-y-5">
            <h4 class="text-zinc-600 pb-2 border-b border-zinc-800 inline-block pr-10">SITIO</h4>
            <ul class="space-y-4">
              <li><a (click)="handleNavigate('inicio'); playBeep(480)" class="hover:text-white flex justify-start gap-2 items-center group cursor-pointer text-[#a1a1a1] transition-colors">INICIO <span class="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span></a></li>
              <li><a (click)="handleNavigate('tienda'); playBeep(520)" class="hover:text-white flex justify-start gap-2 items-center group cursor-pointer text-[#a1a1a1] transition-colors">CATÁLOGO <span class="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span></a></li>
            </ul>
          </div>

          <!-- Column 4: LEGAL -->
          <div class="space-y-5">
            <h4 class="text-zinc-600 pb-2 border-b border-zinc-800 inline-block pr-10">LEGAL</h4>
            <ul class="space-y-4">
              <li><a (click)="handleNavigate('legales'); playBeep(550)" class="hover:text-white flex justify-start gap-2 items-center group cursor-pointer text-[#a1a1a1] transition-colors">PRIVACIDAD <span class="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span></a></li>
              <li><a (click)="handleNavigate('legales'); playBeep(530)" class="hover:text-white flex justify-start gap-2 items-center group cursor-pointer text-[#a1a1a1] transition-colors">COOKIES <span class="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span></a></li>
              <li><a (click)="handleNavigate('admin'); playBeep(500)" class="hover:text-white flex justify-start gap-2 items-center group cursor-pointer text-[#a1a1a1] transition-colors">ADMIN <span class="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span></a></li>
            </ul>
          </div>
          <!-- Column 3: CONSUMIDOR -->
          <div class="space-y-5">
            <h4 class="text-zinc-600 pb-2 border-b border-zinc-800 inline-block pr-10">CONSUMIDOR</h4>
            <ul class="space-y-4">
              <li>
                <button (click)="handleNavigate('arrepentimiento'); playBeep(500)"
                   class="inline-flex items-center justify-center text-[10px] sm:text-[11px] font-medium bg-[#1a1a1a] text-zinc-300 border border-zinc-800 rounded-full px-4 py-2 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all duration-300 cursor-pointer w-fit normal-case tracking-normal">
                  Botón de Arrepentimiento
                </button>
              </li>
              <li>
                <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-[0.05em]">
                  Defensa del Consumidor
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </li>
            </ul>
          </div>
          </div>

        </div>
      </div>

      <!-- Bottom Row: Data Fiscal & CTA Button -->
      <div class="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end mt-24 sm:mt-32 border-t border-[#2a2a2a] pt-8 gap-12 md:gap-6">

        <!-- Left: AFIP + compact legal -->
        <div class="flex flex-col gap-5 mb-2 md:mb-0">
          <div class="flex items-center gap-6 flex-wrap">
            <a href="http://www.afip.gob.ar/datafiscal/" target="_blank" rel="noopener noreferrer" class="inline-block hover:opacity-80 transition-opacity w-fit">
              <img src="assets/logos/DATAWEB.jpg" alt="Data Fiscal AFIP" class="h-[75px] object-contain rounded-sm">
            </a>
            <img src="assets/logos/iso-27001.webp" alt="Certificación ISO 27001" class="h-[75px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            
            <div class="flex items-center gap-3 ml-2 lg:ml-6">
              <svg class="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" viewBox="0 0 226 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_353_4566)">
                <rect x="21.3229" y="21.3229" width="182.562" height="124.354" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M76.2253 106.033H65.0053L56.5916 73.9349C56.1923 72.4584 55.3444 71.153 54.0971 70.5378C50.9844 68.9917 47.5543 67.7613 43.8125 67.1407V65.9049H61.8871C64.3816 65.9049 66.2526 67.7613 66.5644 69.9172L70.9299 93.071L82.1444 65.9049H93.0526L76.2253 106.033ZM99.2891 106.033H88.6927L97.4182 65.9049H108.015L99.2891 106.033ZM121.724 77.0216C122.035 74.8603 123.906 73.6245 126.089 73.6245C129.519 73.3142 133.256 73.9348 136.374 75.4755L138.245 66.8356C135.126 65.5998 131.696 64.9792 128.584 64.9792C118.299 64.9792 110.815 70.5377 110.815 78.252C110.815 84.1207 116.116 87.2022 119.858 89.0585C123.906 90.9095 125.466 92.1453 125.154 93.9964C125.154 96.7729 122.035 98.0087 118.923 98.0087C115.181 98.0087 111.439 97.0832 108.015 95.5371L106.144 104.182C109.885 105.723 113.934 106.344 117.675 106.344C129.207 106.649 136.374 101.095 136.374 92.7606C136.374 82.2643 121.724 81.6491 121.724 77.0216ZM173.458 106.033L165.045 65.9049H156.007C154.136 65.9049 152.266 67.1407 151.642 68.9917L136.062 106.033H146.97L149.147 100.17H162.55L163.797 106.033H173.458ZM157.566 76.7111L160.679 91.8349H151.954L157.566 76.7111Z" fill="#172B85"/>
                </g>
                <defs>
                <filter id="filter0_d_353_4566" x="0" y="0" width="225.208" height="167" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="10"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_353_4566"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_353_4566" result="shape"/>
                </filter>
                </defs>
              </svg>
              <svg class="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" viewBox="0 0 226 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_353_4479)">
                <rect x="21.3229" y="21.3229" width="182.562" height="124.354" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M113.927 110.789C107.622 116.23 99.4425 119.515 90.5049 119.515C70.5624 119.515 54.3958 103.161 54.3958 82.9865C54.3958 62.8125 70.5624 46.4583 90.5049 46.4583C99.4425 46.4583 107.622 49.7431 113.927 55.1844C120.232 49.7431 128.412 46.4583 137.349 46.4583C157.292 46.4583 173.458 62.8126 173.458 82.9866C173.458 103.161 157.292 119.515 137.349 119.515C128.412 119.515 120.232 116.23 113.927 110.789Z" fill="#ED0006"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M113.927 110.789C121.691 104.089 126.614 94.1193 126.614 82.9865C126.614 71.8538 121.691 61.8843 113.927 55.1843C120.232 49.743 128.412 46.4583 137.349 46.4583C157.292 46.4583 173.458 62.8125 173.458 82.9865C173.458 103.161 157.292 119.515 137.349 119.515C128.412 119.515 120.232 116.23 113.927 110.789Z" fill="#F9A000"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M113.927 110.789C121.691 104.089 126.614 94.1193 126.614 82.9866C126.614 71.854 121.691 61.8845 113.927 55.1846C106.163 61.8845 101.24 71.854 101.24 82.9866C101.24 94.1193 106.163 104.089 113.927 110.789Z" fill="#FF5E00"/>
                </g>
                <defs>
                <filter id="filter0_d_353_4479" x="0" y="0" width="225.208" height="167" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="10"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_353_4479"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_353_4479" result="shape"/>
                </filter>
                </defs>
              </svg>
            </div>
          </div>
          
        </div>

        <!-- CTA Button (Replacing Huge Logo) -->
        <div class="flex items-center w-full md:w-auto justify-center md:justify-end pb-2 relative md:max-w-none md:pr-8">
          


          <!-- The Weave-style "Start Now" CTA Block (Glastor Colors) -->
          <a href="https://wa.me/5491132578591" target="_blank" rel="noopener noreferrer"
             class="group relative flex items-center justify-center bg-[#00ff66] rounded-[clamp(2rem,4vw,3rem)] py-[clamp(1rem,2vw,2rem)] pl-[clamp(1.5rem,4vw,3rem)] pr-[clamp(4.5rem,9vw,6rem)] cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_40px_rgba(0,255,102,0.15)] hover:shadow-[0_0_60px_rgba(0,255,102,0.3)] overflow-hidden w-fit">
             
            <!-- Text -->
            <span class="font-medium tracking-tight text-[#050505] font-sans z-10 uppercase whitespace-nowrap text-[clamp(2rem,4.5vw,3.75rem)] leading-none">
              Start Now
            </span>
            
            <!-- Floating Badge -->
            <div class="absolute top-1/2 -translate-y-1/2 right-[clamp(0.5rem,1.5vw,1.5rem)] w-[clamp(2.75rem,5vw,3.5rem)] h-[clamp(2.75rem,5vw,3.5rem)] bg-[#050505] rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500 z-10 border border-[#00ff66]/30">
              <svg class="w-[clamp(1.2rem,2.5vw,1.5rem)] h-[clamp(1.2rem,2.5vw,1.5rem)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Abstract geometric shape using Glastor colors -->
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#00ff66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 7V17M7 12H17" stroke="#00ff66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <!-- Hover internal glow/effect -->
            <div class="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/10 transition-colors duration-300 z-0"></div>
          </a>

        </div>
      </div>

      <!-- Legal strip -->
      <div class="max-w-[1600px] mx-auto relative z-10 mt-10 pt-6 border-t border-zinc-800/40 flex flex-col gap-1 text-[10px] text-zinc-500 font-mono tracking-wide">
        <p>2026 <strong class="text-zinc-400 font-sans">GLASTOR®</strong> es una marca registrada en Argentina (INPI — Reg. 4559568 y 4559567, 19/08/2025).</p>
        <p>CUIT 23253165669 — Convenio Multilateral. Emitimos Factura Electrónica A y B.</p>
        <p>Todos los precios publicados en este sitio web están expresados en Pesos Argentinos (ARS) y ya incluyen el 21% de IVA.</p>
        <p>© 2010-2026 <strong class="text-zinc-400">GLASTOR-DEV</strong> División DEVOPS, propiedad de GLASTOR®. Todos los derechos reservados.</p>
      </div>

    </footer>
  `
})
export class FooterComponent {
  appState = inject(AppStateService);
  
  @Output() navigate = new EventEmitter<string>();

  handleNavigate(view: string) {
    this.navigate.emit(view);
  }

  playBeep(freq: number) {
    this.appState.playSynthBeep(freq, 'sine', 0.05, 0.01);
  }
}
