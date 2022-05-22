import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable} from "rxjs";
import {InvoiceModel} from "./models/invoice.model";
import {ErrorHandlingService} from "../../_core/services/error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl = environment.apiUrl + "Invoices/";

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService,
  ) { }

  getPersonalInvoices(): Observable<InvoiceModel[]> {
    return this.http.get<InvoiceModel[]>(this.baseUrl + "personal")
      .pipe(catchError(this.errorHandling.handleError<InvoiceModel[]>()));
  }
}
