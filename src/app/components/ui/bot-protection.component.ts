import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { ShieldCheck, SecurityIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-bot-protection',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  template: `
    <div class="flex items-center justify-between border rounded-lg p-3 transition-colors"
         [class.bg-zinc-900]="isCinematicGlow()" [class.border-zinc-800]="isCinematicGlow()"
         [class.bg-zinc-50]="!isCinematicGlow()" [class.border-zinc-200]="!isCinematicGlow()">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-white shadow-sm border border-zinc-200 flex items-center justify-center shrink-0">
          @if (status() === 'idle') {
            <button (click)="verify()" type="button"
                    class="w-5 h-5 rounded-sm border-2 border-zinc-300 hover:border-[#41BF84] transition-colors cursor-pointer bg-zinc-50"></button>
          } @else if (status() === 'verifying') {
            <span class="w-4 h-4 border-2 border-[#41BF84] border-t-transparent rounded-full animate-spin block"></span>
          } @else if (status() === 'verified') {
            <hugeicons-icon [icon]="ShieldCheck" [size]="20" class="text-[#41BF84]" [strokeWidth]="2" />
          }
        </div>
        <div class="flex flex-col">
          <span class="text-xs font-bold" [class.text-white]="isCinematicGlow()" [class.text-zinc-800]="!isCinematicGlow()">Verificar humanidad</span>
          <span class="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            {{ status() === 'verified' ? 'Seguro' : 'Requerido para continuar' }}
          </span>
        </div>
      </div>
      <div class="flex flex-col items-end opacity-50">
        <hugeicons-icon [icon]="SecurityIcon" [size]="16" class="text-zinc-400" />
        <span class="text-[10px] font-mono tracking-widest text-zinc-400 mt-1 uppercase">G-Shield</span>
      </div>
    </div>
  `
})
export class BotProtectionComponent {
  private appState = inject(AppStateService);
  isCinematicGlow = this.appState.isCinematicGlow;
  
  SecurityIcon = SecurityIcon;
  ShieldCheck = ShieldCheck;

  status = signal<'idle' | 'verifying' | 'verified'>('idle');

  @Output() tokenGenerated = new EventEmitter<string>();

  async verify() {
    if (this.status() !== 'idle') return;
    this.status.set('verifying');
    this.appState.playSynthBeep(400, 'square', 0.05, 0.05);

    try {
      const timestamp = Date.now();
      let nonce = 0;
      let hashHex = '';
      
      // Simple Proof-of-Work: Find a hash starting with "0000"
      while (!hashHex.startsWith('0000') && nonce < 100000) {
        nonce++;
        const data = new TextEncoder().encode(`${timestamp}:${nonce}`);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }

      this.status.set('verified');
      this.appState.playSynthBeep(800, 'sine', 0.1, 0.05);
      
      // Format: "gshield_timestamp_nonce_hash"
      const token = `gshield_${timestamp}_${nonce}_${hashHex}`;
      this.tokenGenerated.emit(token);
    } catch (e) {
      this.status.set('idle');
      console.error('PoW verification failed', e);
    }
  }
}
