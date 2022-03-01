import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ComingSoonModule } from '@app/coming-soon/coming-soon.module';


@NgModule({
  declarations: [
    ContactsPageComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ComingSoonModule
  ]
})
export class ContactsModule { }
