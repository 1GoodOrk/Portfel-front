import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
@Component({
  selector: 'app-solutions',
  imports: [
    ButtonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService
  ) {
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('analyze')
  }
}
