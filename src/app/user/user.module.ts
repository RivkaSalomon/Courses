import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';



@NgModule({
  declarations: [LoginComponent,RegisterComponent,LogoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
   HttpClientModule
  ],
  providers: [ HttpClientModule]

})
export class UserModule { }
