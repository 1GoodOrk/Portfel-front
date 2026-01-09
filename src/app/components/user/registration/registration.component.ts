import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TranslatePipe,
  TranslateService
} from "@ngx-translate/core";
import translationsEN from "@port/asserts/i18n/en.json";
import translationsRU from "@port/asserts/i18n/ru.json";
import translationsUA from "@port/asserts/i18n/ua.json";
// import * as argon2 from 'argon2';

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
  selector: 'app-registration',
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
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  public user: any = {
    organization: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'USER'
  };
  public error: undefined | Error

  public showSpinner: boolean = false
  public languages: Array<string> = ['en', 'ua'];
  public types: Array<string> = ['USER', 'EXPERT'];
  public selectedLanguage: string = 'en';
  private langJson: any = {
    en: translationsEN,
    ru: translationsRU,
    ua: translationsUA
  }

  constructor(
    private router: Router,
    private translate: TranslateService,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) { }

  public changeLanguage (): void {
    this.translate.setTranslation(this.selectedLanguage, this.langJson[this.selectedLanguage])
    this.translate.use(this.selectedLanguage)
  }

  public navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  public async onSubmit(form: any): Promise<void> {
    if (form.valid) {
      this.showSpinner = true
      this.httpService.registration({
        email: this.user.email,
        password: this.user.password,
        organization: this.user.organization,
        type: this.user.type
      })
        .subscribe((data: IUserData) => {
          this.appCommunicationService.sessionStorageSave('user', JSON.stringify({ data }))
          form.resetForm()
          this.showSpinner = false
          this.navigate('main')
        })
    }
  }
}
