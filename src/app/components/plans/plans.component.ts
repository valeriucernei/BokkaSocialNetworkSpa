import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PlanModel} from "../../models/Plan/PlanModel";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreditCardValidators} from "angular-cc-library";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlanService} from "../../services/plan.service";
import {SnackService} from "../../services/snack.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit, AfterViewInit {

  isProgressBarVisible: boolean = true;
  planChosen: PlanModel | null;
  cardType: string = environment.iconsUrl + 'default.png';

  form: FormGroup = this.CreateForm();

  plans: PlanModel[];

  plansObservable: Observable<PlanModel[]>;

  constructor(
    private fb: FormBuilder,
    private planService: PlanService,
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

  choosePlan(plan: PlanModel) {
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

    this.planService.getPlans().subscribe((plans: PlanModel[]) => {
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
