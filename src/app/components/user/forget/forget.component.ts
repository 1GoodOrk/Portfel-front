import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TranslatePipe,
  TranslateService
} from "@ngx-translate/core";
import translationsEN from "@port/asserts/i18n/en.json";
import translationsRU from "@port/asserts/i18n/ru.json";
import translationsUA from "@port/asserts/i18n/ua.json";
import { HttpService } from '@port/services/http.service';

import { InputTextModule } from 'primeng/inputtext';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [
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
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  public user: any = {
    email: ''
  };
  public showInfoSend: boolean = false

  public showSpinner: boolean = false
  public languages: Array<string> = ['en', 'ua'];
  public selectedLanguage: string = 'ua';
  private langJson: any = {
    en: translationsEN,
    ru: translationsRU,
    ua: translationsUA
  }

  constructor(
    private router: Router,
    private translate: TranslateService,
    private httpService: HttpService
  ) { }

  public changeLanguage (): void {
    this.translate.setTranslation(this.selectedLanguage, this.langJson[this.selectedLanguage])
    this.translate.use(this.selectedLanguage)
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public onSubmit(form: any): void {
    if (form.valid) {
      this.showInfoSend = true
      this.showSpinner = true
      this.httpService.forgetLocal()
        .then(() => {
          this.showSpinner = false
          this.showInfoSend = true
          form.resetForm()
        })
      // this.httpService.forget(this.user)
      //   .subscribe(() => {
      //     this.showSpinner = false
      //     this.showInfoSend = true
      //     form.resetForm()
      //   })
    }
  }
}
