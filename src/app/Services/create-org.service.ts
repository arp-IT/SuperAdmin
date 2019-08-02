import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateOrgService {
  restItemsUrl: any;
  constructor(private http: HttpClient) {
    this.restItemsUrl = environment.CreateOrg;
  }

restItemsServiceGetRestItems(myform : FormGroup) {
  console.log(myform.get('orgOwner').value);
    return this.http
      .post(this.restItemsUrl,
        {
            "orgOwner": myform.get('orgOwner').value,
            "orgName": myform.get('orgName').value,
            "orgAddress": myform.get('orgAddress').value,
            "orgPinCode": myform.get('orgPinCode').value,
            "orgContactno": myform.get('orgContactno').value,
            "orgTelephoneno": myform.get('orgTelephoneno').value,
            "orgDtls": myform.get('orgDtls').value,
            "orgUserName": myform.get('orgUserName').value,
            "orgPwd": myform.get('orgOwner').value
        }
      )
      .pipe(map(data => data));
  }

}
