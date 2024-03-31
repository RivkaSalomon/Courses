import { Component } from '@angular/core';
import { Course, EHowToLearn } from '../../classes/course.model';
import { CourseService } from '../course.service';
// import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // If icons are used

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {
  
  public course?: Course
  private courseId!: number
  howToLearnValue? : string;
  constructor(private route: ActivatedRoute, private _courseService: CourseService) { }

  ngOnInit(): void {


    
    this.route.params.subscribe((param) => {
      console.log("details")
      this.courseId = param['id'];
      this._courseService.getCourseById(this.courseId).subscribe({
        next: (res) => {
          console.log("courseDetaoils")
          this.course = res;
         this.howToLearnValue = this.howToLearn[this.course?.learningWay];
        },
        error: (err) => {
          // console.log(err,"notgood");
        }
      })
    })
  }

  
public getCategoryName(categoryId: number | undefined): string {
  if (categoryId === undefined) {
    return 'Unknown';
  }

  switch (categoryId) {
    case 1:
      return 'בנים';
    case 2:
      return 'בנות';
    default:
      return 'Unknown';
  }
}
public get howToLearn(): typeof EHowToLearn {
  return EHowToLearn; 
}
}
