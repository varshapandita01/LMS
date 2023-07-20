import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAddcoursesComponent } from './my-addcourses/my-addcourses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [MyAddcoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatDividerModule,
    MatRadioModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports:[MyAddcoursesComponent]
})
export class FeatureCoursesModule { }
