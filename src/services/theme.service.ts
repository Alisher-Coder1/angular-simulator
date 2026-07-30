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

export interface ThemeState {
  theme: Theme;
  colorMode: ColorMode;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme-state';

  private readonly defaultState: ThemeState = {
    theme: Theme.Aura,
    colorMode: ColorMode.Light,
  };

  private readonly localStorageService = inject(LocalStorageService);

  private readonly stateSubject = new BehaviorSubject<ThemeState>(
    this.loadState(),
  );

  public readonly state$ = this.stateSubject.asObservable();

  public readonly theme$ = this.state$.pipe(
    map((state) => state.theme),
    distinctUntilChanged(),
  );

  public readonly colorMode$ = this.state$.pipe(
    map((state) => state.colorMode),
    distinctUntilChanged(),
  );

  constructor() {
  this.applyTheme(this.currentState.theme);
  this.applyColorMode(this.currentState.colorMode);
}

  public get currentState(): ThemeState {
    return this.stateSubject.getValue();
  }

  public setTheme(theme: Theme): void {
    if (!this.isTheme(theme)) {
      return;
    }

    this.updateState({ theme });
    this.applyTheme(theme);
  }

  public setColorMode(colorMode: ColorMode): void {
  if (!this.isColorMode(colorMode)) {
    return;
  }

  this.updateState({ colorMode });
  this.applyColorMode(colorMode);
}

  private updateState(patch: Partial<ThemeState>): void {
    const state: ThemeState = {
      ...this.currentState,
      ...patch,
    };

    this.stateSubject.next(state);
    this.localStorageService.setItem(this.storageKey, state);
  }

  private readonly darkModeClass = 'app-dark';

  private readonly document = inject(DOCUMENT);

  private loadState(): ThemeState {
    try {
      const storedState =
        this.localStorageService.getItem<Partial<ThemeState>>(
          this.storageKey,
        );

      const state: ThemeState = {
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
    case Theme.Lara:
      usePreset(Lara);
      return;

    case Theme.Nora:
      usePreset(Nora);
      return;

    case Theme.Aura:
    default:
      usePreset(Aura);
  }
}

  private applyColorMode(colorMode: ColorMode): void {
  this.document.documentElement.classList.toggle(
    this.darkModeClass,
    colorMode === ColorMode.Dark,
  );
}

  private isTheme(value: unknown): value is Theme {
    return Object.values(Theme).includes(value as Theme);
  }

  private isColorMode(value: unknown): value is ColorMode {
    return Object.values(ColorMode).includes(value as ColorMode);
  }
}
