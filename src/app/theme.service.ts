import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _isDarkMode = signal<boolean>(false);
  
  public isDarkMode = this._isDarkMode.asReadonly();

  toggleTheme() {
    this._isDarkMode.update(val => !val);
  }
}