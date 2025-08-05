import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { InputTextModule } from 'primeng/inputtext';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { HttpService } from '@port/services/http.service';

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
  public user: any = {
    organization: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  public showSpinner: boolean = false

  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public onSubmit(form: any): void {
    if (form.valid) {
      this.showSpinner = true
      this.httpService.updateUser(localStorage.getItem('userID'), this.user)
        .subscribe(() => {
          this.showSpinner = false
        })
    }
  }
}
