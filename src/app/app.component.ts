import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";

import translationsEN from "../asserts/i18n/en.json";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ru', 'ua', 'en']);
    this.translate.setTranslation('en', translationsEN);
    // TODO: check deprecated and remove
    // this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
