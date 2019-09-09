import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Config } from 'protractor';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidateUsernameService {

  restItemsUrl: any;
  constructor(private http: HttpClient) {
    this.restItemsUrl = environment.UserNameList;
}

 handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

restItemsServiceGetRestItems() {
  return this.http.get<Config>(this.restItemsUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

}
