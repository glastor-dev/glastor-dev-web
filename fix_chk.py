with open('src/app/components/pages/checkout-page.component.ts', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Add FormBuilder to imports if missing, and BotProtectionComponent
if 'FormBuilder' not in content:
    content = content.replace("import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';", "import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';")
if 'BotProtectionComponent' not in content:
    content = content.replace("import { AppStateService } from '../../app-state.service';", "import { AppStateService } from '../../app-state.service';\nimport { BotProtectionComponent } from '../ui/bot-protection.component';")
    content = content.replace("imports: [CommonModule, ReactiveFormsModule, RouterModule, HugeiconsIconComponent],", "imports: [CommonModule, ReactiveFormsModule, RouterModule, HugeiconsIconComponent, BotProtectionComponent],")

# 2. Inject fb and setup form
class_body_pattern = r"checkoutForm = new FormGroup\(\{\}\);\s*couponCode = new FormControl\(''\);"

new_class_setup = '''private fb = inject(FormBuilder);
  
  checkoutForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    paymentMethod: ['card', Validators.required],
    cardNum: [''],
    cardExp: [''],
    cardCvc: [''],
    cryptoTxHash: [''],
    bankTxRef: [''],
    acceptTerms: [false, Validators.requiredTrue],
    botToken: ['', Validators.required]
  });
  
  couponCode = new FormControl('');'''

content = re.sub(class_body_pattern, new_class_setup, content)

# 3. Add bot protection to template before the Submit button
bot_html = '''
                <!-- Anti-Bot Protection -->
                <div class="mt-4 mb-2">
                  <app-bot-protection (tokenGenerated)="checkoutForm.get('botToken')?.setValue()"></app-bot-protection>
                </div>

                <!-- Big Action Submission Button -->'''

content = content.replace('<!-- Big Action Submission Button -->', bot_html)

# 4. ProcessCheckout logic (simulate secure backend)
process_old = r"processCheckout\(\) \{ this\.orderPlaced = true; \}"
process_new = '''processCheckout() {
    if (this.checkoutForm.invalid) return;

    // SIMULATED SECURE BACKEND VALIDATION:
    // Instead of trusting the DOM total, we extract pure payload and let the service process it.
    const securePayload = {
      user: this.checkoutForm.value.email,
      botToken: this.checkoutForm.value.botToken,
      items: this.cart().map(i => ({ id: i.product.id, qty: i.quantity })),
      coupon: this.couponCode.value,
      payment: this.checkoutForm.value.paymentMethod
    };

    // The backend would recalculate total securely using securePayload
    console.log("[SECURITY] Sending secure checkout payload:", securePayload);
    this.appState.playSynthBeep(600, 'sine', 0.2, 0.05);
    this.appState.playSynthBeep(900, 'sine', 0.3, 0.05);
    
    this.orderPlaced = true;
  }'''

content = re.sub(process_old, process_new, content)

# 5. Fix (tokenGenerated)="checkoutForm.get('botToken')?.setValue()" template syntax error if any
content = content.replace('setValue()', 'setValue($event)')

with open('src/app/components/pages/checkout-page.component.ts', 'w', encoding='utf-8') as f:
    f.write(content)
