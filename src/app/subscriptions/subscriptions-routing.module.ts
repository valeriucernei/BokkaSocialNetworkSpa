import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SubscriptionPlansComponent} from "./subscription-plans/subscription-plans.component";
import {SubscriptionSuccessComponent} from "./subscription-success/subscription-success.component";
import {AuthGuard} from "../_core/guards/auth.guard";

const subscriptionsRoutes: Routes = [
  { path: '', component: SubscriptionPlansComponent },
  { path: 'success', component: SubscriptionSuccessComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(subscriptionsRoutes)
  ],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
