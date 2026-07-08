import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // Приватный поток хранит состояние загрузчика.
  private readonly loaderSubject = new BehaviorSubject<boolean>(false);

  // Публичный поток доступен компонентам только для чтения.
  public readonly loader$: Observable<boolean> =
    this.loaderSubject.asObservable();

  // Показывает глобальный загрузчик.
  public showLoader(): void {
    this.loaderSubject.next(true);
  }

  // Скрывает глобальный загрузчик.
  public hideLoader(): void {
    this.loaderSubject.next(false);
  }
}