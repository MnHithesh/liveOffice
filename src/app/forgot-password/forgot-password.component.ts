import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = this.email;
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) { }
  

  openSnackBar() {
    var EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!EMAIL_REGEXP.test(this.email)) {
      this.snackBar.open( "Invalid Email");
    }
    else{
      this.snackBar.open( "Email is sent. Click on the link to Reset the password" );
  }
  }

  ngOnInit() {
  }

}
