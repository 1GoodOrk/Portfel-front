import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule, NgForm } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { HttpService } from '@port/services/http/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { FakeRequestService } from '@port/services/fake-request.service';

import { IFormUser } from '@port/interfaces';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InputTextModule,
    MessageModule,
    ButtonModule,
    CardModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    TooltipModule,
    SelectModule,
    ProgressSpinnerModule,
    TranslatePipe
  ],
  providers: [HttpService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public formData: IFormUser = {
    organization: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  public showSpinner: boolean = false

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private fakeRequestService: FakeRequestService,
    private httpService: HttpService
  ) {
    const user = JSON.parse(this.appCommunicationService.sessionStorageGet('user'))
    this.formData.organization = user.organization
    this.formData.email = user.email
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  private fakeRequest(form: NgForm):void {
    this.fakeRequestService.updateUser(this.formData)
    form.resetForm()
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.fakeRequest(form)
      // this.showSpinner = true
      // this.httpService.updateUser(localStorage.getItem('userID'), this.formData)
      //   .subscribe(() => {
      //     this.showSpinner = false
      //   })
    }
  }
}
