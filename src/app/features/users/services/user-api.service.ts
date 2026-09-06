import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  // Получаем HttpClient через систему внедрения зависимостей Angular.
  private readonly http = inject(HttpClient);

  // Адрес сервера, с которого получаем пользователей.
  private readonly usersUrl = 'https://jsonplaceholder.typicode.com/users';

  // Выполняет GET-запрос и возвращает поток с массивом пользователей.
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }
}
