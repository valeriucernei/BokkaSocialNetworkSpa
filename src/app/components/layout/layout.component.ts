import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {UserService} from "../../services/user.service";

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
    public userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userService.checkUserToken();
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

}
