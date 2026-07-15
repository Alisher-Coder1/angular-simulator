import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { User } from '../../../interfaces/user';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { UsersFilterComponent } from '../../components/users-filter/users-filter.component';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent,],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  // Получаем сервис, который управляет данными пользователей.
  private readonly userService = inject(UserService);

  // Публичный поток пользователей для будущего вывода в HTML.
  private readonly searchValueSubject = new BehaviorSubject<string>('');

  private readonly users$ = this.userService.getUsers();

  public readonly filteredUsers$ = combineLatest([
    this.users$,
    this.searchValueSubject,
  ]).pipe(
    map(([users, searchValue]: [User[], string]) => {
       if (searchValue === '') {
        return users;
      }

      return users.filter((user: User) =>
        user.name.toLowerCase().includes(searchValue),
      );
    }),
  );
  public onDeleteUser(userId: number): void {
  this.userService.deleteUser(userId);
}

public onFilterUsers(searchValue: string): void {
  this.searchValueSubject.next(searchValue);
}

  public onCreateUser(user: User): void {
  this.userService.addUser(user);
}
 
  // Срабатывает один раз после создания страницы.
  public ngOnInit(): void {
    // Запускаем HTTP-запрос пользователей.
    this.userService.loadUsers().subscribe();
  }
}