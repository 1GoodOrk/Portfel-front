import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TranslatePipe,
  TranslateService
} from "@ngx-translate/core";
import translationsEN from "@port/asserts/i18n/en.json";
import translationsRU from "@port/asserts/i18n/ru.json";
import translationsUA from "@port/asserts/i18n/ua.json";
import { FormsModule, NgForm } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { FakeRequestService } from '@port/services/fake-request.service';

import { IFormUser, IUserData } from '@port/interfaces';

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
  public formData: IFormUser = {
    email: '',
    password: ''
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
    private fakeRequestService: FakeRequestService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.changeLanguage()
  }

  public changeLanguage (): void {
    this.translate.setTranslation(this.selectedLanguage, this.langJson[this.selectedLanguage])
    this.translate.use(this.selectedLanguage)
  }

  public navigate(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  private fakeRequest(form: NgForm): void {
    const data = this.fakeRequestService.login(this.formData)
    this.appCommunicationService.sessionStorageSave('user', JSON.stringify(data))
    form.resetForm()
    this.navigate('main')
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      // this.fakeRequest(form)
      this.showSpinner = true
      this.httpService.login(this.formData)
        .subscribe((data: IUserData) => {
          this.appCommunicationService.sessionStorageSave('user', JSON.stringify(data))
          this.showSpinner = false
          form.resetForm()
          this.navigate('main')
        })
    }
  }
}
