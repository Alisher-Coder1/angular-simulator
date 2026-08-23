import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loaderSubject = new BehaviorSubject<boolean>(false);

  private activeLoaders = 0;

  readonly loader$: Observable<boolean> = this.loaderSubject.asObservable();

  showLoader(): void {
    this.activeLoaders += 1;

    if (this.activeLoaders === 1) {
      this.loaderSubject.next(true);
    }
  }

  hideLoader(): void {
    if (this.activeLoaders > 0) {
      this.activeLoaders -= 1;
    }

    if (this.activeLoaders === 0) {
      this.loaderSubject.next(false);
    }
  }
}
