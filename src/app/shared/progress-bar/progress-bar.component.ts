import {Component} from '@angular/core';
import {ProgressBarService} from "../progress-bar.service";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent{

  constructor(private progressBarService: ProgressBarService) { }

  get showLoadingBar(): boolean {
    return this.progressBarService.isLoading;
  }

}
