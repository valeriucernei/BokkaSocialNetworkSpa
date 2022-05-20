import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {SubscriptionPlanModel} from "../shared/models/subscription-plan.model";
import {SubscriptionPlansService} from "../shared/subscription-plans.service";
import {AuthService} from "../../_core/services/auth.service";
import {SnackService} from "../../shared/snack.service";

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit{

  plansObservable: Observable<SubscriptionPlanModel[]>;
  planChosen: SubscriptionPlanModel | null;

  constructor(
    private planService: SubscriptionPlansService,
    private authService: AuthService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
    this.plansObservable = this.planService.getPlans();
  }

  choosePlan(plan: SubscriptionPlanModel) {
    if (!this.authService.loggedIn) {
      this.snackService.openSnack("Only logged in users can buy subscription plan.", true);
      return;
    }
    this.planChosen = plan;
  }

  onSubmit() {
    this.planService.requestMemberSession(this.planChosen)
      .subscribe((session) => {
      this.planService.redirectClientToCheckout(session);
    })
  }

}
