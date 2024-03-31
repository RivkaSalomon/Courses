import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  logout(): void {
    // Clear user information from sessionStorage
    sessionStorage.removeItem('userDetails');
    console.log('User has been logged out');

    Swal.fire('!המשתמש יצא בהצלחה')

  }

}
