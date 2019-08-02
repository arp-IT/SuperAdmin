import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  restItemsUrl: any;
  constructor(private http: HttpClient) {
    this.restItemsUrl = environment.AdminSignIn;
  }

restItemsServiceGetRestItems(username: any, password: any) {
    return this.http
      .post(this.restItemsUrl,
        {
          "userName": username,
          "pwd": password
        }
      )
      .pipe(map(data => data));
  }

}
