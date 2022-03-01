import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Translation, TranslocoConfig, TranslocoLoader, TranslocoMissingHandler, TRANSLOCO_MISSING_HANDLER } from "@ngneat/transloco";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoaderService implements TranslocoLoader  {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export class CustomHandler implements TranslocoMissingHandler {
  handle(key: string, config: TranslocoConfig) {
    return key;
  }
}

export const customMissingHandler = {
  provide: TRANSLOCO_MISSING_HANDLER,
  useClass: CustomHandler
};