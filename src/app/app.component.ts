import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { locale as englishLocale } from '../assets/i18n/en';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-boiler';

  constructor(
    private translateService: TranslateService,
    private translationService: TranslationService
  ) {
    this.translateService.addLangs(['en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.translationService.loadTranslation(englishLocale);
  }
}
