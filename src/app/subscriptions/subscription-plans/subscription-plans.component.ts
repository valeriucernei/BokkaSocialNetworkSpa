import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {CreditCardValidators} from "angular-cc-library";
import {SubscriptionPlanModel} from "../shared/models/subscription-plan.model";
import {SubscriptionPlansService} from "../shared/subscription-plans.service";
import {AuthService} from "../../_core/services/auth.service";
import {SnackService} from "../../shared/snack.service";

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit, AfterViewInit {

  isProgressBarVisible: boolean = true;
  planChosen: SubscriptionPlanModel | null;
  cardType: string = environment.iconsUrl + 'default.png';

  form: FormGroup = this.CreateForm();

  plans: SubscriptionPlanModel[];

  plansObservable: Observable<SubscriptionPlanModel[]>;

  constructor(
    private fb: FormBuilder,
    private planService: SubscriptionPlansService,
    private authService: AuthService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    const initialData = {
      cardNumber: null,
      expiryDate: null,
      cvc: null
    };

    this.form.patchValue(initialData);

    this.plansObservable = this.planService.getPlans();
  }

  ngAfterViewInit(): void {
    this.loadPlansFromApi();
  }

  choosePlan(plan: SubscriptionPlanModel) {
    if (!this.authService.loggedIn) {
      this.snackService.openSnack("Only logged in users can buy subscription plan.", true);
      return;
    }
    this.planChosen = plan;
  }

  onSubmit() {
    console.log(this.form.value);
  }

  checkCardType(obj: BehaviorSubject<string>): boolean {
    this.cardType = environment.iconsUrl

    switch (obj.getValue()) {
      case 'visa': this.cardType += 'visa.png'; break;
      case 'mastercard': this.cardType += 'mastercard.png'; break;
      case 'amex': this.cardType += 'amex.png'; break;
      default: this.cardType += 'default.png'; break;
    }
    return true;
  }

  private loadPlansFromApi() {
    this.isProgressBarVisible = true;

    this.planService.getPlans().subscribe((plans: SubscriptionPlanModel[]) => {
      this.isProgressBarVisible = false;
      console.log(plans);
      this.plans = plans;
    }, )
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

}
