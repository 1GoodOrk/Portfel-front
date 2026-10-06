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
  public value = signal<string[]>([]);

  public data: any = {}
  public currentGroup: string = ''
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
    this.data = this.appCommunicationService.getCurrentRisk()
    this.currentGroup = this.appCommunicationService.getCurrentGroup()
    this.infoPageProjectValueKeys = [...this.appCommunicationService.getInfoPageProjectValueKeys(`${this.currentGroup}Acc`)]
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (this.data.solutions) {
      this.recreateTable()
      this.changeCharts()
    }
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

  private indexCalculation(data: any): any {
    data.value = +(data.probability * data.influence / 100).toFixed(2)
    data.valueInfluence = +(data.probability * data.influence / 100).toFixed(2)
    if (data.finalState !== 'Рішення не реалізовано') {
      data.disabled = true
      data.dateFinish = new Date().toISOString().split('T').join(' - ').split('Z')[0]
      data.control = 100
      this.changeCharts()
    }
    return data
  }

  private riskValueRecalculation() {
    this.data.value = this.data.firstValue
    this.data.solutions.forEach((data: any) => {
      if (data.finalState === 'Рішення реалізовано') {
        this.data.value = this.data.value > data.value ? +(this.data.value - data.value).toFixed(2) : 0
        if (this.data.value === 0) {
          this.data.status = 'Низька'
        } else {
          this.data.status = this.data.value > 75 ? 'Критична' : this.data.value > 50 ? 'Висока' : this.data.value > 25 ? 'Помірна' : 'Низька'
        }
      } else if (data.finalState === 'Рішення реалізовано з негативним результатом') {
        this.data.value = +(this.data.value + data.value).toFixed(2)
        this.data.status = this.data.value > 75 ? 'Критична' : this.data.value > 50 ? 'Висока' : this.data.value > 25 ? 'Помірна' : 'Низька'
      }
    })
  }

  public updateRisk(data: any): void {
    data = this.indexCalculation(data)
    this.riskValueRecalculation()
    this.currentProject.analyze[this.currentGroup][this.currentProject.analyze[this.currentGroup].findIndex((risk: any) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public createRisk(data: any): void {
    data = this.indexCalculation(data)
    if (!this.data.solutions) {
      this.data.solutions = []
    }
    this.data.solutions.push(data)
    this.riskValueRecalculation()
    this.currentProject.analyze[this.currentGroup][this.currentProject.analyze[this.currentGroup].findIndex((risk: any) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.data.solutionTableParams = {
      th: ['Назва', 'Ймовірність стабілізації ризику (1 - 100)', 'Вплив рішення на стабілізацію ризику (1 - 100)', 'Ймовірні наслідки', 'Статус (позитивно, негативно, без впливу, не вирішено)', 'Реалізація %', 'Взаємодія'],
      td: [],
      disabled: []
    }
    this.data.solutions.forEach((solution: any) => {
      this.data.solutionTableParams.td.push([solution.name, `${solution.probability} %`, solution.value, solution.consequences, solution.finalState, `${solution.control} %`])
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
    this.appCommunicationService.sendCreateData({ inputRowsName: 'solution', header: !index && index !== 0 ? 'Створити рішення' : 'Оновити рішення' })
  }

  public openDialogInfo(index: number): void {
    this.visible.info = true
    this.appCommunicationService.saveCurrentSolution(this.data.solutions[index])
    this.appCommunicationService.sendInfoData({ inputRowsName: 'solution', header: 'Інформація про рішення' })
  }

  private changeCharts(): void {
    if (!this.data.solutions) {
      return
    }
    const solutions = this.data.solutions.filter((solution: any) => solution.finalState !== 'Рішення не реалізовано')
    const labels = [this.data.dateCreation, ...solutions.map((solution: any) => solution.dateFinish)]
    let secDigitalRiskIndex = this.data.firstValue
    const dataAk = [this.data.firstValue, ...solutions.map((solution: any) => {
      if (solution.finalState === 'Рішення реалізовано') {
        secDigitalRiskIndex = secDigitalRiskIndex - solution.value
      } else if (solution.finalState === 'Рішення реалізовано з негативним результатом') {
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
