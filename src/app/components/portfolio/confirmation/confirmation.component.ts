import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';


import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { IPortfolioDataRO } from '@port/interfaces';

@Component({
  selector: 'app-confirmation',
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
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
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
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.currentPortfolio
    this.data.img = 'https://static.vecteezy.com/system/resources/previews/017/065/272/non_2x/portfolio-text-button-portfolio-sign-icon-label-sticker-web-buttons-vector.jpg'
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public createPorfolio(): void {
    this.showSpinner = true
    this.data.projects = this.data.projectIds.tierI.length + this.data.projectIds.tierII.length + this.data.projectIds.tierIII.length
    Object.keys(this.data.projectIds).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.data.projectIds[key] = this.data.projectIds[key].map((el: any) => el._id)
    })
    if (this.data._id) {
      this.httpService.updatePortfolio(this.data._id, this.data)
        .subscribe(() => {
          this.showSpinner = false
          const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
          user.data.projectIds.push(this.data._id)
          this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
          this.appCommunicationService.currentPortfolio = {
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
          this.navigate('main')
        })
    } else {
      this.httpService.createPortfolio(this.data, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
        .subscribe(() => {
          this.showSpinner = false
          this.navigate('main')
        })
    }
  }
}
