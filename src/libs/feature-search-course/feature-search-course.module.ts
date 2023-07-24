import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCourseComponent } from './search-course/search-course.component';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[SearchCourseComponent]
})
export class FeatureSearchCourseModule { }
