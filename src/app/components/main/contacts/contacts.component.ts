import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule, NgForm } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { HttpService } from '@port/services/http/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';

import { IFormMessage } from '@port/interfaces';

@Component({
  selector: 'app-contacts',
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    InputTextModule,
    TextareaModule,
    MessageModule,
    ButtonModule,
    CardModule,
    TooltipModule,
    TranslatePipe
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  public formData: IFormMessage = {
    email: '',
    theme: '',
    message: ''
  }

  constructor (
    private httpService: HttpService,
    private fakeRequestService: FakeRequestService
  ) {}

  private fakeRequest(form: NgForm):void {
    this.fakeRequestService.sendMessage(this.formData)
    form.resetForm()
  }

  public onSubmit (form: NgForm) {
    if (form.valid) {
      this.httpService.sendMessage(this.formData)
        .subscribe(() => { console.log('MESSAGE SENDED') })
      this.formData = {
        email: '',
        theme: '',
        message: ''
      }
      form.resetForm()
    }
  }
}
