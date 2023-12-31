import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PopUpSnackMessageService } from 'src/app/services/pop-up-snack-message.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {


  ngOnInit(): void {
  }
  searchType: string = 'technology'; // Default search type
  searchTechnology: string='dd';
  minDuration: number=0;
  maxDuration: number=1;
  result: any[];

  constructor(private http: HttpClient, private popUpService: PopUpSnackMessageService) {}

  search(): void {
    // Handle search based on the selected search type
    if (this.searchType == 'technology') {
      this.searchByTechnology();
    } else if (this.searchType == 'range') {
      this.searchByDurationRange();
    }
  }
  

  searchByTechnology(): void {
    // Search by technology logic
    // Send the search criteria to the backend API using HttpClient
    const apiUrl = 'http://localhost:8082/api/v1.0/lms/courses/info';
    console.log(this.searchTechnology);
    
    const params = new HttpParams().set('technology', this.searchTechnology);

    this.http.get(apiUrl, { params }).subscribe(
      (response: any[]) => {
        console.log('Search results:', response);
        // Handle the search results
        this.result = response
      },
      (error) => {
        console.log('Search failed:', error);
        this.popUpService.showErrorMessage(error.error)
        // Handle the error
      }
    );
  }

  
  searchByDurationRange(): void {
    const apiUrl = 'http://localhost:8082/api/v1.0/lms/courses/get';
    const params = new HttpParams()
      .set('minDuration', String(this.minDuration))
      .set('maxDuration', String(this.maxDuration));

    this.http.get(apiUrl, { params }).subscribe(
      (response: any[]) => {
        console.log('Search results:', response);
        this.result = response;
        // Handle the search results
      },
      (error) => {
        console.log('Search failed:', error);
        // Handle the error
        this.popUpService.showErrorMessage(error.error);
      }
    );
  }
}

