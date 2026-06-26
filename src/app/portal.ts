import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { AppStateService } from './app-state.service';
import { CurrencyService } from './services/currency.service';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './components/pages/checkout-page.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  badges?: string[];
  material: string;
  dimensions: string;
  weight: string;
  stock: number;
  reviews: Array<{ author: string; stars: number; date: string; comment: string }>;
  gallery?: string[];
  status?: 'draft' | 'published' | 'archived';
  publishDate?: string;
  seo?: { slug: string; metaTitle: string; metaDescription: string; altText: string };
  aboutModel?: string;
  features?: string;
  specifications?: string;
  variants?: Array<{ id: string; name: string; price: number; stock: number; image?: string }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface Order {
  id: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  status: 'completado' | 'procesando' | 'enviado';
}
import { ArrepentimientoPageComponent } from './components/pages/arrepentimiento-page.component';
import { LegalPageComponent } from './components/pages/legal-page.component';
import { HomePageComponent } from './components/pages/home-page.component';
import { CatalogPageComponent } from './components/pages/catalog-page.component';
import { ProductDetailPageComponent } from './components/pages/product-detail-page.component';
import { NavbarComponent } from './components/layout/navbar.component';
import { FullscreenMenuComponent } from './components/layout/fullscreen-menu.component';
import { CookieBannerComponent } from './components/layout/cookie-banner.component';
import { ProductCardComponent } from './components/ui/product-card.component';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { UserIcon, Wallet01Icon, CreditCardIcon, BitcoinIcon, Building03Icon, InformationCircleIcon, CheckmarkBadge01Icon } from '@hugeicons/core-free-icons';
import { 
  Settings01Icon, Ticket01Icon, Refresh01Icon, Settings02Icon, 
  Invoice01Icon, Route01Icon, Cancel01Icon, Tick01Icon, 
  Delete01Icon, Rocket01Icon, ArrowRight01Icon, ShoppingBag01Icon, 
  ShoppingCart01Icon, FavouriteIcon 
} from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    HomePageComponent,
    CatalogPageComponent,
    ProductDetailPageComponent,
    LegalPageComponent,
    ArrepentimientoPageComponent,
    NavbarComponent,
    FullscreenMenuComponent,
    CookieBannerComponent,
    QuillModule,
    HugeiconsIconComponent,
    CheckoutPageComponent
  ],
  templateUrl: './portal.html'
})
export class PortalComponent implements OnInit, OnDestroy {
  currencyService = inject(CurrencyService);
  exchangeRateEurToArs = signal<number>(1100);

  adminToken = signal<string | null>(typeof window !== 'undefined' ? localStorage.getItem('glastor_admin_token') : null);
  isAdminAuthenticated = computed(() => !!this.adminToken());

  Settings01Icon = Settings01Icon;
  UserIcon = UserIcon;
  Wallet01Icon = Wallet01Icon;
  CreditCardIcon = CreditCardIcon;
  BitcoinIcon = BitcoinIcon;
  Building03Icon = Building03Icon;
  InformationCircleIcon = InformationCircleIcon;
  CheckmarkBadge01Icon = CheckmarkBadge01Icon;
  Ticket01Icon = Ticket01Icon;
  Refresh01Icon = Refresh01Icon;
  Settings02Icon = Settings02Icon;
  Invoice01Icon = Invoice01Icon;
  Route01Icon = Route01Icon;
  Cancel01Icon = Cancel01Icon;
  Tick01Icon = Tick01Icon;
  Delete01Icon = Delete01Icon;
  Rocket01Icon = Rocket01Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  ShoppingBag01Icon = ShoppingBag01Icon;
  ShoppingCart01Icon = ShoppingCart01Icon;
  FavouriteIcon = FavouriteIcon;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  isLoggingIn = signal(false);

  async adminLogin() {
    if (this.loginForm.invalid) return;
    this.isLoggingIn.set(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.adminToken()}` },
        body: JSON.stringify(this.loginForm.value)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        this.adminToken.set(data.token);
        localStorage.setItem('glastor_admin_token', data.token);
        this.triggerToast('success', 'Acceso Concedido', 'Sesión iniciada correctamente.');
        this.loginForm.reset();
        this.loadOrders();
      } else {
        this.triggerToast('error', 'Acceso Denegado', data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      this.triggerToast('error', 'Error del Sistema', 'No se pudo contactar con el servidor.');
    } finally {
      this.isLoggingIn.set(false);
    }
  }

  adminLogout() {
    this.adminToken.set(null);
    localStorage.removeItem('glastor_admin_token');
    this.triggerToast('info', 'Sesión Finalizada', 'Has salido del panel de administrador.');
    this.setView('inicio');
  }

  currentYear = new Date().getFullYear();

  appState = inject(AppStateService);

  // Delegates to global AppStateService
  isCinematicGlow = this.appState.isCinematicGlow;
  soundEnabled = this.appState.soundEnabled;
  isTransitioning = this.appState.isTransitioning;

  playSynthBeep(freq = 600, type: OscillatorType = 'sine', duration = 0.08, volume = 0.02) {
    this.appState.playSynthBeep(freq, type, duration, volume);
  }

  toggleSound() {
    this.appState.toggleSound();
  }

  toggleCinematicGlow() {
    this.appState.toggleCinematicGlow();
  }

  triggerToast(type: any, title: string, message: string) {
    this.appState.triggerToast(type, title, message);
  }

  dismissToast(id: string) {
    this.appState.dismissToast(id);
  }

  // --- CUSTOM CATEGORIES ---
  customCategories = signal<Array<{value: string, label: string}>>([]);

  addNewCategory() {
    const catName = prompt('Nombre de la nueva categoría:');
    if (catName && catName.trim() !== '') {
      const val = catName.trim().toLowerCase().replace(/\s+/g, '-');
      // Prevent duplicates
      if (!this.customCategories().some(c => c.value === val)) {
        this.customCategories.update(c => [...c, { value: val, label: catName.trim() }]);
      }
      this.productForm.get('category')?.setValue(val);
      this.playSynthBeep(600, 'sine', 0.1, 0.02);
    }
  }

  brandName = 'GLASTOR ® - Mayorista';
  Math = Math;

  formatPrice(value: number): string {
    if (value == null) return '';
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1];
    if (decimalPart === '00') {
      return `$ ${integerPart}`;
    }
    return `$ ${integerPart},${decimalPart}`;
  }

  parseBadge(badge: string): string {
    if (!badge) return '';
    if (badge.startsWith('{') && badge.endsWith('}')) {
      try {
        const parsed = JSON.parse(badge);
        return parsed.value ? parsed.value : badge;
      } catch (e) {
        return badge;
      }
    }
    return badge;
  }

  stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  }
  // Smooth scroll instance reference
  private lenisInstance: any = null;

  // View engine: 'inicio' | 'tienda' | 'detalle' | 'admin' | 'checkout' | 'devops' | 'legales' | 'arrepentimiento'
  currentView = signal<'inicio' | 'tienda' | 'detalle' | 'admin' | 'checkout' | 'devops' | 'legales' | 'arrepentimiento' | '404'>('inicio');
  activeAdminTab = signal<'crm' | 'devops'>('crm');
  selectedProductId = signal<string | null>(null);
  selectedVariantId = signal<string | null>(null);
  selectedGalleryImage = signal<string | null>(null);
  expandedAccordion = signal<string | null>('ACERCA DEL MODELO');

  // Cookie Consent State
  showCookieConsent = signal<boolean>(typeof window !== 'undefined' ? !localStorage.getItem('glastor_cookies_accepted') : true);

  acceptCookies() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('glastor_cookies_accepted', 'true');
    }
    this.showCookieConsent.set(false);
    this.playSynthBeep(800, 'sine', 0.1, 0.02);
  }

  rejectCookies() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('glastor_cookies_accepted', 'false');
    }
    this.showCookieConsent.set(false);
    this.playSynthBeep(400, 'sine', 0.1, 0.02);
  }

  // Active coupon management
  couponCode = new FormControl('');
  activeDiscountPercent = signal<number>(0);

  // Loaded dynamically via backend SQLite
  products = signal<Product[]>([]);
  orders = signal<Order[]>([]);
  revocaciones = signal<Array<any>>([]);

  // Reactive Filters
  selectedCategory = signal<string>('todos');
  searchQuery = signal<string>('');
  cart = signal<CartItem[]>([]);
  wishlist = signal<string[]>([]);

  // UI Drawer states
  isMenuOpen = signal<boolean>(false);
  isCartOpen = signal<boolean>(false);
  isWishlistOpen = signal<boolean>(false);
  isSeoPanelOpen = signal<boolean>(false);
  isCheckoutOpen = signal<boolean>(false);
  orderPlaced = signal<boolean>(false);

  // Dynamic state for adding/editing products inside Admin Panel
  editingProductId = signal<string | null>(null);

  // Table Data Grid States
  adminTablePage = signal<number>(1);
  adminTablePageSize = signal<number>(5);
  adminTableSortDesc = signal<boolean>(true);

  // Product Detail Interactive Customizer States
  selectedFinish = signal<'secoya' | 'roble' | 'nogal'>('roble');
  selectedAccent = signal<'laton' | 'acero' | 'cobre'>('laton');
  selectedPerspectiveIndex = signal<number>(0);

  // Shipping Calculator States
  postalCodeQuery = signal<string>('');
  shippingResult = signal<{ carrier: string; date: string; cost: string } | null>(null);
  isCalculatingShipping = signal<boolean>(false);

  // FWA COMPETITIVE EXPERIENTIAL INTERACTIVES
  isScrolled = signal<boolean>(false);
  selectedLanguage = signal<string>('es');

  // DEVOPS CENTRE MANAGEMENT STATE
  devopsNodes = signal<Array<{
    id: string;
    name: string;
    status: 'operational' | 'degraded' | 'outage';
    cpu: number;
    memory: number;
    network: string;
    description: string;
  }>>([
    { id: 'api-gateway', name: 'API-Gateway Edge Node', status: 'operational', cpu: 12, memory: 34, network: '45.2 MB/s', description: 'Enrutador primario y proxy inverso de peticiones REST' },
    { id: 'sqlite-replica', name: 'SQLite DB Engine (Master)', status: 'operational', cpu: 8, memory: 48, network: '12.8 MB/s', description: 'Persistencia del catálogo técnico de piezas Glastor' },
    { id: 'redis-cache', name: 'Redis Cache (In-Memory)', status: 'operational', cpu: 3, memory: 65, network: '185.3 MB/s', description: 'Buffer acelerador de sesiones, carritos y cotizaciones' },
    { id: 'audio-synth', name: 'Audiogestic Sound Generator', status: 'operational', cpu: 5, memory: 12, network: '1.2 MB/s', description: 'Motor físico Web Audio API del preloader' },
    { id: 'seo-crawler', name: 'Sitemap Auto-Compiler Service', status: 'operational', cpu: 1, memory: 18, network: '0.4 MB/s', description: 'Compilación asíncrona de metatags y sitemaps' },
  ]);

  devopsPipelines = signal<Array<{
    id: string;
    branch: string;
    commit: string;
    duration: string;
    status: 'success' | 'failed' | 'running' | 'idle';
    timestamp: string;
    progress: number;
  }>>([
    { id: '#PL-8492', branch: 'main', commit: 'Merge pull request #115 from glastor/feat-cinematic (a3df85a)', duration: '1m 24s', status: 'success', timestamp: 'Hace 5 mins', progress: 100 },
    { id: '#PL-8491', branch: 'hotfix/preloader-percent', commit: 'update automated entry interval timeout to 3200ms', duration: '48s', status: 'success', timestamp: 'Hace 1 hora', progress: 100 },
    { id: '#PL-8490', branch: 'feature/hardware-filters', commit: 'add tools category with Makita 18V drill item', duration: '2m 10s', status: 'success', timestamp: 'Hace 4 horas', progress: 100 },
  ]);

  devopsEnvVars = signal<Array<{ key: string; value: string; description: string }>>([
    { key: 'PORT', value: '3000', description: 'Puerto unificado del reverso proxy nginx' },
    { key: 'ENV', value: 'production', description: 'Entorno activo de ejecución' },
    { key: 'METRICS_ENABLED', value: 'true', description: 'Monitoreo fotométrico y de telemetría' },
    { key: 'DB_MAX_CONNECTIONS', value: '25', description: 'Piscina de conexiones para SQLite (Drizzle / Better-SQLite3)' },
    { key: 'CACHE_TTL_STD', value: '3600', description: 'Tiempo de vida de assets estáticos (segundos)' },
    { key: 'SSL_AUTO_RENEW', value: 'true', description: 'Renovación automática vía Let\'s Encrypt' },
  ]);

  devopsLogs = signal<string[]>([]);
  isPipelineRunning = signal<boolean>(false);
  activeLogFilter = signal<string>('all');
  metricsTrafficRate = signal<number>(245); // req/s
  metricsAvgLatency = signal<number>(28); // ms
  metricsErrorRate = signal<number>(0.02); // %

  addDevopsLog(service: string, level: 'INFO' | 'WARN' | 'SUCCESS' | 'ERROR', message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const formatted = `[${timestamp}] [${level}] [${service.toUpperCase()}] ${message}`;
    this.devopsLogs.update(logs => [formatted, ...logs].slice(0, 200));
  }

  addToast(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' | 'danger') {
    const mappedType: 'success' | 'error' | 'warning' | 'info' = type === 'danger' ? 'error' : type;
    this.triggerToast(mappedType, title, message);
  }

  flushCache() {
    this.addDevopsLog('redis', 'INFO', 'Iniciando purga manual del buffer en memoria caché (FlushAll)...');
    this.playSynthBeep(330, 'sine', 0.1, 0.05);
    setTimeout(() => {
      this.playSynthBeep(440, 'sine', 0.15, 0.02);
      this.addDevopsLog('redis', 'SUCCESS', 'Caché vaciada exitosamente. 432 fragmentos estáticos invalidados.');
      this.addToast('Caché invalidada', 'Se ha purgado la caché del servidor Redis exitosamente.', 'success');
    }, 450);
  }

  triggerPipeline() {
    if (this.isPipelineRunning()) return;
    this.isPipelineRunning.set(true);
    
    // Create new running pipeline run
    const newId = `#PL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRun = {
      id: newId,
      branch: 'main',
      commit: `Build manual por DevOps Console: Refactoring interfaces (${Math.random().toString(36).substring(2, 9)})`,
      duration: 'En proceso...',
      status: 'running' as const,
      timestamp: 'Ahora mismo',
      progress: 5
    };

    this.devopsPipelines.update(pipes => [newRun, ...pipes]);
    this.addDevopsLog('devops', 'WARN', `Disparador de pipeline iniciado de forma manual para run: ${newId}`);
    this.playSynthBeep(261, 'square', 0.08, 0.01);

    const steps = [
      { p: 15, msg: 'Descargando dependencias del repositorio principal y de submódulos...' },
      { p: 35, msg: 'Ejecutando suite de test unitarios (linter y tests de compilación AOT de Angular)...' },
      { p: 55, msg: 'Buscando vulnerabilidades de dependencias críticas y empaquetando con Esbuild...' },
      { p: 80, msg: 'Creando imagen de contenedor docker optimizada para Google Alpine Linux...' },
      { p: 100, msg: 'Publicando imagen e implementando revisión segura en Google Cloud Run a través de Nginx Edge.' }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const step = steps[currentStepIdx];
        
        // Update runs list
        this.devopsPipelines.update(pipes => pipes.map(p => {
          if (p.id === newId) {
            return {
              ...p,
              progress: step.p,
              duration: `${Math.floor(step.p / 4)}s`
            };
          }
          return p;
        }));

        this.addDevopsLog('builder', step.p === 100 ? 'SUCCESS' : 'INFO', `[${step.p}%] ${step.msg}`);
        this.playSynthBeep(300 + step.p * 3, 'sine', 0.06, 0.005);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        this.isPipelineRunning.set(false);
        this.devopsPipelines.update(pipes => pipes.map(p => {
          if (p.id === newId) {
            return {
              ...p,
              status: 'success' as const,
              duration: '38s',
              timestamp: 'Hace unos instantes'
            };
          }
          return p;
        }));
        this.addDevopsLog('devops', 'SUCCESS', `Pipeline ${newId} completado y desplegado de forma segura en Cloud Run.`);
        this.playSynthBeep(523.25, 'sine', 0.2, 0.05); // high C note
        setTimeout(() => this.playSynthBeep(659.25, 'sine', 0.25, 0.01), 100); // high E note
        this.addToast('Despliegue Exitoso', `El pipeline de compilación ${newId} se ha publicado en producción.`, 'success');
      }
    }, 1200);
  }

  injectTrafficSpike() {
    this.addDevopsLog('traffic', 'WARN', 'Simulando pico imprevisto de peticiones concurrente (Burst de 5,000 req/seg)...');
    this.playSynthBeep(150, 'sawtooth', 0.3, 0.1);
    
    // Instantly modify node metrics
    this.devopsNodes.update(nodes => nodes.map(n => {
      if (n.id === 'api-gateway' || n.id === 'redis-cache' || n.id === 'sqlite-replica') {
        return {
          ...n,
          cpu: Math.floor(75 + Math.random() * 20),
          memory: Math.floor(70 + Math.random() * 25),
          status: 'degraded' as const
        };
      }
      return n;
    }));

    this.metricsTrafficRate.set(4820);
    this.metricsAvgLatency.set(194);
    this.metricsErrorRate.set(1.45);

    this.addDevopsLog('balancer', 'WARN', 'Alerta: Uso de CPU de API Gateway supera umbral del 85%.');
    this.addDevopsLog('api-gateway', 'ERROR', 'Peticiones en cola superan el límite normal. Balanceador escalando réplicas...');

    this.addToast('Inyección de Tránsito', 'Pico de 5k usuarios simulado. Métricas del clúster actualizadas.', 'warning');

    // Auto-scale recovery simulation
    setTimeout(() => {
      this.devopsNodes.update(nodes => nodes.map(n => {
        if (n.id === 'api-gateway' || n.id === 'redis-cache' || n.id === 'sqlite-replica') {
          return {
            ...n,
            cpu: Math.floor(15 + Math.random() * 15),
            memory: Math.floor(45 + Math.random() * 15),
            status: 'operational' as const
          };
        }
        return n;
      }));

      this.metricsTrafficRate.set(245);
      this.metricsAvgLatency.set(28);
      this.metricsErrorRate.set(0.02);

      this.addDevopsLog('balancer', 'SUCCESS', 'Escalamiento horizontal manual exitoso. Réplicas aprovisionadas y tránsito estabilizado.');
      this.addDevopsLog('system', 'INFO', 'Consumo y latencia retornados a sus valores basales.');
    }, 6000);
  }

  toggleServiceNode(nodeId: string) {
    const node = this.devopsNodes().find(n => n.id === nodeId);
    if (!node) return;

    const currentStatus = node.status;
    const nextStatus = currentStatus === 'operational' ? 'outage' : 'operational';
    
    this.devopsNodes.update(nodes => nodes.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          status: nextStatus,
          cpu: nextStatus === 'outage' ? 0 : 15,
          memory: nextStatus === 'outage' ? 4 : 45
        };
      }
      return n;
    }));

    if (nextStatus === 'outage') {
      this.addDevopsLog(nodeId, 'ERROR', `¡EMERGENCIA! Microservicio ${node.name} desconectado / caída del puerto.`);
      this.playSynthBeep(180, 'triangle', 0.4, 0.2);
      this.addToast('Salida de Servicio', `${node.name} se encuentra desconectado. Revisa las alertas.`, 'danger');
    } else {
      this.addDevopsLog(nodeId, 'SUCCESS', `Reinicio seguro del microservicio ${node.name}. Estado operacional restablecido.`);
      this.playSynthBeep(350, 'sine', 0.15, 0.05);
      this.addToast('Servicio Restablecido', `Microservicio ${node.name} reiniciado con éxito.`, 'success');
    }
  }

  addCustomEnvVar(key: string, value: string, description: string) {
    if (!key || !value) return;
    const normalizedKey = key.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');
    const exists = this.devopsEnvVars().some(v => v.key === normalizedKey);
    if (exists) {
      this.addToast('Error', 'La variable de entorno ya existe.', 'danger');
      return;
    }

    const newVal = { key: normalizedKey, value: value.trim(), description: description.trim() || 'Variable manual agregada por DevOps Console' };
    this.devopsEnvVars.update(vars => [...vars, newVal]);
    this.addDevopsLog('config', 'SUCCESS', `Nueva variable agregada con éxito al contenedor: ${normalizedKey} = ${value}`);
    this.playSynthBeep(440, 'sine', 0.1, 0.01);
  }

  removeCustomEnvVar(key: string) {
    this.devopsEnvVars.update(vars => vars.filter(v => v.key !== key));
    this.addDevopsLog('config', 'WARN', `Variable de entorno eliminada del contenedor: ${key}`);
    this.playSynthBeep(220, 'sine', 0.1, 0.01);
  }

  // Computed properties for selected product details
  selectedProductObj = computed(() => {
    return this.products().find(p => p.id === this.selectedProductId()) || null;
  });

  selectedVariantObj = computed(() => {
    const p = this.selectedProductObj();
    const vid = this.selectedVariantId();
    if (!p || !vid || !p.variants) return null;
    return p.variants.find((v: any) => v.id === vid) || null;
  });

  customizerConfig = computed(() => {
    const product = this.selectedProductObj();
    if (!product) return null;

    const cat = product.category || '';

    if (cat === 'tecnologia' || cat === 'computacion') {
      return {
        title: 'CONFIGURACIÓN DE DISPOSITIVO DE ALTA PRECISIÓN',
        option1Label: 'Capacidad y Almacenamiento',
        option1Active: this.selectedFinish(),
        option1Options: [
          {
            key: 'roble',
            name: 'Base Performance (256GB / 16GB RAM)',
            desc: 'Estándar de Fábrica',
            priceAddon: 0,
            colorClass: 'bg-zinc-650 border-zinc-700'
          },
          {
            key: 'nogal',
            name: 'Pro Multi-Core (512GB / 32GB RAM)',
            desc: 'Rendimiento Acelerado',
            priceAddon: 0,
            colorClass: 'bg-indigo-900 border-indigo-950'
          },
          {
            key: 'secoya',
            name: 'Ultra Threading (1TB / 64GB RAM)',
            desc: 'Potencia Desatada',
            priceAddon: 15,
            colorClass: 'bg-amber-600 border-amber-850'
          }
        ],
        option2Label: 'Acabado y Color de Chasis',
        option2Active: this.selectedAccent(),
        option2Options: [
          {
            key: 'laton',
            name: 'Gris Espacial',
            desc: 'Estilo Mate Oscuro',
            colorClass: 'bg-zinc-800 border-zinc-950'
          },
          {
            key: 'acero',
            name: 'Plata Satinado',
            desc: 'Aluminio Cepillado',
            colorClass: 'bg-zinc-300 border-zinc-400'
          },
          {
            key: 'cobre',
            name: 'Blanco Titanio',
            desc: 'Bordes Pulidos',
            colorClass: 'bg-white border-zinc-200 shadow-xs'
          }
        ],
        editorialQuote: 'Diseñado bajo altos estándares globales de innovación, alto rendimiento de procesamiento y optimización de flujos de trabajo digital.',
        sec1Name: 'Estructura',
        sec1Val: 'Arquitectura Neural Integrada',
        sec2Name: 'Clasificación de Ensamble',
        sec2Val: 'Manufactura de Precisión de Chasis'
      };
    } else if (cat === 'herramientas') {
      return {
        title: 'AJUSTE TÉCNICO DE HERRAMIENTA PROFESIONAL',
        option1Label: 'Batería y Estuche de Accesorios',
        option1Active: this.selectedFinish(),
        option1Options: [
          {
            key: 'roble',
            name: 'Litio Estándar (Sólo Dispositivo)',
            desc: 'Ligero',
            priceAddon: 0,
            colorClass: 'bg-emerald-700 border-emerald-900'
          },
          {
            key: 'nogal',
            name: 'Kit Pro Completo (Maletín + Set Brocas)',
            desc: 'Completo',
            priceAddon: 0,
            colorClass: 'bg-zinc-800 border-zinc-900'
          },
          {
            key: 'secoya',
            name: 'Kit Industrial (Doble Batería + Maletín)',
            desc: 'Rudo',
            priceAddon: 15,
            colorClass: 'bg-amber-700 border-amber-900'
          }
        ],
        option2Label: 'Modo de Potencia',
        option2Active: this.selectedAccent(),
        option2Options: [
          {
            key: 'laton',
            name: 'Motor Brushless 18V (SmartEco)',
            desc: 'Inalámbrico',
            colorClass: 'bg-green-700 border-green-900'
          },
          {
            key: 'acero',
            name: 'Motor Brushless 24V (HighTorque)',
            desc: 'Extra-Torque',
            colorClass: 'bg-sky-700 border-sky-900'
          },
          {
            key: 'cobre',
            name: 'Conexión Directa Eléctrica 220V',
            desc: 'Autónomo',
            colorClass: 'bg-red-700 border-red-950'
          }
        ],
        editorialQuote: 'Herramienta de gama industrial construida bajo estándares de alta durabilidad por GLASTOR ® para uso intensivo en talleres y ferreterías.',
        sec1Name: 'Tipo de Motor',
        sec1Val: 'Brushless de Neodimio',
        sec2Name: 'Blindaje Carcasa',
        sec2Val: 'Polímeros Blindados Anti-Impacto'
      };
    } else {
      return {
        title: 'PLAN DE SOPORTE Y LOTE DE DISTRIBUIDOR GLASTOR ®',
        option1Label: 'Volumen de Compra Mayorista',
        option1Active: this.selectedFinish(),
        option1Options: [
          {
            key: 'roble',
            name: 'Lote Mayorista Estándar (Caja x6)',
            desc: 'Precio Sugerido',
            priceAddon: 0,
            colorClass: 'bg-zinc-600 border-zinc-700'
          },
          {
            key: 'nogal',
            name: 'Caja Distribuidor Pro (Caja x24)',
            desc: 'Descuento Lote 5%',
            priceAddon: 0,
            colorClass: 'bg-indigo-900 border-indigo-950'
          },
          {
            key: 'secoya',
            name: 'Pallet Industrial Mayorista (Suministro x100)',
            desc: 'Ahorro Máximo 15%',
            priceAddon: 15,
            colorClass: 'bg-amber-600 border-amber-850'
          }
        ],
        option2Label: 'Soporte y Garantía de Fábrica',
        option2Active: this.selectedAccent(),
        option2Options: [
          {
            key: 'laton',
            name: 'Garantía Estándar GLASTOR ® (1 Año)',
            desc: 'Incluido',
            colorClass: 'bg-neutral-800 border-zinc-950'
          },
          {
            key: 'acero',
            name: 'Garantía Extendida Mayorista (3 Años)',
            desc: 'Uso Intensivo',
            colorClass: 'bg-zinc-300 border-zinc-400'
          },
          {
            key: 'cobre',
            name: 'Garantía de Reposición Inmediata',
            desc: 'Soporte VIP 24/7',
            colorClass: 'bg-white border-zinc-200 shadow-xs'
          }
        ],
        editorialQuote: 'Suministrado y homologado bajo la garantía oficial de GLASTOR ®, asegurando un empaque optimizado, consistencia absoluta de stock y soporte posventa directo.',
        sec1Name: 'Canal de Distribución',
        sec1Val: 'Fletes y Despachos de Alta Tracción',
        sec2Name: 'Garantía de Lote',
        sec2Val: 'Certificación de Calidad Oficial GLASTOR ®'
      };
    }
  });

  selectedOption1Name = computed(() => {
    const config = this.customizerConfig();
    const finish = this.selectedFinish();
    if (!config) return '';
    const found = config.option1Options.find((o: any) => o.key === finish);
    return found ? found.name : '';
  });

  selectedOption2Name = computed(() => {
    const config = this.customizerConfig();
    const accent = this.selectedAccent();
    if (!config) return '';
    const found = config.option2Options.find((o: any) => o.key === accent);
    return found ? found.name : '';
  });

  dynamicReviews = computed(() => {
    const product = this.selectedProductObj();
    if (!product) return [];

    const dbReviews = product.reviews || [];
    const extraReviews: Array<{ author: string; stars: number; date: string; comment: string }> = [];
    const name = product.name;
    const cat = product.category;

    const r = product.rating || 4.8;
    const stars1 = Math.max(3, Math.min(5, Math.round(r)));
    const stars2 = Math.max(3, Math.min(5, Math.ceil(r - 0.5)));

    if (cat === 'tecnologia' || cat === 'computacion') {
      extraReviews.push({
        author: 'Valeria G.',
        stars: stars1,
        date: '28 de May, 2026',
        comment: `La integración tecnológica de este ${name} es insuperable. La fidelidad, el ensamblaje y los acabados premium cumplen con creces los estándares digitales.`
      });
      extraReviews.push({
        author: 'Álvaro S.',
        stars: stars2,
        date: '10 de Jun, 2026',
        comment: `El ciclo térmico y la velocidad de respuesta de ${name} son de primer nivel. Un equipo robusto totalmente recomendado para flujos de trabajo avanzados.`
      });
    } else if (cat === 'herramientas') {
      extraReviews.push({
        author: 'Matías L.',
        stars: stars1,
        date: '02 de Jun, 2026',
        comment: `Increíble fuerza de apriete en todo momento. He usado este ${name} a nivel profesional diario y el motor brushless responde impecable bajo estrés industrial.`
      });
      extraReviews.push({
        author: 'Sebastián T.',
        stars: stars2,
        date: '17 de May, 2026',
        comment: `La ergonomía física de ${name} es perfecta. Balance de masas equilibrado, blindaje de carcasa de alta densidad resistente a impactos. Compra segura.`
      });
    } else {
      extraReviews.push({
        author: 'Lucía M.',
        stars: stars1,
        date: '04 de Jun, 2026',
        comment: `El ${name} es una absoluta obra de arte táctil. Queda súper minimalista y los materiales nobles empleados se sienten de altísima calidad.`
      });
      extraReviews.push({
        author: 'Fernando P.',
        stars: stars2,
        date: '12 de May, 2026',
        comment: `Sobrio, resistente y muy práctico en el día a día. Se integra perfecto en un espacio de diseño premium cuidando la ergonomía global.`
      });
    }

    return [...dbReviews, ...extraReviews];
  });

  ratingBreakdown = computed(() => {
    const product = this.selectedProductObj();
    if (!product) return [];

    const r = product.rating || 4.8;
    const seed = product.name ? product.name.length : 10;
    const variance = (seed % 15) - 7; // -7 to +7 variance for realism

    let p5 = 0, p4 = 0, p3 = 0, p2 = 0, p1 = 0;

    if (r >= 4.8) {
      p5 = 85 + variance;
      p4 = 100 - p5 - 2 - (seed % 2);
      p3 = 100 - p5 - p4;
    } else if (r >= 4.5) {
      p5 = 70 + variance;
      p4 = 20 - Math.floor(variance / 2);
      p3 = 100 - p5 - p4 - 1 - (seed % 2);
      p2 = 100 - p5 - p4 - p3;
    } else if (r >= 4.0) {
      p5 = 55 + variance;
      p4 = 25 - Math.floor(variance / 2);
      p3 = 100 - p5 - p4 - 3 - (seed % 3);
      p2 = 100 - p5 - p4 - p3 - 1;
      p1 = 1;
    } else {
      p5 = 40 + variance;
      p4 = 30 - Math.floor(variance / 2);
      p3 = 15;
      p2 = 10;
      p1 = 100 - p5 - p4 - p3 - p2;
    }

    // Ensure no negative values (clamp to 0 minimum)
    p5 = Math.max(0, p5);
    p4 = Math.max(0, p4);
    p3 = Math.max(0, p3);
    p2 = Math.max(0, p2);
    p1 = Math.max(0, p1);

    // Ensure strict 100% sum after clamp
    const diff = 100 - (p5 + p4 + p3 + p2 + p1);
    if (diff !== 0) p4 += diff; 

    return [
      { stars: 5, pct: p5 },
      { stars: 4, pct: p4 },
      { stars: 3, pct: p3 },
      { stars: 2, pct: p2 },
      { stars: 1, pct: p1 }
    ];
  });

  recommendationPercent = computed(() => {
    const breakdown = this.ratingBreakdown();
    if (breakdown.length === 0) return '0.0';
    const p5 = breakdown.find(b => b.stars === 5)?.pct || 0;
    const p4 = breakdown.find(b => b.stars === 4)?.pct || 0;
    const product = this.selectedProductObj();
    const decimal = product ? (product.name.length % 9) : 0;
    return `${p5 + p4}.${decimal}`;
  });

  // Home Featured Products (High rating)
  featuredProducts = computed(() => {
    return this.products().filter(p => p.rating >= 4.7).slice(0, 3);
  });

  // Standout Star Product of the Week
  starProduct = computed(() => {
    const list = this.products();
    if (list.length === 0) return null;
    return list.slice().sort((a, b) => b.rating - a.rating)[0] || list[0] || null;
  });

  // Curated, non-repetitive recommended icons of the month (excluding the main Star Product)
  iconsOfTheMonth = computed(() => {
    const list = this.products();
    const star = this.starProduct();
    if (!star) return list.slice(0, 4);
    return list.filter(p => p.id !== star.id && p.rating >= 4.5).slice(0, 4);
  });

  wishlistCount = computed(() => {
    return this.wishlist().length;
  });

  wishlistProducts = computed(() => {
    return this.products().filter(p => this.wishlist().includes(p.id));
  });

  // Admin analytical metrics
  adminMetrics = computed(() => {
    const list = this.orders();
    const totalRevenue = list.reduce((sum, o) => sum + o.total, 0);
    const itemsSold = list.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);
    return {
      revenue: totalRevenue,
      salesCount: list.length,
      itemsCount: itemsSold
    };
  });

  // SEO Control states
    metaTags = signal({
      title: 'GLASTOR ® - Distribuidor Mayorista de Electrónica, Computación y Herramientas Eléctricas',
      description: 'Catálogo mayorista online premium de hardware de computación, laptops, smart TVs, iPhones y herramientas industriales de alta fidelidad.',
    keywords: 'tecnologia, computación, herramientas makita, total, lusqtoff, milwaukee, bosch, amd ryzen, rtx nvidia, intel core, pc, notebook, smart tv, iphone',
    robots: 'User-agent: *\nAllow: /\nDisallow: /checkout\n\nSitemap: https://ais-pre-ve56eyrizcjckavnupebnz-153443328861.us-west2.run.app/sitemap.xml'
  });

  // Dynamically constructed Sitemap URLs starting with our product list
  sitemapUrls = signal<SitemapURL[]>([
    { loc: 'https://ais-pre-ve56eyrizcjckavnupebnz-153443328861.us-west2.run.app/', lastmod: '2026-06-17', changefreq: 'daily', priority: 1.0 },
    { loc: 'https://ais-pre-ve56eyrizcjckavnupebnz-153443328861.us-west2.run.app/tecnologia', lastmod: '2026-06-17', changefreq: 'weekly', priority: 0.8 },
    { loc: 'https://ais-pre-ve56eyrizcjckavnupebnz-153443328861.us-west2.run.app/herramientas', lastmod: '2026-06-17', changefreq: 'weekly', priority: 0.8 },
    { loc: 'https://ais-pre-ve56eyrizcjckavnupebnz-153443328861.us-west2.run.app/computacion', lastmod: '2026-06-17', changefreq: 'weekly', priority: 0.6 }
  ]);

  // Setup FormControls and FormGroups (Strict adherence to NO ngModel)
  searchControl = new FormControl('');
  
  sitemapForm = new FormGroup({
    loc: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
    changefreq: new FormControl<'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'>('weekly', { nonNullable: true }),
    priority: new FormControl<number>(0.8, { nonNullable: true, validators: [Validators.min(0.0), Validators.max(1.0)] })
  });

  metaForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(160)]),
    keywords: new FormControl('', [Validators.required])
  });

  robotsControl = new FormControl('');

  checkoutForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
    paymentMethod: new FormControl<'card' | 'crypto' | 'bank'>('bank', { nonNullable: true }),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
    cardExpiry: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]),
    cardCvc: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
    cryptoTxHash: new FormControl('', []),
    bankTxRef: new FormControl('', []),
    acceptTerms: new FormControl(false, [Validators.requiredTrue])
  });

  // FormGroup for Product Addition/Upsert via Zod valid API
  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl<string>('tecnologia', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(299.00, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', [Validators.required]),
    galleryRaw: new FormControl(''),
    material: new FormControl(''),
    dimensions: new FormControl(''),
    weight: new FormControl(''),
    stock: new FormControl<number>(10, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    status: new FormControl<'draft' | 'published' | 'archived'>('published'),
    publishDate: new FormControl(''),
    seo: new FormGroup({
      slug: new FormControl(''),
      metaTitle: new FormControl(''),
      metaDescription: new FormControl(''),
      altText: new FormControl('')
    }),
    variants: new FormArray([]),
    aboutModel: new FormControl(''),
    features: new FormControl(''),
    specifications: new FormControl(''),
    dynamicAttributes: new FormArray([])
  });

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  get dynamicAttributes(): FormArray {
    return this.productForm.get('dynamicAttributes') as FormArray;
  }

  addDynamicAttribute(key = '', value = '') {
    this.dynamicAttributes.push(new FormGroup({
      key: new FormControl(key, [Validators.required]),
      value: new FormControl(value, [Validators.required])
    }));
  }

  removeDynamicAttribute(index: number) {
    this.dynamicAttributes.removeAt(index);
  }

  isUploadingImage = signal(false);
  isAutocompleting = signal(false);

  async uploadToCloudinary(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Credenciales inyectadas
    const cloudName = 'dzualplqi';
    const uploadPreset = 'imagenes';

    this.isUploadingImage.set(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.secure_url) {
        this.productForm.patchValue({ image: data.secure_url });
        this.triggerToast('success', 'Imagen Subida', 'La imagen ha sido procesada por Cloudinary.');
      } else {
        throw new Error(data.error?.message || 'Error desconocido al subir.');
      }
    } catch (error: any) {
      this.triggerToast('error', 'Error en Subida', error.message || 'Hubo un error contactando a Cloudinary.');
    } finally {
      this.isUploadingImage.set(false);
    }
  }

  async uploadGalleryToCloudinary(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const cloudName = 'dzualplqi';
    const uploadPreset = 'imagenes';

    this.isUploadingImage.set(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.secure_url) {
        const currentGallery = this.productForm.get('galleryRaw')?.value || '';
        const newGallery = currentGallery ? currentGallery + '\n' + data.secure_url : data.secure_url;
        this.productForm.patchValue({ galleryRaw: newGallery });
        this.triggerToast('success', 'Imagen Añadida a Galería', 'La imagen secundaria ha sido subida correctamente.');
      } else {
        throw new Error(data.error?.message || 'Error desconocido al subir.');
      }
    } catch (error: any) {
      console.error(error);
      this.triggerToast('error', 'Error de Subida', 'No se pudo subir la imagen a la galería.');
    } finally {
      this.isUploadingImage.set(false);
    }
  }

  // Handle image drag and drop
  onImageDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // highlight dropzone
  }

  onImageDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.productForm.patchValue({ image: e.target?.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        this.addToast('Error', 'Solo se permiten archivos de imagen.', 'danger');
      }
    }
  }

  ngOnDestroy() {
    if (this.lenisInstance) {
      try {
        this.lenisInstance.destroy();
      } catch (e) {
        console.error(e);
      }
    }
  }

  async ngOnInit() {
    this.currencyService.getEurExchangeRate().subscribe(rate => {
      this.exchangeRateEurToArs.set(rate);
      console.log('Euro exchange rate updated via DolarAPI:', rate);
    });
    // Initialize default DevOps diagnostic logs
    this.addDevopsLog('system', 'INFO', 'Iniciando módulo de diagnóstico fotométrico GLASTOR...');
    this.addDevopsLog('database', 'INFO', 'Estableciendo conexión persistente con SQLite master local.');
    this.addDevopsLog('nginx', 'INFO', 'Reverse proxy escuchando peticiones REST entrantes en puerto 3000.');
    this.addDevopsLog('redis', 'SUCCESS', 'Conexión con almacén en caché Redis exitosa (hits=98.4%).');
    this.addDevopsLog('api-gateway', 'SUCCESS', 'Certificado SSL validado contra *.glastor.es. Renovación automática activa.');

    // FWA Preloader Progress simulation & Lenis init
    if (typeof window !== 'undefined') {
      try {
        // Initialize Lenis smooth scroll
        this.lenisInstance = new Lenis({
          duration: 1.8, // Increased duration for a longer, more dramatic gliding inertia
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1.5, // Increased wheel multiplier for a punched up, aggressive response
          gestureOrientation: 'vertical'
        });

        // Register GSAP ScrollTrigger plugin and tie it to Lenis scroll updates
        gsap.registerPlugin(ScrollTrigger);
        this.lenisInstance.on('scroll', () => {
          ScrollTrigger.update();
        });

        // Set isScrolled state from Lenis scroll events
        this.lenisInstance.on('scroll', (e: any) => {
          this.isScrolled.set(e.scroll > 20);
        });

        // Window scroll listener fallback
        window.addEventListener('scroll', () => {
          this.isScrolled.set(window.scrollY > 20 || (this.lenisInstance && this.lenisInstance.scroll > 20));
        }, { passive: true });

        // Handle URL Path for initial routing
        const path = window.location.pathname;
        if (path !== '/' && path !== '/home' && !path.startsWith('/api') && path !== '/index.html') {
          // Unrecognized static path falls back to 404 view
          this.currentView.set('404');
        }

        // Cinematic GSAP ScrollTrigger Sequence & Layout Refresh
        this.initScrollAnimations();

        const raf = (time: number) => {
          this.lenisInstance?.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // 1. Cinematic mouse glow radial lerped tracking
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        window.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        }, { passive: true });
        
        const updateGlowPosition = () => {
          currentX += (mouseX - currentX) * 0.08;
          currentY += (mouseY - currentY) * 0.08;
          
          const glowElement = document.querySelector('.mouse-glow-bg') as HTMLElement;
          if (glowElement) {
            glowElement.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
          }
          requestAnimationFrame(updateGlowPosition);
        };
        requestAnimationFrame(updateGlowPosition);

        // 2. Interactive 3D tilt effect with event delegation & mobile guard
        let activeCard: HTMLElement | null = null;
        
        window.addEventListener('mousemove', (e) => {
          if (window.innerWidth < 768) {
            if (activeCard) {
              activeCard.style.transform = '';
              activeCard = null;
            }
            return;
          }

          const target = e.target as HTMLElement;
          const card = target.closest('.tilt-card-3d') as HTMLElement;
          
          if (card) {
            activeCard = card;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const w = rect.width;
            const h = rect.height;
            
            const rotX = ((y / h) - 0.5) * -16;
            const rotY = ((x / w) - 0.5) * 16;
            
            card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
          } else if (activeCard) {
            activeCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            activeCard = null;
          }
        }, { passive: true });
      } catch (e) {
        console.error('Lenis smooth scroll setup error:', e);
      }
    }

    // Load initial wishlist state from localStorage safely under SSR
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('sodra_wishlist');
      if (savedWishlist) {
        try {
          this.wishlist.set(JSON.parse(savedWishlist));
        } catch (e) {
          console.error('Error parsing localStorage wishlist:', e);
        }
      }
    }

    // Sync search control to signal
    this.searchControl.valueChanges.subscribe(value => {
      this.searchQuery.set(value || '');
    });

    // Setup payment method conditional validators
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const cardNum = this.checkoutForm.get('cardNumber');
      const cardExp = this.checkoutForm.get('cardExpiry');
      const cardCvc = this.checkoutForm.get('cardCvc');
      const cryptoTx = this.checkoutForm.get('cryptoTxHash');
      const bankTx = this.checkoutForm.get('bankTxRef');

      if (method === 'card') {
        cardNum?.setValidators([Validators.required, Validators.pattern('^[0-9]{16}$')]);
        cardExp?.setValidators([Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]);
        cardCvc?.setValidators([Validators.required, Validators.pattern('^[0-9]{3}$')]);
        cryptoTx?.clearValidators();
        bankTx?.clearValidators();
      } else if (method === 'crypto') {
        cardNum?.clearValidators();
        cardExp?.clearValidators();
        cardCvc?.clearValidators();
        cryptoTx?.setValidators([Validators.required, Validators.minLength(8)]);
        bankTx?.clearValidators();
      } else if (method === 'bank') {
        cardNum?.clearValidators();
        cardExp?.clearValidators();
        cardCvc?.clearValidators();
        cryptoTx?.clearValidators();
        bankTx?.setValidators([Validators.required, Validators.minLength(4)]);
      }

      cardNum?.updateValueAndValidity();
      cardExp?.updateValueAndValidity();
      cardCvc?.updateValueAndValidity();
      cryptoTx?.updateValueAndValidity();
      bankTx?.updateValueAndValidity();
    });

    // Load initial SQLite states
    try {
      await Promise.all([this.loadProducts(), this.loadOrders()]);
    } catch (e) {
      console.error('Error synchronizing initial records:', e);
    } finally {
      // Data loaded
    }

    // Populate SEO Meta Form
    this.metaForm.setValue({
      title: this.metaTags().title,
      description: this.metaTags().description,
      keywords: this.metaTags().keywords
    });

    this.robotsControl.setValue(this.metaTags().robots);
  }

  // Handle Arrepentimiento submission
  registerRevocation(data: any) {
    this.revocaciones.update(list => [data, ...list]);
    this.addDevopsLog('crm', 'WARN', `Solicitud de arrepentimiento registrada: ${data.id} para el pedido ${data.pedido}`);
    
    // Attempt to automatically update the order status if it exists
    const existingOrder = this.orders().find(o => o.id === data.pedido);
    if (existingOrder) {
      this.updateOrderStatus(existingOrder.id, 'procesando');
      this.addDevopsLog('crm', 'INFO', `Estado del pedido ${data.pedido} actualizado a PROCESANDO debido a solicitud de arrepentimiento.`);
    }
  }

  // ==========================================
  // FEEDBACKS & APIS INTEGRATION SYNC
  // ==========================================

  async loadProducts() {
    try {
      const res = await fetch('/api/productos');
      if (!res.ok) throw new Error('Error al leer productos');
      const data = await res.json();
      this.products.set(data);

      // Infer custom categories from DB products
      const standardCats = ['tecnologia', 'herramientas', 'computacion', 'accesorios'];
      const uniqueCats = new Set<string>();
      data.forEach((p: any) => {
        if (p.category && !standardCats.includes(p.category)) {
          uniqueCats.add(p.category);
        }
      });
      
      const customArray: {value: string, label: string}[] = [];
      uniqueCats.forEach(cat => {
        customArray.push({
          value: cat,
          label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')
        });
      });
      this.customCategories.set(customArray);
    } catch (err) {
      console.error(err);
      this.triggerToast('error', 'Error Conectividad', 'No se pudo leer el catálogo de productos desde SQLite3.');
    }
  }

  async loadOrders() {
    if (!this.adminToken()) return;
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${this.adminToken()}` }
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) return; // Silent ignore if token expired
        throw new Error('Error al leer órdenes');
      }
      const data = await res.json();
      this.orders.set(data);
    } catch (err) {
      console.error(err);
      this.triggerToast('error', 'Error Conectividad', 'No se pudo sincronizar el historial de despachos desde SQLite3.');
    }
  }

  // Filtered Products computation
  filteredProducts = computed(() => {
    const term = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    
    return this.products().filter(p => {
      const matchCat = (cat === 'todos' || p.category === cat);
      const matchSearch = p.name.toLowerCase().includes(term) || 
                          p.description.toLowerCase().includes(term) ||
                          p.category.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  });

  publicProducts = computed(() => {
    return this.filteredProducts().filter(p => p.status === 'published');
  });

  // Admin Data Grid Computed Signals
  pagedAdminProducts = computed(() => {
    let sorted = [...this.filteredProducts()];
    if (this.adminTableSortDesc()) {
      sorted.sort((a, b) => b.stock - a.stock);
    } else {
      sorted.sort((a, b) => a.stock - b.stock);
    }
    const startIndex = (this.adminTablePage() - 1) * this.adminTablePageSize();
    return sorted.slice(startIndex, startIndex + this.adminTablePageSize());
  });

  adminTableTotalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.adminTablePageSize()) || 1;
  });

  toggleAdminSort() {
    this.adminTableSortDesc.set(!this.adminTableSortDesc());
  }

  nextAdminPage() {
    if (this.adminTablePage() < this.adminTableTotalPages()) {
      this.adminTablePage.set(this.adminTablePage() + 1);
    }
  }

  prevAdminPage() {
    if (this.adminTablePage() > 1) {
      this.adminTablePage.set(this.adminTablePage() - 1);
    }
  }

  // Shopping Cart Totals calculations
  cartCount = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.quantity, 0);
  });

  subtotal = computed(() => {
    return this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  discountAmount = computed(() => {
    return this.subtotal() * (this.activeDiscountPercent() / 100);
  });

  iva = computed(() => {
    const actSub = this.subtotal() - this.discountAmount();
    return Math.max(0, actSub * 0.21);
  });

  shipping = computed(() => {
    const afterDiscount = this.subtotal() - this.discountAmount();
    return afterDiscount >= 200000 ? 0 : (this.subtotal() === 0 ? 0 : 16500);
  });

  total = computed(() => {
    const result = (this.subtotal() - this.discountAmount()) + this.shipping();
    return Math.max(0, result);
  });

  // View control transitions
  setView(view: string, productId: string | null = null) {
    const validView = view as 'inicio' | 'tienda' | 'detalle' | 'admin' | 'checkout' | 'devops' | 'legales' | 'arrepentimiento' | '404';
    this.playSynthBeep(620, 'sine', 0.05, 0.015);
    this.isMenuOpen.set(false);
    this.isTransitioning.set(true);

    // Coordinate immediate scroll to top before transition slide
    if (this.lenisInstance) {
      try {
        this.lenisInstance.scrollTo(0, { immediate: true });
      } catch (e) {
        window.scrollTo({ top: 0 });
      }
    } else {
      window.scrollTo({ top: 0 });
    }

    // Delay viewport variable update until curtain is fully opaque (400ms)
    setTimeout(() => {
      if (view === 'devops') {
        this.currentView.set('admin');
        this.activeAdminTab.set('devops');
      } else {
        this.currentView.set(validView);
        if (view === 'admin') {
          this.activeAdminTab.set('crm');
        }
      }

      if (productId !== null) {
        this.selectedProductId.set(productId);
        this.selectedVariantId.set(null);
      }
      if (view === 'detalle') {
        this.selectedFinish.set('roble');
        this.selectedProductId.set(productId || '');
        this.selectedPerspectiveIndex.set(0);
        this.selectedGalleryImage.set(null); // Reset when a new product is selected
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.postalCodeQuery.set('');
        this.shippingResult.set(null);
        this.isCalculatingShipping.set(false);
      }

      // Smoothly fade out curtain (350ms)
      setTimeout(() => {
        this.isTransitioning.set(false);
        this.playSynthBeep(920, 'sine', 0.08, 0.008);
        this.initScrollAnimations();
      }, 350);
    }, 400);
  }

  toggleAccordion(section: string) {
    if (this.expandedAccordion() === section) {
      this.expandedAccordion.set(null);
    } else {
      this.expandedAccordion.set(section);
    }
  }

  // Cinematic GSAP ScrollTrigger Sequence & Layout Refresh
  initScrollAnimations() {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear old ScrollTriggers to prevent duplicates during view swaps
      ScrollTrigger.getAll().forEach(t => t.kill());

      setTimeout(() => {
        // Force Lenis to recalculate container heights and update ScrollTrigger positions
        if (this.lenisInstance) {
          try {
            this.lenisInstance.resize();
          } catch (e) {
            console.error('Lenis resize error:', e);
          }
        }
        try {
          ScrollTrigger.refresh();
        } catch (e) {
          console.error('ScrollTrigger refresh error:', e);
        }

        // 1. Initial fade-in of the main hero section staggered elements
        gsap.from('.stagger-in-1, .stagger-in-2, .stagger-in-3', {
          opacity: 0,
          y: 45,
          duration: 1.1,
          stagger: 0.16,
          ease: 'power4.out',
          clearProps: 'all'
        });

        // 2. Animate Premium Cards as they slide on Scroll
        const premiumCards = document.querySelectorAll('.hover-card-premium');
        premiumCards.forEach((card: any) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 45,
            duration: 0.85,
            ease: 'power3.out'
          });
        });

        // 3. Reveal Section Titles elegantly from left
        const sectionTitles = document.querySelectorAll('main h2');
        sectionTitles.forEach((title: any) => {
          gsap.from(title, {
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: 'power2.out'
          });
        });

        // 4. Animate bento layout grids and newsletter section
        const grids = document.querySelectorAll('main .grid > div, .animate-grid > div');
        grids.forEach((gridItem: any) => {
          gsap.from(gridItem, {
            scrollTrigger: {
              trigger: gridItem,
              start: 'top 92%',
              toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: 'power2.out'
          });
        });

        // Force scrolltrigger register update
        ScrollTrigger.refresh();
      }, 150);
    } catch (e) {
      console.warn('GSAP ScrollTrigger initialization bypassed:', e);
    }
  }

  // Calculate estimated shipping for detail view
  calculateShipping() {
    const code = this.postalCodeQuery().trim();
    if (!code || !/^[0-9]{5}$/.test(code)) {
      this.triggerToast('warning', 'Código Postal Inválido', 'Por favor ingrese un código postal de 5 dígitos.');
      return;
    }
    
    this.isCalculatingShipping.set(true);
    this.shippingResult.set(null);
    
    setTimeout(() => {
      this.isCalculatingShipping.set(false);
      const speedCode = parseInt(code[2] || '0', 10);
      let carrier = 'GLASTOR Express Cargo';
      let days = 2;
      let cost = 'GRATIS';
      
      if (speedCode % 2 === 0) {
        carrier = 'GLASTOR Flete Directo';
        days = 1;
        cost = 'GRATIS (Ventaja GLASTOR ® Mayorista)';
      } else {
        carrier = 'GLASTOR EcoPostal Certificado';
        days = 3;
        cost = 'GRATIS';
      }
      
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + days);
      const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
      const formattedDate = `${daysOfWeek[deliveryDate.getDay()]}, ${deliveryDate.getDate()} de ${months[deliveryDate.getMonth()]}`;
      
      this.shippingResult.set({
        carrier,
        date: formattedDate,
        cost
      });
      this.triggerToast('success', 'Envío Calculado', `Optimizado logística con destino CP ${code}.`);
    }, 1200);
  }

  // Apply checkout dynamic coupon code
  applyCoupon() {
    const code = (this.couponCode.value || '').trim().toUpperCase();
    if (code === 'MAYORISTA10') {
      this.activeDiscountPercent.set(10);
      this.triggerToast('success', 'Cupón Aplicado', 'Se ha activado un 10% de descuento directo en tu lote de compra.');
    } else if (code === 'GLASTOR20') {
      this.activeDiscountPercent.set(20);
      this.triggerToast('success', 'Cupón Premium', 'Sello GLASTOR ® validado: ¡20% de descuento mayorista otorgado!');
    } else {
      this.triggerToast('error', 'Código Inválido', 'El cupón indicado no existe o ha expirado.');
    }
    this.couponCode.setValue('');
  }



  // Cart Functions
  addToCart(product: Product) {
    // Check if enough stock exists in current catalogs
    const inCart = this.cart().find(c => c.product.id === product.id);
    const reqQty = inCart ? inCart.quantity + 1 : 1;
    
    if (product.stock < reqQty) {
      this.playSynthBeep(220, 'triangle', 0.2, 0.03); // failure beep
      this.triggerToast('warning', 'Stock Limitado', `No hay suficientes unidades de "${product.name}" disponibles en el almacén.`);
      return;
    }

    this.playSynthBeep(880, 'sine', 0.12, 0.02);
    setTimeout(() => this.playSynthBeep(1100, 'sine', 0.1, 0.02), 70); // cheerful major third trigger

    this.cart.update(currentCart => {
      const existing = currentCart.find(item => item.product.id === product.id);
      if (existing) {
        return currentCart.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });

    this.triggerToast('success', 'Producto Añadido', `Se ha agregado "${product.name}" al carrito de compras.`);
  }

  updateQuantity(productId: string, delta: number) {
    // Check against available catalog stock
    const item = this.cart().find(c => c.product.id === productId);
    if (item && delta > 0) {
      if (item.product.stock <= item.quantity) {
        this.triggerToast('warning', 'Máximo Inventario', `Solo quedan ${item.product.stock} unidades de este diseño en stock.`);
        return;
      }
    }

    this.cart.update(currentCart => {
      return currentCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      });
    });
  }

  removeFromCart(productId: string) {
    const item = this.cart().find(i => i.product.id === productId);
    this.cart.update(currentCart => currentCart.filter(item => item.product.id !== productId));
    if (item) {
      this.triggerToast('info', 'Articulo Eliminado', `Se retiró "${item.product.name}" del carrito.`);
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlist().includes(id);
  }

  toggleWishlist(id: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const current = this.wishlist();
    let updated: string[];
    if (current.includes(id)) {
      this.playSynthBeep(480, 'sine', 0.1, 0.015);
      updated = current.filter(itemId => itemId !== id);
      const prod = this.products().find(p => p.id === id);
      this.triggerToast('info', 'Eliminado de la Lista', `${prod?.name || 'Artículo'} retirado de favoritos.`);
    } else {
      this.playSynthBeep(960, 'sine', 0.14, 0.02);
      updated = [...current, id];
      const prod = this.products().find(p => p.id === id);
      this.triggerToast('success', 'Añadido a Favoritos', `${prod?.name || 'Artículo'} guardado para más tarde.`);
    }
    this.wishlist.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sodra_wishlist', JSON.stringify(updated));
    }
  }

  clearCart() {
    this.cart.set([]);
  }

  openCheckout() {
    if (this.cart().length === 0) {
      this.triggerToast('warning', 'Carrito Vacío', 'Para proceder al pago, primero agrega algún artículo a tu cesta.');
      return;
    }
    this.isCartOpen.set(false);
    this.setView('checkout');
  }

  closeCheckout() {
    this.setView('tienda');
    this.orderPlaced.set(false);
    this.checkoutForm.reset({ paymentMethod: 'bank' });
    this.activeDiscountPercent.set(0);
    setTimeout(() => this.setView('tienda'), 5000);
  }

  // Intercept payment method selection for deactivated methods
  selectPaymentMethod(method: 'card' | 'crypto' | 'bank') {
    if (method === 'card') {
      this.triggerToast('info', 'Método en Evaluación', 'El pago con tarjeta está temporalmente inhabilitado por evaluación de comisiones. Usa Transferencia Bancaria.');
    } else if (method === 'crypto') {
      this.triggerToast('info', 'Mantenimiento', 'El pago con criptomonedas estará disponible próximamente.');
    } else {
      this.checkoutForm.get('paymentMethod')?.setValue('bank');
    }
  }

  // Real SQLite driven checkout validation & stock deductions
  async processCheckout() {
    if (this.checkoutForm.invalid) {
      this.triggerToast('error', 'Formulario Incompleto', 'Por favor, diligencie correctamente los datos de facturación e información de pago.');
      return;
    }

    const payload = this.checkoutForm.value;
    this.triggerToast('info', 'Procesando Pago', 'Estableciendo canal de pasarela segura... Por favor no cierre la pestaña.');
    
    // Map client basket to backend checkout items format
    const itemsMapped = this.cart().map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: payload.fullName || '',
          email: payload.email || '',
          address: payload.address || '',
          city: payload.city || '',
          postalCode: payload.postalCode || '',
          couponCode: this.activeDiscountPercent() > 0 ? (this.activeDiscountPercent() === 10 ? 'MAYORISTA10' : 'GLASTOR20') : null,
          items: itemsMapped
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "STOCK_DEDUCTION_FAILED") {
          this.triggerToast('error', 'Inventario Insuficiente', data.message);
          return;
        }
        throw new Error(data.message || data.error || 'La pasarela bancaria rechazó la transacción.');
      }

      // Synchronize changes on success
      await this.loadProducts(); // Download updated SQLite catalog stock quantities
      await this.loadOrders();   // Download updated SQLite orders journal
      
      this.orderPlaced.set(true);

      // Trigger Confetti Celebration (Awwwards design choice)
      try {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;

        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 40 * (timeLeft / duration);
          
          confetti({
            particleCount,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#ca5c00', '#fbbf24', '#c7d2fe', '#4f46e5']
          });
          confetti({
            particleCount,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#ca5c00', '#fbbf24', '#c7d2fe', '#4f46e5']
          });
        }, 250);
      } catch (e) {
        console.error('Confetti burst failed', e);
      }
      
      let successMsg = `¡Muchísimas gracias ${payload.fullName}! Tu compra con código ${data.orderId} por un total de €${this.total().toFixed(2)} se ha procesado y validado en la base de datos GLASTOR ®.`;
      if (payload.paymentMethod === 'crypto') {
        successMsg = `¡Muchísimas gracias ${payload.fullName}! Tu pedido ${data.orderId} por €${this.total().toFixed(2)} se encuentra en espera de confirmación de red Blockchain (Hash registrado: ${payload.cryptoTxHash || 'Pendiente'}).`;
      } else if (payload.paymentMethod === 'bank') {
        successMsg = `¡Muchísimas gracias ${payload.fullName}! Reserva completada del pedido ${data.orderId} por €${this.total().toFixed(2)}. Esperando transferencia bancaria con referencia: ${payload.bankTxRef || 'No indicada'}.`;
      }

      this.triggerToast('success', 'Pedido Confirmado', successMsg);
      this.clearCart();
    } catch (err: any) {
      console.error(err);
      this.triggerToast('error', 'Pasarela Fallida', err.message || 'Error de conexión con el servidor SQLite.');
    }
  }

  // Category Filtering utility
  setCategory(category: string) {
    this.selectedCategory.set(category);
    this.setView('tienda');
    this.triggerToast('info', 'Filtro Aplicado', `Mostrando productos pertenecientes a la categoría de "${category.toUpperCase()}".`);
  }

  // SEO Control Panel Functions
  toggleSeoPanel() {
    this.isSeoPanelOpen.update(v => !v);
  }

  updateSeoMeta() {
    if (this.metaForm.invalid) {
      this.triggerToast('error', 'Meta Tags Invalidos', 'El meta título debe tener entre 10 y 70 caracteres y la descripción entre 20 y 160.');
      return;
    }

    const formVal = this.metaForm.value;
    this.metaTags.update(curr => ({
      ...curr,
      title: formVal.title || '',
      description: formVal.description || '',
      keywords: formVal.keywords || ''
    }));

    this.triggerToast('success', 'Metadatos Guardados', 'Los metadatos SEO han sido cargados directamente en los índices internos del CMS.');
  }

  updateRobotsTxt() {
    const robotsText = this.robotsControl.value || '';
    this.metaTags.update(curr => ({
      ...curr,
      robots: robotsText
    }));
    this.triggerToast('success', 'Robots.txt Modificado', 'Se han reescrito las directivas de seguridad para los bots de búsqueda como Googlebot.');
  }

  addSitemapUrl() {
    if (this.sitemapForm.invalid) {
      this.triggerToast('error', 'URL Inválida', 'La dirección web ingresada debe de ser un enlace absoluto válido y el sitemap debe estar estructurado.');
      return;
    }

    const formValues = this.sitemapForm.value;
    const today = new Date().toISOString().split('T')[0];

    const newUrl: SitemapURL = {
      loc: formValues.loc || '',
      lastmod: today,
      changefreq: formValues.changefreq || 'weekly',
      priority: Number(formValues.priority || 0.8)
    };

    this.sitemapUrls.update(urls => [...urls, newUrl]);
    this.triggerToast('success', 'Sitemap Actualizado', `Se añadió la ruta "${newUrl.loc}" al listado de indexación automatizada.`);
    this.sitemapForm.patchValue({ loc: '' });
  }

  removeSitemapUrl(index: number) {
    const item = this.sitemapUrls()[index];
    this.sitemapUrls.update(urls => urls.filter((_, i) => i !== index));
    if (item) {
      this.triggerToast('warning', 'Sitemap Reducido', `Se ha removido el enlace "${item.loc}" del árbol sitemap.xml.`);
    }
  }

  // Update order status in SQLite Admin CRM 
  async updateOrderStatus(orderId: string, status: 'completado' | 'procesando' | 'enviado') {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (!res.ok) throw new Error('Error al sincronizar estado de despacho');

      await this.loadOrders();
      this.triggerToast('success', 'Pedido Actualizado', `La orden ${orderId} ahora posee el estado de [${status.toUpperCase()}].`);
    } catch (err) {
      console.error(err);
      this.triggerToast('error', 'Acción Fallida', 'No se pudo registrar la actualización de despacho en el servidor.');
    }
  }

  // Archive and Delete order from SQLite CRM
  async deleteOrder(orderId: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${this.adminToken()}` }
      });

      if (!res.ok) throw new Error('Fallo al archivar órden');

      await this.loadOrders();
      this.triggerToast('info', 'Pedido Archivado', `Se eliminó permanentemente el registro de la orden ${orderId} de SQLite.`);
    } catch (err) {
      console.error(err);
      this.triggerToast('error', 'Acción Fallida', 'No se pudo retirar la órden solicitada.');
    }
  }

  // ==========================================
  // CATALOG MANAGEMENT FORM CONTROLLERS
  // ==========================================

  editProduct(prod: Product) {
    this.editingProductId.set(prod.id);
    this.productForm.patchValue({
      id: prod.id,
      name: prod.name,
      category: prod.category,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      galleryRaw: prod.gallery ? prod.gallery.join('\n') : '',
      material: prod.material,
      dimensions: prod.dimensions,
      weight: prod.weight,
      stock: prod.stock,
      status: prod.status || 'published',
      publishDate: prod.publishDate || '',
      seo: prod.seo || { slug: '', metaTitle: '', metaDescription: '', altText: '' },
      aboutModel: prod.aboutModel || '',
      features: prod.features || '',
      specifications: prod.specifications || ''
    });
    this.dynamicAttributes.clear();
    this.variants.clear();
    if (prod.variants) {
      prod.variants.forEach((v: any) => {
        this.variants.push(new FormGroup({
          id: new FormControl(v.id),
          name: new FormControl(v.name, [Validators.required]),
          price: new FormControl(v.price, [Validators.required, Validators.min(0)]),
          stock: new FormControl(v.stock, [Validators.required, Validators.min(0)]),
          image: new FormControl(v.image || '')
        }));
      });
    }
    if (prod.badges) {
      prod.badges.forEach(b => {
        try {
          const parsed = JSON.parse(b);
          if (parsed.key && parsed.value) {
            this.addDynamicAttribute(parsed.key, parsed.value);
          } else {
            this.addDynamicAttribute('Badge', b);
          }
        } catch {
          this.addDynamicAttribute('Etiqueta', b);
        }
      });
    }

    const anchor = document.getElementById('catalogo-form-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async autocompleteFromUrl(url: string) {
    if (!url) {
      this.triggerToast('warning', 'URL Requerida', 'Por favor, ingrese una URL válida.');
      return;
    }
    
    this.isAutocompleting.set(true);
    try {
      const res = await fetch('/api/productos/autocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.adminToken()}` },
        body: JSON.stringify({ url })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al procesar la URL');
      
      // Patch the form with the AI generated data
      this.productForm.patchValue({
        description: data.description || '',
        aboutModel: data.aboutModel || '',
        features: data.features || '',
        specifications: data.specifications || ''
      });
      
      this.triggerToast('success', 'Autocompletado Exitoso', 'La IA ha rellenado los campos basándose en la URL.');
    } catch (err: any) {
      console.error(err);
      this.triggerToast('error', 'Error de Autocompletado', err.message || 'Ocurrió un error al contactar con la IA.');
    } finally {
      this.isAutocompleting.set(false);
    }
  }

  async deleteProduct(id: string) {
    if (!confirm('¿Estás seguro de eliminar permanentemente este producto del catálogo?')) return;
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.adminToken()}` }
      });
      if (!res.ok) throw new Error('Fallo al eliminar producto');
      this.triggerToast('success', 'Producto Eliminado', 'El producto ha sido eliminado exitosamente del inventario.');
      if (this.editingProductId() === id) {
        this.cancelEditProduct();
      }
      this.loadProducts();
    } catch (err) {
      console.error(err);
      this.triggerToast('error', 'Error', 'No se pudo eliminar el producto del catálogo.');
    }
  }

  cancelEditProduct() {
    this.dynamicAttributes.clear();
    this.editingProductId.set(null);
    this.productForm.reset({
      id: '',
      name: '',
      category: 'tecnologia',
      price: 299.00,
      description: '',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      material: 'Componentes integrados y aleación metálica',
      dimensions: 'Estándar',
      weight: '',
      stock: 10,
      status: 'published',
      publishDate: '',
      seo: { slug: '', metaTitle: '', metaDescription: '', altText: '' }
    });
    this.variants.clear();
  }

  async saveProduct() {
    if (this.productForm.invalid) {
      this.triggerToast('error', 'Formulario de Catálogo Inseguro', 'Por favor diligencie todos los campos con datos reales.');
      return;
    }

    const val = this.productForm.value;
    const isNew = !val.id;

    try {
      const res = await fetch('/api/productos/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.adminToken()}` },
        body: JSON.stringify({
          id: val.id || undefined,
          name: val.name || '',
          category: val.category || 'tecnologia',
          price: Number(val.price),
          description: val.description ? val.description.replace(/&nbsp;/g, ' ') : '',
          image: val.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
          gallery: val.galleryRaw ? val.galleryRaw.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0) : [],
          material: val.material || '',
          dimensions: val.dimensions || '',
          weight: val.weight || '',
          stock: Number(val.stock),
          status: val.status || 'published',
          publishDate: val.publishDate || null,
          seo: val.seo || { slug: '', metaTitle: '', metaDescription: '', altText: '' },
          aboutModel: val.aboutModel ? val.aboutModel.replace(/&nbsp;/g, ' ') : '',
          features: val.features ? val.features.replace(/&nbsp;/g, ' ') : '',
          specifications: val.specifications ? val.specifications.replace(/&nbsp;/g, ' ') : '',
          variants: this.variants.value || [],
          badges: this.dynamicAttributes.value.length > 0 ? this.dynamicAttributes.value.map((attr: any) => JSON.stringify({ key: attr.key, value: attr.value })) : (isNew ? ['Novedad'] : []),
          rating: isNew ? Number((4.5 + Math.random() * 0.5).toFixed(1)) : (this.selectedProductObj()?.rating || 4.5)
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar diseño');

      await this.loadProducts(); // Fetch updated SQLite list
      
      this.triggerToast('success', 'Catálogo Sincronizado', `La pieza de diseño "${val.name}" ha sido grabada exitosamente.`);
      this.cancelEditProduct();
    } catch (err: any) {
      console.error(err);
      this.triggerToast('error', 'Catálogo Fallido', err.message || 'No se pudo registrar la pieza en SQLite.');
    }
  }

  addVariant() {
    this.variants.push(new FormGroup({
      id: new FormControl('v-' + Math.random().toString(36).substr(2, 6)),
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      image: new FormControl('')
    }));
  }

  removeVariant(index: number) {
    this.variants.removeAt(index);
  }

  // Dynamic SEO compliance score computation
  seoChecklist = computed(() => {
    const meta = this.metaTags();
    const urls = this.sitemapUrls();
    const rob = this.robotsControl.value || '';

    return [
      { id: 't1', label: 'Meta Título Ideal', desc: 'El largo del meta tag título cumple especificaciones del buscador (10-70 chars)', status: (meta.title.length >= 10 && meta.title.length <= 70) ? 'success' : 'warning', info: `${meta.title.length} chars` },
      { id: 't2', label: 'Meta Descripción Óptima', desc: 'Adecuación de caracteres en la descripción del sitio para snippet (20-160 chars)', status: (meta.description.length >= 20 && meta.description.length <= 160) ? 'success' : 'warning', info: `${meta.description.length} chars` },
      { id: 't3', label: 'Sitemap XML Indexable', desc: 'Múltiples endpoints del e-commerce registrados para Google Search Console', status: urls.length >= 3 ? 'success' : 'warning', info: `${urls.length} URLs` },
      { id: 't4', label: 'Robots.txt Habilitado', desc: 'Permisos bien indicados para rastreadores web en robots.txt', status: (rob.includes('User-agent:') && rob.includes('Allow:')) ? 'success' : 'error', info: 'Configurado' },
      { id: 't5', label: 'Palabras Clave Semánticas', desc: 'El e-commerce provee keywords alineadas a su catálogo de productos', status: meta.keywords.split(',').length >= 4 ? 'success' : 'warning', info: `${meta.keywords.split(',').length} palabras` }
    ];
  });

  seoScore = computed(() => {
    const list = this.seoChecklist();
    const successPoints = list.reduce((acc, item) => acc + (item.status === 'success' ? 20 : item.status === 'warning' ? 10 : 0), 0);
    return successPoints;
  });

  // Dynamic XML preview compilation
  sitemapXmlPreview = computed(() => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    this.sitemapUrls().forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      xml += `  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  });

  private escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}
