import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {SubscriptionPlanModel} from "./models/subscription-plan.model";
import {SessionModel} from "./models/session.model";
import {ErrorHandlingService} from "../../_core/services/error-handling.service";
import {AuthService} from "../../_core/services/auth.service";

declare const Stripe;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansService {

  baseUrl = environment.apiUrl + "Plans/";
  invoiceUrl = environment.apiUrl + "Invoices/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService,
    private authService: AuthService
  ) { }

  getPlans(): Observable<SubscriptionPlanModel[]> {
    return this.http.get<SubscriptionPlanModel[]>(this.baseUrl);
  }

  requestMemberSession(price: SubscriptionPlanModel): Observable<SessionModel> {
    return this.http.post<SessionModel>(this.invoiceUrl + "create-checkout-session", {
      priceId: price.priceId,
      price: price.price,
      successUrl: environment.successUrl,
      failureUrl: environment.cancelUrl,
      clientReferenceId: this.authService.getUserId(),
      customerEmail: this.authService.getUserEmail()
    }).pipe(catchError(this.errorHandling.handleError<SessionModel>()));
  }

  redirectClientToCheckout(session: SessionModel){
    const stripe = Stripe(session.publicKey);

    stripe.redirectToCheckout({sessionId: session.sessionId});
  }

}
