import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "./post-list/post-list.component";
import {PostSearchComponent} from "./post-search/post-search.component";
import {PostTopComponent} from "./post-top/post-top.component";
import {PostNewComponent} from "./post-new/post-new.component";
import {AuthGuard} from "../_core/guards/auth.guard";
import {PostPersonalComponent} from "./post-personal/post-personal.component";

const postsRoutes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'search', component: PostSearchComponent },
  { path: 'top', component: PostTopComponent },
  { path: 'new-post', component: PostNewComponent, canActivate: [AuthGuard] },
  { path: 'personal-posts', component: PostPersonalComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(postsRoutes)
  ],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
