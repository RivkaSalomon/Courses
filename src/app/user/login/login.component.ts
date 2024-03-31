import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  isLecturer: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern('^\\d{4,6}$')]]
    });
  };

  ngOnInit(): void {
    // Angular animations definition
    // trigger('formAnimation', [transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))])
    // ])
  }


  public lecturerLogin() {
    this.isLecturer = true;
  }

  onSubmit() {
    this.userService.login(this.loginForm.value.userName,
      this.loginForm.value.password).subscribe(data => {
        if (data) {
          this.setItem('userDetails', data);
          this.router.navigate(['/course/All-Course'])

        }
        else {
          console.log("not good")
         this.userService.name$.next(this.loginForm.value.userName);

          // this.router.navigate(['/user/register', this.loginForm.value.userName ])  
          this.router.navigate(['/user/register'])
        }
      })
  }
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
