import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {PostListModel} from "../shared/models/post-list.model";
import {PostService} from "../shared/post.service";
import {AuthService} from "../../_core/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-personal',
  templateUrl: './post-personal.component.html',
  styleUrls: ['./post-personal.component.css']
})
export class PostPersonalComponent implements OnInit {

  posts$: Observable<PostListModel[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getUserPosts(this.authService.getUserId());
  }

}
