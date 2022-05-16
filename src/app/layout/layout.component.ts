import { Component, OnInit } from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AuthService} from "../_core/services/auth.service";
import {UserService} from "../users/shared/user.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.checkUserToken();
  }

  openLoginDialog() {
    this.userService.openLoginDialog();
  }

  openRegisterDialog() {
    this.userService.openRegisterDialog();
  }

  getFullName():string {
    const token = this.authService.getToken();
    const decoded_token = this.authService.decodeToken(token);

    return decoded_token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
  }

}
