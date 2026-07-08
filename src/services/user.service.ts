import { inject, Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, finalize, Observable, map, of, tap,} from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Получает пользователей с внешнего сервера.
  private readonly userApiService = inject(UserApiService);

  // Управляет глобальным индикатором загрузки.
  private readonly loaderService = inject(LoaderService);

  // Показывает пользователю сообщение при ошибке.
  private readonly messageService = inject(MessageService);
  // Внутреннее хранилище списка пользователей.
  private readonly usersSubject = new BehaviorSubject<User[]>([]);

  // Публичный поток: компоненты могут читать данные,
  // но не могут самостоятельно изменять хранилище.
  public readonly users$: Observable<User[]> =
    this.usersSubject.asObservable();

  // Устанавливает новый список пользователей в поток.
  public setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  // Возвращает поток со списком пользователей.
  public getUsers(): Observable<User[]> {
    return this.users$;
  }

  // Загружает пользователей с сервера.
public loadUsers(): Observable<User[]> {
  // Показываем глобальный индикатор перед началом запроса.
  this.loaderService.showLoader();

  return this.userApiService.getUsers().pipe(
  // Оставляем в телефоне только цифры и тире.
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
      phone: hasPlus ? `+${normalizedPhone}`: normalizedPhone,
    };
  }),
),
  // Сохраняем уже обработанных пользователей.
  tap((users: User[]) => {
    this.setUsers(users);
  }),

  catchError(() => {
      this.messageService.showError(
        'Не удалось загрузить пользователей',
      );

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