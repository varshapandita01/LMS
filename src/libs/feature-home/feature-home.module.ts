import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHomepageComponent } from './my-homepage/my-homepage.component';
import { FeatureRegisterModule } from '../feature-register/feature-register.module';
import { FeatureCoursesModule } from '../feature-courses/feature-courses.module';
import { FeatureViewcourseModule } from '../feature-viewcourse/feature-viewcourse.module';
import { FeatureSearchCourseModule } from '../feature-search-course/feature-search-course.module';
import { FeatureDeletecourseModule } from '../feature-deletecourse/feature-deletecourse.module';



@NgModule({
  declarations: [MyHomepageComponent],
  imports: [
    CommonModule,FeatureRegisterModule,FeatureCoursesModule,FeatureViewcourseModule,FeatureDeletecourseModule,FeatureSearchCourseModule],
  exports:[MyHomepageComponent]
})
export class FeatureHomeModule { }
