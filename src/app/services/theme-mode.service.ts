import { Injectable, OnDestroy, PLATFORM_ID, Renderer2, inject } from "@angular/core";
import { BehaviorSubject, Subject, map, takeUntil } from "rxjs";
import { ThemeMode } from "../models/theme-mode.enum";
import { isPlatformBrowser } from "@angular/common";

const THEME_MODE_STORAGE_KEY = 'theme_mode_storage_key';
export const DARK_MODE_CLASS = 'dark-mode';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService implements OnDestroy {
  platformId = inject(PLATFORM_ID);
  mode$ = new BehaviorSubject(this.initial);
  isDarkMode$ = this.mode$.pipe(map((mode) => mode === ThemeMode.DARK));
  destroyed$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  init(renderer: Renderer2, document: Document) {
    this.isDarkMode$.pipe(takeUntil(this.destroyed$)).subscribe((isDarkMode) => {
      if (isDarkMode) {
        renderer.addClass(document.documentElement, DARK_MODE_CLASS);
      } else {
        renderer.removeClass(document.documentElement, DARK_MODE_CLASS);
      }
    });
  }

  toggle() {
    this.mode$.next(this.mode$.getValue() === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
    this.savePreference();
  }

  private savePreference() {
    localStorage.setItem(THEME_MODE_STORAGE_KEY, this.mode$.getValue());
  }

  get initial(): ThemeMode {
    if (!isPlatformBrowser(this.platformId)) {
      return ThemeMode.LIGHT;
    }
    const storageValue = localStorage.getItem(THEME_MODE_STORAGE_KEY);
    return this.isValidValue(storageValue) ? storageValue : this.system;
  }

  private isValidValue(value: string): value is ThemeMode {
    return Object.values(ThemeMode).includes(value as ThemeMode);
  }

  get system(): ThemeMode {
    return window.matchMedia('(prefers-color-scheme: dark)') ? ThemeMode.DARK : ThemeMode.LIGHT;
  }
}
