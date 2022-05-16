import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_core/services/auth.service";
import {UserService} from "../shared/user.service";
import {SnackService} from "../../shared/snack.service";
import {UserProfileModel} from "../shared/models/user-profile.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isProgressBarVisible: boolean = false;

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
    this.isProgressBarVisible = true;

    this.userService.getPersonalProfileData()
      .subscribe((personalProfileModel: UserProfileModel) => {
        this.isProgressBarVisible = false;

        this.form.patchValue(personalProfileModel);
      });
  }

  onSubmit() {
    this.isProgressBarVisible = true;

    const formData: UserProfileModel = {
      ...this.form.value
    };

    this.userService.updatePersonalProfileData(formData)
      .subscribe((personalProfileModel: UserProfileModel) => {
        this.isProgressBarVisible = false;

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

      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(32)]],

      email: ['', [
        Validators.required,
        Validators.email]]
    });
  }

}
