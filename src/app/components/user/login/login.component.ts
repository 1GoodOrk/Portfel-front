import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TranslatePipe,
  TranslateService
} from "@ngx-translate/core";
import translationsEN from "@port/asserts/i18n/en.json";
import translationsRU from "@port/asserts/i18n/ru.json";
import translationsUA from "@port/asserts/i18n/ua.json";

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FormsModule } from '@angular/forms';
import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { IUserData } from '@port/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    MessageModule,
    ButtonModule,
    CardModule,
    FormsModule,
    TooltipModule,
    SelectModule,
    ProgressSpinnerModule,
    TranslatePipe
  ],
  providers: [TranslateService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public user: any = {
    email: '',
    password: '',
    terms: false
  };
  public error: undefined | Error

  public showSpinner: boolean = false
  public languages: Array<string> = ['en', 'ua'];
  public selectedLanguage: string = 'ua';
  private langJson: any = {
    en: translationsEN,
    ru: translationsRU,
    ua: translationsUA
  }

  constructor (
    private router: Router,
    private translate: TranslateService,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.httpService.testLocalData()
  }

  public changeLanguage (): void {
    this.translate.setTranslation(this.selectedLanguage, this.langJson[this.selectedLanguage])
    // TODO save current lang in service?
    // this.dataFormattingService.lang = this.selectedLanguage
    this.translate.use(this.selectedLanguage)
  }

  public navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  public onSubmit(form: any): void {
    if (form.valid) {
      this.showSpinner = true

      this.httpService
        .loginLocal(this.user)
        .then((data: IUserData) => {
          this.appCommunicationService.sessionStorageSave('user', JSON.stringify(data))
          this.showSpinner = false
          form.resetForm()
          this.navigate('main')
        })
      // this.httpService.login(this.user)
      //   .subscribe((data: IUserData) => {
      //     this.appCommunicationService.sessionStorageSave('user', JSON.stringify(data))
      //     this.showSpinner = false
      //     form.resetForm()
      //     this.navigate('main')
      //   })
    }
  }
}
