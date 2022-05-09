import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {SnackService} from "../../services/snack.service";
import {PostService} from "../../services/post.service";
import {NewPostModel} from "../../models/Post/NewPostModel";
import {PostModel} from "../../models/Post/PostModel";
import {PhotoService} from "../../services/photo.service";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

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
    private postService: PostService,
    private photoService: PhotoService,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
  }

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

    const formData: NewPostModel = {
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
    console.log("Start photo upload...");

    this.photoService.upload(this.fileList, postId)
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
