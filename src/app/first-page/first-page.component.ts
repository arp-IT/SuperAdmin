import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  name: string = '';
  flag1 = true;
  flag2 = false;
  flag3 = false;
  restItems: any;
  restItemsUrl = 'https://en25nerdu6.execute-api.ap-south-1.amazonaws.com/ViewPerformance-Dev/';
  mobileNO;
  connection: boolean = false;
  textValue = 'initial value';
  values: number;
  onClickMe() {
    this.restItems = null;
    if ((this.values > 999999999 && this.values <= 9999999999) && ((this.values * 10) % 10 == 0)) {
      this.flag1 = false;
      this.flag2 = true;
      this.flag3 = false;
      this.mobileNO = this.values;

      this.getRestItems();
    }

    else {
      alert("Enter valid mobile number");
      this.flag1 = true;
      this.flag2 = false;
    }
  }

  refresh(): void {
    this.flag1 = true;
    this.flag2 = false;
    this.values = 0;

  }
  constructor(private http: HttpClient) { }

  ngOnInit() { }

  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          if (this.restItems.status == 'NoUser') {
            this.flag3 = true;
            this.flag2 = false;
          }
        },
        error => {
          if (error.status === 0) {
            this.connection = true;
          }
        }
      )
  }

  restItemsServiceGetRestItems() {
    return this.http
      .post(this.restItemsUrl,
        {
          "phoneNumber": this.mobileNO
        }
      )
      .pipe(map(data => data));
  }

}

