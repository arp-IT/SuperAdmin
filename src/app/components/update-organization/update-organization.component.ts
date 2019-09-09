import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrgService } from 'src/app/Services/create-org.service';
import { GetOrganizationDetailsService } from 'src/app/Services/get-organization-details.service';

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
    this.orgName = new FormControl("", Validators.required);
    this.orgOwner = new FormControl("", Validators.required);
    this.orgAddress = new FormControl("", Validators.required);
    this.orgPinCode = new FormControl("", Validators.required);
    this.orgContactno = new FormControl("", Validators.required);
    this.orgTelephoneno = new FormControl();
    this.orgDtls = new FormControl("", Validators.required);
    this.orgUserName = new FormControl("", [Validators.required]);
    this.passwords = new FormGroup({
      password: this.password = new FormControl("", [Validators.required, Validators.minLength(8)]),
      orgPwd: this.orgPwd = new FormControl("", [Validators.required])
    }
    )
  }
  dataload() {
    this.orgName.setValue(this.getdetails.orgName);
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
      this.CreateOrg.restItemsServiceGetRestItems(this.myform)
      .subscribe(
        restItems => {
          this.restItems = restItems;
          if (this.restItems.response === 'Success') {
            console.log(this.restItems.response)
            this.router.navigate(['dashboard/ViewOrganizationList']);
            this.myform.reset();
          } else {
        alert('Form Submission Failed');
          }
        },
        error => {
          if (error.status === 0) { 
            alert('check your Internet connection');
          }
        }
      );
    }
  }

  onLoad() {
    this.route.queryParams.subscribe(queryParams => {
    this.selectedId = queryParams['term']; 
    this.GetOrg.restItemsServiceGetRestItems(this.selectedId)
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems.response);
        if (this.restItems.response === 'Success') {
          console.log(this.restItems.response)
          this.getdetails=this.restItems.organization;
          // this.orgName.setValue(this.getdetails.orgName);
          // this.orgName.setValue(this.getdetails.orgName);
          // this.orgName.updateValueAndValidity();
        } else {
      console.log(this.restItems.response + "Errors" );
      alert('Enable to Load Data');
        }
      },
      error => {
        if (error.status === 0) { 
          alert('check your Internet connection');
        }
      }
    );
  });
  }

  constructor(private  GetOrg : GetOrganizationDetailsService, private CreateOrg: CreateOrgService, private router: Router, private route : ActivatedRoute ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  }
