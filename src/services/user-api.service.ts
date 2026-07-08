import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  // Получаем HttpClient через систему внедрения зависимостей Angular.
  private readonly http = inject(HttpClient);

  // Адрес сервера, с которого получаем пользователей.
  private readonly usersUrl =
    'https://jsonplaceholder.typicode.com/users';

  // Выполняет GET-запрос и возвращает поток с массивом пользователей.
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}