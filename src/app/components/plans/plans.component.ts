import { Component, OnInit } from '@angular/core';
import {PlanModel} from "../../models/Plan/PlanModel";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreditCardValidators} from "angular-cc-library";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  isProgressBarVisible: boolean = false;
  cardType: string = environment.iconsUrl + 'default.png';

  form: FormGroup = this.CreateForm();

  plans: PlanModel[] = [
    {
      id: "1",
      title: "Plan1",
      description: "description description description descriptiondescription description",
      days: 30,
      price: 5
    },
    {
      id: "2",
      title: "Plan2",
      description: "description description description descriptiondescription description",
      days: 90,
      price: 10
    },
    {
      id: "3",
      title: "Plan3",
      description: "description description description descriptiondescription description",
      days: 180,
      price: 20
    }
  ];

  constructor(
    private fb: FormBuilder,
    //private snackService: SnackService,
  ) { }

  ngOnInit(): void {
    const initialData = {
      cardNumber: null,
      expiryDate: null,
      cvc: null
    };

    this.form.patchValue(initialData);
  }

  choosePlan(planId: string) {
    console.log(planId);
  }

  private CreateForm(): FormGroup {
    return this.fb.group({
      cardNumber: ['', [
        Validators.required,
        CreditCardValidators.validateCCNumber]],

      expiryDate: ['', [
        Validators.required,
        CreditCardValidators.validateExpDate]],

      cvc: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4)]]
    });
  }

  checkCardType(obj: BehaviorSubject<string>): boolean {
    if (obj.getValue() == 'unknown')
      this.cardType = environment.iconsUrl + 'default.png';
    else if (obj.getValue() == 'visa')
      this.cardType = environment.iconsUrl + 'visa.png';
    else if (obj.getValue() == 'mastercard')
      this.cardType = environment.iconsUrl + 'mastercard.png';
    else if (obj.getValue() == 'amex')
      this.cardType = environment.iconsUrl + 'amex.png';
    return true;
  }

}
