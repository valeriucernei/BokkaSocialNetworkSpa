import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserForLogin } from "../../models/User/UserForLogin";
import { BearerToken } from "../../models/User/BearerToken";
import { SnackService } from "../../services/snack.service";
import { MatDialogRef } from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isProgressBarVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackService: SnackService,
    public dialogRef: MatDialogRef<LoginComponent>
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

    const userLogin: UserForLogin = {
      ...this.form.value
    };

    this.authService.login(userLogin)
      .subscribe((bearerToken: BearerToken) => {
        this.isProgressBarVisible = false;

        if (!bearerToken) return;

        localStorage.setItem('accessToken', bearerToken.access_token);
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
