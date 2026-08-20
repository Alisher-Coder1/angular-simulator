import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { ColorMode } from '../enums/ColorMode';
import { Theme } from '../enums/Theme';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

export interface IThemeState {
  theme: Theme;
  colorMode: ColorMode;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly storageKey = 'app-theme-state';

  private readonly defaultState: IThemeState = {
    theme: Theme.AURA,
    colorMode: ColorMode.LIGHT,
  };

  private readonly localStorageService = inject(LocalStorageService);

  private readonly stateSubject = new BehaviorSubject<IThemeState>(
    this.loadState(),
  );

  readonly state$ = this.stateSubject.asObservable();

  readonly theme$ = this.state$.pipe(
    map((state) => state.theme),
    distinctUntilChanged(),
  );

  readonly colorMode$ = this.state$.pipe(
    map((state) => state.colorMode),
    distinctUntilChanged(),
  );

  constructor() {
  this.applyTheme(this.currentState.theme);
  this.applyColorMode(this.currentState.colorMode);
}

  get currentState(): IThemeState {
    return this.stateSubject.getValue();
  }

  setTheme(theme: Theme): void {
    if (!this.isTheme(theme)) {
      return;
    }

    this.updateState({ theme });
    this.applyTheme(theme);
  }

  setColorMode(colorMode: ColorMode): void {
  if (!this.isColorMode(colorMode)) {
    return;
  }

  this.updateState({ colorMode });
  this.applyColorMode(colorMode);
}

  private updateState(patch: Partial<IThemeState>): void {
    const state: IThemeState = {
      ...this.currentState,
      ...patch,
    };

    this.stateSubject.next(state);
    this.localStorageService.setItem(this.storageKey, state);
  }

  private readonly darkModeClass = 'app-dark';

  private readonly document = inject(DOCUMENT);

  private loadState(): IThemeState {
    try {
      const storedState =
        this.localStorageService.getItem<Partial<IThemeState>>(
          this.storageKey,
        );

      const state: IThemeState = {
        theme: this.isTheme(storedState?.theme)
          ? storedState.theme
          : this.defaultState.theme,

        colorMode: this.isColorMode(storedState?.colorMode)
          ? storedState.colorMode
          : this.defaultState.colorMode,
      };

      this.localStorageService.setItem(this.storageKey, state);

      return state;
    } catch {
      this.localStorageService.setItem(
        this.storageKey,
        this.defaultState,
      );

      return this.defaultState;
    }
  }

  private applyTheme(theme: Theme): void {
  switch (theme) {
    case Theme.LARA:
      usePreset(Lara);
      return;

    case Theme.NORA:
      usePreset(Nora);
      return;

    case Theme.AURA:
    default:
      usePreset(Aura);
  }
}

  private applyColorMode(colorMode: ColorMode): void {
  this.document.documentElement.classList.toggle(
    this.darkModeClass,
    colorMode === ColorMode.DARK,
  );
}

  private isTheme(value: unknown): value is Theme {
    return Object.values(Theme).includes(value as Theme);
  }

  private isColorMode(value: unknown): value is ColorMode {
    return Object.values(ColorMode).includes(value as ColorMode);
  }

}
