import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-neon-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center justify-center text-[11px] font-black uppercase tracking-wider drop-shadow-md px-2.5 py-0.5 rounded-sm backdrop-blur-sm animate-pulse border transition-colors duration-300"
          [ngClass]="{
            'bg-emerald-950/40 text-[#41BF84] border-[#41BF84]/20 shadow-[0_0_10px_rgba(0,255,102,0.15)]': variant === 'success',
            'bg-rose-950/40 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]': variant === 'danger',
            'bg-amber-950/40 text-amber-400 border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.15)]': variant === 'warning',
            'bg-blue-950/40 text-blue-400 border-blue-400/20 shadow-[0_0_10px_rgba(96,165,250,0.15)]': variant === 'info'
          }">
      {{ text }}
    </span>
  `
})
export class NeonBadgeComponent {
  @Input({ required: true }) text!: string;
  @Input() variant: 'success' | 'danger' | 'warning' | 'info' = 'success';
}
