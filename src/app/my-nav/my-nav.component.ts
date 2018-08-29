import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  flag1 = false;
  flag2 = false;
  flag3 = false;
  flag4 = true;
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  display() {
    this.flag1 = true;
    this.flag2 = false;
    this.flag3 = false;
    this.flag4 = false;
    console.log(1);
  }
  display2() {
    this.flag1 = false;
    this.flag2 = true;
    this.flag3 = false;
    this.flag4 = false;
    console.log(2);
  }
  display3() {
    this.flag1 = false;
    this.flag2 = false;
    this.flag3 = true;
    this.flag4 = false;
    console.log(3);
  }
  display4() {
    this.flag1 = false;
    this.flag2 = false;
    this.flag3 = false;
    this.flag4 = true;
    console.log(4);
  }
  logout() {
    var r = confirm("Are you sure you want to Logout!");
    if (r == true) {
      this.router.navigate(['']);
    }
  }
}
