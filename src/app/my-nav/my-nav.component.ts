import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit  {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private user: UserService, private activatedRoute: ActivatedRoute, protected localStorage: LocalStorage ) {

  }
    flag1: any;
    flag2: any;
    flag3: any;
    flag4: any = true;


  ngOnInit() {
    this.user.set(true);
    this.user.get();
    this.user.setUserLoggedIn(this.user.value);
    this.flag1 = JSON.parse(localStorage.getItem('flag1'));
    this.flag2 = JSON.parse(localStorage.getItem('flag2'));
    this.flag3 = JSON.parse(localStorage.getItem('flag3'));
    this.flag4 = JSON.parse(localStorage.getItem('flag4'));
}

  display() {
    localStorage.setItem('flag1', 'true');
    localStorage.setItem('flag2', 'false');
    localStorage.setItem('flag3', 'false');
    localStorage.setItem('flag4', 'false');
    this.flag1 = JSON.parse(localStorage.getItem('flag1'));
    this.flag2 = JSON.parse(localStorage.getItem('flag2'));
    this.flag3 = JSON.parse(localStorage.getItem('flag3'));
    this.flag4 = JSON.parse(localStorage.getItem('flag4'));
  }
  display2() {
    localStorage.setItem('flag1', 'false');
    localStorage.setItem('flag2', 'true');
    localStorage.setItem('flag3', 'false');
    localStorage.setItem('flag4', 'false');
    this.flag1 = JSON.parse(localStorage.getItem('flag1'));
    this.flag2 = JSON.parse(localStorage.getItem('flag2'));
    this.flag3 = JSON.parse(localStorage.getItem('flag3'));
    this.flag4 = JSON.parse(localStorage.getItem('flag4'));

  }

  display3() {
    localStorage.setItem('flag1', 'false');
    localStorage.setItem('flag2', 'false');
    localStorage.setItem('flag3', 'true');
    localStorage.setItem('flag4', 'false');
    this.flag1 = JSON.parse(localStorage.getItem('flag1'));
    this.flag2 = JSON.parse(localStorage.getItem('flag2'));
    this.flag3 = JSON.parse(localStorage.getItem('flag3'));
    this.flag4 = JSON.parse(localStorage.getItem('flag4'));
  }

  display4() {
    localStorage.setItem('flag1', 'false');
    localStorage.setItem('flag2', 'false');
    localStorage.setItem('flag3', 'false');
    localStorage.setItem('flag4', 'true');
    this.flag1 = JSON.parse(localStorage.getItem('flag1'));
    this.flag2 = JSON.parse(localStorage.getItem('flag2'));
    this.flag3 = JSON.parse(localStorage.getItem('flag3'));
    this.flag4 = JSON.parse(localStorage.getItem('flag4'));

  }

  logout() {
    // tslint:disable-next-line:prefer-const
    let r = confirm('Are you sure you want to Logout!');
    if (r === true) {
      this.user.set(false);
      this.user.get();
      this.user.setUserLoggedIn(this.user.value);
      this.router.navigate(['']);
      localStorage.setItem('flag1', 'false');
      localStorage.setItem('flag2', 'false');
      localStorage.setItem('flag3', 'false');
      localStorage.setItem('flag4', 'true');
    }
  }
}
