import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrgService } from 'src/app/Services/create-org.service';
import { GetOrganizationDetailsService } from 'src/app/Services/get-organization-details.service';
import {UpdateOrganizationService} from '../../Services/update-organization.service'

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.css']
})
export class UpdateOrganizationComponent implements OnInit {

  hide = true;
  hide1 = true;
  myform: FormGroup;
  passwords: FormGroup;
  orgName: FormControl;
  orgAddress: FormControl;
  orgPinCode: FormControl;
  orgContactno: FormControl;
  organizationType: string[] = ["WholeSale", "Retail"];
  orgDtls: FormControl;
  orgOwner: FormControl;
  password: FormControl;
  orgPwd: FormControl;
  orgTelephoneno: FormControl;
  orgUserName: FormControl;
  matchFlag:boolean=true;
  restItems : any;
  getdetails: any;
  selectedId: any;

  createFormControls() {
    this.route.queryParams.subscribe(queryParams => {
      this.selectedId = queryParams; 
      console.log(this.selectedId);
    });
    this.orgName = new FormControl(this.selectedId.orgName, Validators.required);
    this.orgOwner = new FormControl(this.selectedId.orgOwner, Validators.required);
    this.orgAddress = new FormControl(this.selectedId.orgAddress, Validators.required);
    this.orgPinCode = new FormControl(this.selectedId.orgPinCode, Validators.required);
    this.orgContactno = new FormControl(this.selectedId.orgContactno, Validators.required);
    this.orgTelephoneno = new FormControl();
    this.orgDtls = new FormControl(this.selectedId.orgDtls, Validators.required);
    this.orgUserName = new FormControl(this.selectedId.orgUserName, [Validators.required]);
    this.passwords = new FormGroup({
      password: this.password = new FormControl(this.selectedId.orgPwd, [Validators.required, Validators.minLength(8)]),
      orgPwd: this.orgPwd = new FormControl(this.selectedId.orgPwd, [Validators.required])
    }
    )
  }
  

  createForm() {
    this.myform = new FormGroup({
      orgOwner: this.orgOwner,
      orgName: this.orgName,
      orgAddress: this.orgAddress,
      orgPinCode: this.orgPinCode,
      orgContactno: this.orgContactno,
      orgTelephoneno: this.orgTelephoneno,
      orgDtls: this.orgDtls,
      orgUserName: this.orgUserName,
      password: this.password,
      orgPwd: this.orgPwd
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.update.restItemsServiceGetRestItems(this.myform)
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.router.navigate(['dashboard/ViewOrganizationList']);
          this.myform.reset();
        },
        error => {
          if (error.status === 0) { 
            alert('check your Internet connection');
          }
        }
      );
    }
  }

  // onLoad() {
  //   this.route.queryParams.subscribe(queryParams => {
  //   this.selectedId = queryParams['term']; 
  //   console.log(this.selectedId.value);
  //   this.GetOrg.restItemsServiceGetRestItems(this.selectedId)
  //   .subscribe(
  //     restItems => {
  //       this.restItems = restItems;
  //       console.log(this.restItems.response);
  //       if (this.restItems.response === 'Success') {
  //         console.log(this.restItems.response)
  //         this.getdetails=this.restItems.organization;
  //       } else {
  //     console.log(this.restItems.response + "Errors" );
  //     alert('Enable to Load Data');
  //       }
  //     },
  //     error => {
  //       if (error.status === 0) { 
  //         alert('check your Internet connection');
  //       }
  //     }
  //   );
  // });
  // }

  constructor(private  GetOrg : GetOrganizationDetailsService, private CreateOrg: CreateOrgService, private router: Router, private route : ActivatedRoute, private update: UpdateOrganizationService ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  }
