import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { IPortfolioDataRO } from '@port/interfaces';

@Component({
  selector: 'app-watch-one',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    TooltipModule,
    DividerModule,
    CardModule,
    TranslatePipe
  ],
  templateUrl: './watch-one.component.html',
  styleUrl: './watch-one.component.scss'
})
export class WatchOneComponent {
  public data: IPortfolioDataRO = {
    _id: '',
    name: '',
    img: '',
    des: '',
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    duration: 0,
    location: '',
    town: '',
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  }
  public showSpinner: boolean = false

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.currentPortfolio
  }


  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }
}
