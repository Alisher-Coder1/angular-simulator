import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ColorMode } from '../../../enums/ColorMode';
import { ThemeService } from '../../../services/theme.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Theme } from '../../../enums/Theme';
import { AuthService } from '../../features/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',

  // Подключаем директивы для навигации
  // и выделения активной ссылки.
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule,
    SelectButtonModule,
    AsyncPipe,
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  readonly currentUser$ = this.authService.currentUser$;

  readonly themeOptions = [
    {
      label: 'Aura',
      value: Theme.AURA,
    },
    {
      label: 'Lara',
      value: Theme.LARA,
    },
    {
      label: 'Nora',
      value: Theme.NORA,
    },
  ];

  get currentTheme(): Theme {
    return this.themeService.currentState.theme;
  }

  changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  get isDarkMode(): boolean {
    return this.themeService.currentState.colorMode === ColorMode.DARK;
  }

  changeColorMode(isDarkMode: boolean): void {
    this.themeService.setColorMode(
      isDarkMode ? ColorMode.DARK : ColorMode.LIGHT,
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

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
