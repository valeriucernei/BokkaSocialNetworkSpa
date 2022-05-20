import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  isLoading: boolean = true;

  setLoading(state: boolean) {
    this.isLoading = state;
  }
}
