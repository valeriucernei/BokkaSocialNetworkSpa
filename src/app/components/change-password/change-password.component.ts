import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {SnackService} from "../../services/snack.service";
import {UpdatePasswordModel} from "../../models/User/UpdatePasswordModel";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isProgressBarVisible: boolean = false;

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
    this.isProgressBarVisible = true;

    const formData: UpdatePasswordModel = {
      ...this.form.value
    };

    this.userService.updatePassword(formData)
      .subscribe((response: any) => {
        this.isProgressBarVisible = false;

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
