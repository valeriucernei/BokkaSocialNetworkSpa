import {Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";
import {PostService} from "../shared/post.service";
import {PostListModel} from "../shared/models/post-list.model";
import {AuthService} from "../../_core/services/auth.service";
import {PostLikeService} from "../shared/post-like.service";
import {SnackService} from "../../shared/snack.service";
import {LikeResponseModel} from "../shared/models/like-response.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{

  liked: boolean = false;

  @Input() post: PostListModel;

  baseUrl = environment.photosUrl;

  constructor(
    private postService: PostService,
    private likeService: PostLikeService,
    public authService: AuthService,
    private snackService: SnackService
  ) { }

  postPhoto(): string {
    if (this.post.photo != null)
      return this.baseUrl + this.post.photo + '.' + this.post.photoExtension;
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

}
