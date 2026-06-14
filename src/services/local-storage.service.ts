import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  // Пункт 4 домашнего задания №17:
  // Сохраняет значение в localStorage по указанному ключу.
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Возвращает значение из localStorage по указанному ключу.
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Удаляет значение из localStorage по указанному ключу.
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}