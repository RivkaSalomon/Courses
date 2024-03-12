import { Injectable } from '@angular/core';
import { Course } from '../classes/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }
  public getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>('https://localhost:7257/api/Course')
  }

  public getCourseById(id: number): Observable<Course>{
    return this.http.get<Course>(`https://localhost:7257/api/Course/${id}`);
  }
  public save(c: Course): Observable<any> {
    // this.products.push(p)
    return this.http.post('/api/Course', c)
  }
}
