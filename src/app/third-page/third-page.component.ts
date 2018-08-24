import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  HttpHeaders } from "@angular/common/http";
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {
  restItems: any;
  restItemsUrl = 'https://p3rieu2hsf.execute-api.ap-south-1.amazonaws.com/Dev/fetchuserfeedback';
  p: number = 1;

  constructor(private http: HttpClient, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getRestItems();
  }

  getRestItems(): void {
    
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
          console.log(this.orderPipe.transform(this.restItems,'userName'));
        }
      )
  }

  restItemsServiceGetRestItems() {
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    
    return this.http.get(this.restItemsUrl,
        {
          headers: headers
          
        }
      )

      .pipe(map(data => data));
  }
  
}