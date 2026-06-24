import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';

type LegalTab = 'privacidad' | 'aviso' | 'cookies' | 'ventas' | 'accesibilidad' | 'confidencialidad' | 'consumidor' | 'rgpd';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black pt-24 pb-20 px-4 md:px-8 font-sans selection:bg-emerald-500/30">
      
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-16 border-b border-white/10 pb-8">
        <h1 class="text-5xl md:text-7xl font-display font-medium tracking-tight text-white mb-4" [class.text-transparent]="isCinematicGlow()" [class.bg-clip-text]="isCinematicGlow()" [class.bg-gradient-to-r]="isCinematicGlow()" [class.from-zinc-100]="isCinematicGlow()" [class.to-zinc-500]="isCinematicGlow()">Centro Legal y Cumplimiento</h1>
        <p class="text-zinc-400 text-lg max-w-2xl font-light">Transparencia, normativa vigente y directrices de protección al consumidor para GLASTOR®.</p>
      </div>

      <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        <!-- Sidebar Navigation -->
        <aside class="w-full md:w-80 shrink-0">
          <div class="sticky top-28 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <h3 class="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-6">Documentos</h3>
            <nav class="flex flex-col gap-2">
              @for (doc of documents; track doc.id) {
                <button (click)="setActiveTab(doc.id)"
                        class="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group"
                        [class.bg-emerald-950]="activeTab() === doc.id"
                        [class.text-emerald-400]="activeTab() === doc.id"
                        [class.text-zinc-400]="activeTab() !== doc.id"
                        [class.hover:bg-zinc-800]="activeTab() !== doc.id"
                        [class.hover:text-zinc-200]="activeTab() !== doc.id">
                  
                  <!-- Active indicator line -->
                  @if (activeTab() === doc.id) {
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  }
                  
                  <div class="flex items-center justify-between">
                    <span>{{ doc.title }}</span>
                    @if (activeTab() === doc.id) {
                      <span class="material-icons text-[16px] opacity-100">arrow_forward</span>
                    }
                  </div>
                </button>
              }
            </nav>

            <div class="mt-8 pt-6 border-t border-white/10 text-xs text-zinc-500">
              <p>Última actualización: Noviembre 2026</p>
              <p class="mt-2">GLASTOR® - Marca Registrada</p>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 min-w-0 bg-zinc-900/30 border border-white/5 rounded-2xl p-8 md:p-12 prose prose-invert prose-emerald max-w-none">
          
          @switch (activeTab()) {
            @case ('privacidad') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Política de Privacidad de Datos</h2>
                <p>En <strong>GLASTOR S.A.</strong> (en adelante "GLASTOR®"), nos tomamos muy en serio la privacidad de nuestros clientes, socios y usuarios. Esta política describe cómo recopilamos, procesamos y salvaguardamos tu información.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">1. Recopilación de Información</h3>
                <p>Recopilamos información personal de identificación (Nombre, correo electrónico, CUIT/DNI, dirección de facturación) y datos de telemetría de navegación estrictamente necesarios para procesar sus pedidos de equipamiento de alto rendimiento e interactuar con nuestro portal B2B.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">2. Uso de la Información</h3>
                <p>Sus datos son utilizados exclusivamente para:</p>
                <ul>
                  <li>Gestión de la compra, envío y soporte técnico de Hardware.</li>
                  <li>Prevención del fraude y verificación de identidad (KYB - Know Your Business).</li>
                  <li>Envío de alertas del sistema sobre el Centro DevOps.</li>
                </ul>
                
                <h3 class="text-xl text-white mt-8 mb-4">3. Terceros y Compartición</h3>
                <p>GLASTOR® no vende ni alquila bases de datos. Los datos sólo se comparten con socios logísticos aprobados (transporte de equipos) y pasarelas de pago cifradas de extremo a extremo.</p>
              </div>
            }

            @case ('aviso') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Aviso Legal</h2>
                <p>En cumplimiento con las disposiciones vigentes en materia de servicios de la sociedad de la información y comercio electrónico, indicamos los datos de información general de este sitio web:</p>
                
                <div class="bg-zinc-950 p-6 rounded-lg border border-white/5 mt-6 mb-8 font-mono text-sm text-zinc-400">
                  <p><strong>Razón Social:</strong> GLASTOR S.A.</p>
                  <p><strong>Marca Registrada:</strong> GLASTOR® (INPI Reg. N° 4559568 y 4559567)</p>
                  <p><strong>CUIT:</strong> [COMPLETAR CUIT]</p>
                  <p><strong>Domicilio Fiscal:</strong> [COMPLETAR DOMICILIO LEGAL]</p>
                  <p><strong>Email de Contacto:</strong> legales&#64;glastor.com</p>
                </div>
                
                <h3 class="text-xl text-white mt-8 mb-4">Propiedad Intelectual</h3>
                <p>Todos los contenidos del portal (textos, gráficos, logotipos, código fuente y estructura arquitectónica del frontend y backend) son propiedad exclusiva de GLASTOR® o de terceros que han autorizado su uso.</p>
              </div>
            }

            @case ('cookies') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Política de Cookies</h2>
                <p>GLASTOR® utiliza tecnologías de rastreo y cookies para garantizar el funcionamiento del portal y mejorar la experiencia de usuario.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">Cookies Técnicas (Estrictamente Necesarias)</h3>
                <p>Aquellas que permiten al usuario la navegación a través de la plataforma y la utilización del carrito de compras, el acceso al portal de administrador (DevOps Hub) y la seguridad del sistema.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">Cookies de Rendimiento</h3>
                <p>Permiten rastrear métricas de velocidad de carga y telemetría de errores del frontend. No recopilan datos identificables personalmente.</p>
                
                <div class="mt-8">
                  <button (click)="openCookieBanner()" class="px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors text-sm font-medium">Re-configurar Consentimiento</button>
                </div>
              </div>
            }

            @case ('ventas') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Condiciones Generales de Venta</h2>
                <p>Las presentes Condiciones Generales regulan la compra de hardware y licencias de software ofrecidas en el catálogo B2B de GLASTOR®.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">1. Proceso de Compra</h3>
                <p>Los pedidos se procesan de forma automatizada. GLASTOR® se reserva el derecho de cancelar transacciones que presenten irregularidades algorítmicas de fraude o falta de stock en el pipeline logístico.</p>

                <h3 class="text-xl text-white mt-8 mb-4">2. Garantía Técnica</h3>
                <p>Todo el hardware suministrado por GLASTOR® (estaciones de trabajo, POS, equipos rugerizados) cuenta con una garantía industrial estándar de 3 años, expandible a 5 años mediante programas de cobertura Enterprise.</p>
              </div>
            }

            @case ('accesibilidad') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Declaración de Accesibilidad</h2>
                <p>GLASTOR® se compromete a proporcionar un sitio web que sea accesible para el público más amplio posible, independientemente de la tecnología o capacidad.</p>
                <p class="mt-4">Trabajamos continuamente para aumentar la usabilidad general de nuestra plataforma, operando bajo las directrices de las <strong>Pautas de Accesibilidad al Contenido en la Web (WCAG) 2.1</strong> en nivel AA.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">Ajustes Implementados</h3>
                <ul>
                  <li>Contraste dinámico adaptativo (Modo Oscuro Premium).</li>
                  <li>Estructura semántica de etiquetas HTML5 para lectores de pantalla.</li>
                  <li>Navegación completa utilizable mediante teclado (Tabulación).</li>
                </ul>
              </div>
            }

            @case ('confidencialidad') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Aviso de Confidencialidad</h2>
                <p>Este portal y todos sus módulos internos, particularmente el <strong>DevOps Hub</strong> y la consola de administración, contienen información privilegiada y herramientas de infraestructura crítica.</p>
                <div class="bg-red-950/30 border border-red-500/30 p-6 rounded-lg mt-6">
                  <p class="text-red-400 font-medium mb-2">Advertencia Estricta</p>
                  <p class="text-sm text-zinc-300">Cualquier intento de penetración no autorizada, extracción de código fuente, scraping de telemetría o abuso de las APIs expuestas en GLASTOR® será reportado inmediatamente a las autoridades competentes, utilizando los registros inmutables de conexión.</p>
                </div>
              </div>
            }

            @case ('consumidor') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">Defensa del Consumidor (Ley 24.240)</h2>
                <p>De conformidad con las leyes de protección al consumidor de la República Argentina, GLASTOR® asegura el cumplimiento total de los derechos del cliente.</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">Botón de Arrepentimiento</h3>
                <p>Usted tiene el derecho irrevocable a revocar la aceptación de cualquier compra realizada online dentro del plazo de <strong>10 (diez) días corridos</strong> desde la recepción del bien o celebración del contrato, lo último que ocurra.</p>
                
                <p class="mt-4">Para ejercer este derecho, comuníquese con nuestro departamento comercial. Los gastos de devolución corren por cuenta de GLASTOR®.</p>
              </div>
            }

            @case ('rgpd') {
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 class="text-3xl font-display text-white mb-6">RGPD / Marco Europeo y Argentino 2026</h2>
                <p>Este apartado rige el tratamiento transfronterizo de los datos personales, asegurando compatibilidad con el <strong>Reglamento General de Protección de Datos (RGPD) Europeo</strong> y la Ley de Protección de Datos Personales Argentina (Ley 25.326 y sus reformas al 2026).</p>
                
                <h3 class="text-xl text-white mt-8 mb-4">Derechos ARCO</h3>
                <p>Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición sobre sus datos enviando una solicitud formal al oficial de cumplimiento normativo en <code>dpo&#64;glastor.com</code>.</p>

                <h3 class="text-xl text-white mt-8 mb-4">Portabilidad de Datos</h3>
                <p>Nuestros sistemas Cloud Native permiten exportar su historial de telemetría y facturación en formato JSON/CSV a petición del interesado de forma automatizada y sin costo, en un plazo máximo de 72 horas.</p>
              </div>
            }
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    /* Prose styling adaptations for dark theme */
    .prose p, .prose ul, .prose li {
      color: #a1a1aa; /* text-zinc-400 */
      line-height: 1.7;
    }
    .prose ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .prose li {
      margin-bottom: 0.5rem;
    }
    .prose strong {
      color: #e4e4e7; /* text-zinc-200 */
      font-weight: 600;
    }
  `]
})
export class LegalPageComponent {
  private appState = inject(AppStateService);
  isCinematicGlow = this.appState.isCinematicGlow;

  activeTab = signal<LegalTab>('privacidad');

  documents: { id: LegalTab; title: string }[] = [
    { id: 'privacidad', title: 'Política de Privacidad' },
    { id: 'aviso', title: 'Aviso Legal' },
    { id: 'cookies', title: 'Política de Cookies' },
    { id: 'ventas', title: 'Condiciones de Venta' },
    { id: 'accesibilidad', title: 'Accesibilidad Web' },
    { id: 'confidencialidad', title: 'Aviso de Confidencialidad' },
    { id: 'consumidor', title: 'Defensa del Consumidor' },
    { id: 'rgpd', title: 'Marco RGPD / LPD 2026' }
  ];

  setActiveTab(tabId: LegalTab) {
    this.activeTab.set(tabId);
    this.appState.playSynthBeep(400, 'sine', 0.05, 0.01);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCookieBanner() {
    // This removes the local storage item so the banner will trigger next load, 
    // or we can emit an event. For now, just trigger a reload to reset state.
    localStorage.removeItem('glastor_cookies_accepted');
    window.location.reload();
  }
}
