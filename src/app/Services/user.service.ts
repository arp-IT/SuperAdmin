import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isUserLoggedIn = null;


  constructor(public local: LocalStorageService, public session: SessionStorageService) {
    this.get();
    this.isUserLoggedIn =  this.value;

  }

  KEY = 'value';
  value: any = null;

  set(x: boolean) {
    this.local.set(this.KEY, x);
}
    remove() {
        this.local.remove(this.KEY);
    }

    get() {
        this.value = this.local.get(this.KEY);
        return this.value;
    }

  setUserLoggedIn(flag) {
    this.isUserLoggedIn = flag;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
