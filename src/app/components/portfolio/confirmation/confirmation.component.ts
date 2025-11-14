import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

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
    ChartModule,
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

  public dataProjectValuation: any = {
    labels: [],
    datasets: [
      {
        label: 'Valuation',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }
  public basicProjectValuationOptions: any;
  public dataRiskScore: any = {
    labels: [],
    datasets: [
      {
        label: 'Risks',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }
  public basicRiskScoreOptions: any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private cd: ChangeDetectorRef,
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.currentPortfolio
    this.data.img = 'https://static.vecteezy.com/system/resources/previews/017/065/272/non_2x/portfolio-text-button-portfolio-sign-icon-label-sticker-web-buttons-vector.jpg'
    this.refreshCharts()
  }

  public refreshCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    this.dataRiskScore = {
      labels: [],
      datasets: [
        {
          label: 'Risks',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
    this.dataProjectValuation = {
      labels: [],
      datasets: [
        {
          label: 'Valuation',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
    // const projects: any = [...this.data.projectIds.tierI, ...this.data.projectIds.tierII, ...this.data.projectIds.tierIII]
    const projects: any = this.appCommunicationService.testProjArray
    projects.forEach((el: any) => {
      this.dataRiskScore.labels.push(el.name)
      this.dataProjectValuation.labels.push(el.name)
      this.dataRiskScore.datasets[0].data.push(el.riskScore)
      this.dataProjectValuation.datasets[0].data.push(el.projectValuation)
      this.dataRiskScore.datasets[0].backgroundColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
      this.dataProjectValuation.datasets[0].backgroundColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
      this.dataRiskScore.datasets[0].borderColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
      this.dataProjectValuation.datasets[0].borderColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
    })

    this.basicRiskScoreOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }
    this.basicProjectValuationOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }
    this.cd.markForCheck()
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
      this.currentProject.dateCreation = new Date(this.currentProject.dateCreation)
      this.currentProject.dateInitialization = new Date(this.currentProject.dateInitialization)
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
