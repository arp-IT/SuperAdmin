import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { LoginService } from '../../Services/login.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  flag = true;
  login = false;
  restItems: any;
  username:  any;
  password: any;
  mobileFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private router: Router, private user: UserService, private logins:LoginService,  protected localStorage: LocalStorage) {
    this.user.isUserLoggedIn = false;
   }

  ngOnInit() {
  }
  
  loginUser(e) {
    this.flag = true;
    e.preventDefault();
    this.login = true;
     this.username = e.target.elements[0].value;
     this.password = e.target.elements[1].value;
     this.logins.restItemsServiceGetRestItems(this.username,this.password)
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems.response);
          if (this.restItems.response === 'Success') {
            this.user.set(true);
            this.user.get();
            this.user.setUserLoggedIn(this.user.value);
            this.router.navigate(['dashboard']);
            this.login = false;
          } else {
            this.flag = false;
            this.router.navigate(['login']);
            this.login = false;
          }
        },
        error => {
          if (error.status === 0) {
            this.login=false;
            alert('check your Internet connection');
          }
        }
      );
  }
}
