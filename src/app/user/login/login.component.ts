import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  nameUser? :string;
  router: any;
  loginForm :FormGroup;



  constructor(private formBuilder: FormBuilder,
    private userService :UserService) {

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern('^\\d{4,6}$')]]
    });
  };

  ngOnInit(): void{
  
  }


public lecturerLogin(){
 this.router.navigate(['/lecturerLogin'])
}

  onSubmit() {
   this.userService.login(this.loginForm.value.userName,
    this.loginForm.value.password).subscribe(data=> {
      if(data){
        this.router.navigate(['/home'])

      }
      else{
        this.router.navigate(['/user/register', this.loginForm.value.userName ])  
      }
    })
  }


}
