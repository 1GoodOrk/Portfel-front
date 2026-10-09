import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { DatePipe } from '@angular/common';

import { Times, Pencil, Eye } from '@primeicons/angular';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';

import {
  EDialogVisibilityKeys,
  EInputRowsName,
  ERiskButterflyStatus,
  ERiskStairsStatus,
  ESolutionFinalStatus,
  IChartsLineDataContainer,
  IChartsLineOptionsContainer,
  IDialogVisibility,
  IInfoRow,
  IProjectData,
  IRiskButterflyData,
  IRiskStairsData,
  ISolutionData
} from '@port/interfaces';

@Component({
  selector: 'app-current',
  imports: [
    HeaderComponent,
    FooterComponent,
    InfoDialogComponent,
    CreationDialogComponent,
    DividerModule,
    AccordionModule,
    ButtonModule,
    ChartModule,
    TableModule,
    TranslatePipe,
    DatePipe,
    Times, Pencil, Eye
  ],
  templateUrl: './current.component.html',
  styleUrl: './current.component.scss',
})
export class CurrentComponent {
  public data!: IRiskButterflyData | IRiskStairsData | any
  public currentGroup: string = ''
  public currentProject!: IProjectData
  public infoPageProjectValueKeys: Array<IInfoRow> = []
  public visible: IDialogVisibility = {
    creation: false,
    info: false
  }
  public chartData!: IChartsLineDataContainer
  public options!: IChartsLineOptionsContainer

  constructor(
    private router: Router,
    private httpService: HttpService,
    private fakeRequestService: FakeRequestService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.data = this.appCommunicationService.getCurrentRisk()
    this.currentGroup = this.appCommunicationService.getCurrentGroup()
    this.infoPageProjectValueKeys = [...this.appCommunicationService.getInfoPageProjectValueKeys(`${this.currentGroup}Acc`)]
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (this.data?.solutions) {
      this.recreateTable()
      this.changeCharts()
    }
  }

  public visibleOnChange(key: EDialogVisibilityKeys): void {
    this.visible[key] = !this.visible[key]
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  private fakeRequest(id: string, data: IProjectData): void {
    this.fakeRequestService.updateProject(id, data)
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
  }

  public updateProject(): void {
    this.httpService
      .updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
      })
  }


  private indexCalculation(data: ISolutionData): ISolutionData {
    data.value = +(data.probability * data.influence / 100).toFixed(2)
    data.valueInfluence = +(data.probability * data.influence / 100).toFixed(2)
    if (data.finalState !== ESolutionFinalStatus.inProgress) {
      data.dateFinish = new Date().toISOString().split('T').join(' - ').split('Z')[0]
      data.control = 100
      this.changeCharts()
    }
    return data
  }

  private riskButterflyValueRecalculation(): void {
    this.data.value = this.data.firstValue
    this.data.solutions.forEach((data: ISolutionData) => {
      if (data.finalState === ESolutionFinalStatus.success) {
        this.data.value = this.data.value > data.value ? +(this.data.value - data.value).toFixed(2) : 0
        if (this.data.value === 0) {
          this.data.status = ERiskButterflyStatus.low
        } else {
          this.data.status = this.data.value > 75 ? ERiskButterflyStatus.critical : this.data.value > 50 ? ERiskButterflyStatus.high : this.data.value > 25 ? ERiskButterflyStatus.middle : ERiskButterflyStatus.low
        }
      } else if (data.finalState === ESolutionFinalStatus.unsuccess) {
        this.data.value = +(this.data.value + data.value).toFixed(2)
        this.data.status = this.data.value > 75 ? ERiskButterflyStatus.critical : this.data.value > 50 ? ERiskButterflyStatus.high : this.data.value > 25 ? ERiskButterflyStatus.middle : ERiskButterflyStatus.low
      }
    })
  }

  private riskStairsValueRecalculation(): void {
    this.data.value = this.data.firstValue
    this.data.solutions.forEach((data: ISolutionData) => {
      if (data.finalState === ESolutionFinalStatus.success) {
        this.data.value = this.data.value > data.value ? +(this.data.value - data.value).toFixed(2) : 0
        if (this.data.value === 0) {
          this.data.status = ERiskStairsStatus.low
        } else {
          this.data.status = this.data.value > 75 ? ERiskStairsStatus.critical : this.data.value > 50 ? ERiskStairsStatus.high : this.data.value > 25 ? ERiskStairsStatus.middle : ERiskStairsStatus.low
        }
      } else if (data.finalState === ESolutionFinalStatus.unsuccess) {
        this.data.value = +(this.data.value + data.value).toFixed(2)
        this.data.status = this.data.value > 75 ? ERiskStairsStatus.critical : this.data.value > 50 ? ERiskStairsStatus.high : this.data.value > 25 ? ERiskStairsStatus.middle : ERiskStairsStatus.low
      }
    })
  }

  public updateSolution(data: ISolutionData): void {
    data = this.indexCalculation(data)
    this.currentGroup === 'stairs' ? this.riskStairsValueRecalculation() : this.riskButterflyValueRecalculation()
    this.currentProject.analyze[this.currentGroup][this.currentProject.analyze[this.currentGroup].findIndex((risk: IRiskButterflyData | IRiskStairsData) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public createSolution(data: ISolutionData): void {
    data = this.indexCalculation(data)
    if (!this.data.solutions) {
      this.data.solutions = []
    }
    this.data.solutions.push(data)
    this.currentGroup === 'stairs' ? this.riskStairsValueRecalculation() : this.riskButterflyValueRecalculation()
    this.currentProject.analyze[this.currentGroup][this.currentProject.analyze[this.currentGroup].findIndex((risk: IRiskButterflyData | IRiskStairsData) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.data.solutionTableParams = {
      th: ['Назва', 'Ймовірність стабілізації ризику (1 - 100)', 'Вплив рішення на стабілізацію ризику (1 - 100)', 'Ймовірні наслідки', 'Статус (позитивно, негативно, без впливу, не вирішено)', 'Реалізація %', 'Взаємодія'],
      td: []
    }
    this.data.solutions.forEach((solution: ISolutionData) => {
      this.data.solutionTableParams.td.push([solution.name, `${solution.probability} %`, `${solution.value}`, solution.consequences, solution.finalState, `${solution.control} %`])
    })
  }

  public remove(index: number): void {
    this.data.solutions.splice(index, 1)
  }

  public openDialogAddUpdateRow(index?: number): void {
    this.visible.creation = true
    if (!index && index !== 0) {
      this.appCommunicationService.saveCurrentSolution(null)
    } else {
      this.appCommunicationService.saveCurrentSolution(this.data.solutions[index])
    }
    this.appCommunicationService.sendCreateData({ inputRowsName: EInputRowsName.solution, header: !index && index !== 0 ? 'Створити рішення' : 'Оновити рішення' })
  }

  public openDialogInfo(index: number): void {
    this.visible.info = true
    this.appCommunicationService.saveCurrentSolution(this.data.solutions[index])
    this.appCommunicationService.sendInfoData({ inputRowsName: EInputRowsName.solution, header: 'Інформація про рішення' })
  }

  private changeCharts(): void {
    if (!this.data.solutions) {
      return
    }
    const solutions = this.data.solutions.filter((solution: any) => solution.finalState !== ESolutionFinalStatus.inProgress)
    const labels = [this.data.dateCreation, ...solutions.map((solution: any) => solution.dateFinish)]
    let secDigitalRiskIndex = this.data.firstValue
    const dataAk = [this.data.firstValue, ...solutions.map((solution: any) => {
      if (solution.finalState === ESolutionFinalStatus.success) {
        secDigitalRiskIndex = secDigitalRiskIndex - solution.value
      } else if (solution.finalState === ESolutionFinalStatus.unsuccess) {
        secDigitalRiskIndex = secDigitalRiskIndex + solution.value
      }
      return secDigitalRiskIndex
    })]

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Крива актуальності',
          data: dataAk,
          fill: false,
          borderColor: 'darkred',
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: 'darkred'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'black'
          },
          grid: {
            color: '#cecece',
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: 'black'
          },
          grid: {
            color: '#cecece',
            drawBorder: false
          }
        }
      }
    };
  }
}
