import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ColorMode } from '../../../enums/ColorMode';
import { Theme } from '../../../enums/Theme';
import { ThemeService } from '../../core/services/theme.service';
import { APP_CONFIG } from '../../config/app-config.token';
import { DATE_FORMAT } from '../../config/date-format.token';
import { AuthService } from '../../features/auth/auth.service';

type TaskPanelMode = 'date' | 'counter';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule,
    SelectButtonModule,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  private readonly themeService = inject(ThemeService);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  private dateTimerId: number | undefined;

  readonly appConfig = inject(APP_CONFIG);

  readonly dateFormat = inject(DATE_FORMAT);

  readonly currentUser$ = this.authService.currentUser$;

  currentDateTime = '';

  clickCount = 0;

  taskPanelMode: TaskPanelMode = 'date';

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

  constructor() {
    this.updateCurrentDateTime();

    this.dateTimerId = window.setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.dateTimerId !== undefined) {
      clearInterval(this.dateTimerId);
    }
  }

  get lastLogin(): Date | null {
    return this.authService.getLastLogin();
  }

  get currentTheme(): Theme {
    return this.themeService.currentState.theme;
  }

  get isDarkMode(): boolean {
    return this.themeService.currentState.colorMode === ColorMode.DARK;
  }

  get taskPanelToggleText(): string {
    return this.taskPanelMode === 'date' ? 'Показать счётчик' : 'Показать дату';
  }

  changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  changeColorMode(isDarkMode: boolean): void {
    this.themeService.setColorMode(
      isDarkMode ? ColorMode.DARK : ColorMode.LIGHT,
    );
  }

  increaseClickCount(): void {
    this.clickCount += 1;
  }

  decreaseClickCount(): void {
    if (this.clickCount > 0) {
      this.clickCount -= 1;
    }
  }

  toggleTaskPanelMode(): void {
    this.taskPanelMode = this.taskPanelMode === 'date' ? 'counter' : 'date';
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

  private updateCurrentDateTime(): void {
    const currentDate = new Date();

    const date = currentDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const time = currentDate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    this.currentDateTime = `${date} ${time}`;
  }
}
