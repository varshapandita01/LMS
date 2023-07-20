import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-addcourses',
  templateUrl: './my-addcourses.component.html',
  styleUrls: ['./my-addcourses.component.scss']
})
export class MyAddcoursesComponent implements OnInit {

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
  }
  course = {
    courseName: '',
    courseDuration: '',
    courseDescription:'',
    technology: '',
    launchUrl:''
  };


  addCourse() {
    this.http.post('http://localhost:8082/api/v1.0/lms/courses/add', this.course)
      .subscribe(
        response => {
          console.log('Course added successfully:', response);
          // Reset the form after successful submission
          this.course = {
            courseName: '',
            courseDuration: '',
            courseDescription:'',
            technology: '',
            launchUrl:''
          };
          // Handle success response
        },
        error => {
          console.log('Failed to add course:', error);
          // Handle error response
        }
      );
  }


}
