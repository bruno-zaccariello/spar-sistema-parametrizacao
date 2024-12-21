import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideNgGlyphs } from '@ng-icons/core';
import { DEFAULT_DIALOG_CONFIG, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { withMaterialSymbolsOutlined, withMaterialSymbolsRounded } from '@ng-icons/material-symbols';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgGlyphs(withMaterialSymbolsOutlined(), withMaterialSymbolsRounded()),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(),
    {
      provide: DIALOG_DATA,
      useValue: {}
    },
    {
      provide: DialogRef,
      useValue: {}
    },
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: {
        hasBackdrop: true
      }
    }
  ]
};
