import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpEventType} from "@angular/common/http";
import {AuthService} from "../../_core/services/auth.service";
import {UserService} from "../../users/shared/user.service";
import {PostService} from "../shared/post.service";
import {PostPhotoService} from "../shared/post-photo.service";
import {SnackService} from "../../shared/snack.service";
import {PostModel} from "../shared/models/post.model";
import {PostNewModel} from "../shared/models/post-new.model";

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent{

  isProgressBarVisible: boolean = false;
  progress: number;
  fileList: FileList;
  imageSrc: string;
  @Output() public onUploadFinished = new EventEmitter();

  form: FormGroup = this.CreateForm();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackService: SnackService,
    private postService: PostService,
    private postPhotoService: PostPhotoService,
  ) { }

  prepareFile(files: FileList) {
    this.fileList = files;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

    }
  }

  clearPhotos() {
    this.imageSrc = undefined;
    this.fileList = undefined;
  }

  onSubmit() {
    this.isProgressBarVisible = true;

    const formData: PostNewModel = {
      ...this.form.value
    };

    this.postService.createPost(formData)
      .subscribe((postModel: PostModel) => {
        if (!postModel) return;

        if (this.fileList.length == 0) {
          this.snackService.openSnack("Post created successfully!");
          this.isProgressBarVisible = false;

          this.form.reset();
          this.clearPhotos();
          return;
        }

        this.startPhotoUpload(postModel.id);
      })
  }

  private startPhotoUpload(postId: string) {
    this.postPhotoService.upload(this.fileList, postId)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);

        else if (event.type === HttpEventType.Response) {
          this.onUploadFinished.emit(event.body);

          this.snackService.openSnack("Post created successfully!");
          this.isProgressBarVisible = false;

          this.form.reset();
          this.clearPhotos();
        }
      });
  }

  private CreateForm(): FormGroup {
    return this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(64)]],

      content: ['',
        Validators.maxLength(512)],

      photo: ['']
    });
  }

}
