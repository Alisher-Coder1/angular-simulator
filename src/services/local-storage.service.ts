import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Пункт 4 домашнего задания №17:
  // Сохраняет значение любого типа в localStorage по указанному ключу.
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Возвращает значение из localStorage по указанному ключу.
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (item === null) {
      return null;
    }

    return JSON.parse(item) as T;
  }

  // Удаляет значение из localStorage по указанному ключу.
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Полностью очищает localStorage.
  clear(): void {
    localStorage.clear();
  }
}
