import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Validators, FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material";
import { GalleryComponent } from '../gallery/gallery.component';
import { DataService } from "../data.service";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import date from '../../../node_modules/date-and-time';

@Component({
  selector: 'app-verify-tasks',
  templateUrl: './verify-tasks.component.html',
  styleUrls: ['./verify-tasks.component.css']
})
export class VerifyTasksComponent implements OnInit {
  myControl: FormControl = new FormControl("", [Validators.required]);
  restItems: any;
  taskId;
  userId;
  Data;
  array: string[];
  view: object;
  restItemsUrl = 'https://08jy9v77aj.execute-api.ap-south-1.amazonaws.com/Dev/fetchallrecordedactivities';
  galleryView: FormControl;
  imagesurl = "https://s3.ap-south-1.amazonaws.com/qshala-task-activity-images/";
  connection: boolean = false;
  constructor(private data: DataService, private http: HttpClient, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.getRestItems();
    console.log(this.taskId);
  }
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        },
        error => {
          if (error.status === 0)
            console.log("No Internet connection");
          this.connection = true;
        }
      )
  }

  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  openview(): void {
    console.log("666666");
    const dialogRef = this.dialog.open(GalleryComponent, {
      width: "80%",
      height: "80%",
      panelClass: 'full-screen-modal',
      data: {
        galleryView: this.galleryView
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getRestItems();
      console.log("The dialog was closed");
      console.log(result);
    });
  }
  passId(x, y) {
    this.taskId = x;
    this.userId = y;
    this.data.changeMessage(this.taskId);
    this.data.changeMessage1(this.userId);
  }
}