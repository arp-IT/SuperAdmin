import { Injectable } from '@angular/core';
 import * as AWS from 'aws-sdk/global';
 import * as S3 from '../../../node_modules/aws-sdk/clients/s3';
 import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:quotemark
import { HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class UploadFileService {
  flag: boolean;
  filename: string;

  FOLDER = environment.ExcehlHandler;

  constructor(private http: HttpClient) { }

  uploadfile(file) {

    const bucket = new S3(
      {
        accessKeyId: 'AKIAIY5QG7OUGHVGUVVA',
        secretAccessKey: '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',
        region: 'ap-south-1'
      }
    );

    const params = {
      Bucket: 'qshala-excel-upload',
      Key: file.name,
      Body: file
    };


    bucket.upload(params, function (err, data) {
      if (err) {
        this.message = 'There was an error uploading your file.';
        console.log(this.message, err);
        return false;
      }
      this.message = 'Successfully uploaded file.';
      this.flag = true;
      this.filename = params.Key;
    });
    const upload = bucket.upload(params);
    const promise = upload.promise();
    return promise;
  }
}
