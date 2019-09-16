import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpdateOrganizationService {

  
  restItemsUrl: any;
  constructor(private http: HttpClient) {
    this.restItemsUrl = environment.updateOrganization;
  }

restItemsServiceGetRestItems(myform : FormGroup) {
  return this.http.put<FormGroup>(this.restItemsUrl, myform);
  }
}
