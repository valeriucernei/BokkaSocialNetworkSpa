import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostTopComponent } from './post-top/post-top.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { PostPersonalComponent } from './post-personal/post-personal.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PostsRoutingModule} from "./posts-routing.module";



@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostNewComponent,
    PostTopComponent,
    PostSearchComponent,
    PostPersonalComponent
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    RouterModule,
    MatPaginatorModule
  ]
})
export class PostsModule { }
