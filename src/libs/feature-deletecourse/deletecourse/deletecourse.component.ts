import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PopUpSnackMessageService } from 'src/app/services/pop-up-snack-message.service';

@Component({
  selector: 'app-deletecourse',
  templateUrl: './deletecourse.component.html',
  styleUrls: ['./deletecourse.component.scss']
})
export class DeletecourseComponent implements OnInit {
  courseName: string='';

  constructor(private http : HttpClient, private popUpService: PopUpSnackMessageService) { }

  ngOnInit(): void {
  }
  deleteCourse(): void {
    // Send a DELETE request to the backend API using HttpClient
    const apiUrl = `http://localhost:8082/api/v1.0/lms/courses/delete/${this.courseName}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.delete(apiUrl, { headers }).subscribe(
      () => {
        console.log('Course deleted successfully');
        // Handle success response
        this.popUpService.showSuccessMessage('Course Deleted Successfully')
      },
      (error) => {
        console.log('Course deletion failed:', error);
        // Handle error response
      }
    );
  }
}


