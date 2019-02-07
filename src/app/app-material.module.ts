import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    CdkTableModule
  ]
})

export class AppMaterialModule {}
