import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  constructor(public formBuilder: UntypedFormBuilder, 
    public snackBar: MatSnackBar,
    public appService:AppService,
    private customerService:CustomerService) { }

  ngOnInit() {

    var userInfo={
      firstName:this.appService.user.firstName,
      lastName:this.appService.user.lastName,
      email:this.appService.user.email
    }
    this.infoForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });

    this.infoForm.patchValue(userInfo);

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'password': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.customerService.updateInfo(this.infoForm.value).subscribe(res=>{
        console.log("infos updated");
        localStorage.setItem("user",JSON.stringify(res));
        this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.appService.getUser();
        this.ngOnInit();
      })
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      // this.passwordForm.removeControl('confirmNewPassword');
      var request={
        email:this.infoForm.controls['email'].value,
        currentPassword:this.passwordForm.controls['currentPassword'].value,
        password:this.passwordForm.controls['password'].value,
      }
      this.customerService.updatePassword(request).subscribe(res=>{
        console.log("password updated");
        this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.ngOnInit();
      })
    }
  }

}
