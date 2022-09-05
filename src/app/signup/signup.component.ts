import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder, private router:Router, private userservice:UserService, private snackbarServices:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.ContactNumberRegex)]],
      password:[null,[Validators.required]],
    })
  }

  handleSubmit(){
    // this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }
    this.userservice.signup(data).subscribe((Response:any)=>{
      // this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = Response?.message;
      this.snackbarServices.openSnackbar(this.responseMessage,'');
      this.router.navigate(['/']);
    },(error)=>{
      // this.ngxService.Stop
      if(error.error?.message)
      {
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarServices.openSnackbar(this.responseMessage,GlobalConstants.error);
    })
  }

}
