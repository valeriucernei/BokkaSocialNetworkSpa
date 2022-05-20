import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../_core/services/auth.service";
import {SnackService} from "../../shared/snack.service";
import {UserLoginModel} from "../shared/models/user-login.model";
import {BearerToken} from "../../_core/models/bearer-token.model";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isProgressBarVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackService: SnackService,
    public dialogRef: MatDialogRef<UserLoginComponent>
  ) {}

  form: FormGroup = this.CreateForm();

  ngOnInit(): void {
    const initialData = {
      username: null,
      password: null
    };

    this.form.patchValue(initialData);
  }

  onSubmit() {
    this.isProgressBarVisible = true;
    this.form.disable();

    const userLogin: UserLoginModel = {
      ...this.form.value
    };

    this.authService.login(userLogin)
      .subscribe((bearerToken: BearerToken) => {
        this.isProgressBarVisible = false;
        this.form.enable();

        if (!bearerToken) return;

        localStorage.setItem('accessToken', bearerToken.access_token);
        this.authService.updateUserPaidStatus();
        this.authService.loggedIn = true;
        this.dialogRef.close();
        this.snackService.openSnack("Successfully logged in!");
        console.log(this.authService.decodeToken(bearerToken.access_token));
      });
  }

  private CreateForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
