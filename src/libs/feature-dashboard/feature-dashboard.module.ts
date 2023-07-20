import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';



@NgModule({
  declarations: [MyDashboardComponent],
  imports: [
    CommonModule
  ],
  exports: [MyDashboardComponent]
})
export class FeatureDashboardModule { }
