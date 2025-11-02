import { Component, OnDestroy } from '@angular/core';
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
import { AppCommunicationService } from '@port/services/app-communication.service';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Component({
  selector: 'app-watch-one',
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
  templateUrl: './watch-one.component.html',
  styleUrl: './watch-one.component.scss'
})
export class WatchOneComponent implements OnDestroy {
  public data: IPortfolioDataRO = {
    _id: '',
    name: '',
    img: '',
    des: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    responsibleOrganization: '',
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    location: '',
    town: ''
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
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    managerName: '',
    managerSurname: '',
    managerLastname: '',
    responsibleOrganization: '',
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
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.currentPortfolio
    console.log(this.data)
  }

  public visibleOnChange(key: string): void {
    this.appCommunicationService.emptyCurrentProject()
    this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    this.visible[key] = !this.visible[key]
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
        // @ts-expect-error
        this.currentProject[key] = this.data.projectIds[tier][index][key]
      })
      this.currentProject.dateCreation = new Date(this.currentProject.dateCreation)
      this.currentProject.dateInitialization = new Date(this.currentProject.dateInitialization)
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    }
    this.visible.info = !this.visible.info
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public ngOnDestroy(): void {
    this.appCommunicationService.emptyCurrent()
  }
}
