import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',

  // Подключаем директивы для навигации
  // и выделения активной ссылки.
  imports: [RouterLink, RouterLinkActive],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // Массив ссылок, который затем выведем
  // в HTML при помощи цикла @for.
  readonly navigationLinks = [
    {
      title: 'Главная',
      path: '/',
    },
    {
      title: 'Пользователи',
      path: '/users',
    },
  ];
}