import { Routes } from '@angular/router';

export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'user', loadChildren: () => import('./user/user-routing.module').then(c => c.UserRoutesModule) },
    { path: 'course', loadChildren: () => import('./course/course-routing.module').then(c => c.CourseRoutesModule) },

];
