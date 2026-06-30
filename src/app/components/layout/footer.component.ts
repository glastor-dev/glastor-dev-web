import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Alert01Icon, InformationCircleIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-[#080808] text-zinc-300 pt-8 sm:pt-12 pb-0 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-white flex justify-start">
      
      <!-- Weave Style Card Container (Background via pseudo-element to keep content centered) -->
      <div class="w-full relative z-10 px-4 pt-8 sm:pt-10 pb-12 sm:pb-16 mx-auto before:content-[''] before:absolute before:inset-0 before:w-full lg:before:w-[78%] before:bg-[#0c0c0c] before:rounded-tr-[1.5rem] lg:before:rounded-tr-[2rem] before:-z-10">
        
        <!-- TOP SECTION: Huge Typography -->
        <div class="max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-10">
          <h2 class="text-[1.75rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[0.85] tracking-tighter font-black text-white uppercase text-left w-full flex flex-col">
            <span>TECNOLOGÍA</span>
            <span class="flex items-center gap-3"><span class="text-[#41BF84]">+</span> CREATIVIDAD</span>
          </h2>
        </div>

        <!-- MIDDLE SECTION: Logo, Socials & Nav Grid -->
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-between mb-8 sm:mb-12 lg:mb-14 lg:pr-[24vw] xl:pr-[25vw]">
          <!-- Logo & Socials -->
          <div class="flex flex-col gap-6 w-full lg:w-1/3">
            <!-- Mobile Row: Logo + CTA -->
            <div class="flex items-center justify-between w-full">
              <!-- Logo -->
              <div class="flex items-center gap-3">
                <span class="font-black tracking-tighter text-3xl sm:text-5xl text-white">GLASTOR®</span>
              </div>
              
              <!-- CTA Button (Inline on Mobile, Absolute Bottom-Right on Desktop) -->
              <div class="lg:absolute lg:bottom-0 lg:left-[78%] lg:-ml-12 z-20 flex items-center justify-end lg:justify-start overflow-visible min-w-fit">
                <a href="https://wa.me/5491132578591" target="_blank" rel="noopener noreferrer"
                   class="group flex items-center justify-center lg:justify-start bg-[#41BF84] hover:bg-[#349E6D] text-[#050505] rounded-md lg:rounded-bl-none lg:rounded-tl-lg lg:rounded-r-none h-[40px] px-5 sm:h-[48px] sm:px-6 lg:h-[96px] lg:pl-12 lg:pr-[30vw] transition-colors duration-300 shadow-2xl w-fit">
                   
                  <!-- Text -->
                  <span class="font-medium tracking-tight font-sans z-10 whitespace-nowrap text-sm sm:text-base lg:text-[clamp(1.5rem,3vw,3rem)] leading-none uppercase lg:normal-case">
                    Comencemos
                  </span>
                </a>
              </div>
            </div>
            
            <!-- Socials -->
            <div class="flex items-center gap-6">
              <a href="https://wa.me/5491132578591" target="_blank" class="text-zinc-400 hover:text-white transition-colors" aria-label="WhatsApp">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:ventas@glastor.es" class="text-zinc-400 hover:text-white transition-colors" aria-label="Email">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
              <a href="https://github.com/glastor-dev" target="_blank" class="text-zinc-400 hover:text-white transition-colors" aria-label="GitHub">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>
          <!-- Nav Grid (Moved from Lower Section) -->
          <div class="flex gap-8 md:gap-12 text-[10px] sm:text-[11px] font-bold w-full md:w-auto flex-wrap sm:flex-nowrap md:pt-4">
            <!-- Column 1: SITEMAP -->
            <div class="space-y-4">
              <p class="text-zinc-400 font-bold mb-4 capitalize">Sitemap</p>
              <ul class="space-y-3 uppercase tracking-wider text-white">
                <li><a (click)="handleNavigate('inicio'); playBeep(480)" class="hover:text-[#41BF84] cursor-pointer transition-colors">INICIO</a></li>
                <li><a (click)="handleNavigate('tienda'); playBeep(520)" class="hover:text-[#41BF84] cursor-pointer transition-colors">CATÁLOGO</a></li>
              </ul>
            </div>

            <!-- Column 2: LEGAL -->
            <div class="space-y-4">
              <p class="text-zinc-400 font-bold mb-4 capitalize">Legal</p>
              <ul class="space-y-3 uppercase tracking-wider text-white">
                <li><a (click)="handleNavigate('legales'); playBeep(550)" class="hover:text-[#41BF84] cursor-pointer transition-colors">PRIVACIDAD</a></li>
                <li><a (click)="handleNavigate('legales'); playBeep(530)" class="hover:text-[#41BF84] cursor-pointer transition-colors">COOKIES</a></li>
                <li><a (click)="handleNavigate('admin'); playBeep(500)" class="hover:text-[#41BF84] cursor-pointer transition-colors">ADMIN</a></li>
              </ul>
            </div>
            
            <!-- Column 3: CONSUMER -->
            <div class="space-y-4">
              <p class="text-zinc-400 font-bold mb-4 capitalize">Consumidor</p>
              <ul class="space-y-3 uppercase tracking-wider">
                <li>
                  <button (click)="handleNavigate('arrepentimiento'); playBeep(500)" 
                          class="text-[#41BF84] border border-[#41BF84]/30 bg-[#41BF84]/5 px-3 py-2 rounded-sm hover:bg-[#41BF84]/15 hover:border-[#41BF84]/60 cursor-pointer transition-all text-left uppercase whitespace-nowrap flex items-center justify-between w-full group">
                    <span class="font-bold">ARREPENTIMIENTO</span>
                    <hugeicons-icon [icon]="Alert01Icon" [size]="14" class="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
                <li>
                  <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" 
                     class="text-zinc-300 border border-white/10 bg-white/5 px-3 py-2 rounded-sm hover:bg-white/10 hover:border-white/30 hover:text-white cursor-pointer transition-all flex items-center justify-between uppercase whitespace-nowrap w-full group">
                    <span class="font-bold">DEFENSA AL CONSUMIDOR</span>
                    <hugeicons-icon [icon]="InformationCircleIcon" [size]="14" class="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- LOWER SECTION: Badges -->
        <div class="max-w-7xl mx-auto flex items-center justify-start mb-8 sm:mb-10 pt-4 lg:pr-[24vw] xl:pr-[25vw]">

          <!-- Badges (Aligned Left) -->
          <div class="w-full flex items-center justify-start gap-6 flex-wrap opacity-80">
            <a href="http://qr.afip.gob.ar/?qr=NJzaKjxSmLLLxv6I0U-Blg,," target="_F960AFIPInfo" rel="noopener noreferrer" class="inline-block grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-fit">
              <img src="assets/logos/DATAWEB.jpg" alt="Data Fiscal AFIP" class="h-8 sm:h-10 object-contain rounded-sm">
            </a>
            <img src="assets/logos/iso-27001.webp" alt="Certificación ISO 27001" class="h-8 sm:h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            
            <!-- Tether SVG -->
            <svg class="h-8 sm:h-10 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" viewBox="0 0 226 167" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <!-- Mastercard SVG -->
            <svg class="h-8 sm:h-10 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" viewBox="0 0 226 167" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <!-- BTC SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 sm:h-10 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24">
              <path fill="#F7931A" d="M18.763 10.236c.28-1.895-1.155-2.905-3.131-3.591l.64-2.553-1.56-.389-.623 2.49-1.245-.297.631-2.508L11.915 3l-.641 2.562-.992-.234v-.01l-2.157-.54-.415 1.668s1.155.272 1.137.28c.631.163.74.578.722.903l-.722 2.923.162.054-.171-.036-1.02 4.087c-.072.19-.27.478-.712.36.018.028-1.128-.27-1.128-.27l-.776 1.778 2.03.505 1.11.289-.65 2.59 1.56.387.633-2.562 1.253.324-.64 2.554 1.56.388.641-2.59c2.662.505 4.665.308 5.505-2.102.676-1.94-.037-3.05-1.435-3.79 1.02-.225 1.786-.902 1.985-2.282zm-3.564 4.999c-.479 1.94-3.745.884-4.8.63l.857-3.436c1.055.27 4.448.784 3.943 2.796zm.478-5.026c-.433 1.76-3.158.866-4.033.65l.775-3.113c.885.217 3.718.632 3.258 2.463"/>
            </svg>
            <!-- USDT SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 sm:h-10 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" fill="none" viewBox="0 0 24 24">
              <path fill="#009393" d="m12 19.2-9-8.88L6.433 4.8h11.134L21 10.32zm.9-8.1v-1.098c1.62.08 3.132.396 3.6.805-.544.477-2.493.824-4.5.824s-3.956-.347-4.5-.824c.463-.41 1.98-.72 3.6-.81V11.1zm-5.4-.297v.661c.463.41 1.975.72 3.6.81V14.7h1.8v-2.43c1.62-.081 3.136-.396 3.6-.806v-1.318c-.464-.41-1.98-.725-3.6-.81V8.4h2.7V7.05H8.4V8.4h2.7v.936c-1.625.085-3.137.4-3.6.81z"/>
            </svg>
          </div>
        </div>

        <!-- BOTTOM SECTION: Legal & CTA Button -->
        <div class="max-w-7xl mx-auto flex flex-col gap-6 relative z-10 w-full mt-2 lg:pr-[24vw] xl:pr-[25vw]">

          <!-- Legal strip (Restored) -->
          <div class="relative z-10 mt-6 flex flex-col gap-2 text-[10px] text-zinc-400 font-mono tracking-wide w-full md:w-3/4">
            <p>2026 <strong class="text-zinc-400 font-sans tracking-normal">GLASTOR®</strong> es una marca registrada en Argentina (INPI — Reg. 4559568 y 4559567, 19/08/2025).</p>
            <p>CUIT 23253165669 — Convenio Multilateral. Emitimos Factura Electrónica A y B.</p>
            <p>Todos los precios publicados en este sitio web están expresados en Pesos Argentinos (ARS) y ya incluyen el 21% de IVA.</p>
            <p>© 2010-2026 <strong class="text-zinc-400 font-sans tracking-normal">GLASTOR-DEV</strong> División DEVOPS, propiedad de GLASTOR®. Todos los derechos reservados.</p>
          </div>
        </div>



      </div>
    </footer>
  `
})
export class FooterComponent {
  appState = inject(AppStateService);
  
  Alert01Icon = Alert01Icon;
  InformationCircleIcon = InformationCircleIcon;
  @Output() navigate = new EventEmitter<string>();

  handleNavigate(view: string) {
    this.navigate.emit(view);
  }

  playBeep(freq: number) {
    this.appState.playSynthBeep(freq, 'sine', 0.05, 0.01);
  }
}
