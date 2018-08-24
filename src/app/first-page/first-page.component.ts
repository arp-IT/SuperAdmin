import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  name: string = '';
  flag1=true;
  flag2=false;
  restItems: any;
  restItemsUrl = 'http://demo4853762.mockable.io/viewPerformance/';
  mobileNO = '';
  result='';
  textValue = 'initial value';
  values = '';
  imagepath="../../assets/icons/baseline-search-24px.svg";
  onClickMe() {
    this.restItems=null;
    if(this.values.length == 10){
    this.flag1 = false;
    this.flag2 = true;
    this.mobileNO = this.values;
    console.log(this.mobileNO);
    this.result= this.restItemsUrl.concat(this.mobileNO);
    console.log(this.result);
    this.getRestItems();
  }
  
   else{
     alert("Enter valid mobile number");
    this.flag1 = true;
    this.flag2 = false;
  }
}

//  myFunction() {
//  this.imagepath="../../assets/icons/download.png";
// }
// myFunction1() {
//  this. imagepath="../../assets/icons/baseline-search-24px.svg";
// }

refresh(): void {
  this.flag1 = true;
    this.flag2 = false;
    this.values = '';
    
}
  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.result)
      .pipe(map(data => data));
  }

}

