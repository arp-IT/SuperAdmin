import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  flag: boolean;
  constructor(private user: UserService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.flag = this.user.getUserLoggedIn();
    if (!this.flag) {
      console.log(this.flag);
      this.router.navigate(['login']);
    }
    return this.user.getUserLoggedIn();
  }
// tslint:disable-next-line:eofline
}
