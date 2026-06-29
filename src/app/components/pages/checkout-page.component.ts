import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../app-state.service';
import { BotProtectionComponent } from '../ui/bot-protection.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { UserIcon, Wallet01Icon, CreditCardIcon, BitcoinIcon, Building03Icon, InformationCircleIcon, CheckmarkBadge01Icon, Ticket01Icon, Settings01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HugeiconsIconComponent, BotProtectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="max-w-6xl mx-auto px-4 py-8 relative page-transition">

      @if (orderPlaced) {
        <!-- SUCCESS ORDER PLACED PANEL -->
        <div [class]="'border rounded-lg p-8 md:p-14 text-center max-w-lg mx-auto space-y-6 relative overflow-hidden ' + 
                       'bg-zinc-900/40 border-zinc-800/80 shadow-black/30'">
          <div class="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#41BF84]/10 blur-2xl"></div>
          
          <div class="w-16 h-16 rounded-full bg-[#41BF84]/10 border border-[#41BF84]/20 text-[#41BF84] flex items-center justify-center mx-auto shadow-sm">
            <hugeicons-icon [icon]="Settings01Icon" [size]="20" class="scale-125"  [strokeWidth]="1.5" />
          </div>

          <div class="space-y-2">
            <h2 class="glastor-h2 text-white">¡Pedido Autorizado y Procesado!</h2>
            <p class="glastor-desc max-w-sm mx-auto">
              La planta logística de GLASTOR ® preparará su despacho premium paletizado de manera inmediata.
            </p>
          </div>

          <!-- Virtual Invoice Details -->
          <div [class]="'p-5 rounded-lg space-y-3.5 text-left border ' + 'bg-zinc-950 border-zinc-850'">
            <div class="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span>GLASTOR ® DIGITAL INVOICE:</span>
              <span>#TXN-{{ Math.random().toString(36).substring(2, 9).toUpperCase() }}</span>
            </div>

            <div [class]="'pt-2.5 border-t space-y-2 text-xs ' + 'border-zinc-850 text-zinc-300'">
              <div class="flex justify-between items-center">
                <span class="font-bold">Cliente:</span>
                <span class="text-white">{{ checkoutForm.get('fullName')?.value }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-bold">Email de enlace:</span>
                <span class="text-white font-mono text-[11px]">{{ checkoutForm.get('email')?.value }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-bold">Descuento Activado:</span>
                <span class="font-bold text-[#41BF84]">- {{ formatPrice(discountAmount) }} ({{ activeDiscountPercent }}%)</span>
              </div>
              <div [class]="'pt-2 border-t flex justify-between items-center ' + 'border-zinc-850 text-white'">
                <span class="font-black text-sm uppercase">Monto Total Liquidado:</span>
                <span [class]="'font-mono text-base font-black ' + 'text-[#41BF84]'">{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>

          <button (click)="closeCheckout()" 
                  [class]="'font-black text-xs px-8 py-3 rounded-lg transition-all cursor-pointer ' + 
                           'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950 shadow-md shadow-amber-500/20'">
            Finalizar y Regresar al Catálogo
          </button>
        </div>
      } @else {
        <!-- PENDING CHECKOUT INTERACTIVE STAGE -->
        <div class="space-y-6">
          <div class="text-left space-y-1">
            <span class="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black block">Pasarela Criptológica Segura</span>
            <h1 class="glastor-h1 text-white">Formulario de Checkup</h1>
            <p class="glastor-desc">Por favor, complete las directivas de entrega y el canal de liquidación bancaria.</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- LEFT COLUMN: INPUT FORMS (7 COLS) -->
            <div [class]="'lg:col-span-7 border rounded-lg p-6 space-y-6 text-left ' + 
                           'bg-zinc-900/40 border-zinc-800/80 shadow-black/30'">
              <div [class]="'flex items-center gap-2 border-b pb-4 ' + 'border-zinc-850'">
                <span [class]="'w-8 h-8 rounded-lg flex items-center justify-center font-bold ' + 
                               'bg-[#41BF84]/10 text-[#41BF84] border border-[#41BF84]/20'">
                  <hugeicons-icon [icon]="UserIcon" [size]="20" class="scale-80" [strokeWidth]="1.5" />
                </span>
                <h3 class="glastor-h5 text-white">1. Datos Personales y Archivo de Envío</h3>
              </div>

              <form [formGroup]="checkoutForm" (ngSubmit)="processCheckout()" class="space-y-5">
                
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Nombre Completo del Consignatario</label>
                  <input type="text" formControlName="fullName" placeholder="John Doe"
                         [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                  'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                  @if (checkoutForm.get('fullName')?.touched && checkoutForm.get('fullName')?.invalid) {
                    <span class="text-[9px] text-rose-500 font-bold block">Por favor introduzca su nombre (Mínimo 4 caracteres).</span>
                  }
                </div>

                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Correo Electrónico de Notificaciones</label>
                  <input type="email" formControlName="email" placeholder="john@ejemplo.com"
                         [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                  'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                  @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
                    <span class="text-[9px] text-rose-500 font-bold block">Ingrese una dirección de correo válida.</span>
                  }
                </div>

                <!-- Shipping Address details -->
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Dirección Fiscal / Residencia</label>
                  <input type="text" formControlName="address" placeholder="Calle de la Ilustración Num. 15, 4º Derecha"
                         [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                  'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                  @if (checkoutForm.get('address')?.touched && checkoutForm.get('address')?.invalid) {
                    <span class="text-[9px] text-rose-500 font-bold block">Requerido para la guía de envío de UPS / DHL.</span>
                  }
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Ciudad</label>
                    <input type="text" formControlName="city" placeholder="Madrid"
                           [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                    'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                    @if (checkoutForm.get('city')?.touched && checkoutForm.get('city')?.invalid) {
                      <span class="text-[9px] text-rose-500 font-bold block">Requerido.</span>
                    }
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Código Postal (España/EU)</label>
                    <input type="text" formControlName="postalCode" placeholder="28001"
                           [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                    'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                    @if (checkoutForm.get('postalCode')?.touched && checkoutForm.get('postalCode')?.invalid) {
                      <span class="text-[9px] text-rose-500 font-bold block">Contiene 5 números consecutivos.</span>
                    }
                  </div>
                </div>

                <!-- Payment Block -->
                <div [class]="'space-y-4 pt-4 border-t ' + 'border-zinc-850'">
                  <div class="flex items-center gap-2 pb-2">
                    <span [class]="'w-8 h-8 rounded-lg flex items-center justify-center font-bold ' + 
                                   'bg-[#41BF84]/10 text-[#41BF84] border border-[#41BF84]/20'">
                      <hugeicons-icon [icon]="Wallet01Icon" [size]="20" class="scale-85" [strokeWidth]="1.5" />
                    </span>
                    <h3 class="glastor-h5 text-white">2. Método de Pago Seguro</h3>
                  </div>

                  <!-- Unified payment method selectors -->
                  <div class="grid grid-cols-3 gap-3">
                    <button type="button" (click)="selectPaymentMethod('card')"
                            [class]="'relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center gap-1.5 cursor-pointer opacity-70 ' + 
                                     (checkoutForm.get('paymentMethod')?.value === 'card' 
                                      ? 'border-amber-600 bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' 
                                      : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400')">
                      <span class="absolute top-1 right-1 text-[7px] font-bold bg-[#41BF84]/20 text-[#41BF84] px-1 py-0.5 rounded-sm">PRÓX.</span>
                      <hugeicons-icon [icon]="CreditCardIcon" [size]="20" class="text-lg" [strokeWidth]="1.5" />
                      <span class="text-[9px] font-black uppercase tracking-wider">Tarjeta</span>
                    </button>
                    
                    <button type="button" (click)="selectPaymentMethod('crypto')"
                            [class]="'relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center gap-1.5 cursor-pointer opacity-70 ' + 
                                     (checkoutForm.get('paymentMethod')?.value === 'crypto' 
                                      ? 'border-amber-600 bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' 
                                      : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400')">
                      <span class="absolute top-1 right-1 text-[7px] font-bold bg-zinc-9500/20 text-zinc-500 px-1 py-0.5 rounded-sm">PRÓX.</span>
                      <hugeicons-icon [icon]="BitcoinIcon" [size]="20" class="text-lg" [strokeWidth]="1.5" />
                      <span class="text-[9px] font-black uppercase tracking-wider">Crypto</span>
                    </button>
                    
                    <button type="button" (click)="selectPaymentMethod('bank')"
                            [class]="'flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center gap-1.5 cursor-pointer ' + 
                                     (checkoutForm.get('paymentMethod')?.value === 'bank' 
                                      ? 'border-amber-600 bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' 
                                      : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400')">
                      <hugeicons-icon [icon]="Building03Icon" [size]="20" class="text-lg" [strokeWidth]="1.5" />
                      <span class="text-[9px] font-black uppercase tracking-wider">Banco</span>
                    </button>
                  </div>

                  <!-- PAYMENT BLOCK FIELDS (CONDITIONAL BASED ON SELECTION) -->
                  <div [class]="'border rounded-lg p-4.5 space-y-4 ' + 'bg-zinc-950/40 border-zinc-850'">
                    
                    <!-- 2A. CREDIT CARD PAYMENTS -->
                    @if (checkoutForm.get('paymentMethod')?.value === 'card') {
                      <div class="space-y-4">
                        <div class="space-y-1.5">
                          <label class="text-[10px] font-bold text-zinc-500 block">Número de Tarjeta Credi/Débito (Solo números)</label>
                          <input type="text" formControlName="cardNumber" placeholder="1234567812345678"
                                 [class]="'w-full border rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none transition-colors ' + 
                                          'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-600'">
                          @if (checkoutForm.get('cardNumber')?.touched && checkoutForm.get('cardNumber')?.invalid) {
                            <span class="text-[9px] text-rose-500 font-bold block">Escriba 16 números continuos sin espacios.</span>
                          }
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-zinc-500 block">Expiración (MM/AA)</label>
                            <input type="text" formControlName="cardExpiry" placeholder="12/28"
                                   [class]="'w-full border rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none transition-colors ' + 
                                            'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                            @if (checkoutForm.get('cardExpiry')?.touched && checkoutForm.get('cardExpiry')?.invalid) {
                              <span class="text-[9px] text-rose-500 font-bold block">Formato MM/AA.</span>
                            }
                          </div>

                          <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-zinc-500 block">Código CVC</label>
                            <input type="text" formControlName="cardCvc" placeholder="123"
                                   [class]="'w-full border rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none transition-colors ' + 
                                            'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                            @if (checkoutForm.get('cardCvc')?.touched && checkoutForm.get('cardCvc')?.invalid) {
                              <span class="text-[9px] text-rose-500 font-bold block">3 números.</span>
                            }
                          </div>
                        </div>
                      </div>
                    }

                    <!-- 2B. CRYPTOCURRENCY PAYMENTS -->
                    @if (checkoutForm.get('paymentMethod')?.value === 'crypto') {
                      <div class="space-y-4">
                        <div [class]="'border rounded-lg p-3 text-left space-y-2 ' + 'bg-zinc-900 border-zinc-800'">
                          <div class="flex items-center gap-2">
                            <span class="text-[10px] text-[#41BF84] font-bold uppercase shrink-0">Billetera de Pago:</span>
                            <span [class]="'font-mono text-[9px] px-2 py-0.5 rounded select-all font-semibold flex-grow truncate ' + 'bg-zinc-950 text-zinc-300'">bc1qj73hls9x8p6uqw7lz0kd6yvnm5f8p7tr04e578</span>
                          </div>
                          
                          <div class="space-y-1">
                            <p [class]="'text-[10px] leading-normal flex items-start gap-1 ' + 'text-zinc-400'">
                              <hugeicons-icon [icon]="InformationCircleIcon" [size]="20" class="text-[11px] text-zinc-500 mt-0.5" [strokeWidth]="1.5" />
                              Transfiere el equivalente en BTC, ETH o USDT a la billetera y copia el ID/Hash de la transacción abajo.
                            </p>
                          </div>
                        </div>

                        <div class="space-y-1.5">
                          <label class="text-[10px] font-bold text-zinc-500 block">Hash de la Transacción / TxID o Billetera Emisora</label>
                          <input type="text" formControlName="cryptoTxHash" placeholder="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                                 [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors ' + 
                                          'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                          @if (checkoutForm.get('cryptoTxHash')?.touched && checkoutForm.get('cryptoTxHash')?.invalid) {
                            <span class="text-[9px] text-rose-500 font-bold block">Introduzca un Hash / TxID de al menos 8 caracteres para verificar en la Blockchain.</span>
                          }
                        </div>
                      </div>
                    }

                    <!-- 2C. BANK TRANSFER PAYMENTS -->
                    @if (checkoutForm.get('paymentMethod')?.value === 'bank') {
                      <div class="space-y-4">
                        <div [class]="'border rounded-lg p-3 text-left space-y-2 ' + 'bg-zinc-900 border-zinc-800'">
                          <div [class]="'space-y-1 font-mono text-[10px] leading-normal ' + 'text-zinc-400'">
                            <div [class]="'flex justify-between border-b py-1 ' + 'border-zinc-800'">
                              <span class="font-semibold text-zinc-500 text-[8px]">BANCO:</span>
                              <span class="text-white font-bold text-[9px]">Banco Galicia</span>
                            </div>
                            <div [class]="'flex justify-between border-b py-1 ' + 'border-zinc-800'">
                              <span class="font-semibold text-zinc-500 text-[8px]">ALIAS:</span>
                              <span class="text-white font-bold select-all text-[9px]">DIBUJO.DRAGA.PRIMO</span>
                            </div>
                            <div [class]="'flex justify-between border-b py-1 ' + 'border-zinc-800'">
                              <span class="font-semibold text-zinc-500 text-[8px]">TITULAR:</span>
                              <span class="text-white font-bold select-all text-[9px]">Andres Antonio Cardoso</span>
                            </div>
                            <div class="flex justify-between pt-1">
                              <span class="font-semibold text-zinc-500 text-[8px]">CUIT:</span>
                              <span class="text-white font-bold text-[9px]">23253165669</span>
                            </div>
                          </div>
                        </div>

                        <div class="space-y-1.5">
                          <label class="text-[10px] font-bold text-zinc-500 block">Nombre de Titular o Concepto de Transferencia</label>
                          <input type="text" formControlName="bankTxRef" placeholder="GLASTOR - TU NOMBRE COMPLETO"
                                 [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                          'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650'">
                          @if (checkoutForm.get('bankTxRef')?.touched && checkoutForm.get('bankTxRef')?.invalid) {
                            <span class="text-[9px] text-rose-500 font-bold block">Indique la referencia o el titular de la transferencia (mínimo 4 caracteres).</span>
                          }
                        </div>
                      </div>
                    }

                  </div>
                </div>

                <!-- Terms Checkbox (Legal requirement RGPD/Defensa Consumidor 2026) -->
                <div class="flex items-start gap-2.5 my-4">
                  <input type="checkbox" formControlName="acceptTerms" id="acceptTerms"
                         [class]="'mt-0.5 shrink-0 w-4 h-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 cursor-pointer ' + 
                                  'bg-zinc-900 border-zinc-700'">
                  <label for="acceptTerms" [class]="'text-[10px] leading-tight select-none cursor-pointer ' + 'text-zinc-400'">
                    He leído y acepto los <button type="button" (click)="setView('legales')" class="font-bold underline hover:text-amber-500">Términos y Condiciones</button> y la <button type="button" (click)="setView('legales')" class="font-bold underline hover:text-amber-500">Política de Privacidad</button>, consintiendo el procesamiento de mis datos personales para gestionar mi pedido.
                  </label>
                </div>
                @if (checkoutForm.get('acceptTerms')?.touched && checkoutForm.get('acceptTerms')?.invalid) {
                  <span class="text-[9px] text-rose-500 font-bold block -mt-2 mb-4">Es obligatorio aceptar los términos para proceder.</span>
                }

                
                <!-- Anti-Bot Protection -->
                <div class="mt-4 mb-2">
                  <app-bot-protection (tokenGenerated)="checkoutForm.get('botToken')?.setValue($event)"></app-bot-protection>
                </div>

                <!-- Big Action Submission Button -->
                <button type="submit" [disabled]="checkoutForm.invalid"
                        [class]="'w-full font-black text-xs py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md ' + 
                                 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950 disabled:bg-zinc-800 disabled:text-zinc-600 shadow-amber-500/10'">
                  <hugeicons-icon [icon]="CheckmarkBadge01Icon" [size]="20" class="scale-85" [strokeWidth]="1.5" />
                  Confirmar Orden de Compra por {{ formatPrice(total) }} (~{{ formatEUR(total) }})
                </button>

                @if (checkoutForm.get('paymentMethod')?.value === 'bank') {
                  <p class="text-center text-[10px] text-zinc-500 font-medium mt-3">
                    *Al finalizar, por favor envía el comprobante de transferencia por WhatsApp o Email para procesar tu pedido más rápido.
                  </p>
                }

              </form>
            </div>

            <!-- RIGHT COLUMN: ORDER SUMMARY & DISCOUNTS (5 COLS) -->
            <div class="lg:col-span-5 space-y-6">
              
              <!-- Cart items listing -->
              <div [class]="'rounded-lg border p-6 space-y-5 lg:sticky lg:top-28 ' + 
                             'bg-zinc-900/40 border-zinc-800/80 shadow-black/30'">
                <h3 class="glastor-h5 text-white">Resumen de tu Orden</h3>
                
                @if (cart.length > 0) {
                  <div [class]="'divide-y max-h-72 overflow-y-auto pr-1 ' + 'divide-zinc-850'">
                    @for (item of cart; track item.product.id) {
                      <div class="py-3 flex items-start gap-3 text-xs first:pt-0 last:pb-0">
                        <img [src]="item.product.image" [alt]="item.product.name" referrerpolicy="no-referrer"
                             [class]="'w-12 h-12 object-cover rounded-lg bg-zinc-100 shrink-0 border ' + 'border-zinc-800'">
                        <div class="flex-grow min-w-0">
                          <h4 [class]="'font-black truncate leading-tight ' + 'text-white'">{{ item.product.name }}</h4>
                          <span class="text-[10px] font-mono text-zinc-400 block pr-2">CANTIDAD: {{ item.quantity }} · {{ formatPrice(item.product.price) }} u.</span>
                        </div>
                        <span [class]="'font-mono font-black self-center ' + 'text-white'">{{ formatPrice((item.product.price * item.quantity)) }}</span>
                      </div>
                    }
                  </div>
                } @else {
                  <div class="py-6 text-center space-y-2">
                    <hugeicons-icon [icon]="Settings01Icon" [size]="20" class="text-zinc-300 scale-125 block"  [strokeWidth]="1.5" />
                    <p class="text-xs text-zinc-505">No hay productos en tu cesta actualmente.</p>
                    <button (click)="setView('tienda')" 
                            class="text-xs font-black text-[#41BF84] hover:text-[#41BF84] bg-[#41BF84]/10 px-3 py-1.5 rounded-lg cursor-pointer">
                      Ver Catálogo
                    </button>
                  </div>
                }
              </div>

              <!-- DYNAMIC COUPONS MANAGER CARD -->
              <div [class]="'border rounded-[28px] p-5 text-left shadow-sm space-y-3.5 ' + 
                             'bg-zinc-900/40 border-zinc-800/80 shadow-black/30'">
                <div class="space-y-1">
                  <h3 [class]="'text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ' + 'text-white'">
                    <hugeicons-icon [icon]="Ticket01Icon" [size]="20" class="text-[#41BF84] scale-75"  [strokeWidth]="1.5" />
                    Canjear Códigos Promocionales
                  </h3>
                  <p class="text-[10px] text-zinc-500 leading-normal">
                    ¿Posees una clave GLASTOR ®? Pruébalas: <strong class="text-white">MAYORISTA10</strong> o <strong class="text-[#41BF84]">GLASTOR20</strong> para aplicar ventajas directas sobre la bolsa de compras.
                  </p>
                </div>

                <div class="flex gap-2">
                  <input type="text" [formControl]="couponCode" placeholder="Ej: GLASTOR20"
                         [class]="'flex-grow border rounded-lg px-3 py-2 text-xs font-mono font-bold focus:outline-none uppercase text-left transition-colors ' + 
                                  'bg-zinc-950 border-zinc-850 text-white placeholder:text-zinc-750 focus:border-zinc-700'">
                  <button (click)="applyCoupon()" 
                          [class]="'text-xs font-black px-4 rounded-lg cursor-pointer transition-colors ' + 
                                   'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950'">
                    Validar
                  </button>
                </div>

                @if (activeDiscountPercent > 0) {
                  <div [class]="'rounded-lg px-3 py-2 flex items-center justify-between text-[11px] font-semibold animate-pulse border ' + 
                                 'bg-[#41BF84]/10 border-[#41BF84]/20 text-[#41BF84]'">
                    <span>Ventaja activa Sello GLASTOR ®:</span>
                    <span class="font-bold">- {{ activeDiscountPercent }}% de descuento</span>
                  </div>
                }
              </div>

              <!-- DETAILED INVOICE COST BOX -->
              <div [class]="'border rounded-lg p-6 space-y-3.5 text-left ' + 
                             'bg-zinc-950 border-zinc-850'">
                <div class="flex items-center gap-2 pb-4">
                  <h3 class="glastor-h5 text-white">Resumen del Pedido</h3>
                </div>

                <div [class]="'space-y-2 text-xs ' + 'text-zinc-400'">
                  <div class="flex justify-between">
                    <span>Subtotal de Cesta <span class="text-[9px] text-zinc-500 font-bold uppercase tracking-wider ml-1">(IVA 21% INCLUIDO)</span></span>
                    <div class="flex flex-col items-end">
                      <span class="text-white font-mono font-bold">{{ formatPrice(subtotal) }}</span>
                      <span class="text-[9px] text-zinc-500 font-mono font-bold tracking-tight">~ {{ formatEUR(subtotal) }}</span>
                    </div>
                  </div>

                  @if (activeDiscountPercent > 0) {
                    <div class="flex justify-between text-[#41BF84] font-bold">
                      <span>Descuento Aplicado ({{ activeDiscountPercent }}%)</span>
                      <div class="flex flex-col items-end">
                        <span class="font-mono">- {{ formatPrice(discountAmount) }}</span>
                        <span class="text-[9px] text-zinc-500 font-mono font-bold tracking-tight">~ - {{ formatEUR(discountAmount) }}</span>
                      </div>
                    </div>
                  }



                  <div class="flex justify-between items-center">
                    <span>Envío Certificado</span>
                    @if (shipping === 0) {
                      <span class="text-[#41BF84] font-bold text-[10px] uppercase">¡Gratuito!</span>
                    } @else {
                      <div class="flex flex-col items-end">
                        <span class="text-white font-mono font-bold">{{ formatPrice(shipping) }}</span>
                        <span class="text-[9px] text-zinc-500 font-mono font-bold tracking-tight">~ {{ formatEUR(shipping) }}</span>
                      </div>
                    }
                  </div>

                  <div [class]="'pt-2.5 border-t flex justify-between items-center ' + 
                                 'border-zinc-850 text-white'">
                    <span class="font-black">Total de Inversión</span>
                    <div class="flex flex-col items-end">
                      <span [class]="'font-mono text-lg font-black leading-none ' + 'text-[#41BF84]'">{{ formatPrice(total) }}</span>
                      <span class="text-[10px] text-[#41BF84]/70 font-mono font-black tracking-tight mt-1">~ {{ formatEUR(total) }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      }

    </main>
`
})
export class CheckoutPageComponent {
  appState = inject(AppStateService);
  router = inject(Router);

  isCinematicGlow = this.appState.isCinematicGlow;
  checkoutStage = 'payment';
  orderPlaced = false;
  private fb = inject(FormBuilder);
  
  checkoutForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    postalCode: ['', Validators.required],
    paymentMethod: ['card', Validators.required],
    cardNumber: [''],
    cardExpiry: [''],
    cardCvc: [''],
    cryptoTxHash: [''],
    bankTxRef: [''],
    acceptTerms: [false, Validators.requiredTrue],
    botToken: ['', Validators.required]
  });
  
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
  processCheckout() {
    if (this.checkoutForm.invalid) return;

    // SIMULATED SECURE BACKEND VALIDATION:
    // Instead of trusting the DOM total, we extract pure payload and let the service process it.
    const securePayload = {
      user: this.checkoutForm.value.email,
      botToken: this.checkoutForm.value.botToken,
      items: this.cart.map(i => ({ id: i.product.id, qty: i.quantity })),
      coupon: this.couponCode.value,
      payment: this.checkoutForm.value.paymentMethod
    };

    // The backend would recalculate total securely using securePayload
    console.log("[SECURITY] Sending secure checkout payload:", securePayload);
    this.appState.playSynthBeep(600, 'sine', 0.2, 0.05);
    this.appState.playSynthBeep(900, 'sine', 0.3, 0.05);
    
    this.orderPlaced = true;
  }
  selectPaymentMethod(method: string) { 
    this.checkoutForm.patchValue({ paymentMethod: method });
    
    // Clear validations for other methods
    this.checkoutForm.get('cardNumber')?.clearValidators();
    this.checkoutForm.get('cardExpiry')?.clearValidators();
    this.checkoutForm.get('cardCvc')?.clearValidators();
    this.checkoutForm.get('cryptoTxHash')?.clearValidators();
    this.checkoutForm.get('bankTxRef')?.clearValidators();
    
    // Add validations for selected method
    if (method === 'card') {
      this.checkoutForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]{16}$')]);
      this.checkoutForm.get('cardExpiry')?.setValidators([Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]);
      this.checkoutForm.get('cardCvc')?.setValidators([Validators.required, Validators.pattern('^[0-9]{3,4}$')]);
    } else if (method === 'crypto') {
      this.checkoutForm.get('cryptoTxHash')?.setValidators([Validators.required, Validators.minLength(8)]);
    } else if (method === 'bank') {
      this.checkoutForm.get('bankTxRef')?.setValidators([Validators.required, Validators.minLength(4)]);
    }
    
    this.checkoutForm.get('cardNumber')?.updateValueAndValidity();
    this.checkoutForm.get('cardExpiry')?.updateValueAndValidity();
    this.checkoutForm.get('cardCvc')?.updateValueAndValidity();
    this.checkoutForm.get('cryptoTxHash')?.updateValueAndValidity();
    this.checkoutForm.get('bankTxRef')?.updateValueAndValidity();
  }

  setView(view: string) { this.router.navigate(['/' + view]); }

  applyCoupon() { 
    const code = this.couponCode.value?.toUpperCase().trim();
    if (code === 'MAYORISTA10') {
      this.appState.activeDiscountPercent.set(10);
    } else if (code === 'GLASTOR20') {
      this.appState.activeDiscountPercent.set(20);
    } else {
      this.appState.activeDiscountPercent.set(0);
    }
  }


  readonly UserIcon = UserIcon;
  readonly Wallet01Icon = Wallet01Icon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly BitcoinIcon = BitcoinIcon;
  readonly Building03Icon = Building03Icon;
  readonly InformationCircleIcon = InformationCircleIcon;
  readonly CheckmarkBadge01Icon = CheckmarkBadge01Icon;
  readonly Ticket01Icon = Ticket01Icon;
  readonly Settings01Icon = Settings01Icon;
  Math = Math;

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  }

  

  formatEUR(priceInArs: number): string {
    const eurPrice = priceInArs / this.exchangeRateEurToArs();
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(eurPrice);
  }
}
