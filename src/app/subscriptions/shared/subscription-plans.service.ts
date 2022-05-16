import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscriptionPlanModel} from "./models/subscription-plan.model";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansService {

  baseUrl = environment.apiUrl + "Plans/";

  constructor(
    private http: HttpClient
  ) { }

  getPlans(): Observable<SubscriptionPlanModel[]> {
    return this.http.get<SubscriptionPlanModel[]>(this.baseUrl);
  }

}
