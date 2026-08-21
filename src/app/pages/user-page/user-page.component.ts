import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../../interfaces/user';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';
import { PluralPipe } from '../../pipes/plural.pipe';

@Component({
  selector: 'app-user-page',
  imports: [
    AsyncPipe,
    UserCardComponent,
    UserCreateComponent,
    UsersFilterComponent,
    PluralPipe,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  // Получаем сервис, который управляет данными пользователей.
  private readonly userService = inject(UserService);

  // Публичный поток пользователей для будущего вывода в HTML.
  private readonly searchValueSubject = new BehaviorSubject<string>('');

  private readonly users$ = this.userService.getUsers();

  readonly filteredUsers$ = combineLatest([
    this.users$,
    this.searchValueSubject,
  ]).pipe(
    map(([users, searchValue]: [IUser[], string]) => {
      if (searchValue === '') {
        return users;
      }

      return users.filter((user: IUser) =>
        user.name.toLowerCase().includes(searchValue),
      );
    }),
  );

  onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  onFilterUsers(searchValue: string): void {
    this.searchValueSubject.next(searchValue);
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

  // Срабатывает один раз после создания страницы.
  ngOnInit(): void {
    // Запускаем HTTP-запрос пользователей.
    this.userService.loadUsers().subscribe();
  }
}
