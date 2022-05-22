import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "../../_core/services/error-handling.service";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {SubscriptionModel} from "./models/subscription.model";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  baseUrl = environment.apiUrl + "Subscriptions/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService,
  ) { }

  getPersonalSubscriptions(): Observable<SubscriptionModel[]> {
    return this.http.get<SubscriptionModel[]>(this.baseUrl + "personal")
      .pipe(catchError(this.errorHandling.handleError<SubscriptionModel[]>()));
  }
}
