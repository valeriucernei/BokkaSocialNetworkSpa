import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import {AuthGuard} from "./_core/guards/auth.guard";

const routes: Routes = [
  { path: '', loadChildren: () => import('./posts/posts.module').then(mod => mod.PostsModule)},
  { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscriptions.module').then(mod => mod.SubscriptionsModule)},
  { path: 'profile', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule), canActivate: [AuthGuard]},
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
