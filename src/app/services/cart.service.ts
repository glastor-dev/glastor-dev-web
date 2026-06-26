import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>([]);
  activeDiscountPercent = signal<number>(0);

  cartCount = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  
  subtotal = computed(() => this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
  
  discountAmount = computed(() => this.subtotal() * (this.activeDiscountPercent() / 100));
  
  total = computed(() => this.subtotal() - this.discountAmount());

  addToCart(product: any) {
    const current = this.cart();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
      this.cart.set([...current]);
    } else {
      this.cart.set([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string) {
    this.cart.set(this.cart().filter(i => i.product.id !== productId));
  }

  clearCart() {
    this.cart.set([]);
    this.activeDiscountPercent.set(0);
  }

  applyDiscount(percent: number) {
    this.activeDiscountPercent.set(percent);
  }
}
