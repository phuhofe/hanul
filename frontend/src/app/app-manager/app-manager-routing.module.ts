import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

import { AppManagerPageComponent } from './containers/app-manager-page/app-manager-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppManagerPageComponent
  },
  {
    path: 'test-image',
    component: ImageUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppManagerRoutingModule { }
