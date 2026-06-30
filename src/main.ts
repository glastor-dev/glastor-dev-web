import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

export const customImageLoader = (config: ImageLoaderConfig) => {
  let url = config.src;
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', config.width ? config.width.toString() : '1200');
      urlObj.searchParams.set('q', 'auto');
      urlObj.searchParams.set('fm', 'webp');
      return urlObj.toString();
    } catch(e) {
      return url;
    }
  }

  if (url.includes('res.cloudinary.com')) {
    // Inject w_auto or w_800, q_auto, f_auto into the path
    const w = config.width ? `w_${config.width}` : 'w_1200';
    return url.replace('/upload/', `/upload/${w},q_auto,f_auto/`);
  }

  return url;
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader
    }
  ]
}).catch(err => console.error(err));
