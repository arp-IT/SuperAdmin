import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn;
  private username;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(flag) {
    this.isUserLoggedIn = flag;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
