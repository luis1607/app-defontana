import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new BehaviorSubject(false);
  activeLoading: boolean = false;

  constructor() { }

  showLoading(text?: string) {
    this.activeLoading = true;
    setTimeout(() => this.isLoading.next(true), 50);
  }

  hideLoading() {
    this.activeLoading = false;
    setTimeout(() => this.isLoading.next(false), 50); 

  }
}
