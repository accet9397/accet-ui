import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    CdkTableModule
  ]
})

export class AppMaterialModule {}
