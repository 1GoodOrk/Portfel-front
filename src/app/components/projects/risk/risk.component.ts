import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";

import { Times, Pencil, Eye } from '@primeicons/angular';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-risk',
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
  templateUrl: './risk.component.html',
  styleUrl: './risk.component.scss',
})
export class RiskComponent {
  public value = signal<string[]>([]);

  public data: any = {}
  public currentProject: any = {}
  public infoPageProjectValueKeys: any = []
  public visible: any = {
    creation: false,
    info: false
  }
  public chartData: any = {}
  public options: any = {}

  constructor(
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.infoPageProjectValueKeys = [...this.appCommunicationService.getInfoPageProjectValueKeys('risk')]
    this.data = this.appCommunicationService.getCurrentRisk()
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.changeCharts()
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public updateProject(): void {
    this.httpService
      .updateProject(this.currentProject._id, this.currentProject)
      .subscribe((data: any) => {})
  }

  private indexCalculation(data: any, mode?: string): any {
    let max = 0
    let multipleMax = 1
    const arr = ['iHuman', 'iExternal', 'iStructur', 'iFinance', 'iLegal', 'iSocial', 'iTechnical', 'iUnique', 'iAdaptability', 'iResources', 'iQuality', 'iTime']
    arr.forEach((el: any) => {
      if (data[el] > max) {
        max = data[el]
      }
      if (data[el]) {
        multipleMax = multipleMax * data[el]
      }
    })
    multipleMax = multipleMax ** (1 / 12)
    data.indexJudExpert = +(max - 12 / 11).toFixed(2)
    data.indexJudExpertRatio = +(data.indexJudExpert / 12).toFixed(2)
    data.digitalRiskIndex = +(multipleMax * data.influence / (data.probability * 10) * data.indexJudExpertRatio).toFixed(2)
    if (data.finalState !== 'Ситуація не вирішена') {
      data.disabled = true
      data.dateFinish = new Date().toISOString().split('T').join(' - ').split('Z')[0]
      data.control = 100
      if (data.finalState === 'Ситуація вирішено позитивно') {
        this.data.currentdigitalRiskIndex = this.data.currentdigitalRiskIndex > data.digitalRiskIndex ? +(this.data.currentdigitalRiskIndex - data.digitalRiskIndex).toFixed(2) : 0
        if (this.data.currentdigitalRiskIndex === 0) {
          this.data.control = 0
          this.data.status = 'Вирішено'
        } else {
          this.data.control = +(this.data.currentdigitalRiskIndex / this.data.digitalRiskIndex * 100).toFixed(2)
          this.data.status = this.data.control > 50 ? 'Загроза' : this.data.control > 5 ? 'Стабілізовано' : 'Вирішено'
        }
      } else if (data.finalState === 'Ситуація вирішено негативно') {
        this.data.currentdigitalRiskIndex = +(this.data.currentdigitalRiskIndex + data.digitalRiskIndex).toFixed(2)
        this.data.control = +(this.data.currentdigitalRiskIndex / this.data.digitalRiskIndex * 100).toFixed(2)
        this.data.status = this.data.control > 50 ? 'Загроза' : this.data.control > 5 ? 'Стабілізовано' : 'Вирішено'
      }
      this.changeCharts()
    }
    return data
  }

  public updateRisk(data: any): void {
    data = this.indexCalculation(data)
    this.currentProject.risks[this.currentProject.risks.findIndex((risk: any) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public createRisk(data: any): void {
    data = this.indexCalculation(data, 'new')
    if (!this.data.solutions) {
      this.data.solutions = []
    }
    this.data.solutions.push(data)
    this.currentProject.risks[this.currentProject.risks.findIndex((risk: any) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.data.solutionTableParams = {
      th: ['Назва', 'Вплив ситуації', 'Індекс впливу на ІЦР', 'Допустимий час реагування (к.дн)', 'Статус', 'Контроль', 'Взаємодія'],
      td: [],
      disabled: []
    }
    this.data.solutions.forEach((risk: any) => {
      this.data.solutionTableParams.td.push([risk.name, `${risk.influence * 10} %`, risk.digitalRiskIndex, `${risk.timeReaction}`, risk.finalState, `${risk.control} %`])
      this.data.solutionTableParams.disabled.push[risk.disabled]
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
    this.appCommunicationService.sendCreateData({ inputRowsName: 'solution', header: !index && index !== 0 ? 'Створити ситуацію' : 'Оновити ситуацію' })
  }

  public openDialogInfo(index: number): void {
    this.visible.info = true
    this.appCommunicationService.saveCurrentSolution(this.data.solutions[index])
    this.appCommunicationService.sendInfoData({ inputRowsName: 'solution', header: 'Інформація про ситуацію' })
  }

  private changeCharts(): void {
    const solutions = this.data.solutions.filter((solution: any) => solution.finalState !== 'Ситуація не вирішена')
    const labels = [this.data.dateCreation, ...solutions.map((solution: any) => solution.dateFinish)]
    let digitalRiskIndex = this.data.digitalRiskIndex
    const data = [this.data.digitalRiskIndex, ...solutions.map((solution: any) => {
      if (solution.finalState === 'Ситуація вирішено позитивно') {
        digitalRiskIndex = digitalRiskIndex - solution.digitalRiskIndex
      } else if (solution.finalState === 'Ситуація вирішено негативно') {
        digitalRiskIndex = digitalRiskIndex + solution.digitalRiskIndex
      }
      return digitalRiskIndex
    })]

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Крива актуальності',
          data: data,
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
