import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  flag = true;
  mobileFormControl = new FormControl("", [
    Validators.required,

  ]);

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }
  

  loginUser(e) {
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    if (username == 'admin' && password == 'admin') {
      this.user.setUserLoggedIn(true);
      this.router.navigate(['dashboard']);
      this.flag = true;
    }
    else {
      this.flag = false;
      this.router.navigate(['login']);
    }
  }

}
