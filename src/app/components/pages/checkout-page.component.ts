import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { UserIcon, Wallet01Icon, CreditCardIcon, BitcoinIcon, Building03Icon, InformationCircleIcon, CheckmarkBadge01Icon, Ticket01Icon, Settings01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HugeiconsIconComponent],
  template: `
    <main class="max-w-6xl mx-auto px-4 py-8 relative page-transition">

      @if (orderPlaced) {
        <!-- SUCCESS ORDER PLACED PANEL -->
        <div [class]="'border rounded-lg p-8 md:p-14 text-center max-w-lg mx-auto space-y-6 relative overflow-hidden ' + 
                       (isCinematicGlow ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200 shadow-2xl')">
          <div class="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#41BF84]/10 blur-2xl"></div>
          
          <div class="w-16 h-16 rounded-full bg-[#41BF84]/10 border border-[#41BF84]/20 text-[#41BF84] flex items-center justify-center mx-auto shadow-sm">
            <hugeicons-icon [icon]="Settings01Icon" [size]="20" class="scale-125"  [strokeWidth]="1.5" />
          </div>

          <div class="space-y-2">
            <h2 [class]="'text-xl md:text-2xl font-black uppercase ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">¡Pedido Autorizado y Procesado!</h2>
            <p class="text-xs text-zinc-500 leading-normal max-w-sm mx-auto">
              La planta logística de GLASTOR ® preparará su despacho premium paletizado de manera inmediata.
            </p>
          </div>

          <!-- Virtual Invoice Details -->
          <div [class]="'p-5 rounded-lg space-y-3.5 text-left border ' + (isCinematicGlow ? 'bg-zinc-950 border-zinc-850' : 'bg-zinc-50 border-zinc-250/70')">
            <div class="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span>GLASTOR ® DIGITAL INVOICE:</span>
              <span>#TXN-{{ Math.random().toString(36).substring(2, 9).toUpperCase() }}</span>
            </div>

            <div [class]="'pt-2.5 border-t space-y-2 text-xs ' + (isCinematicGlow ? 'border-zinc-850 text-zinc-300' : 'border-zinc-200 text-zinc-700')">
              <div class="flex justify-between items-center">
                <span class="font-bold">Cliente:</span>
                <span [class.text-white]="isCinematicGlow">{{ checkoutForm.get('fullName')?.value }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-bold">Email de enlace:</span>
                <span [class.text-white]="isCinematicGlow" class="font-mono text-[11px]">{{ checkoutForm.get('email')?.value }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-bold">Descuento Activado:</span>
                <span class="font-bold text-[#41BF84]">- {{ formatPrice(discountAmount) }} ({{ activeDiscountPercent }}%)</span>
              </div>
              <div [class]="'pt-2 border-t flex justify-between items-center ' + (isCinematicGlow ? 'border-zinc-850 text-white' : 'border-zinc-200 text-zinc-900')">
                <span class="font-black text-sm uppercase">Monto Total Liquidado:</span>
                <span [class]="'font-mono text-base font-black ' + (isCinematicGlow ? 'text-[#41BF84]' : 'text-[#41BF84]')">{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>

          <button (click)="closeCheckout.emit()" 
                  [class]="'font-black text-xs px-8 py-3 rounded-lg transition-all cursor-pointer ' + 
                           (isCinematicGlow ? 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950 shadow-md shadow-amber-500/20' : 'bg-zinc-900 hover:bg-zinc-800 text-white')">
            Finalizar y Regresar al Catálogo
          </button>
        </div>
      } @else {
        <!-- PENDING CHECKOUT INTERACTIVE STAGE -->
        <div class="space-y-6">
          <div class="text-left space-y-1">
            <span class="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black block">Pasarela Criptológica Segura</span>
            <h1 [class]="'text-2xl md:text-3xl font-black tracking-tight ' + (isCinematicGlow ? 'text-white' : 'text-zinc-950')">Formulario de Checkup</h1>
            <p [class]="'text-xs ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-500')">Por favor, complete las directivas de entrega y el canal de liquidación bancaria.</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- LEFT COLUMN: INPUT FORMS (7 COLS) -->
            <div [class]="'lg:col-span-7 border rounded-lg p-6 space-y-6 text-left ' + 
                           (isCinematicGlow ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200/60 shadow-sm')">
              <div [class]="'flex items-center gap-2 border-b pb-4 ' + (isCinematicGlow ? 'border-zinc-850' : 'border-zinc-150')">
                <span [class]="'w-8 h-8 rounded-lg flex items-center justify-center font-bold ' + 
                               (isCinematicGlow ? 'bg-[#41BF84]/10 text-[#41BF84] border border-[#41BF84]/20' : 'bg-[#41BF84]/10 text-[#41BF84]')">
                  <hugeicons-icon [icon]="UserIcon" [size]="20" class="scale-80" [strokeWidth]="1.5" />
                </span>
                <h3 [class]="'text-xs font-black uppercase tracking-wider ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">1. Datos Personales y Archivo de Envío</h3>
              </div>

              <form [formGroup]="checkoutForm" (ngSubmit)="processCheckout.emit()" class="space-y-5">
                
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Nombre Completo del Consignatario</label>
                  <input type="text" formControlName="fullName" placeholder="John Doe"
                         [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                  (isCinematicGlow 
                                   ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                   : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                  @if (checkoutForm.get('fullName')?.touched && checkoutForm.get('fullName')?.invalid) {
                    <span class="text-[9px] text-rose-500 font-bold block">Por favor introduzca su nombre (Mínimo 4 caracteres).</span>
                  }
                </div>

                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Correo Electrónico de Notificaciones</label>
                  <input type="email" formControlName="email" placeholder="john@ejemplo.com"
                         [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                  (isCinematicGlow 
                                   ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                   : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                  @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
                    <span class="text-[9px] text-rose-500 font-bold block">Ingrese una dirección de correo válida.</span>
                  }
                </div>

                <!-- Shipping Address details -->
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Dirección Fiscal / Residencia</label>
                  <input type="text" formControlName="address" placeholder="Calle de la Ilustración Num. 15, 4º Derecha"
                         [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                  (isCinematicGlow 
                                   ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                   : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                  @if (checkoutForm.get('address')?.touched && checkoutForm.get('address')?.invalid) {
                    <span class="text-[9px] text-rose-500 font-bold block">Requerido para la guía de envío de UPS / DHL.</span>
                  }
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Ciudad</label>
                    <input type="text" formControlName="city" placeholder="Madrid"
                           [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                    (isCinematicGlow 
                                     ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                     : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                    @if (checkoutForm.get('city')?.touched && checkoutForm.get('city')?.invalid) {
                      <span class="text-[9px] text-rose-500 font-bold block">Requerido.</span>
                    }
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Código Postal (España/EU)</label>
                    <input type="text" formControlName="postalCode" placeholder="28001"
                           [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                    (isCinematicGlow 
                                     ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                     : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                    @if (checkoutForm.get('postalCode')?.touched && checkoutForm.get('postalCode')?.invalid) {
                      <span class="text-[9px] text-rose-500 font-bold block">Contiene 5 números consecutivos.</span>
                    }
                  </div>
                </div>

                <!-- Payment Block -->
                <div [class]="'space-y-4 pt-4 border-t ' + (isCinematicGlow ? 'border-zinc-850' : 'border-zinc-150')">
                  <div class="flex items-center gap-2 pb-2">
                    <span [class]="'w-8 h-8 rounded-lg flex items-center justify-center font-bold ' + 
                                   (isCinematicGlow ? 'bg-[#41BF84]/10 text-[#41BF84] border border-[#41BF84]/20' : 'bg-[#41BF84]/10 text-[#41BF84]')">
                      <hugeicons-icon [icon]="Wallet01Icon" [size]="20" class="scale-85" [strokeWidth]="1.5" />
                    </span>
                    <h3 [class]="'text-xs font-black uppercase tracking-wider ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">2. Método de Pago Seguro</h3>
                  </div>

                  <!-- Unified payment method selectors -->
                  <div class="grid grid-cols-3 gap-3">
                    <button type="button" (click)="selectPaymentMethod.emit('card')"
                            [class]="'relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center gap-1.5 cursor-pointer opacity-70 ' + 
                                     (checkoutForm.get('paymentMethod')?.value === 'card' 
                                      ? (isCinematicGlow ? 'border-amber-600 bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'border-zinc-900 bg-zinc-900 text-white shadow-md') 
                                      : (isCinematicGlow ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'))">
                      <span class="absolute top-1 right-1 text-[7px] font-bold bg-[#41BF84]/20 text-[#41BF84] px-1 py-0.5 rounded-sm">PRÓX.</span>
                      <hugeicons-icon [icon]="CreditCardIcon" [size]="20" class="text-lg" [strokeWidth]="1.5" />
                      <span class="text-[9px] font-black uppercase tracking-wider">Tarjeta</span>
                    </button>
                    
                    <button type="button" (click)="selectPaymentMethod.emit('crypto')"
                            [class]="'relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center gap-1.5 cursor-pointer opacity-70 ' + 
                                     (checkoutForm.get('paymentMethod')?.value === 'crypto' 
                                      ? (isCinematicGlow ? 'border-amber-600 bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'border-zinc-900 bg-zinc-900 text-white shadow-md') 
                                      : (isCinematicGlow ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'))">
                      <span class="absolute top-1 right-1 text-[7px] font-bold bg-zinc-500/20 text-zinc-500 px-1 py-0.5 rounded-sm">PRÓX.</span>
                      <hugeicons-icon [icon]="BitcoinIcon" [size]="20" class="text-lg" [strokeWidth]="1.5" />
                      <span class="text-[9px] font-black uppercase tracking-wider">Crypto</span>
                    </button>
                    
                    <button type="button" (click)="selectPaymentMethod.emit('bank')"
                            [class]="'flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center gap-1.5 cursor-pointer ' + 
                                     (checkoutForm.get('paymentMethod')?.value === 'bank' 
                                      ? (isCinematicGlow ? 'border-amber-600 bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/20' : 'border-zinc-900 bg-zinc-900 text-white shadow-md') 
                                      : (isCinematicGlow ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'))">
                      <hugeicons-icon [icon]="Building03Icon" [size]="20" class="text-lg" [strokeWidth]="1.5" />
                      <span class="text-[9px] font-black uppercase tracking-wider">Banco</span>
                    </button>
                  </div>

                  <!-- PAYMENT BLOCK FIELDS (CONDITIONAL BASED ON SELECTION) -->
                  <div [class]="'border rounded-lg p-4.5 space-y-4 ' + (isCinematicGlow ? 'bg-zinc-950/40 border-zinc-850' : 'bg-zinc-50/70 border-zinc-200')">
                    
                    <!-- 2A. CREDIT CARD PAYMENTS -->
                    @if (checkoutForm.get('paymentMethod')?.value === 'card') {
                      <div class="space-y-4">
                        <div class="space-y-1.5">
                          <label class="text-[10px] font-bold text-zinc-500 block">Número de Tarjeta Credi/Débito (Solo números)</label>
                          <input type="text" formControlName="cardNumber" placeholder="1234567812345678"
                                 [class]="'w-full border rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none transition-colors ' + 
                                          (isCinematicGlow 
                                           ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-600' 
                                           : 'bg-white border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                          @if (checkoutForm.get('cardNumber')?.touched && checkoutForm.get('cardNumber')?.invalid) {
                            <span class="text-[9px] text-rose-500 font-bold block">Escriba 16 números continuos sin espacios.</span>
                          }
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-zinc-500 block">Expiración (MM/AA)</label>
                            <input type="text" formControlName="cardExpiry" placeholder="12/28"
                                   [class]="'w-full border rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none transition-colors ' + 
                                            (isCinematicGlow 
                                             ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                             : 'bg-white border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                            @if (checkoutForm.get('cardExpiry')?.touched && checkoutForm.get('cardExpiry')?.invalid) {
                              <span class="text-[9px] text-rose-500 font-bold block">Formato MM/AA.</span>
                            }
                          </div>

                          <div class="space-y-1.5">
                            <label class="text-[10px] font-bold text-zinc-500 block">Código CVC</label>
                            <input type="text" formControlName="cardCvc" placeholder="123"
                                   [class]="'w-full border rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none transition-colors ' + 
                                            (isCinematicGlow 
                                             ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                             : 'bg-white border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
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
                        <div [class]="'border rounded-lg p-3 text-left space-y-2 ' + (isCinematicGlow ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100/80 border-zinc-200')">
                          <div class="flex items-center gap-2">
                            <span class="text-[10px] text-[#41BF84] font-bold uppercase shrink-0">Billetera de Pago:</span>
                            <span [class]="'font-mono text-[9px] px-2 py-0.5 rounded select-all font-semibold flex-grow truncate ' + (isCinematicGlow ? 'bg-zinc-950 text-zinc-300' : 'bg-zinc-200')">bc1qj73hls9x8p6uqw7lz0kd6yvnm5f8p7tr04e578</span>
                          </div>
                          
                          <div class="space-y-1">
                            <p [class]="'text-[10px] leading-normal flex items-start gap-1 ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-700')">
                              <hugeicons-icon [icon]="InformationCircleIcon" [size]="20" class="text-[11px] text-zinc-500 mt-0.5" [strokeWidth]="1.5" />
                              Transfiere el equivalente en BTC, ETH o USDT a la billetera y copia el ID/Hash de la transacción abajo.
                            </p>
                          </div>
                        </div>

                        <div class="space-y-1.5">
                          <label class="text-[10px] font-bold text-zinc-500 block">Hash de la Transacción / TxID o Billetera Emisora</label>
                          <input type="text" formControlName="cryptoTxHash" placeholder="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                                 [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-mono focus:outline-none transition-colors ' + 
                                          (isCinematicGlow 
                                           ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                           : 'bg-white border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
                          @if (checkoutForm.get('cryptoTxHash')?.touched && checkoutForm.get('cryptoTxHash')?.invalid) {
                            <span class="text-[9px] text-rose-500 font-bold block">Introduzca un Hash / TxID de al menos 8 caracteres para verificar en la Blockchain.</span>
                          }
                        </div>
                      </div>
                    }

                    <!-- 2C. BANK TRANSFER PAYMENTS -->
                    @if (checkoutForm.get('paymentMethod')?.value === 'bank') {
                      <div class="space-y-4">
                        <div [class]="'border rounded-lg p-3 text-left space-y-2 ' + (isCinematicGlow ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100/80 border-zinc-200')">
                          <div [class]="'space-y-1 font-mono text-[10px] leading-normal ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-700')">
                            <div [class]="'flex justify-between border-b pb-1 ' + (isCinematicGlow ? 'border-zinc-800' : 'border-zinc-200/50')">
                              <span class="font-semibold text-zinc-500 text-[8px]">BANCO:</span>
                              <span [class.text-white]="isCinematicGlow" class="font-bold text-zinc-800 text-[9px]">Banco Galicia</span>
                            </div>
                            <div [class]="'flex justify-between border-b py-1 ' + (isCinematicGlow ? 'border-zinc-800' : 'border-zinc-200/50')">
                              <span class="font-semibold text-zinc-500 text-[8px]">ALIAS:</span>
                              <span [class.text-white]="isCinematicGlow" class="font-bold text-zinc-800 select-all text-[9px]">DIBUJO.DRAGA.PRIMO</span>
                            </div>
                            <div [class]="'flex justify-between border-b py-1 ' + (isCinematicGlow ? 'border-zinc-800' : 'border-zinc-200/50')">
                              <span class="font-semibold text-zinc-500 text-[8px]">TITULAR:</span>
                              <span [class.text-white]="isCinematicGlow" class="font-bold text-zinc-800 select-all text-[9px]">Andres Antonio Cardoso</span>
                            </div>
                            <div class="flex justify-between pt-1">
                              <span class="font-semibold text-zinc-500 text-[8px]">CUIT:</span>
                              <span [class.text-white]="isCinematicGlow" class="font-bold text-zinc-800 text-[9px]">23253165669</span>
                            </div>
                          </div>
                        </div>

                        <div class="space-y-1.5">
                          <label class="text-[10px] font-bold text-zinc-500 block">Nombre de Titular o Concepto de Transferencia</label>
                          <input type="text" formControlName="bankTxRef" placeholder="GLASTOR - TU NOMBRE COMPLETO"
                                 [class]="'w-full border rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none transition-colors ' + 
                                          (isCinematicGlow 
                                           ? 'bg-zinc-950 hover:bg-zinc-900 border-zinc-850 focus:border-zinc-700 text-white placeholder:text-zinc-650' 
                                           : 'bg-white border-zinc-200 focus:border-zinc-500 text-zinc-900 placeholder:text-zinc-400')">
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
                                  (isCinematicGlow ? 'bg-zinc-900 border-zinc-700' : 'bg-white')">
                  <label for="acceptTerms" [class]="'text-[10px] leading-tight select-none cursor-pointer ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-600')">
                    He leído y acepto los <button type="button" (click)="setView.emit('legales')" class="font-bold underline hover:text-amber-500">Términos y Condiciones</button> y la <button type="button" (click)="setView.emit('legales')" class="font-bold underline hover:text-amber-500">Política de Privacidad</button>, consintiendo el procesamiento de mis datos personales para gestionar mi pedido.
                  </label>
                </div>
                @if (checkoutForm.get('acceptTerms')?.touched && checkoutForm.get('acceptTerms')?.invalid) {
                  <span class="text-[9px] text-rose-500 font-bold block -mt-2 mb-4">Es obligatorio aceptar los términos para proceder.</span>
                }

                <!-- Big Action Submission Button -->
                <button type="submit" [disabled]="checkoutForm.invalid"
                        [class]="'w-full font-black text-xs py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md ' + 
                                 (isCinematicGlow 
                                  ? 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950 disabled:bg-zinc-800 disabled:text-zinc-600 shadow-amber-500/10' 
                                  : 'bg-zinc-900 hover:bg-zinc-800 text-white disabled:bg-zinc-200 disabled:text-zinc-400')">
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
              <div [class]="'border rounded-lg p-6 space-y-5 text-left ' + 
                             (isCinematicGlow ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200/60 shadow-sm')">
                <h3 [class]="'text-xs font-black uppercase tracking-wider ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">Resumen del Pedido</h3>
                
                @if (cart.length > 0) {
                  <div [class]="'divide-y max-h-72 overflow-y-auto pr-1 ' + (isCinematicGlow ? 'divide-zinc-850' : 'divide-zinc-100')">
                    @for (item of cart; track item.product.id) {
                      <div class="py-3 flex items-start gap-3 text-xs first:pt-0 last:pb-0">
                        <img [src]="item.product.image" [alt]="item.product.name" referrerpolicy="no-referrer"
                             [class]="'w-12 h-12 object-cover rounded-lg bg-zinc-100 shrink-0 border ' + (isCinematicGlow ? 'border-zinc-800' : 'border-zinc-200/50')">
                        <div class="flex-grow min-w-0">
                          <h4 [class]="'font-black truncate leading-tight ' + (isCinematicGlow ? 'text-white' : 'text-zinc-800')">{{ item.product.name }}</h4>
                          <span class="text-[10px] font-mono text-zinc-400 block pr-2">CANTIDAD: {{ item.quantity }} · {{ formatPrice(item.product.price) }} u.</span>
                        </div>
                        <span [class]="'font-mono font-black self-center ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">{{ formatPrice((item.product.price * item.quantity)) }}</span>
                      </div>
                    }
                  </div>
                } @else {
                  <div class="py-6 text-center space-y-2">
                    <hugeicons-icon [icon]="Settings01Icon" [size]="20" class="text-zinc-300 scale-125 block"  [strokeWidth]="1.5" />
                    <p class="text-xs text-zinc-505">No hay productos en tu cesta actualmente.</p>
                    <button (click)="setView.emit('tienda')" 
                            class="text-xs font-black text-[#41BF84] hover:text-[#41BF84] bg-[#41BF84]/10 px-3 py-1.5 rounded-lg cursor-pointer">
                      Ver Catálogo
                    </button>
                  </div>
                }
              </div>

              <!-- DYNAMIC COUPONS MANAGER CARD -->
              <div [class]="'border rounded-[28px] p-5 text-left shadow-sm space-y-3.5 ' + 
                             (isCinematicGlow ? 'bg-zinc-900/40 border-zinc-800/80 shadow-black/30' : 'bg-white border-zinc-200 shadow-sm')">
                <div class="space-y-1">
                  <h3 [class]="'text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ' + (isCinematicGlow ? 'text-white' : 'text-zinc-950')">
                    <hugeicons-icon [icon]="Ticket01Icon" [size]="20" class="text-[#41BF84] scale-75"  [strokeWidth]="1.5" />
                    Canjear Códigos Promocionales
                  </h3>
                  <p class="text-[10px] text-zinc-500 leading-normal">
                    ¿Posees una clave GLASTOR ®? Pruébalas: <strong [class.text-white]="isCinematicGlow" class="text-zinc-700">MAYORISTA10</strong> o <strong class="text-[#41BF84]">GLASTOR20</strong> para aplicar ventajas directas sobre la bolsa de compras.
                  </p>
                </div>

                <div class="flex gap-2">
                  <input type="text" [formControl]="couponCode" placeholder="Ej: GLASTOR20"
                         [class]="'flex-grow border rounded-lg px-3 py-2 text-xs font-mono font-bold focus:outline-none uppercase text-left transition-colors ' + 
                                  (isCinematicGlow 
                                   ? 'bg-zinc-950 border-zinc-850 text-white placeholder:text-zinc-750 focus:border-zinc-700' 
                                   : 'bg-zinc-50 border-zinc-200 placeholder:text-zinc-350 focus:border-zinc-400')">
                  <button (click)="applyCoupon.emit()" 
                          [class]="'text-xs font-black px-4 rounded-lg cursor-pointer transition-colors ' + 
                                   (isCinematicGlow ? 'bg-amber-600 hover:bg-[#41BF84]/200 text-zinc-950' : 'bg-zinc-900 hover:bg-zinc-805 text-white')">
                    Validar
                  </button>
                </div>

                @if (activeDiscountPercent > 0) {
                  <div [class]="'rounded-lg px-3 py-2 flex items-center justify-between text-[11px] font-semibold animate-pulse border ' + 
                                 (isCinematicGlow ? 'bg-[#41BF84]/10 border-[#41BF84]/20 text-[#41BF84]' : 'bg-[#41BF84]/10 border-[#41BF84]/20 text-[#41BF84]')">
                    <span>Ventaja activa Sello GLASTOR ®:</span>
                    <span class="font-bold">- {{ activeDiscountPercent }}% de descuento</span>
                  </div>
                }
              </div>

              <!-- DETAILED INVOICE COST BOX -->
              <div [class]="'border rounded-lg p-6 space-y-3.5 text-left ' + 
                             (isCinematicGlow ? 'bg-zinc-950 border-zinc-850' : 'bg-zinc-100/70 border-zinc-200')">
                <h3 [class]="'text-xs font-black uppercase tracking-wider ' + (isCinematicGlow ? 'text-white' : 'text-zinc-900')">Resumen de tu Orden</h3>

                <div [class]="'space-y-2 text-xs ' + (isCinematicGlow ? 'text-zinc-400' : 'text-zinc-655')">
                  <div class="flex justify-between">
                    <span>Subtotal de Cesta <span class="text-[9px] text-zinc-500 font-bold uppercase tracking-wider ml-1">(IVA 21% INCLUIDO)</span></span>
                    <div class="flex flex-col items-end">
                      <span [class.text-white]="isCinematicGlow" class="font-mono text-zinc-800 font-bold">{{ formatPrice(subtotal) }}</span>
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
                        <span [class.text-white]="isCinematicGlow" class="font-mono text-zinc-800 font-bold">{{ formatPrice(shipping) }}</span>
                        <span class="text-[9px] text-zinc-500 font-mono font-bold tracking-tight">~ {{ formatEUR(shipping) }}</span>
                      </div>
                    }
                  </div>

                  <div [class]="'pt-2.5 border-t flex justify-between items-center ' + 
                                 (isCinematicGlow ? 'border-zinc-850 text-white' : 'border-zinc-200 text-zinc-900')">
                    <span class="font-black">Total de Inversión</span>
                    <div class="flex flex-col items-end">
                      <span [class]="'font-mono text-lg font-black leading-none ' + (isCinematicGlow ? 'text-[#41BF84]' : 'text-[#41BF84]')">{{ formatPrice(total) }}</span>
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
  @Input() isCinematicGlow!: boolean;
  @Input() currentView!: string;
  @Input() checkoutStage!: string;
  @Input() orderPlaced!: boolean;
  @Input() cart!: any[];
  @Input() total!: number;
  @Input() subtotal!: number;
  @Input() discountAmount!: number;
  @Input() activeDiscountPercent!: number;
  @Input() iva!: number;
  @Input() shipping!: number;
  @Input() checkoutForm!: FormGroup;
  @Input() couponCode!: any;

  @Output() closeCheckout = new EventEmitter<void>();
  @Output() processCheckout = new EventEmitter<void>();
  @Output() selectPaymentMethod = new EventEmitter<any>();
  @Output() setView = new EventEmitter<any>();
  @Output() applyCoupon = new EventEmitter<void>();

  UserIcon = UserIcon;
  Wallet01Icon = Wallet01Icon;
  CreditCardIcon = CreditCardIcon;
  BitcoinIcon = BitcoinIcon;
  Building03Icon = Building03Icon;
  InformationCircleIcon = InformationCircleIcon;
  CheckmarkBadge01Icon = CheckmarkBadge01Icon;
  Ticket01Icon = Ticket01Icon;
  Settings01Icon = Settings01Icon;
  Math = Math;

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  }

  @Input() exchangeRateEurToArs!: number;

  formatEUR(priceInArs: number): string {
    const eurPrice = priceInArs / this.exchangeRateEurToArs;
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(eurPrice);
  }
}
