import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAddcoursesComponent } from 'src/libs/feature-courses/my-addcourses/my-addcourses.component';
import { DeletecourseComponent } from 'src/libs/feature-deletecourse/deletecourse/deletecourse.component';
import { MyregisterationpageComponent } from 'src/libs/feature-register/myregisterationpage/myregisterationpage.component';
import { SearchCourseComponent } from 'src/libs/feature-search-course/search-course/search-course.component';
import { ViewCoursesComponent } from 'src/libs/feature-viewcourse/view-courses/view-courses.component';

const routes: Routes = [
  { path: 'register', component: MyregisterationpageComponent},
  { path: 'addCourse', component: MyAddcoursesComponent },
  { path: 'viewAllCourses', component: ViewCoursesComponent},
  { path: 'deletecourse', component: DeletecourseComponent},
  { path: 'getcourseDetails', component: SearchCourseComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
