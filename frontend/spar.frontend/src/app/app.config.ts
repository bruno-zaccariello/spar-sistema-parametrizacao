import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { NgIconsModule } from '@ng-icons/core';
import { jamArrowUp, jamClose } from '@ng-icons/jam-icons';
import { DEFAULT_DIALOG_CONFIG, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
