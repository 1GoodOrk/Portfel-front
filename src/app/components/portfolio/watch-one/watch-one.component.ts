import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
    ChartModule,
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
    private cd: ChangeDetectorRef,
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.currentPortfolio
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
