import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { observable } from '../../../node_modules/rxjs';
import { send } from '../../../node_modules/@types/q';
@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  selectedFiles: FileList;
  selectedFiles1: FileList;
  selectedfiles2:FileList;
  myfile:File;
  myfile1:File;
  myfile2:File;
  msg:string = null;
  fileName;
  fileName1;
  fileName2;
  fileSize;
  fileType;
  status=null;
  status1=null;
  status2=null;
  coloring="red";
 
public result:any;
public output:any;

  constructor(private uploadService: UploadFileService,private http: HttpClient) { }

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
    this.myfile =<File> event.target.files[0];
    this.fileName = this.myfile.name;
    this.fileSize = this.myfile.size;
    this.fileType = this.myfile.type;
  }

  selectFile1(event) {
    this.selectedFiles1 = event.target.files; 
    this.myfile1 =<File> event.target.files[0];
    this.fileName1 = this.myfile1.name;
  }

  selectFile2(event) {
    this.selectedfiles2 = event.target.files; 
    this.myfile2 =<File> event.target.files[0];
    this.fileName2 = this.myfile2.name;
  }
  
  sendname() {
    let promise = new Promise((res,err) => {
    this.coloring="#274c7c";
    this.status="Sending...";
    console.log("Sending...");
    const req = this.http.post('https://2sy3qrpxqi.execute-api.ap-south-1.amazonaws.com/Dev/uploadquestionandanswer', {
      "bucketName": "qshala-excel-upload",
      "fileName":this.fileName,
  })
    .subscribe(
      res => {
       console.log(res);
       console.log(this.fileName);
       console.log("SucessFully Uploaded");
       this.coloring="green";
       this.Fileupload1();
       this.status="File Upload Successful"
      },
      err => {
        console.log("Error occured");
        this.coloring="red";
        this.status="Uploading Failed"; 
      }
    );
  });
  return promise;
    
  }


  sendname1() {
    let promise = new Promise((res,err) => {
    this.coloring="#274c7c";
    this.status1="Sending...";
    console.log("Sending...");
    const req = this.http.post('https://dus93oc6he.execute-api.ap-south-1.amazonaws.com/Dev/uploadreleaseexcel', {
      "bucketName": "qshala-excel-upload",
      "fileName":this.fileName1,
  })
    .subscribe(
      res => {
       console.log(res);
       console.log(this.fileName1);
       console.log("SucessFully Uploaded");
       this.coloring="green";
       this.status1="File Upload Successful"
      },
      err => {
        console.log("Error occured");
        this.coloring="red";
        this.status1="Uploading Failed"; 
      }
    );
  });
  return promise;
    
  }

  sendname2() {
    let promise = new Promise((res,err) => {
    this.coloring="#274c7c";
    this.status2="Sending...";
    console.log("Sending...");
    const req = this.http.post('https://5ggfurv7z8.execute-api.ap-south-1.amazonaws.com/Dev/uploadactivityexcel', {
      "bucketName": "qshala-excel-upload",
      "fileName":this.fileName2,
  })
    .subscribe(
      res => {
       console.log(res);
       console.log(this.fileName2);
       console.log("SucessFully Uploaded");
       this.coloring="green";
       this.status2="File Upload Successful"
      },
      err => {
        console.log("Error occured");
        this.coloring="red";
        this.status1="Uploading Failed"; 
      }
    );
  });
  return promise;
    
  }

  Fileupload() {
    this.coloring="#274c7c";
    this.status="Uploading..."
    console.log("Uploading..")
    this.upload().then(post=>
   {
this.result = post;
console.log(this.result);
if(this.result.Location)
{
  this.coloring="green";
this.status="Uploaded"
console.log("Uploaded");
this.sendname();
}
else{ this.coloring="red"; this.status="Failed to upload"; console.log("Failed to Upload"); }

      }
    )
  
  
  }



  Fileupload1() {
    this.coloring="#274c7c";
    this.status1="Uploading..."
    console.log("Uploading..")
    this.upload1().then(post=>
   {
this.result = post;
console.log(this.result);
if(this.result.Location)
{
  this.coloring="green";
this.status1="Uploaded"
console.log("Uploaded");
this.sendname1();
}
else{ this.coloring="red"; this.status="Failed to upload"; console.log("Failed to Upload"); }

      }
    )
}


Fileupload2() {
  this.coloring="#274c7c";
    this.status2="Uploading..."
    console.log("Uploading..")
    this.upload2().then(post=>
   {
this.result = post;
console.log(this.result);
if(this.result.Location)
{
  this.coloring="green";
this.status2="Uploaded"
console.log("Uploaded");
this.sendname2();
}
else{ this.coloring="red"; this.status="Failed to upload"; console.log("Failed to Upload"); }

      }
    )
  
}

}
 


