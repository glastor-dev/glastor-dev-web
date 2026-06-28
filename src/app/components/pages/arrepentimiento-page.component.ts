import { Component, signal, inject, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppStateService } from '../../app-state.service';
import { BotProtectionComponent } from '../ui/bot-protection.component';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { DeliveryBox01Icon, SentIcon, Refresh01Icon, CheckmarkBadge01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-arrepentimiento-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BotProtectionComponent, HugeiconsIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans selection:bg-rose-500/30"
         [class.bg-[#0a0a0a]]="isCinematicGlow()"
         [class.text-white]="isCinematicGlow()"
         [class.bg-zinc-50]="!isCinematicGlow()"
         [class.text-zinc-900]="!isCinematicGlow()">
      
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-10">
          <span class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                [class.bg-rose-500]="isCinematicGlow()" [class.bg-rose-500]="!isCinematicGlow()"
                [class.bg-opacity-10]="isCinematicGlow()" [class.text-rose-500]="isCinematicGlow()" [class.text-white]="!isCinematicGlow()">
            <hugeicons-icon [icon]="DeliveryBox01Icon" [size]="32" [strokeWidth]="1.5"></hugeicons-icon>
          </span>
          <h1 class="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4 uppercase">Botón de Arrepentimiento</h1>
          <p class="text-sm md:text-base font-light" [class.text-zinc-400]="isCinematicGlow()" [class.text-zinc-600]="!isCinematicGlow()">
            Formulario directo de revocación de compra (Ley 24.240). Complete los datos de la operación para iniciar el proceso de devolución de manera automática y sin trabas.
          </p>
        </div>

        @if (!isSubmitted()) {
          <div class="border rounded-2xl p-6 md:p-10 shadow-xl"
               [class.bg-zinc-900]="isCinematicGlow()" [class.border-white]="isCinematicGlow()" [class.border-opacity-5]="isCinematicGlow()"
               [class.bg-white]="!isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
            
            <form [formGroup]="arrepentimientoForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2 text-left">
                  <label class="text-[10px] font-black uppercase tracking-wider block" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">Nombre</label>
                  <input type="text" formControlName="nombre" placeholder="Ej. Juan"
                         class="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
                         [class.bg-zinc-950]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()" [class.focus:border-rose-500]="isCinematicGlow()" [class.text-white]="isCinematicGlow()"
                         [class.bg-zinc-50]="!isCinematicGlow()" [class.border-zinc-300]="!isCinematicGlow()" [class.focus:border-rose-500]="!isCinematicGlow()">
                  @if (arrepentimientoForm.get('nombre')?.touched && arrepentimientoForm.get('nombre')?.invalid) {
                    <span class="text-[10px] text-rose-500 font-bold block">Requerido.</span>
                  }
                </div>

                <div class="space-y-2 text-left">
                  <label class="text-[10px] font-black uppercase tracking-wider block" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">Apellido</label>
                  <input type="text" formControlName="apellido" placeholder="Ej. Pérez"
                         class="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
                         [class.bg-zinc-950]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()" [class.focus:border-rose-500]="isCinematicGlow()" [class.text-white]="isCinematicGlow()"
                         [class.bg-zinc-50]="!isCinematicGlow()" [class.border-zinc-300]="!isCinematicGlow()" [class.focus:border-rose-500]="!isCinematicGlow()">
                  @if (arrepentimientoForm.get('apellido')?.touched && arrepentimientoForm.get('apellido')?.invalid) {
                    <span class="text-[10px] text-rose-500 font-bold block">Requerido.</span>
                  }
                </div>
              </div>

              <div class="space-y-2 text-left">
                <label class="text-[10px] font-black uppercase tracking-wider block" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">Correo Electrónico</label>
                <input type="email" formControlName="email" placeholder="correo@ejemplo.com"
                       class="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
                       [class.bg-zinc-950]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()" [class.focus:border-rose-500]="isCinematicGlow()" [class.text-white]="isCinematicGlow()"
                       [class.bg-zinc-50]="!isCinematicGlow()" [class.border-zinc-300]="!isCinematicGlow()" [class.focus:border-rose-500]="!isCinematicGlow()">
                @if (arrepentimientoForm.get('email')?.touched && arrepentimientoForm.get('email')?.invalid) {
                  <span class="text-[10px] text-rose-500 font-bold block">Ingrese un correo válido.</span>
                }
              </div>

              <div class="space-y-2 text-left">
                <label class="text-[10px] font-black uppercase tracking-wider block" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">Número de Pedido o Factura</label>
                <input type="text" formControlName="pedido" placeholder="Ej. TXN-1234567"
                       class="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors font-mono uppercase"
                       [class.bg-zinc-950]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()" [class.focus:border-rose-500]="isCinematicGlow()" [class.text-white]="isCinematicGlow()"
                       [class.bg-zinc-50]="!isCinematicGlow()" [class.border-zinc-300]="!isCinematicGlow()" [class.focus:border-rose-500]="!isCinematicGlow()">
                @if (arrepentimientoForm.get('pedido')?.touched && arrepentimientoForm.get('pedido')?.invalid) {
                  <span class="text-[10px] text-rose-500 font-bold block">Requerido.</span>
                }
              </div>

              <div class="space-y-2 text-left">
                <label class="text-[10px] font-black uppercase tracking-wider block" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">Producto a Devolver</label>
                <input type="text" formControlName="producto" placeholder="Ej. Smart TV 55 Pulgadas"
                       class="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
                       [class.bg-zinc-950]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()" [class.focus:border-rose-500]="isCinematicGlow()" [class.text-white]="isCinematicGlow()"
                       [class.bg-zinc-50]="!isCinematicGlow()" [class.border-zinc-300]="!isCinematicGlow()" [class.focus:border-rose-500]="!isCinematicGlow()">
                @if (arrepentimientoForm.get('producto')?.touched && arrepentimientoForm.get('producto')?.invalid) {
                  <span class="text-[10px] text-rose-500 font-bold block">Requerido.</span>
                }
              </div>

              
                <div class="pt-2">
                  <app-bot-protection (tokenGenerated)="arrepentimientoForm.get('botToken')?.setValue($event)"></app-bot-protection>
                </div>

                <div class="pt-4">
                <button type="submit" [disabled]="arrepentimientoForm.invalid || isProcessing()"
                        class="w-full font-black text-sm py-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        [class.bg-rose-600]="isCinematicGlow()" [class.text-white]="isCinematicGlow()" [class.hover:bg-rose-500]="isCinematicGlow()"
                        [class.bg-zinc-900]="!isCinematicGlow()" [class.hover:bg-zinc-800]="!isCinematicGlow()" [class.text-white]="!isCinematicGlow()">
                  @if (isProcessing()) {
                    <hugeicons-icon [icon]="Refresh01Icon" [size]="20" [strokeWidth]="1.5" class="animate-spin"></hugeicons-icon> Procesando...
                  } @else {
                    <hugeicons-icon [icon]="SentIcon" [size]="20" [strokeWidth]="1.5"></hugeicons-icon> Revocar Compra
                  }
                </button>
              </div>
            </form>
          </div>
        } @else {
          <!-- Success Message -->
          <div class="border rounded-2xl p-8 md:p-12 shadow-2xl text-center space-y-6"
               [class.bg-zinc-900]="isCinematicGlow()" [class.border-emerald-500]="isCinematicGlow()" [class.border-opacity-30]="isCinematicGlow()"
               [class.bg-emerald-50]="!isCinematicGlow()" [class.border-emerald-200]="!isCinematicGlow()">
            
            <div class="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <hugeicons-icon [icon]="CheckmarkBadge01Icon" [size]="48" [strokeWidth]="1.5"></hugeicons-icon>
            </div>

            <h2 class="text-2xl font-black uppercase text-emerald-500 tracking-tight">Trámite Iniciado Correctamente</h2>
            <p class="text-sm font-medium" [class.text-zinc-300]="isCinematicGlow()" [class.text-zinc-700]="!isCinematicGlow()">
              Hemos registrado su solicitud de revocación. Nuestro sistema automatizado procesará la devolución.
            </p>

            <div class="p-6 rounded-lg border my-6 text-left"
                 [class.bg-zinc-950]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()"
                 [class.bg-white]="!isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
              <p class="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black mb-2">Código de Identificación del Trámite</p>
              <div class="text-2xl md:text-3xl font-mono font-black tracking-widest select-all" [class.text-white]="isCinematicGlow()" [class.text-zinc-900]="!isCinematicGlow()">
                {{ trackingCode() }}
              </div>
            </div>

            <p class="text-[11px] max-w-sm mx-auto" [class.text-zinc-400]="isCinematicGlow()" [class.text-zinc-500]="!isCinematicGlow()">
              Se ha generado este comprobante de forma inmediata. Se le enviarán los detalles e instrucciones logísticas por correo electrónico a <strong [class.text-white]="isCinematicGlow()">{{ arrepentimientoForm.value.email }}</strong> en un plazo máximo de 24 horas.
            </p>
          </div>
        }
      </div>
    </div>
  `
})
export class ArrepentimientoPageComponent {
  DeliveryBox01Icon = DeliveryBox01Icon;
  SentIcon = SentIcon;
  Refresh01Icon = Refresh01Icon;
  CheckmarkBadge01Icon = CheckmarkBadge01Icon;
  private appState = inject(AppStateService);
  private fb = inject(FormBuilder);
  
  isCinematicGlow = this.appState.isCinematicGlow;

  arrepentimientoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    pedido: ['', Validators.required],
    producto: ['', Validators.required],
      botToken: ['', Validators.required]
  });

  isProcessing = signal(false);
  isSubmitted = signal(false);
  trackingCode = signal('');

  @Output() onArrepentimiento = new EventEmitter<any>();

  onSubmit() {
    if (this.arrepentimientoForm.invalid) return;
    
    this.isProcessing.set(true);
    this.appState.playSynthBeep(450, 'sine', 0.1, 0.05);

    // Simulate backend processing
    setTimeout(() => {
      this.isProcessing.set(false);
      this.isSubmitted.set(true);
      // Generate a random tracking code
      const code = 'ARR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      this.trackingCode.set(code);
      this.appState.playSynthBeep(600, 'sine', 0.15, 0.05);
      this.appState.playSynthBeep(800, 'sine', 0.15, 0.05);
      
      this.onArrepentimiento.emit({
        id: code,
        ...this.arrepentimientoForm.value,
        fecha: new Date().toLocaleDateString('es-AR')
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }
}
