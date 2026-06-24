import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  soundEnabled = signal<boolean>(false);
  isCinematicGlow = signal<boolean>(true);
  isTransitioning = signal<boolean>(false);
  showPreloader = signal<boolean>(true);
  toasts = signal<Toast[]>([]);

  private audioCtx: AudioContext | null = null;
  private oscNode: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private subOscNode: OscillatorNode | null = null;
  private subGainNode: GainNode | null = null;

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
