import re
with open('src/app/components/pages/checkout-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('cart()', 'cart')
content = content.replace('activeDiscountPercent()', 'activeDiscountPercent')
content = content.replace('.emit(', '(')
content = content.replace('.emit()', '()')
content = content.replace('isCinematicGlow ?', 'isCinematicGlow() ?')
content = content.replace('isCinematicGlow\"', 'isCinematicGlow()\"')

new_class = '''  appState = inject(AppStateService);
  router = inject(Router);

  isCinematicGlow = this.appState.isCinematicGlow;
  checkoutStage = 'payment';
  orderPlaced = false;
  checkoutForm = new FormGroup({});
  couponCode = new FormControl('');

  get cart() { return this.appState.cart(); }
  get total() { return this.appState.total(); }
  get subtotal() { return this.appState.subtotal(); }
  get discountAmount() { return this.appState.discountAmount(); }
  get activeDiscountPercent() { return this.appState.activeDiscountPercent(); }
  get iva() { return 21; }
  get shipping() { return this.appState.shipping(); }
  exchangeRateEurToArs = () => 1050;

  closeCheckout() { this.router.navigate(['/tienda']); }
  processCheckout() { this.orderPlaced = true; }
  selectPaymentMethod(method: string) { }
  setView(view: string) { this.router.navigate(['/' + view]); }
  applyCoupon() { }'''

content = re.sub(r'  appState = inject\(AppStateService\);[\s\S]*?applyCoupon\(\) \{ \}', new_class, content)

with open('src/app/components/pages/checkout-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
