import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  registerForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
    public userService : UserService,
    private router: Router
    //private route: ActivatedRoute
  ){
  this.registerForm = formBuilder.group({
    id: [,[ Validators.required ,  this.isValidIdNumber]],
    name: [this.userService.name$.value, [Validators.required]], //צריך להיות מאותחל כבר ביוזר ניים מלוגין
    address: ['', Validators.required],
    mail: ['', Validators.required],
    password: ['', Validators.required],
  })
}

ngOnInit(): void {


}

onSubmit(){
this.checkUserExsist(); 
  this.userService.save(this.registerForm.value).subscribe(data=> {
      if(data == true){
        console.log("good")
         this.router.navigate(['/course/All-Course'])

      }
      else{
        
        // this.router.navigate(['/user/register', this.loginForm.value.userName ])  
        // this.router.navigate(['/user/register' ])  
      }
    })
  // console.log(this.registerForm.value.name);
}

checkUserExsist(){this.userService.login(this.registerForm.value.name,
  this.registerForm.value.password).subscribe(data => {
   if(data){
    Swal.fire('המשתמש כבר קיים במערכת')
    this.registerForm.reset();
   }
  })
    }

    isValidIdNumber(control: FormControl): Promise<{ [key: string]: any } | null> {
      return new Promise(resolve => {
        // Add your validation logic here
        const idNumber = control.value;
        if (!idNumber || isNaN(Number(idNumber))) {
          resolve({ 'invalidIdNumber': true });
        } else {
          // Validate the check digit (you can use the logic from the previous example)
          const checkDigit = Number(idNumber.toString().charAt(8));
          let sum = 0;
          for (let i = 0; i < 8; i++) {
            let digit = Number(idNumber.toString().charAt(i));
            if (i % 2 === 0) {
              digit *= 1; // Multiply even digits by 1
            } else {
              digit *= 2; // Multiply odd digits by 2
              if (digit > 9) {
                digit -= 9; // Subtract 9 from digits greater than 9
              }
            }
            sum += digit;
          }
          // Return null if the ID number is valid
          if ((sum + checkDigit) % 10 === 0) {
            resolve(null);
          } else {
            resolve({ 'invalidIdNumber': true });
          }
        }
      });
    }
    
    isValidIdNumber2(control: FormControl): { [key: string]: any } | null {
      debugger; 
      const idNumber = control.value;
  
      if (!idNumber || isNaN(Number(idNumber))) {
        return { 'invalidIdNumber': true };
      }
  
  
       const checkDigit = Number(idNumber.toString().charAt(8));
      let sum = 0;
  
      for (let i = 0; i < 8; i++) {
        let digit = Number(idNumber.toString().charAt(i));
        if (i % 2 === 0) {
          digit *= 1; // Multiply even digits by 1
        } else {
          digit *= 2; // Multiply odd digits by 2
          if (digit > 9) {
            digit -= 9; // Subtract 9 from digits greater than 9
          }
        }
        sum += digit;
      }
  
      // return (sum + checkDigit) % 10 === 0; // Valid if the sum modulo 10 equals 0
     if((sum + checkDigit) % 10 === 0)
      return null;
      else
      return { 'invalidIdNumber': true };

    }
  
  

    private isValidIdNumber1(idNumber: string): boolean {
      // Israeli ID number (Teudat Zehut) consists of 9 digits
      if (idNumber.length !== 9 || isNaN(Number(idNumber))) {
        return false;
      }
  
      // Validate the check digit
      const checkDigit = Number(idNumber.charAt(8));
      let sum = 0;
  
      for (let i = 0; i < 8; i++) {
        let digit = Number(idNumber.charAt(i));
        if (i % 2 === 0) {
          digit *= 1; // Multiply even digits by 1
        } else {
          digit *= 2; // Multiply odd digits by 2
          if (digit > 9) {
            digit -= 9; // Subtract 9 from digits greater than 9
          }
        }
        sum += digit;
      }
  
      return (sum + checkDigit) % 10 === 0; // Valid if the sum modulo 10 equals 0
  }
  

}
