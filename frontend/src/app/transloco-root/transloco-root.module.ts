import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { environment } from '@environments/environment';
import {
  translocoConfig,
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
} from '@ngneat/transloco';

import { customMissingHandler, TranslocoHttpLoaderService } from './translocoHttpLoader.service';

@NgModule({
  exports: [TranslocoModule],
  imports: [HttpClientModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'ko'],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    customMissingHandler,
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoaderService },
  ],
})
export class TranslocoLoaderModule {}
