import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {SnackService} from "../../services/snack.service";
import {PostService} from "../../services/post.service";
import {NewPostModel} from "../../models/Post/NewPostModel";
import {PostModel} from "../../models/Post/PostModel";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  isProgressBarVisible: boolean = false;

  form: FormGroup = this.CreateForm();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isProgressBarVisible = true;

    const formData: NewPostModel = {
      ...this.form.value
    };

    this.postService.createPost(formData)
      .subscribe((postModel: PostModel) => {
        this.isProgressBarVisible = false;

        if (!postModel) return;

        this.snackService.openSnack("Post created successfully!");
      })
  }

  private CreateForm(): FormGroup {
    return this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(64)]],

      content: ['',
        Validators.maxLength(512)]
    });
  }

}
