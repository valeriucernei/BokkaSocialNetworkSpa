import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { PostCardComponent } from './components/post-card/post-card.component';
import { FeedComponent } from './components/feed/feed.component';
import { LayoutComponent } from './components/layout/layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SearchComponent } from './components/search/search.component';
import {DelayInterceptor} from "./interceptors/delay.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { ProfileComponent } from './components/profile/profile.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { TopComponent } from './components/top/top.component';
import { PersonalPostsComponent } from './components/personal-posts/personal-posts.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostCardComponent,
    FeedComponent,
    LayoutComponent,
    SearchComponent,
    ProfileComponent,
    TopComponent,
    PersonalPostsComponent,
    ChangePasswordComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
