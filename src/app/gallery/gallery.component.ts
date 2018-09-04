import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../data.service';

class score {
  constructor(
    public scores: string = "",
  ) { }
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
  url = 'https://4sp2q7m0sl.execute-api.ap-south-1.amazonaws.com/Dev/fetchrecordedactivity';
  restItems: any;
  sendItems: any;
  taskId;
  userId;
  imagesurl = 'https://s3.ap-south-1.amazonaws.com/qshala-task-activity-images/';
  flag = false;
  status: string="";
  coloring = "#274c7c";
  connection: boolean = false;
  images = [];
  disabled: boolean = true;

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
  model: score = new score();
  @ViewChild("f") form: any;
  constructor(
    private data: DataService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<GalleryComponent>
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.taskId = message));
    this.data.currentMessage1.subscribe(message1 => (this.userId = message1));
    this.getRestItems();
  }

  getRestItems(): void {
    this.getdata().subscribe(restItems => {
      this.restItems = restItems;
      this.images[0] = this.imagesurl + restItems['submittedImgURL'];
    },
      error => {
        if (error.status === 0)
        this.connection = true;
      }
    );
  }

  sendRestItems(): void {
    var r = confirm("Are you sure you want to submit!");
    if (this.form.valid && r == true) {
      this.disabled = false;
      this.status = "Sending..."
      this.senddata()
        .subscribe(
          sendItems => {
            this.sendItems = sendItems;
            if (this.sendItems.status == "COMPLETED") {
              this.status = "Score Sent Successfully"
              this.coloring = "green";
              this.flag = true;
              this.model.scores = null;
            }
            else {
              this.coloring = "red";
              this.disabled = true;
              this.status = "Failed to Send Score";
            }
          }
        )
    }
  }
  getdata() {
    return this.http.post(
      'https://4sp2q7m0sl.execute-api.ap-south-1.amazonaws.com/Dev/fetchrecordedactivity',
      {
        userID: this.userId,
        taskID: this.taskId
      }
    );
  }

  senddata() {
    this.status = "Sending...";
    return this.http.post(
      'https://g4e59shy99.execute-api.ap-south-1.amazonaws.com/Dev/usertaskassessment',
      {
        "userID": this.userId,
        "taskID": this.taskId,
        "score": this.model.scores,
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
