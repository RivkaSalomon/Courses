import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';



@NgModule({
  declarations: [AllCoursesComponent,AddCourseComponent,EditCourseComponent,CourseDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class CourseModule { }
