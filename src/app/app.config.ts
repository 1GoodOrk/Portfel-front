import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideRouter } from '@angular/router';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from "@ngx-translate/core";
import ColorPreset from './color-preset'
import Aura from '@primeuix/themes/aura';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserModule),
    provideEchartsCore({ echarts }),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(),
    provideTranslateService({
      defaultLanguage: 'ua'
    }),
    providePrimeNG({
      theme: {
        preset: ColorPreset,
        // options: {
        //   darkModeSelector: '.my-app-dark'
        // }
      }
    })
  ]
};
