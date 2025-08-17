import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TranslatePipe,
  TranslateService
} from "@ngx-translate/core";

import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

import translationsEN from "@port/asserts/i18n/en.json";
import translationsRU from "@port/asserts/i18n/ru.json";
import translationsUA from "@port/asserts/i18n/ua.json";
import { FormsModule } from '@angular/forms';
import { AppCommunicationService } from '@port/services/app-communication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    SelectModule,
    TooltipModule,
    TranslatePipe
  ],
  providers: [TranslateService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public items = [
    { label: 'main', path: 'main' },
    { label: 'about', path: 'about' },
    { label: 'contacts', path: 'contacts' },
  ]
  public languages: Array<string> = ['en', 'ru', 'ua'];
  public selectedLanguage: string = 'en';
  private langJson: any = {
    en: translationsEN,
    ru: translationsRU,
    ua: translationsUA
  }

  constructor (
    private router: Router,
    private translate: TranslateService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.selectedLanguage = this.appCommunicationService.lang
     this.translate.use(this.selectedLanguage)
  }

  public navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  public changeLanguage (): void {
    this.translate.setTranslation(this.selectedLanguage, this.langJson[this.selectedLanguage])
    this.appCommunicationService.lang = this.selectedLanguage
    this.translate.use(this.selectedLanguage)
  }

}
