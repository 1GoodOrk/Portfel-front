import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';


import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

import { HttpService } from '@port/services/http.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

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
  public formData: any = {
    email: '',
    theme: '',
    message: ''
  }

  constructor (private httpService: HttpService) {}

  public onSubmit (form: any) {
    if (form.valid) {
      this.httpService.sendMessage(this.formData)
        .subscribe(() => {})
      this.formData = {
        email: '',
        theme: '',
        message: ''
      }
      form.resetForm()
    }
  }
}
