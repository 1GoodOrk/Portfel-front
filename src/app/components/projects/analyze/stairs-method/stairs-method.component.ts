import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Times, Pencil, Eye } from '@primeicons/angular';
import { FormsModule, NgForm } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
@Component({
  selector: 'app-stairs-method',
  imports: [
    FormsModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    ChartModule,
    HeaderComponent,
    FooterComponent,
    InfoDialogComponent,
    CreationDialogComponent,
    Times, Pencil, Eye
  ],
  templateUrl: './stairs-method.component.html',
  styleUrl: './stairs-method.component.scss',
})
export class StairsMethodComponent {
  // Расчитать Проектную составляющую
  // Расчитать Операционную составляющую
  // Расчитать взаимодействие между ними
  // Расчитать коэффичиент грузового риска
  // Расчитать интергрированне значение риска
  // Определить категорию риска
  // Отсортировать по табам и значению рисков
  public current: any = {}
  public currentRiskTables: any = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Рівень інтегрованого ризику (Низький, Помірний, Високий, Критичний)', 'Актуальність %', 'Взаємодія'],
    td: []
  }
  public currentProject: any = {}
  public currentMode: string = 'All'
  public basicData: any = {}
  public basicOptions: any = {}
  // public stairsFactorData: any = []

  public inputs: any = {}

  public visible: any = {
    info: false
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (!this.currentProject.analyze.stairs) {
      this.currentProject.analyze.stairs = []
    }
    this.currentProject.analyze.stairs = this.currentProject.analyze.stairs.map((el: any) => {
      el = this.indexCalculation(el)
      return el
    })
    this.recreateTable()
    // if (this.currentProject.analyze.stairsFactorData) {
    //   this.createCharts()
    // }
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('analyze')
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }

  public updateProject(): void {
    this.httpService
      .updateProject(this.currentProject._id, this.currentProject)
      .subscribe((data: any) => {})
  }

  private indexCalculation(data: any, mode?: string): any {
    data.value = +(data.probability * data.influence / 100).toFixed(2)
    data.firstValue = data.value
    if (!data.dateCreation) {
      data.dateCreation = new Date().toISOString().split('T').join(' - ').split('Z')[0]
    }
    data.projectValue = +(data.aCoef * data.value / 100).toFixed(2)
    data.operationValue = +(data.bCoef * data.value / 100).toFixed(2)
    data.doubleValue = +(data.yCoef * data.value / 100).toFixed(2)
    data.integrateValue = +((data.projectValue + data.operationValue + data.doubleValue) / 3).toFixed(2)
    data.status = data.value > 75 ?
      'Критичний' :
      data.value > 50 ? 'Високий' :
      data.value > 25 ? 'Помірний' : 'Низький'
    return data
  }

  public updateRisk(data: any): void {
    data = this.indexCalculation(data)
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public createRisk(data: any): void {
    data = this.indexCalculation(data, 'new')
    if (!this.currentProject.analyze.stairs) {
      this.currentProject.analyze.stairs = []
    }
    this.currentProject.analyze.stairs.push(data)
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.currentProject.analyze.stairsRisksTableParams = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Рівень інтегрованого ризику (Низький, Помірний, Високий, Критичний)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.stairs.forEach((risk: any) => {
      this.currentProject.analyze.stairsRisksTableParams.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
    })
    this.tableFilter()
  }

  private refreshTable(): void {
    this.currentRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Рівень інтегрованого ризику (Низький, Помірний, Високий, Критичний)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.stairs.forEach((risk: any) => {
      this.currentRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
    })
  }

  public tableFilter(mode?: string): void {
    if (mode) {
      this.currentMode = mode
    }
    this.refreshTable()
    if (this.currentMode === 'Unused' || this.currentMode === 'Used') {
      this.currentRiskTables.td = this.currentRiskTables.td.filter((risk: any) => this.currentMode === 'Unused' ? risk[5].split(' %')[0] <= 50 : risk[5].split(' %')[0] > 50)
    } else if (this.currentMode !== 'All') {
      this.currentRiskTables.td = this.currentRiskTables.td.filter((risk: any) => risk[4] === this.currentMode)
    }
    this.recreateCharts()
  }

  public openDialogInfo(index: number): void {
    this.visible.info = true
    this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze.stairs[index])
    this.appCommunicationService.sendInfoData({ inputRowsName: 'stairs', header: 'Інформація про ризик' })
  }

  public openDialogAddUpdateRow(index?: number): void {
    this.visible.creation = true
    if (!index && index !== 0) {
      this.appCommunicationService.saveCurrentRisk(null)
    } else {
      this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze.stairs[index])
    }
    this.appCommunicationService.sendCreateData({ inputRowsName: 'stairs', header: !index && index !== 0 ? 'Створити ризик' : 'Оновити ризик' })
  }

  public remove(index: number): void {
    this.currentProject.analyze.stairs.splice(index, 1)
    this.updateProject()
  }

  public recreateCharts () {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const calculation = {
      used: 0,
      unused: 0,
      critical: 0,
      high: 0,
      middle: 0,
      low: 0
    }
    this.currentRiskTables.td.forEach((el: any) => {
      el[5].split(' %')[0] <= 50 ? calculation.unused++ : calculation.used++
      el[4] === 'Критичний' ? calculation.critical++ :
        el[4] === 'Високий' ? calculation.high++ :
        el[4] === 'Помірний' ? calculation.middle++ : calculation.low++
    });
    this.basicData = {
      labels: ['Критичні', 'Високі', 'Помірні', 'Низькі', 'Істотні', 'Неістотні'],
      datasets: [
        {
          label: 'Ризики',
          data: [calculation.critical, calculation.high, calculation.middle, calculation.low, calculation.used, calculation.unused],
          backgroundColor: ['red', 'darkred', 'darkgoldenrod', 'darkgreen', 'rgba(29, 227, 227, 0.9)', 'rgba(153, 102, 255, 0.9)'],
          borderColor: ['rgb(188, 7, 7)', 'rgb(101, 3, 3)', 'rgb(255, 201, 64)', 'rgb(5, 111, 21)', 'rgb(21, 159, 251)', 'rgb(55, 7, 152)'],
          borderWidth: 1
        }
      ]
    };

    console.log(this.basicData)

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
