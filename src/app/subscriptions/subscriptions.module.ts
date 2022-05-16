import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CreditCardDirectivesModule} from "angular-cc-library";
import {SubscriptionsRoutingModule} from "./subscriptions-routing.module";



@NgModule({
  declarations: [
    SubscriptionPlansComponent
  ],
  imports: [
    SubscriptionsRoutingModule,
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CreditCardDirectivesModule
  ]
})
export class SubscriptionsModule { }
