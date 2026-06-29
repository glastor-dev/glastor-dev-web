import { Component, Input, Output, EventEmitter, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BotProtectionComponent } from '../ui/bot-protection.component';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Settings01Icon, Refresh01Icon, Settings02Icon, Rocket01Icon, Tick01Icon, Cancel01Icon, Delete01Icon, Route01Icon, ArrowRight01Icon, Invoice01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HugeiconsIconComponent, QuillModule, BotProtectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent implements OnInit {
  private appState = inject(AppStateService);
  isCinematicGlow = this.appState.isCinematicGlow;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('glastor_admin_token');
      if (storedToken) {
        this.adminToken = storedToken;
      }
    }
  }

  // Fallback to true if appState cannot be injected (though it should be possible with import trick or direct import)
  @Input() adminToken: string | null = null;
  @Input() activeAdminTab: 'crm' | 'devops' = 'crm';
  @Input() isSeoPanelOpen: boolean = false;
  @Input() isPipelineRunning: boolean = false;
  @Input() adminMetrics: any = { revenue: 0, salesCount: 0 };
  @Input() devopsLogs: any[] = [];
  @Input() glastorNetworkNodes: any[] = [];
  orders = this.appState.orders;
  products = this.appState.products;
  // Table Data Grid States
  adminTablePage = signal<number>(1);
  adminTablePageSize = signal<number>(5);
  adminTableSortDesc = signal<boolean>(true);

  // Computed signals para paginación local
  pagedAdminProducts = computed(() => {
    let sorted = [...this.appState.products()];
    if (this.adminTableSortDesc()) {
      sorted.sort((a, b) => b.stock - a.stock);
    } else {
      sorted.sort((a, b) => a.stock - b.stock);
    }
    const startIndex = (this.adminTablePage() - 1) * this.adminTablePageSize();
    return sorted.slice(startIndex, startIndex + this.adminTablePageSize());
  });

  adminTableTotalPages = computed(() => {
    return Math.ceil(this.appState.products().length / this.adminTablePageSize()) || 1;
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
  @Output() navigate = new EventEmitter<string>();
  
  @Output() onToggleSeo = new EventEmitter<void>();
  @Output() onTabChange = new EventEmitter<'crm' | 'devops'>();

  Settings01Icon = Settings01Icon;
  Refresh01Icon = Refresh01Icon;
  Settings02Icon = Settings02Icon;
  Rocket01Icon = Rocket01Icon;
  Tick01Icon = Tick01Icon;
  Cancel01Icon = Cancel01Icon;
  Delete01Icon = Delete01Icon;
  Route01Icon = Route01Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  Invoice01Icon = Invoice01Icon;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    botToken: new FormControl('', [Validators.required])
  });

  isUploadingImage = signal(false);
  isAutocompleting = signal(false);
  editingProductId = signal<string | null>(null);
  
  @Input() metricsTrafficRate: any;
  @Input() metricsAvgLatency: any;
  @Input() metricsErrorRate: any;
  @Input() devopsNodes: any[] = [];
  @Input() devopsEnvVars: any[] = [];
  @Input() devopsPipelines: any[] = [];
  @Input() activeLogFilter: string = 'all';

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl<string>('tecnologia', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(299.00, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required]),
    galleryRaw: new FormControl(''),
    material: new FormControl(''),
    dimensions: new FormControl(''),
    weight: new FormControl(''),
    stock: new FormControl<number>(10, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    status: new FormControl<'draft' | 'published' | 'archived'>('published'),
    publishDate: new FormControl(''),
    badgesRaw: new FormControl(''),
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

  customCategories = signal<Array<{value: string, label: string}>>([]);

  sitemapUrls = signal<any[]>([]);
  sitemapXmlPreview = computed(() => '');
  revocaciones = signal<any[]>([]);

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



  @Output() addNewCategoryEvent = new EventEmitter<void>();
  addNewCategory() { this.addNewCategoryEvent.emit(); }

  @Output() imageDragOverEvent = new EventEmitter<any>();
  onImageDragOver(event: any) { this.imageDragOverEvent.emit(event); }

  @Output() imageDropEvent = new EventEmitter<any>();
  onImageDrop(event: any) { this.imageDropEvent.emit(event); }

  async uploadToCloudinary(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Configuración básica (Cloudinary en modo unsigned / open para frontend testing)
    const cloudName = 'YOUR_CLOUD_NAME'; 
    const uploadPreset = 'YOUR_PRESET';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    this.isUploadingImage.set(true);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        this.productForm.patchValue({ image: data.secure_url });
        this.appState.triggerToast('success', 'Imagen Subida', 'La imagen principal del producto ha sido procesada.');
      } else {
        throw new Error('Error al subir');
      }
    } catch (err) {
      console.warn('Error subiendo imagen, usando Base64 temporal.', err);
      // Fallback a Base64 temporal si no hay Cloudinary real configurado
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.productForm.patchValue({ image: e.target?.result as string });
          this.appState.triggerToast('info', 'Modo Local Activo', 'Imagen cargada en memoria local temporalmente.');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      this.isUploadingImage.set(false);
    }
  }

  async uploadGalleryToCloudinary(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const cloudName = 'YOUR_CLOUD_NAME'; 
    const uploadPreset = 'YOUR_PRESET';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    this.isUploadingImage.set(true);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        const currentGallery = this.productForm.get('galleryRaw')?.value || '';
        const newGallery = currentGallery ? `${currentGallery}\n${data.secure_url}` : data.secure_url;
        this.productForm.patchValue({ galleryRaw: newGallery });
        this.appState.triggerToast('success', 'Galería Actualizada', 'Nueva imagen agregada a la galería extendida.');
      }
    } catch (err) {
      console.warn('Error subiendo imagen de galería.', err);
    } finally {
      this.isUploadingImage.set(false);
    }
  }

  @Output() autocompleteFromUrlEvent = new EventEmitter<any>();
  autocompleteFromUrl(url: any) { this.autocompleteFromUrlEvent.emit(url); }

  addVariant() {
    this.variants.push(new FormGroup({
      id: new FormControl('var_' + Math.random().toString(36).substr(2, 9)),
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)]),
      image: new FormControl('')
    }));
  }

  removeVariant(idx: number) {
    this.variants.removeAt(idx);
  }

  addDynamicAttribute(key = '', value = '') {
    this.dynamicAttributes.push(new FormGroup({
      key: new FormControl(key, [Validators.required]),
      value: new FormControl(value, [Validators.required])
    }));
  }

  removeDynamicAttribute(idx: number) {
    this.dynamicAttributes.removeAt(idx);
  }

  // DevOps & SEO Methods Stubs
  triggerPipeline() {}
  injectTrafficSpike() {}
  flushCache() {}
  toggleServiceNode(id: string) {}
  removeCustomEnvVar(key: string) {}
  addCustomEnvVar(key: string, val: string, desc: string) {}
  addDevopsLog(user: string, level: string, msg: string) {}
  playSynthBeep(freq: number, type: string, dur: number, vol: number) {}
  updateSeoMeta() {}
  addSitemapUrl() {}
  updateRobotsTxt() {}
  removeSitemapUrl(idx: number) {}
  updateOrderStatus(id: string, status: string) {}
  deleteOrder(id: string) {}



  editProduct(prod: any) {
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
      badgesRaw: prod.badges ? prod.badges.join('\n') : '',
      seo: prod.seo || { slug: '', metaTitle: '', metaDescription: '', altText: '' },
      aboutModel: prod.aboutModel || '',
      features: prod.features || '',
      specifications: prod.specifications || ''
    });
    this.dynamicAttributes.clear();
    this.variants.clear();
    
    // Bajar a la zona del form
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        document.getElementById('catalogo-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  cancelEditProduct() {
    this.editingProductId.set(null);
    this.resetProductForm();
  }

  resetProductForm() {
    this.productForm.reset({
      id: '', name: '', category: 'tecnologia', price: 299,
      description: '', image: '', galleryRaw: '',
      material: '', dimensions: '', weight: '', stock: 10,
      status: 'published', publishDate: '', badgesRaw: '',
      aboutModel: '', features: '', specifications: ''
    });
    this.dynamicAttributes.clear();
    this.variants.clear();
  }

  async deleteProduct(id: string) {
    if (!confirm('¿ESTÁS ABSOLUTAMENTE SEGURO? Esta acción purgará el nodo de SQLite y reconstruirá el sitemap.')) return;
    try {
      const res = await fetch(`/api/productos/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.adminToken}` }
      });
      if (res.ok) {
        this.appState.triggerToast('success', 'NODO ELIMINADO', `Pieza ${id} destruida del catálogo.`);
        this.appState.loadProducts(); // recargar
      }
    } catch(e) {
      console.error(e);
    }
  }

  async saveProduct() {
    if (this.productForm.invalid) {
      this.appState.triggerToast('warning', 'FORMULARIO CORRUPTO', 'Faltan parámetros vitales para compilar el nodo del producto.');
      return;
    }
    const val = this.productForm.value;
    const isEdit = !!this.editingProductId();
    
    const prod: any = {
      ...val,
      gallery: val.galleryRaw ? (val.galleryRaw as string).split('\n').filter(s => s.trim()) : [],
      badges: val.badgesRaw ? (val.badgesRaw as string).split('\n').filter(s => s.trim()) : [],
      id: isEdit ? this.editingProductId() : 'prod_' + Date.now()
    };
    
    try {
      const res = await fetch('/api/productos/guardar', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.adminToken}`
        },
        body: JSON.stringify(prod)
      });
      if (res.ok) {
        this.appState.triggerToast('success', 'NODO COMPILADO', `Pieza de catálogo ${isEdit ? 'modificada' : 'inyectada'} satisfactoriamente.`);
        this.appState.loadProducts();
        this.cancelEditProduct();
      }
    } catch(e) {
      console.error(e);
    }
  }

  @Output() setViewEvent = new EventEmitter<any>();
  setView(view: any) { this.setViewEvent.emit(view); }

  @Input() seoScore: number = 0;

  setActiveAdminTab(tab: any) { this.activeAdminTab = tab; }

  @Output() setLogFilterEvent = new EventEmitter<any>();
  setLogFilter(filter: any) { this.setLogFilterEvent.emit(filter); }

  @Input() isLoggingIn: boolean = false;

  isAdminAuthenticated() { return !!this.adminToken; }

  async adminLogin() {
    if (this.loginForm.invalid) {
      this.appState.triggerToast('warning', 'Formulario Incompleto', 'Complete las credenciales y el desafío anti-bot.');
      return;
    }
    
    this.isLoggingIn = true;
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.loginForm.value)
      });
      const data = await res.json();
      
      if (res.ok && data.token) {
        this.adminToken = data.token;
        if (typeof window !== 'undefined') {
          localStorage.setItem('glastor_admin_token', data.token);
        }
        this.appState.triggerToast('success', 'Acceso Concedido', 'Sesión de administrador iniciada correctamente.');
        this.loginForm.reset();
        
        // Tratar de llamar al padre si existe, de lo contrario recargar
        if (typeof window !== 'undefined') {
          setTimeout(() => window.location.reload(), 1500);
        }
      } else {
        this.appState.triggerToast('error', 'Acceso Denegado', data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error(err);
      this.appState.triggerToast('error', 'Error de Conexión', 'No se pudo contactar con el servidor. Intente nuevamente.');
    } finally {
      this.isLoggingIn = false;
    }
  }
  
  adminLogout() {
    this.adminToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('glastor_admin_token');
      window.location.href = '/'; // Redirigir al inicio y recargar
    }
  }

  toggleSeoPanel() {
    this.isSeoPanelOpen = !this.isSeoPanelOpen;
  }

  formatPrice(val: number) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);
  }
}
