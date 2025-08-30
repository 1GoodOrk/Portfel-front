import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';


import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    InfoDialogComponent,
    ButtonModule,
    TooltipModule,
    DividerModule,
    DialogModule,
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
  public visible: any = {
    info: false
  }

  public currentProject: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    budget: 0,
    budgetSource: '',
    processDuration: 0,
    profit: 0,
    traffic: 0,
    forecastProjectTaskAmount: 0,
    road: '',
    distance: 0,
    mainRoad: false,
    inTown: false,
    town: '',
    addressStart: '',
    addressEnd: '',
    des: '',
    img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    dateCreation: '',
    dateInitialization: '',
    permissionDuration: 0,
    score: 0,
    priority: 0,
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  }

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

  public showInfoProjectDialog(id?: string, tier?: string, event?: any): void {
    event.stopPropagation()
    if (id) {
      // TODO: type error
      // @ts-expect-error
      const index = this.data.projectIds[tier].findIndex((el: any) => el._id === id)
      // TODO: type error
      // @ts-expect-error
      Object.keys(this.data.projectIds[tier][index]).forEach((key: string) => {
        // TODO: type error
        // @ts-expect-error
        this.currentProject[key] = this.data.projectIds[tier][index][key]
      })
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    }
    this.visible.info = !this.visible.info
  }

  public visibleOnChange(key: string): void {
    this.appCommunicationService.emptyCurrentProject()
    this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    this.visible[key] = !this.visible[key]
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
          this.appCommunicationService.emptyCurrent()
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
