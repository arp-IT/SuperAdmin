import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {
  restItems = [];
  restItemsUrl = environment.FetchUserFeedBack;
  p = 1;
  position;
  today;
  lasttime;
  spinner = true;
  connection = false;
  temp = 0;
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.temp = 0;
    this.today = new Date;
    this.getRestItems();

  }

  get disabled(): boolean {
    return this.restItems.length >= 300;
  }


  getRestItems(): void {

    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = [...this.restItems, ...restItems['feedbackList']];
          this.position = Object.keys(this.restItems).length;
          this.spinner = false;
          this.loading = false;
          this.lasttime = this.restItems[this.position - 1].createdTime;
        },
        error => {
          if (error.status === 0) {
            this.connection = true;
          }
        }
      );
  }

  restItemsServiceGetRestItems() {
    const headers: HttpHeaders = new HttpHeaders({
      beforeTime: this.today
    });

    return this.http.post(this.restItemsUrl,
      {
        beforeTime: this.today,
      }
    ).pipe(map(data => data));
  }
  onScrollEnd() {
       if (this.position >= this.temp) {
      this.temp = this.temp + 100;
      this.loading = true;
      this.today = this.lasttime;
      this.getRestItems();
       }
  }

}
