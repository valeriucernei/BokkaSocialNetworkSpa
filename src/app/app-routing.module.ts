import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import {FeedComponent} from "./components/feed/feed.component";

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'register', component: RegisterComponent },
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
