import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  selectedFiles: FileList;
  selectedFiles1: FileList;
  selectedfiles2: FileList;
  myfile: File;
  myfile1: File;
  myfile2: File;
  msg: string = null;
  fileName;
  fileName1;
  fileName2;
  fileSize;
  fileType;
  status = null;
  status1 = null;
  status2 = null;
  coloring = 'red';
  coloring1 = 'red';
  coloring2 = 'red';
  public result: any;
  public output: any;

  constructor(private uploadService: UploadFileService, private http: HttpClient) { }

  ngOnInit() {

  }

  upload() {
    const file = this.selectedFiles.item(0);
    return this.uploadService.uploadfile(file);

  }

  upload1() {
    const file = this.selectedFiles1.item(0);
    return this.uploadService.uploadfile(file);
  }

  upload2() {
    const file = this.selectedfiles2.item(0);
    return this.uploadService.uploadfile(file);
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.myfile = <File>event.target.files[0];
    this.fileName = this.myfile.name;
    this.fileSize = this.myfile.size;
    this.fileType = this.myfile.type;
  }

  selectFile1(event) {
    this.selectedFiles1 = event.target.files;
    this.myfile1 = <File>event.target.files[0];
    this.fileName1 = this.myfile1.name;
  }

  selectFile2(event) {
    this.selectedfiles2 = event.target.files;
    this.myfile2 = <File>event.target.files[0];
    this.fileName2 = this.myfile2.name;
  }

  sendname() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((res, err) => {
      this.coloring = '#274c7c';
      this.status = 'Sending...';
      const req = this.http.post(environment.QuestionAnswer, {
        'bucketName': 'qshala-excel-upload',
        'fileName': this.fileName,
      })
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          res => {
            if (res === 'All Done..!!') {
              this.coloring = 'green';
              this.Fileupload1();
              this.status = 'File Upload Successful';
            } else {
              this.Fileupload1();
              this.coloring = 'red';
              this.status = 'Invalid format';
            }
          },
          // tslint:disable-next-line:no-shadowed-variable
          err => {
            this.coloring = 'red';
            this.status = 'Uploading Failed';
          }
        );
    });
    return promise;

  }


  sendname1() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((res, err) => {
      this.coloring1 = '#274c7c';
      this.status1 = 'Sending...';
      const req = this.http.post(environment.UploadReleaseExcel, {
        'bucketName': 'qshala-excel-upload',
        'fileName': this.fileName1,
      })
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          res => {
            if (res === 'Release excel Upload...') {
              this.coloring1 = 'green';
              this.status1 = 'File Upload Successful';
            } else {
              this.coloring1 = 'red';
              this.status1 = 'Invalid format';
            }

          },
          // tslint:disable-next-line:no-shadowed-variable
          err => {
            this.coloring1 = 'red';
            this.status1 = 'Uploading Failed';
          }
        );
    });
    return promise;

  }

  sendname2() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((res, err) => {
      this.coloring2 = '#274c7c';
      this.status2 = 'Sending...';
      const req = this.http.post(environment.UploadActivityExcel, {
        'bucketName': 'qshala-excel-upload',
        'fileName': this.fileName2,
      })
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          res => {
            this.coloring2 = 'green';
            this.status2 = 'File Upload Successful';
          },
          // tslint:disable-next-line:no-shadowed-variable
          err => {
            this.coloring2 = 'red';
            this.status1 = 'Uploading Failed';
          }
        );
    });
    return promise;

  }

  Fileupload() {
    this.coloring = '#274c7c';
    this.status = 'Uploading...';
    this.upload().then(post => {
      this.result = post;
      if (this.result.Location) {
        this.coloring = 'green';
        this.status = 'Uploaded';
        this.sendname();
      } else {
        this.coloring = 'red';
        this.status = 'Failed to upload';
      }
    }
    );
  }



  Fileupload1() {
    this.coloring1 = '#274c7c';
    this.status1 = 'Uploading...';
    this.upload1().then(post => {
      this.result = post;
      if (this.result.Location) {
        this.coloring1 = 'green';
        this.status1 = 'Uploaded';
        this.sendname1();
      } else {
        this.coloring1 = 'red';
        this.status = 'Failed to upload';
      }
    }
    );
  }


  Fileupload2() {
    this.coloring2 = '#274c7c';
    this.status2 = 'Uploading...';
    this.upload2().then(post => {
      this.result = post;
      if (this.result.Location) {
        this.coloring2 = 'green';
        this.status2 = 'Uploaded';
        this.sendname2();
      } else { this.coloring2 = 'red'; this.status = 'Failed to upload';  }

    }
    );

  }

}



