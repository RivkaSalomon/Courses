import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';



const courseRoutes: Routes = [
  { path: '', redirectTo: 'All-Course', pathMatch: 'full' },
  { path: 'All-Course', component : AllCoursesComponent },
  { path: 'Add-Course', component: AddCourseComponent},
  { path: 'Edit-Course', component: EditCourseComponent},
  { path: 'Course-Details', component: CourseDetailsComponent},


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(courseRoutes)
  ],
  exports: [RouterModule]
})
export class CourseRoutesModule { }
