import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeonBadgeComponent } from '../neon-badge/neon-badge.component';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule, NeonBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group h-full text-left flex flex-col py-8 border-t border-[#1a1a1a] transition-colors hover:border-[#41BF84]/50">
      
      <div class="flex items-start justify-between gap-4 mb-8">
        <span class="flex items-center justify-center text-[#41BF84] transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(0,255,102,0.4)]">
          <ng-content select="[card-icon]"></ng-content>
        </span>
        <app-neon-badge [text]="badgeText" variant="success"></app-neon-badge>
      </div>

      <div class="space-y-3 flex-1 mb-8">
        <h3 class="text-base font-black text-white uppercase tracking-wider font-mono">
          {{ title }}
        </h3>
        <p class="text-sm text-zinc-400 leading-relaxed font-sans">
          {{ description }}
        </p>
      </div>

      <div class="pt-6 border-t border-zinc-800/40">
        <div class="grid grid-cols-2 gap-y-4 gap-x-4 text-[10px] font-mono">
          <ng-content select="[card-metrics]"></ng-content>
        </div>
      </div>
      
    </div>
  `
})
export class FeatureCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) badgeText!: string;
}
