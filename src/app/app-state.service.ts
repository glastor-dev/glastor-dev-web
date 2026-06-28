import { Injectable, signal, computed } from '@angular/core';

import { Product, CartItem, Order, Toast } from './models';

export { Toast };

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  soundEnabled = signal<boolean>(false);
  isCinematicGlow = signal<boolean>(true);
  isTransitioning = signal<boolean>(false);
  showPreloader = signal<boolean>(true);
  toasts = signal<Toast[]>([]);
  products = signal<Product[]>([]);
  orders = signal<Order[]>([]);
  cart = signal<CartItem[]>([]);
  activeDiscountPercent = signal<number>(0);
  cartCount = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.quantity, 0);
  });
  subtotal = computed(() => {
    return this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });
  discountAmount = computed(() => {
    return this.subtotal() * (this.activeDiscountPercent() / 100);
  });
  shipping = computed(() => {
    const afterDiscount = this.subtotal() - this.discountAmount();
    return afterDiscount >= 200000 ? 0 : (this.subtotal() === 0 ? 0 : 16500);
  });
  total = computed(() => {
    const result = (this.subtotal() - this.discountAmount()) + this.shipping();
    return Math.max(0, result);
  });
  wishlist = signal<string[]>([]);
  customCategories = signal<Array<{value: string, label: string}>>([]);
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('todos');

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

  private audioCtx: AudioContext | null = null;
  private oscNode: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private subOscNode: OscillatorNode | null = null;
  private subGainNode: GainNode | null = null;

  constructor() {
    this.initLocalStorageCart();
    this.loadProducts();
  }

  private initLocalStorageCart() {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('glastor_cart');
      if (savedCart) {
        try {
          this.cart.set(JSON.parse(savedCart));
        } catch(e) {}
      }
      const savedWishlist = localStorage.getItem('glastor_wishlist');
      if (savedWishlist) {
        try {
          this.wishlist.set(JSON.parse(savedWishlist));
        } catch(e) {}
      }
    }
  }

  saveCart() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('glastor_cart', JSON.stringify(this.cart()));
    }
  }

  saveWishlist() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('glastor_wishlist', JSON.stringify(this.wishlist()));
    }
  }

  async loadProducts() {
    if (typeof window === 'undefined') return;
    try {
      const res = await fetch('/api/productos');
      if (!res.ok) throw new Error('Error al leer productos');
      const data = await res.json();
      this.products.set(data);

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
      this.triggerToast('error', 'Error Conectividad', 'No se pudo leer el catálogo de SQLite3.');
    }
  }

  addToCart(item: { product: Product, quantity: number, event?: MouseEvent }) {
    const currentCart = this.cart();
    const existing = currentCart.find(i => i.product.id === item.product.id);
    const reqQty = existing ? existing.quantity + item.quantity : item.quantity;

    if (item.product.stock < reqQty) {
      this.playSynthBeep(220, 'triangle', 0.2, 0.03); // failure beep
      this.triggerToast('warning', 'Stock Limitado', `No hay suficientes unidades de "${item.product.name}" disponibles.`);
      return;
    }

    this.cart.update(items => {
      if (existing) {
        return items.map(i => i.product.id === item.product.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...items, { product: item.product, quantity: item.quantity }];
    });
    this.saveCart();
    
    // Success sounds and toast
    this.playSynthBeep(880, 'sine', 0.12, 0.02);
    setTimeout(() => this.playSynthBeep(1100, 'sine', 0.1, 0.02), 70);
    this.triggerToast('success', 'Carrito Actualizado', `${item.quantity}x ${item.product.name} preparado para despacho.`);
  }

  updateQuantity(productId: string, delta: number) {
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
    this.saveCart();
  }

  removeFromCart(productId: string) {
    const item = this.cart().find(i => i.product.id === productId);
    this.cart.update(currentCart => currentCart.filter(i => i.product.id !== productId));
    this.saveCart();
    if (item) {
      this.triggerToast('info', 'Artículo Eliminado', `Se retiró "${item.product.name}" del carrito.`);
    }
  }

  toggleWishlist(id: string, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const current = this.wishlist();
    if (current.includes(id)) {
      this.wishlist.set(current.filter(i => i !== id));
      this.playSynthBeep(300, 'triangle', 0.1, 0.03);
    } else {
      this.wishlist.set([...current, id]);
      this.playSynthBeep(800, 'sine', 0.1, 0.03);
      setTimeout(() => this.playSynthBeep(1200, 'sine', 0.1, 0.03), 100);
    }
    this.saveWishlist();
  }

  clearCart() {
    this.cart.set([]);
    this.saveCart();
  }

  toggleSound() {
    this.soundEnabled.update(v => !v);
    if (this.soundEnabled()) {
      this.initSoundscape();
      this.playSynthBeep(440, 'sine', 0.1, 0.04);
      this.triggerToast('info', 'Síntesis Áulica Activa', 'Sintetizador acústico ambiental GLASTOR ® en línea.');
    } else {
      this.stopSoundscape();
      this.triggerToast('info', 'Síntesis Apagada', 'Audio atmosférico desactivado.');
    }
  }

  initSoundscape() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.oscNode = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();
      this.oscNode.type = 'triangle';
      this.oscNode.frequency.setValueAtTime(65.41, this.audioCtx.currentTime);
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.04, this.audioCtx.currentTime + 3.0);

      this.oscNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.oscNode.start();

      this.subOscNode = this.audioCtx.createOscillator();
      this.subGainNode = this.audioCtx.createGain();
      this.subOscNode.type = 'sine';
      this.subOscNode.frequency.setValueAtTime(98.0, this.audioCtx.currentTime);
      this.subGainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.subGainNode.gain.linearRampToValueAtTime(0.02, this.audioCtx.currentTime + 4.0);

      this.subOscNode.connect(this.subGainNode);
      this.subGainNode.connect(this.audioCtx.destination);
      this.subOscNode.start();
    } catch (e) {
      console.error('AudioContext WebAudio init failed', e);
    }
  }

  stopSoundscape() {
    try {
      if (this.gainNode && this.audioCtx) {
        this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.6);
      }
      if (this.subGainNode && this.audioCtx) {
        this.subGainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.6);
      }
      setTimeout(() => {
        this.oscNode?.stop();
        this.subOscNode?.stop();
        this.oscNode = null;
        this.subOscNode = null;
      }, 700);
    } catch (e) {
      console.error(e);
    }
  }

  playSynthBeep(freq = 600, type: OscillatorType = 'sine', duration = 0.08, volume = 0.02) {
    if (!this.soundEnabled() || typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      
      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // safe ignore
    }
  }

  toggleCinematicGlow() {
    this.isCinematicGlow.update(v => !v);
    this.playSynthBeep(this.isCinematicGlow() ? 750 : 520, 'sine', 0.12, 0.03);
    this.triggerToast(
      'info',
      this.isCinematicGlow() ? 'EXHIBICIÓN ACTIVA' : 'MUSEOGRAFÍA DESACTIVADA',
      this.isCinematicGlow() ? 'Modo de iluminación de alto contraste premium activo (FWA Exhibit Mode).' : 'Volviendo a la iluminación ambiental de taller.'
    );
  }

  triggerToast(type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: Toast = { id, type, title, message };
    this.toasts.update(list => [...list, newToast]);
    setTimeout(() => {
      this.dismissToast(id);
    }, 5000);
  }

  dismissToast(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
