import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormServicePageRoutingModule } from './form-service-routing.module';

import { FormServicePage } from './form-service.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormServicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormServicePage]
})
export class FormServicePageModule {}
