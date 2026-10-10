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
import { HttpService } from '@port/services/http/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';

import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
import {
  EDialogVisibilityKeys,
  EInputRowsName,
  ERiskStairsStatus,
  ESolutionFinalStatus,
  EStairsFilterModes,
  IChartsBarDataContainer,
  IChartsBarOptionsContainer,
  IDialogVisibility,
  IProjectData,
  IRiskStairsData,
  ISolutionData,
  ITableContainer
} from '@port/interfaces';
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
  public current: any = {}
  public currentRiskTables: ITableContainer<string> = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Рівень інтегрованого ризику (Низький, Помірний, Високий, Критичний)', 'Актуальність %', 'Взаємодія'],
    td: []
  }
  public currentProject!: IProjectData
  public currentMode: EStairsFilterModes = EStairsFilterModes.all
  public basicData!: IChartsBarDataContainer
  public basicOptions!: IChartsBarOptionsContainer

  public visible: IDialogVisibility = {
    info: false,
    creation: false
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private fakeRequestService: FakeRequestService,
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

  public get eStairsFilterModes(): typeof EStairsFilterModes {
    return EStairsFilterModes
  }

  public get eRiskStairsStatus(): typeof ERiskStairsStatus {
    return ERiskStairsStatus
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  public back(): void {
    this.navigate('analyze')
  }

  public visibleOnChange(key: EDialogVisibilityKeys): void {
    this.visible[key] = !this.visible[key]
  }

  private fakeRequest(id: string, data: IProjectData): void {
    this.fakeRequestService.updateProject(id, data)
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
  }

  public updateProject(): void {
    this.fakeRequest(this.currentProject._id, this.currentProject)
    // this.httpService
    //   .updateProject(this.currentProject._id, this.currentProject)
    //   .subscribe(() => {
    //     this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
    //   })
  }

  private indexCalculation(data: IRiskStairsData): IRiskStairsData {
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
      ERiskStairsStatus.critical :
      data.value > 50 ? ERiskStairsStatus.high :
      data.value > 25 ? ERiskStairsStatus.middle : ERiskStairsStatus.low
    if (data.solutions && data.solutions.length) {
      data = this.riskValueRecalculation(data)
    }
    return data
  }

  private riskValueRecalculation(data: IRiskStairsData): IRiskStairsData {
    data.value = data.firstValue
    data.solutions.forEach((dataSolution: ISolutionData) => {
      if (dataSolution.finalState === ESolutionFinalStatus.success) {
        data.value = data.value > dataSolution.value ? +(data.value - dataSolution.value).toFixed(2) : 0
        if (data.value === 0) {
          data.status = ERiskStairsStatus.low
        } else {
          data.status = data.value > 75 ? ERiskStairsStatus.critical : data.value > 50 ? ERiskStairsStatus.high : data.value > 25 ? ERiskStairsStatus.middle : ERiskStairsStatus.low
        }
      } else if (dataSolution.finalState === ESolutionFinalStatus.unsuccess) {
        data.value = +(data.value + dataSolution.value).toFixed(2)
        data.status = data.value > 75 ? ERiskStairsStatus.critical : data.value > 50 ? ERiskStairsStatus.high : data.value > 25 ? ERiskStairsStatus.middle : ERiskStairsStatus.low
      }
    })
    return data
  }

  public updateRisk(data: IRiskStairsData): void {
    data = this.indexCalculation(data)
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public createRisk(data: IRiskStairsData): void {
    data = this.indexCalculation(data)
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
    this.currentProject.analyze.stairs.forEach((risk: IRiskStairsData) => {
      this.currentProject.analyze.stairsRisksTableParams.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
    })
    this.tableFilter()
  }

  private refreshTable(): void {
    this.currentRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Рівень інтегрованого ризику (Низький, Помірний, Високий, Критичний)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.stairs.forEach((risk: IRiskStairsData) => {
      this.currentRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
    })
  }

  public tableFilter(mode?: EStairsFilterModes): void {
    if (mode) {
      this.currentMode = mode
    }
    this.refreshTable()
    if (this.currentMode === EStairsFilterModes.unused || this.currentMode === EStairsFilterModes.used) {
      this.currentRiskTables.td = this.currentRiskTables.td.filter((risk: any) => this.currentMode === EStairsFilterModes.unused ? risk[5].split(' %')[0] <= 50 : risk[5].split(' %')[0] > 50)
    } else if (this.currentMode !== EStairsFilterModes.all) {
      this.currentRiskTables.td = this.currentRiskTables.td.filter((risk: any) => risk[4] === this.currentMode)
    }
    this.recreateCharts()
  }

  public openDialogInfo(index: number): void {
    this.visible.info = true
    this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze.stairs[index])
    this.appCommunicationService.sendInfoData({ inputRowsName: EInputRowsName.stairs, header: 'Інформація про ризик' })
  }

  public openDialogAddUpdateRow(index?: number): void {
    this.visible.creation = true
    if (!index && index !== 0) {
      this.appCommunicationService.clearCurrentRisk()
    } else {
      this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze.stairs[index])
    }
    this.appCommunicationService.sendCreateData({ inputRowsName: EInputRowsName.stairs, header: !index && index !== 0 ? 'Створити ризик' : 'Оновити ризик' })
  }

  public remove(index: number, event: PointerEvent): void {
    event.stopPropagation()
    this.currentProject.analyze.stairs.splice(index, 1)
    this.updateProject()
    this.recreateTable()
  }

  public recreateCharts(): void {
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
      el[4] === ERiskStairsStatus.critical ? calculation.critical++ :
        el[4] === ERiskStairsStatus.high ? calculation.high++ :
        el[4] === ERiskStairsStatus.middle ? calculation.middle++ : calculation.low++
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
