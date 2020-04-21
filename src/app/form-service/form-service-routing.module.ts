import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormServicePage } from './form-service.page';

const routes: Routes = [
  {
    path: '',
    component: FormServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormServicePageRoutingModule {}
