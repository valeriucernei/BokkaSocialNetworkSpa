import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {UserProfileModel} from "../shared/models/user-profile.model";
import {InvoiceService} from "../shared/invoice.service";
import {InvoiceModel} from "../shared/models/invoice.model";
import {SubscriptionService} from "../../subscriptions/shared/subscription.service";
import {SubscriptionModel} from "../../subscriptions/shared/models/subscription.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: UserProfileModel;

  invoicesDataSource: InvoiceModel[];
  invoicesDisplayedColumns: string[] = ['amount', 'createdDateTime', 'status'];

  subscriptionsDataSource: SubscriptionModel[];
  subscriptionsDisplayedColumns: string[] = ['startDateTime', 'endDateTime', 'active'];

  constructor(
    private userService: UserService,
    private invoiceService: InvoiceService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.loadDataFromApi();
  }

  loadDataFromApi() {
    this.userService.getPersonalProfileData()
      .subscribe((user: UserProfileModel) => {
        this.userData = user;
      });

    this.invoiceService.getPersonalInvoices()
      .subscribe((invoices: InvoiceModel[]) => {
        this.invoicesDataSource = invoices;
      });

    this.subscriptionService.getPersonalSubscriptions()
      .subscribe((subscriptions: SubscriptionModel[]) => {
        this.subscriptionsDataSource = subscriptions;
      })
  }

  isSubscriptionActive(expDate: Date): boolean {
    const expDate2 = new Date(expDate);
    const currentDate = new Date();
    return expDate2 > currentDate;
  }

}
