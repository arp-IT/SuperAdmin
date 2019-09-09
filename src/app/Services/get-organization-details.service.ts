import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { map } from 'rxjs/operators';
import { GetOrganizationListService } from 'src/app/Services/get-organization-list.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetOrganizationDetailsService {
  restItemsUrl: any;
  private err: GetOrganizationListService;
  constructor(private http: HttpClient) {
    this.restItemsUrl = environment.OrgDetails;
    
  }


  restItemsServiceGetRestItems(username: string) {
    return this.http.post<Config>(this.restItemsUrl,
        {
          "orgUserName": username,
        }
      )
      .pipe(map(data => data));;
  }
  

}






