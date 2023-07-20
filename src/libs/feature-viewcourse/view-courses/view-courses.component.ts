import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit {
  courses: any[];

  constructor(private http: HttpClient, private courseService: CourseService) { 
    
  }
  course = {
    courseName: '',
    courseDuration: '',
    courseDescription:'',
    technology: '',
    launchUrl:''
  };
  ngOnInit(): void {
    
    this.courseService.getAllCourses().subscribe(
      (response: any[]) => {
        this.courses = response;
      },
      (error) => {
        console.error('Error getting courses:', error);
      }
    );
    }
 


}
