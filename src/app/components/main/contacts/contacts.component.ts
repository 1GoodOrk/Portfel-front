import { Component } from '@angular/core';

import { HeaderComponent } from '../../shared/organisms/header/header.component';
import { FooterComponent } from '../../shared/organisms/footer/footer.component';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-contacts',
  imports: [HeaderComponent, FooterComponent, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  public formData: any = {
    email: '',
    theme: '',
    comment: ''
  }

  constructor (private httpService: HttpService) {}

  public sendMessage () {
    this.httpService.sendMessage(this.formData)
    this.formData = {
      email: '',
      theme: '',
      comment: ''
    }
  }
}
