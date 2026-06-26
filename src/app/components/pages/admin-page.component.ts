import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Settings01Icon, Refresh01Icon, Settings02Icon, Rocket01Icon, Tick01Icon, Cancel01Icon, Delete01Icon, Route01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HugeiconsIconComponent, QuillModule],
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent {
  @Input() adminToken!: string | null;
  @Input() activeAdminTab!: 'crm' | 'devops';
  @Input() isSeoPanelOpen!: boolean;
  @Input() isPipelineRunning!: boolean;
  @Input() adminMetrics!: any;
  @Input() pagedAdminProducts!: any[];
  @Input() adminTablePage!: number;
  @Input() adminTableTotalPages!: number;
  @Input() devopsLogs!: any[];
  @Input() glastorNetworkNodes!: any[];
  @Input() orders!: any[];

  @Output() navigate = new EventEmitter<string>();
  @Output() onLogin = new EventEmitter<any>();
  @Output() onLogout = new EventEmitter<void>();
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

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  
  @Input() isUploadingImage: boolean = false;
  @Input() isAutocompleting: boolean = false;
  @Input() editingProductId: string | null = null;
  @Input() metricsTrafficRate: any;
  @Input() metricsAvgLatency: any;
  @Input() metricsErrorRate: any;
  @Input() devopsNodes: any[] = [];
  @Input() devopsEnvVars: any[] = [];
  @Input() devopsPipelines: any[] = [];
  @Input() activeLogFilter: string = 'all';
  @Input() productForm: any = new FormGroup({});
  @Input() customCategories: any[] = [];
  @Input() variants: any = { controls: [], length: 0 };
  @Input() dynamicAttributes: any = { controls: [], length: 0 };

  @Output() nextAdminPageEvent = new EventEmitter<void>();
  nextAdminPage() { this.nextAdminPageEvent.emit(); }

  @Output() saveProductEvent = new EventEmitter<void>();
  saveProduct() { this.saveProductEvent.emit(); }

  @Output() addNewCategoryEvent = new EventEmitter<void>();
  addNewCategory() { this.addNewCategoryEvent.emit(); }

  @Output() imageDragOverEvent = new EventEmitter<any>();
  onImageDragOver(event: any) { this.imageDragOverEvent.emit(event); }

  @Output() imageDropEvent = new EventEmitter<any>();
  onImageDrop(event: any) { this.imageDropEvent.emit(event); }

  @Output() uploadToCloudinaryEvent = new EventEmitter<any>();
  uploadToCloudinary(event: any) { this.uploadToCloudinaryEvent.emit(event); }

  @Output() uploadGalleryToCloudinaryEvent = new EventEmitter<any>();
  uploadGalleryToCloudinary(event: any) { this.uploadGalleryToCloudinaryEvent.emit(event); }

  @Output() autocompleteFromUrlEvent = new EventEmitter<any>();
  autocompleteFromUrl(url: any) { this.autocompleteFromUrlEvent.emit(url); }

  @Output() addVariantEvent = new EventEmitter<void>();
  addVariant() { this.addVariantEvent.emit(); }

  @Output() removeVariantEvent = new EventEmitter<any>();
  removeVariant(idx: any) { this.removeVariantEvent.emit(idx); }

  @Output() addDynamicAttributeEvent = new EventEmitter<void>();
  addDynamicAttribute() { this.addDynamicAttributeEvent.emit(); }

  @Output() removeDynamicAttributeEvent = new EventEmitter<any>();
  removeDynamicAttribute(idx: any) { this.removeDynamicAttributeEvent.emit(idx); }

  @Output() cancelEditProductEvent = new EventEmitter<void>();
  cancelEditProduct() { this.cancelEditProductEvent.emit(); }

  @Output() triggerPipelineEvent = new EventEmitter<void>();
  triggerPipeline() { this.triggerPipelineEvent.emit(); }

  @Output() injectTrafficSpikeEvent = new EventEmitter<void>();
  injectTrafficSpike() { this.injectTrafficSpikeEvent.emit(); }

  @Output() flushCacheEvent = new EventEmitter<void>();
  flushCache() { this.flushCacheEvent.emit(); }

  @Output() toggleServiceNodeEvent = new EventEmitter<any>();
  toggleServiceNode(id: any) { this.toggleServiceNodeEvent.emit(id); }

  @Output() removeCustomEnvVarEvent = new EventEmitter<any>();
  removeCustomEnvVar(key: any) { this.removeCustomEnvVarEvent.emit(key); }

  @Output() addCustomEnvVarEvent = new EventEmitter<any>();
  addCustomEnvVar(key: any, val: any, desc: any) { this.addCustomEnvVarEvent.emit({key, val, desc}); }

  @Output() addDevopsLogEvent = new EventEmitter<any>();
  addDevopsLog(user: any, level: any, msg: any) { this.addDevopsLogEvent.emit({user, level, msg}); }

  @Output() playSynthBeepEvent = new EventEmitter<any>();
  playSynthBeep(freq: any, type: any, dur: any, vol: any) { this.playSynthBeepEvent.emit({freq, type, dur, vol}); }

  
  @Input() sitemapForm: any = new FormGroup({});
  @Input() metaForm: any = new FormGroup({});
  @Input() robotsControl: any = new FormControl('');
    @Input() sitemapUrls: any[] = [];
  @Input() sitemapXmlPreview: string = '';
    @Input() revocaciones: any[] = [];
  @Input() products: any[] = [];
  
  Invoice01Icon: any;

  @Output() updateSeoMetaEvent = new EventEmitter<void>();
  updateSeoMeta() { this.updateSeoMetaEvent.emit(); }

  @Output() addSitemapUrlEvent = new EventEmitter<void>();
  addSitemapUrl() { this.addSitemapUrlEvent.emit(); }

  @Output() updateRobotsTxtEvent = new EventEmitter<void>();
  updateRobotsTxt() { this.updateRobotsTxtEvent.emit(); }

  @Output() removeSitemapUrlEvent = new EventEmitter<any>();
  removeSitemapUrl(idx: any) { this.removeSitemapUrlEvent.emit(idx); }

  @Output() updateOrderStatusEvent = new EventEmitter<any>();
  updateOrderStatus(id: any, status: any) { this.updateOrderStatusEvent.emit({id, status}); }

  @Output() deleteOrderEvent = new EventEmitter<any>();
  deleteOrder(id: any) { this.deleteOrderEvent.emit(id); }

  @Output() setViewEvent = new EventEmitter<any>();
  setView(view: any) { this.setViewEvent.emit(view); }

  @Output() toggleAdminSortEvent = new EventEmitter<void>();
  toggleAdminSort() { this.toggleAdminSortEvent.emit(); }

  @Output() prevAdminPageEvent = new EventEmitter<void>();
  prevAdminPage() { this.prevAdminPageEvent.emit(); }

  @Output() editProductEvent = new EventEmitter<any>();
  editProduct(p: any) { this.editProductEvent.emit(p); }

  @Output() deleteProductEvent = new EventEmitter<any>();
  deleteProduct(id: any) { this.deleteProductEvent.emit(id); }

  
    @Input() seoScore: number = 0;
  @Input() adminTableSortDesc: boolean = false;

  @Output() setActiveAdminTabEvent = new EventEmitter<any>();
  setActiveAdminTab(tab: any) { this.setActiveAdminTabEvent.emit(tab); }

  @Output() setLogFilterEvent = new EventEmitter<any>();
  setLogFilter(filter: any) { this.setLogFilterEvent.emit(filter); }

  @Input() isLoggingIn: boolean = false;

  isAdminAuthenticated() { return !!this.adminToken; }

  adminLogin() {
    this.onLogin.emit(this.loginForm.value);
  }
  
  adminLogout() {
    this.onLogout.emit();
  }

  toggleSeoPanel() {
    this.onToggleSeo.emit();
  }

  formatPrice(val: number) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);
  }
}
