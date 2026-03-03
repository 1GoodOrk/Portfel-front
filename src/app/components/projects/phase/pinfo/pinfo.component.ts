import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
@Component({
  selector: 'app-pinfo',
  imports: [
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './pinfo.component.html',
  styleUrl: './pinfo.component.scss',
})
export class PinfoComponent {
  public currentPhase: any = {}

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router
  ) {
    this.currentPhase = this.appCommunicationService.getCurrentPhase()
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }
}
