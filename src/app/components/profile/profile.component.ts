import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackService} from "../../services/snack.service";
import {UserService} from "../../services/user.service";
import {PersonalProfileModel} from "../../models/User/PersonalProfileModel";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
      .subscribe((personalProfileModel: PersonalProfileModel) => {
        this.isProgressBarVisible = false;

        this.form.patchValue(personalProfileModel);
      });
  }

  onSubmit() {
    this.isProgressBarVisible = true;

    const formData: PersonalProfileModel = {
      ...this.form.value
    };

    this.userService.updatePersonalProfileData(formData)
      .subscribe((personalProfileModel: PersonalProfileModel) => {
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
