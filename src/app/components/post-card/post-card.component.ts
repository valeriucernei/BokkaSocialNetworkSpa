import {Component, Input, OnInit} from '@angular/core';
import {PostListModel} from "../../models/Post/PostListModel";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {LikeService} from "../../services/like.service";
import {LikeResponseModel} from "../../models/Like/LikeResponseModel";
import {SnackService} from "../../services/snack.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  liked: boolean = false;

  @Input() post: PostListModel;

  baseUrl = environment.photosUrl;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private likeService: LikeService,
    private snackService: SnackService
  ) { }

  ngOnInit(): void {
  }

  postPhoto(): string {
    if (this.post.photo != null)
      return this.baseUrl + this.post.photo + '.' + this.post.photoExtension;
  }

  isPaidUser(): boolean {
    if (!this.authService.loggedIn)
      return false;
    const token = this.authService.getToken();
    const decoded_token = this.authService.decodeToken(token);
    return decoded_token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'PaidUser';
  }

  like() {
    if (!this.authService.loggedIn) {
      this.snackService.openSnack("You should Sign in, before likings posts.", true);
      return;
    }

    this.likeService.like(this.post.id).subscribe((likeResponseModel: LikeResponseModel) => {
      if (!likeResponseModel)
        return;

      this.liked = likeResponseModel.isLiked;
      this.post.likesCount = likeResponseModel.likesCount;
      this.snackService.openSnack(likeResponseModel.message);
    })
  }

  openPost() {
    alert("OK!");
  }

}
