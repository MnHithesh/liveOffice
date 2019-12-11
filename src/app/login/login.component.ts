import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LogService } from './../log.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public profile : {};

  passwordFormControl = new FormControl('',[
    Validators.required,
    // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private log:LogService) { }

  emailForm = {
    email : "",
    password  : "",
  }

  navForgot(){
    this.router.navigate(["forgot"]);
  }
  loginSuccuss(){
    this.log.Login().subscribe((data)=>{
      let res : any = data;
      this.profile = res;
      console.log(res.clientId);
      localStorage.setItem('clientid', res.clientId);
      console.log(this.profile);
    })
    this.router.navigate(["home"]);
    // this.log.Login(form).subscribe((data)=>{
    //   let loginCre = data.json();
    //   console.log(loginCre);
    //   if(loginCre['status'] == 'SUCCESS')
    //    {
     
    //   }
    //   else
    //   {
    //    alert(loginCre['message']);
    //   }
    // })
  }
  

  ngOnInit() {
  }

}
