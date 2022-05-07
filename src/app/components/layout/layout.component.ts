import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authService.checkUserToken();
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent, {
      width: '400px'
    });
  }

  getFullName():string {
    const token = this.authService.getToken();
    const decoded_token = this.authService.decodeToken(token);

    return decoded_token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
  }

}
