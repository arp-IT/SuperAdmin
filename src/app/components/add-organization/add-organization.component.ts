import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrgService } from 'src/app/Services/create-org.service';
import { Router } from '@angular/router';
import { ValidateUsernameService } from 'src/app/Services/validate-username.service'

// function passwordValidator() { // wrapper fn
//   return (ctrl: AbstractControl) => { // return the function w abstractControl
//     const fb = ctrl as FormGroup; //type it
//     let password = fb.get('password').value;
//     let repass = fb.get('repassword').value;
//     if (repass !== password) {
//       return {
//         passwordMatch: password //redunant
//       }
//     }
//     return null;
//   }
// }

// function passwordValidator() {
//   // wrapper fn
//   return (ctrl: AbstractControl) => { // return the function w abstractControl
//     const fb = ctrl as FormGroup;
//        //type it
//     const passwordCtrl = fb.get('password'); // get the ctrls
//     console.log(passwordCtrl.value);
//     const repassCtrl = fb.get('rePassword');
//     console.log(repassCtrl.value);
//     if (!passwordCtrl || !repassCtrl) // handle errors!
//       throw new Error('need password and repass controls');
//     if (passwordCtrl.value // make sure forms have values (required error should show in this case, not pass match)
//       && repassCtrl.value
//       && repassCtrl.value !== passwordCtrl.value) {
//         console.log(passwordCtrl.value + " " + repassCtrl.value);
//       return {
//         passwordMatch: passwordCtrl.value //redunant
//       }
//     }

//     return null;
//   }
// }

function userNameValidator(control: FormControl, userNameList : any) {
  let username = control.value;
  let userNameLists = userNameList;
  let flag = false;
  for(var i = 0 ; i < userNameLists.length ; i++) {
    if(userNameLists[i] === username) {
      return {
        userName1 : {
          parseduserName : username
        }
      }
    }
    return null;
  }
}
  
  
@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
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
  matchFlag: boolean = true;
  restItems: any;
  usernameList:any;


  passwordValidator(fb: FormGroup) {
    let password = fb.controls.password.value;
    let repass = fb.controls.orgPwd.value;
    if (repass !== password) {
      return {
        passwordMatch: {
          passwordMatch: password
        }
      }
    }
    return null;
  }

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
    }, { validators: this.passwordValidator }
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

  constructor(private createOrg: CreateOrgService, private router: Router , private getUsername: ValidateUsernameService) { }

  ngOnInit() {
    this.matchFlag = true;
    this.createFormControls();
    this.createForm();
    this.getUserNames();
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted!");
      console.log(this.myform.value);
      this.createOrg.restItemsServiceGetRestItems(this.myform)
        .subscribe(
          restItems => {
            this.restItems = restItems;
            console.log(this.restItems.response);
            if (this.restItems.response === 'Success') {
              console.log(this.restItems.response)
              this.router.navigate(['dashboard/ViewOrganizationList']);
              this.myform.reset();
            } else {
              console.log(this.restItems.response + "Errors");
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

  getUserNames() {
    this.getUsername.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.usernameList = restItems;
          console.log(this.usernameList);
        },
        error => {
          if (error.status === 0) { 
            alert('check your Internet connection');
          }
        }
      );
  }
  userNameValidator(control: FormControl) {
    let username = control.value;
    console.log(this.usernameList);
    let flag = false;
    for(var i = 0 ; i < this.usernameList.length ; i++) {
      if(this.usernameList.get(i) === username) {
        return {
          userName : {
            parseduserName : username
          }
        }
      }
      return null;
    }
  }

}
