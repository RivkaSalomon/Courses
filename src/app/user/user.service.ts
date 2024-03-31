import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 constructor(private http: HttpClient) { }

 public users : User[] = [] ;
 name$ : BehaviorSubject<string> = new BehaviorSubject<string>('');



  public getUsers(): Observable<User[]>{
     return this.http.get<User[]>('https://localhost:44384/api/User')
  }

  public getUserById(id: number): Observable<User>{
    return this.http.get<User>(`https://localhost:44384/api/User/${id}`);
  }
  public save(c: User): Observable<any> {
    // this.users.push(c)
    console.log("post")
    return this.http.post('https://localhost:44384/api/User', c)
  }

  public login(name : string , password : string) : Observable<User> {
    const url = `https://localhost:44384/api/User/login/${name}/${password}`
    return this.http.get(url);
  }


 // public CheckUserLogin(name: string, password: string) {
   // let i
   // for ( i= 0; i < this.users.length; i++) {
    //  if (this.users[i].name == name) {
      //  if (this.users[i].password == password) {
       //   console.log(this.users[i].name+" "+this.users[i].password)
        
       //   this.router.navigate(['/home'])
      //     break;
      //  }
      //  else {
        
      //    this.router.navigate(['/login'])
         //  break;
     //   }
    //  }
     
   // }
  
  //  if(i==this.users.length)
     // this.router.navigate(['/register', name ])
//
}
