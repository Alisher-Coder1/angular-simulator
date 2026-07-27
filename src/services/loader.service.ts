import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loaderSubject =
    new BehaviorSubject<boolean>(false);

  private activeLoaders = 0;

  public readonly loader$: Observable<boolean> =
    this.loaderSubject.asObservable();

  public showLoader(): void {
    this.activeLoaders += 1;

    if (this.activeLoaders === 1) {
      this.loaderSubject.next(true);
    }
  }

  public hideLoader(): void {
    if (this.activeLoaders > 0) {
      this.activeLoaders -= 1;
    }

    if (this.activeLoaders === 0) {
      this.loaderSubject.next(false);
    }
  }
}