import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../_core/services/auth.service";
import {BearerToken} from "../../_core/models/bearer-token.model";
import {SnackService} from "../../shared/snack.service";

@Component({
  selector: 'app-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.css']
})
export class SubscriptionSuccessComponent implements OnInit {

  successUrl = environment.iconsUrl + "/payment-success.png";

  constructor(
    private authService: AuthService,
    private snackService: SnackService
    ) { }

  ngOnInit(): void {

    this.authService.refreshToken()
      .subscribe((bearerToken: BearerToken) => {
        if (!bearerToken) return;

        localStorage.setItem('accessToken', bearerToken.access_token);
        this.authService.updateUserPaidStatus();
        this.snackService.openSnack("Subscription successfully activated!");
      });
  }

}
