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

import { InputTextModule } from 'primeng/inputtext';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { HttpService } from '@port/services/http/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';
import { IFormUser } from '@port/interfaces';

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
  public formData: IFormUser = {
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
    private fakeRequestService: FakeRequestService,
    private httpService: HttpService
  ) {
    this.changeLanguage()
  }

  public changeLanguage (): void {
    this.translate.setTranslation(this.selectedLanguage, this.langJson[this.selectedLanguage])
    this.translate.use(this.selectedLanguage)
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  private fakeRequest(form: NgForm):void {
    this.fakeRequestService.forget(this.formData)
    form.resetForm()
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.showInfoSend = true
      this.fakeRequest(form)
      // this.showSpinner = true
      // this.httpService.forget(this.formData)
      //   .subscribe(() => {
      //     this.showSpinner = false
      //     this.showInfoSend = true
      //     form.resetForm()
      //   })
    }
  }
}
