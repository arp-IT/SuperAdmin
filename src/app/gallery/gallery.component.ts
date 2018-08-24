import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  url =
    'https://4sp2q7m0sl.execute-api.ap-south-1.amazonaws.com/Dev/fetchrecordedactivity';
  restItems: any;
  sendItems: any;
  taskId;
  userId;
  message: string;
  message1: string;
  imagesurl =
    'https://s3.ap-south-1.amazonaws.com/qshala-task-activity-images/';
  scores = null;
  flag = false;
  status: string;
  coloring="#274c7c";

  images = [
    // 'https://i.ytimg.com/vi/nlYlNF30bVg/hqdefault.jpg',
    // 'https://www.askideas.com/media/10/Funny-Goat-Closeup-Pouting-Face.jpg'
  ];

  imageIndexOne = 0;
  imageIndexTwo = 0;
  config = {
    btnClass: 'default', // The CSS class(es) that will apply to the buttons
    zoomFactor: 0.1, // The amount that the scale will be increased by
    containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
    wheelZoom: true, // If true, the mouse wheel can be used to zoom in
    allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
    allowKeyboardNavigation: false, // If true, the left / right arrow keys can be used for navigation
    btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
      zoomIn: 'fa fa-plus',
      zoomOut: 'fa fa-minus',
      rotateClockwise: 'fa fa-repeat',
      rotateCounterClockwise: 'fa fa-undo',
      next: 'fa fa-arrow-right',
      prev: 'fa fa-arrow-left',
      fullscreen: 'fa fa-arrows-alt',
    },
    btnShow: {
      zoomIn: true,
      zoomOut: true,
      rotateClockwise: true,
      rotateCounterClockwise: true,
      next: false,
      prev: false
    }
  };

  constructor(
    private data: DataService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<GalleryComponent>
  ) {}

  ngOnInit() {
    console.log();
    this.data.currentMessage.subscribe(message => (this.message = message));
    console.log(this.message);
    this.data.currentMessage1.subscribe(message1 => (this.message1 = message1));
    console.log(this.message1);
    this.taskId = this.message;
    this.userId = this.message1;
    this.getRestItems();
  }

  getRestItems(): void {
    console.log('component');
    this.getdata().subscribe(restItems => {
      console.log(restItems);
      this.restItems = restItems;
      this.images[0] = this.imagesurl + restItems['submittedImgURL'];
      console.log(this.restItems);
    });
  }

  sendRestItems():void {
    this.status="Sending..."
    console.log('component');
    this.senddata()
      .subscribe(
        sendItems => {
          this.sendItems = sendItems;
          console.log(this.scores)
          console.log(this.sendItems.status);
          if(this.sendItems.status == "COMPLETED"){
            this.status="Score Sent Successfully"
            this.coloring="green";
            this.flag=true;
           this.scores=null;
          }
          else {
            this.coloring="red";
            this.status = "Failed to Send Score";}
        }
      )
  }
  getdata() {
    console.log(this.taskId);
    console.log(this.userId);
    console.log('service');
    const formData = {
      userID: this.message1,
      taskID: this.message
    };
    // const headers: HttpHeaders = new HttpHeaders({
    // "Content-Type": "application/json"
    // });
    // console.log(headers);
    return this.http.post(
      'https://4sp2q7m0sl.execute-api.ap-south-1.amazonaws.com/Dev/fetchrecordedactivity',
      {
        userID: this.message1,
        taskID: this.message
      }
    );
  }

  senddata()
    {
      console.log('service');
      if(this.scores<=1000 && this.scores>=0) {
      this.status="Sending...";
      return this.http.post(
      'https://g4e59shy99.execute-api.ap-south-1.amazonaws.com/Dev/usertaskassessment',
      {
        "userID":this.message1,
        "taskID":this.message,
        "score": this.scores,
      }
      )
    }
    else {
      this.coloring="red";
      this.status="Please Enter a Valid Score";
    }
  }

  onNoClick(): void {
    console.log('CLOSE');
    this.dialogRef.close();
    // this.dialogRef.close("complete");
  }
}
