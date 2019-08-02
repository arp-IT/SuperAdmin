import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrgService } from 'src/app/Services/create-org.service';
import { Router } from '@angular/router';

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
  matchFlag:boolean=true;
  restItems : any;


  passwordValidator(fb: FormGroup) {
    let password  = fb.controls.password.value;
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

  constructor(private  createOrg : CreateOrgService, private router: Router ) { }

  ngOnInit() {
    this.matchFlag= true;
    this.createFormControls();
    this.createForm();
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
          } else {
        console.log(this.restItems.response + "Errors" );
        alert('Form Submission Failed');
          }
        },
        error => {
          if (error.status === 0) { 
            alert('check your Internet connection');
          }
        }
      );
      this.myform.reset();
    }
  }


}
