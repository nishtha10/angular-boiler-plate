import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration = 5000;
  currentLang: string = environment.defaultLanguage;
  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.languageOnChange();
  }

  languageOnChange() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  displaySnackBar(
    message: string,
    type: 'info' | 'error' | 'warning' | 'success',
    duration?: number
  ) {
    let msg = this.translateService.translations[this.currentLang][message];
    if (msg === undefined) {
      msg = message;
    }

    if (duration) {
      this.duration = duration;
    }

    this.snackBar.open(msg, 'X', {
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type + '-snackbar'],
    });
  }
}
