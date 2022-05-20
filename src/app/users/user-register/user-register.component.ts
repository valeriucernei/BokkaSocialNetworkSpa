import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../_core/services/auth.service";
import {SnackService} from "../../shared/snack.service";
import {UserRegisterModel} from "../shared/models/user-register.model";
import {ResponseModel} from "../../shared/response.model";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  isProgressBarVisible: boolean = false;

  form: FormGroup = this.CreateForm();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackService: SnackService,
    public dialogRef: MatDialogRef<UserRegisterComponent>
  ) {}

  ngOnInit(): void {
    const initialData = {
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    };

    this.form.patchValue(initialData);
  }

  onSubmit() {
    this.isProgressBarVisible = true;
    this.form.disable();

    const userRegister: UserRegisterModel = {
      ...this.form.value
    };

    this.authService.register(userRegister)
      .subscribe((response: ResponseModel) => {
        this.isProgressBarVisible = false;
        this.form.enable();

        if (!response) return;

        this.dialogRef.close();
        this.snackService.openSnack(response.message);
      })
  }

  private CreateForm(): FormGroup {
    return this.fb.group({
        firstName: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24)]],

        lastName: ['',
          Validators.maxLength(24)],

        username: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(32)]],

        email: ['', [
          Validators.required,
          Validators.email]],

        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32)]],

        confirmPassword: ['',
          Validators.required]
      },
      {
        validators: this.match('password', 'confirmPassword')
      });
  }

  private match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

}
