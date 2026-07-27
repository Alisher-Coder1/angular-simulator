import { Component, inject, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ColorMode } from '../../../enums/ColorMode';
import { ThemeService } from '../../../services/theme.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../../../enums/Theme';

@Component({
  selector: 'app-header',

  // Подключаем директивы для навигации
  // и выделения активной ссылки.
  imports: [RouterLink, RouterLinkActive, FormsModule, ToggleSwitchModule, SelectButtonModule],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private readonly themeService = inject(ThemeService);

public readonly themeOptions = [
  {
    label: 'Aura',
    value: Theme.Aura,
  },
  {
    label: 'Lara',
    value: Theme.Lara,
  },
  {
    label: 'Nora',
    value: Theme.Nora,
  },
];

public get currentTheme(): Theme {
  return this.themeService.currentState.theme;
}

public changeTheme(theme: Theme): void {
  this.themeService.setTheme(theme);
}

public get isDarkMode(): boolean {
  return this.themeService.currentState.colorMode === ColorMode.Dark;
}

public changeColorMode(isDarkMode: boolean): void {
  this.themeService.setColorMode(
    isDarkMode ? ColorMode.Dark : ColorMode.Light,
  );
}
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