import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HanulLayoutModule } from './layout/layout.module';
import { SlashScreenModule } from './shared/slash-screen/slash-screen.module';
import { InterceptorInheritanceModule } from '@app/interceptor-inheritance/interceptor-inheritance.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoreModule,
    HanulLayoutModule,
    SlashScreenModule,
    InterceptorInheritanceModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
