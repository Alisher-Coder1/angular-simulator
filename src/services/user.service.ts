import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap, } from 'rxjs';
import { User } from '../interfaces/user';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from './message.service';
import { UserApiService } from './user-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Ключ, по которому список пользователей хранится в localStorage.
  private readonly usersStorageKey = 'users';

  // Получает пользователей с внешнего сервера.
  private readonly userApiService = inject(UserApiService);

  // Управляет глобальным индикатором загрузки.
  private readonly loaderService = inject(LoaderService);

  // Показывает пользователю сообщение при ошибке.
  private readonly messageService = inject(MessageService);

  // Работает с локальным хранилищем браузера.
  private readonly localStorageService = inject(LocalStorageService);

  // Внутреннее хранилище списка пользователей.
  private readonly usersSubject = new BehaviorSubject<User[]>([]);

  // Публичный поток: компоненты могут читать данные,
  // но не могут самостоятельно изменять хранилище.
  public readonly users$: Observable<User[]> =
    this.usersSubject.asObservable();

  // Устанавливает новый список пользователей в поток и localStorage.
  public setUsers(users: User[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem<User[]>(this.usersStorageKey, users);
  }

  // Возвращает поток со списком пользователей.
  public getUsers(): Observable<User[]> {
    return this.users$;
  }

  // Удаляет пользователя и синхронизирует список с localStorage.
  public deleteUser(userId: number): void {
    const filteredUsers = this.usersSubject.value.filter(
      (user: User) => user.id !== userId,
    );

    this.setUsers(filteredUsers);
  }

  public addUser(user: User): void {
  const updatedUsers = [user, ...this.usersSubject.value];

  this.setUsers(updatedUsers);
}

  // Загружает пользователей: сначала из localStorage, потом с сервера.
  public loadUsers(): Observable<User[]> {
    const savedUsers = this.localStorageService.getItem<User[]>(
      this.usersStorageKey,
    );

    if (savedUsers !== null) {
      this.usersSubject.next(savedUsers);
      return of(savedUsers);
    }

    // Показываем глобальный индикатор перед началом запроса.
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      // Оставляем в телефоне только цифры, тире и плюс в начале номера.
      map((users: User[]) =>
        users.map((user: User) => {
          const phoneWithoutExtension = user.phone.replace(
            /\s*(?:x|ext\.?|extension)\s*\d+.*$/i,
            '',
          );

          const hasPlus = phoneWithoutExtension.trim().startsWith('+');

          const normalizedPhone = phoneWithoutExtension
            .replace(/[().\s]+/g, '-')
            .replace(/[^\d-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

          return {
            ...user,
            phone: hasPlus ? `+${normalizedPhone}` : normalizedPhone,
          };
        }),
      ),

      // Сохраняем уже обработанных пользователей в поток и localStorage.
      tap((users: User[]) => {
        this.setUsers(users);
      }),

      catchError((error: HttpErrorResponse) => {
  if (error.status < 500 || error.status >= 600) {
    this.messageService.showError(
      'Не удалось загрузить пользователей',
    );
  }

  // Очищаем старые данные.
  this.setUsers([]);

  // Возвращаем безопасный пустой массив.
  return of([] as User[]);
}),

      // Выполняется и после успеха, и после ошибки.
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }
}
