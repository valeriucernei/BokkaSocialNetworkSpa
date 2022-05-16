import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SubscriptionPlansComponent} from "./subscription-plans/subscription-plans.component";

const subscriptionsRoutes: Routes = [
  { path: '', component: SubscriptionPlansComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(subscriptionsRoutes)
  ],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
