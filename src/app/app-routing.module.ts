import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import {FeedComponent} from "./components/feed/feed.component";
import {SearchComponent} from "./components/search/search.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {TopComponent} from "./components/top/top.component";
import {PersonalPostsComponent} from "./components/personal-posts/personal-posts.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'search', component: SearchComponent },
  { path: 'top', component: TopComponent },
  { path: 'personal-posts', component: PersonalPostsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
