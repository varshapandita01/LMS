import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8082/api/v1.0/lms/courses/getall';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
