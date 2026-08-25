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
    let multipleMax = 1
    const arr = ['iHuman', 'iOrgAdapt', 'iFinance', 'iAltLog', 'iStrucrt', 'iDig', 'iImport', 'iGeo', 'iConsLv']
    arr.forEach((el: any) => {
      if (data[el]) {
        multipleMax = multipleMax * data[el]
      }
    })
    data.indexFactor = +(multipleMax ** (1 / 9)).toFixed(2)
    if (data.control === 100) {
      data.dateFinish = (new Date()).toISOString()
    }
    return data
  }

  private recalcIndexRisk() {
    this.data.value = this.data.inf / 100 * this.data.prop
    this.data.solutions.forEach((sol: any) => {
      if (sol.control === 100) {
        this.data.value = this.data.value - (sol.influence / 100) * sol.indexFactor
      }
    })

    if (this.data.value < 0) {
      this.data.value = 0
    } else {
      this.data.value = +this.data.value.toFixed(2)
    }
    if (this.data.value < 5) {
      this.data.dateFinish = (new Date()).toISOString()
    }
    this.data.status = this.data.value > 75 ?
      'Критичний' :
      this.data.value > 50 ? 'Високий' :
      this.data.value > 25 ? 'Помірний' : 'Низький'
  }

  public recalcIndexes(): void {
    this.currentProject.options.continuity = +(this.currentProject.risks.filter((r: any) => r.value >= 5).reduce((a: number, b: any) => a + (100 - b.value), 0) ** (1 / this.currentProject.risks.filter((r: any) => r.value >= 5).length)).toFixed(2)
    this.currentProject.options.perseverance = +(100 - (this.currentProject.risks.filter((r: any) => r.value >= 5).reduce((a: number, b: any) => a + b.value, 0) / this.currentProject.risks.filter((r: any) => r.value >= 5).length)).toFixed(2)
    this.changeCharts()
  }

  public updateRisk(data: any): void {
    data = this.indexCalculation(data)
    this.recalcIndexRisk()
    this.currentProject.risks[this.currentProject.risks.findIndex((risk: any) => risk._id === this.data._id)] = this.data
    this.visible.creation = false
    this.recalcIndexes()
    this.recreateTable()
    this.updateProject()
  }

  public createRisk(data: any): void {
    data = this.indexCalculation(data, 'new')
    if (!this.data.solutions) {
      this.data.solutions = []
    }
    this.data.solutions.push(data)
    this.recalcIndexRisk()
    this.currentProject.risks[this.currentProject.risks.findIndex((risk: any) => risk._id === this.data._id)] = this.data
    this.recalcIndexes()
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.data.solutionTableParams = {
      th: ['Назва', 'Вплив рішення (-100 - 100)', 'Індекс впливу на ІЦР', 'Виконання  %', 'Взаємодія'],
      td: [],
      disabled: []
    }
    this.data.solutions.forEach((risk: any) => {
      this.data.solutionTableParams.td.push([risk.name, `${risk.influence} %`, risk.indexFactor, `${risk.control} %`])
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
    console.log(this.data)
    const solutions = this.data.solutions.filter((solution: any) => solution.control === 100)
    const labels = [this.data.dateCreation, ...solutions.map((solution: any) => solution.dateFinish)]
    let value = this.data.inf / 100 * this.data.prop
    // let digitalRiskIndex = this.data.digitalRiskIndex
    const data = [value, ...solutions.map((solution: any) => {
      console.log(solution.control)
      if (solution.control === 100) {
        value = this.data.value - (solution.influence / 100) * solution.indexFactor
      }
      return value
    })]

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Крива оцінки ризику',
          data: data,
          fill: false,
          borderColor: 'darkcyan',
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
            color: 'black'
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
