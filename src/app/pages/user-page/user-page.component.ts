import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  // Получаем сервис, который управляет данными пользователей.
  private readonly userService = inject(UserService);

  // Публичный поток пользователей для будущего вывода в HTML.
  public readonly users$ = this.userService.getUsers();

  // Срабатывает один раз после создания страницы.
  public ngOnInit(): void {
    // Запускаем HTTP-запрос пользователей.
    this.userService.loadUsers().subscribe();
  }
}