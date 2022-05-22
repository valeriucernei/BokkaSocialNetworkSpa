import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_core/services/auth.service";
import {UserService} from "../shared/user.service";
import {SnackService} from "../../shared/snack.service";
import {UserProfileModel} from "../shared/models/user-profile.model";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  form: FormGroup = this.CreateForm();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
    this.loadDataFromApi();
  }

  loadDataFromApi() {
    this.form.disable();

    this.userService.getPersonalProfileData()
      .subscribe((personalProfileModel: UserProfileModel) => {
        this.form.enable();

        this.form.patchValue(personalProfileModel);
      });
  }

  onSubmit() {
    const formData: UserProfileModel = {
      ...this.form.value
    };

    this.form.disable();

    this.userService.updatePersonalProfileData(formData)
      .subscribe((personalProfileModel: UserProfileModel) => {
        this.form.enable();

        if (!personalProfileModel) return;

        this.form.patchValue(personalProfileModel);
        this.snackService.openSnack("Changes saved successfully.");
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

      userName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(32)]],

      email: ['', [
        Validators.required,
        Validators.email]]
    });
  }

}
