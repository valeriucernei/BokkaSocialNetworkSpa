import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_core/services/auth.service";
import {UserService} from "../shared/user.service";
import {SnackService} from "../../shared/snack.service";
import {UserChangePasswordModel} from "../shared/models/user-change-password.model";

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  form: FormGroup = this.CreateForm();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.disable();

    const formData: UserChangePasswordModel = {
      ...this.form.value
    };

    this.userService.updatePassword(formData)
      .subscribe((response: any) => {
        this.form.enable();

        if (!response) return;

        this.form.reset();
        this.snackService.openSnack("Password changed successfully.");
      })
  }

  private CreateForm(): FormGroup {
    return this.fb.group({
      currentPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)]],

      newPassword: ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)]]
    });
  }

}
