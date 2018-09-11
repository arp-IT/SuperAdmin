import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GalleryComponent } from '../gallery/gallery.component';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component(
  {
  selector: 'app-verify-tasks',
  templateUrl: './verify-tasks.component.html',
  styleUrls: ['./verify-tasks.component.css']
  }
)
export class VerifyTasksComponent implements OnInit {
  myControl: FormControl = new FormControl('', [Validators.required]);
  restItems: any;
  taskId;
  userId;
  Data;
  array: string[];
  view: object;
  restItemsUrl = 'https://08jy9v77aj.execute-api.ap-south-1.amazonaws.com/Dev/fetchallrecordedactivities';
  galleryView: FormControl;
  imagesurl = 'https://s3.ap-south-1.amazonaws.com/qshala-task-activity-images/';
  connection = false;
  default = false;
  constructor(private data: DataService, private http: HttpClient, private dialog: MatDialog, private user: UserService) {
  }
  ngOnInit() {
    this.getRestItems();
  }
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          if (this.restItems.allSubmittedTasks.length === 0) {
          this.default = true;
          }
        },
        error => {
          if (error.status === 0) {
          this.connection = true;
          }
        }
      );
  }

  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  openview(): void {
     const dialogRef = this.dialog.open(GalleryComponent, {
      width: '80%',
      height: '85%',
      panelClass: 'full-screen-modal',
      data: {
        galleryView: this.galleryView
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getRestItems();
    });
  }

  passId(x, y) {
    this.taskId = x;
    this.userId = y;
    this.data.changeMessage(this.taskId);
    this.data.changeMessage1(this.userId);
  }
}
