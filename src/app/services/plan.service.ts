import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlanModel} from "../models/Plan/PlanModel";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  baseUrl = environment.apiUrl + "Plans/";

  constructor(
    private http: HttpClient
  ) { }

  getPlans(): Observable<PlanModel[]> {
    return this.http.get<PlanModel[]>(this.baseUrl);
  }

}
