import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Times, Pencil, Eye } from '@primeicons/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslatePipe } from "@ngx-translate/core";

import { AccordionModule } from 'primeng/accordion';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { v6 } from 'uuid';


@Component({
  selector: 'app-main',
  imports: [
    AccordionModule,
    StepperModule,
    ButtonModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    TooltipModule,
    CreationDialogComponent,
    FormsModule,
    DividerModule,
    InputNumberModule,
    SelectModule,
    TableModule,
    InputTextModule,
    TextareaModule,
    ProgressSpinnerModule,
    ChartModule,
    Times, Pencil, Eye
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public inputs: any = {}
  public currentProject: any = {}
  public risks: any = {}

  public visible: any = {
    creation: false,
    info: false,
    spinner: false
  }
  public chartData: any = {}
  public options: any = {}

  public searchQuery: string = '';
  public searchQueryInput: string = '';
  public standardQueries: string[] = ['Останні новини', 'Економіка', 'Міжнародний бізнес', 'Інше']
  public searchResult: any[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.recreateTable()
    this.changeCharts()
  }

  public searchInfo() {
    this.visible.spinner = true
    this.httpService.parsingReq(this.searchQuery === 'Інше' ? this.searchQueryInput : this.searchQuery)
      .subscribe((result: any) => {
        this.searchResult = result.data.map((el: string) => {
          return {
            label: el,
            influence: 0,
            prop: 0,
            des: ''
          }
        })
        this.visible.spinner = false
      })
  }

  public cancelSearch(): any {
    this.searchQuery = ''
    this.searchQueryInput = ''
    this.searchResult = []
  }

  public removeTag(index: number): any {
    this.searchResult.splice(index, 1)
  }

  public saveRisks() {
    this.currentProject.risks = [...this.currentProject.risks, ...this.searchResult.map((el: any) => {
      const value = +((el.influence * el.prop) ** (1 / 2)).toFixed(2)
      return {
        _id: v6,
        name: el.label,
        des: el.des,
        inf: el.influence,
        value: value,
        prop: value,
        solutions: [],
        status: value > 75 ?
          'Критичний' :
          value > 50 ? 'Високий' :
          value > 25 ? 'Помірний' : 'Низький'
      }
    })]
    this.searchResult = []
    this.recalcIndexes()
    this.updateProject()
    this.recreateTable()
  }

  public showInfoProjectDialog(event?: any): void {
    event.stopPropagation()
    this.visible.project = !this.visible.project
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public updateProject(): void {
    console.log()
    this.httpService
      .updateProject(this.currentProject._id, this.currentProject)
      .subscribe((data: any) => {})
  }

  public recalcIndexes(): void {
    this.currentProject.options.continuity = +(this.currentProject.risks.filter((r: any) => r.value >= 5).reduce((a: number, b: any) => a + (100 - b.value), 0) ** (1 / this.currentProject.risks.filter((r: any) => r.value >= 5).length)).toFixed(2)
    this.currentProject.options.perseverance = +(100 - (this.currentProject.risks.filter((r: any) => r.value >= 5).reduce((a: number, b: any) => a + b.value, 0) / this.currentProject.risks.filter((r: any) => r.value >= 5).length)).toFixed(2)
    this.changeCharts()
  }

  public updateRisk(data: any): void {
    data.prop = data.value
    data.value = data.inf / 100 * data.prop
    data.solutions.forEach((sol: any) => {
      if (sol.control === 100) {
        data.value = data.value - (sol.influence / 100) * sol.indexFactor
      }
    })
    if (data.value < 0) {
      data.value = 0
    } else {
      data.value = +data.value.toFixed(2)
    }
    if (data.value < 5) {
      data.dateFinish = (new Date()).toISOString()
    }
    if (!data.dateCreation) {
      data.dateCreation = (new Date()).toISOString()
    }
    data.status = data.value > 75 ?
      'Критичний' :
      data.value > 50 ? 'Високий' :
      data.value > 25 ? 'Помірний' : 'Низький'
    this.currentProject.risks = this.currentProject?.risks?.map((risk: any) => {
      if (risk._id == data._id) {
        risk = data
      }
      return risk
    })
    this.recalcIndexes()
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public createRisk(data: any): void {
    data.status = data.value > 75 ?
      'Критичний' :
      data.value > 50 ? 'Високий' :
      data.value > 25 ? 'Помірний' : 'Низький'
    data.solutions = []
    data.dateCreation = (new Date()).toISOString()
    if (data.value < 5) {
      data.dateFinish = (new Date()).toISOString()
    }
    this.currentProject.risks = this.currentProject?.risks?.map((risk: any) => {
      if (risk._id == data._id) {
        risk = data
      }
      return risk
    })
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.currentProject.risksTableParams = {
      th: ['Назва', 'Вплив (1 - 100)', 'Реакція', 'Статус загрози ризику (Низький, Помірний, Високий, Критичний)', 'Оцінка ризику (1 – 100)', 'Взаємодія'],
      td: []
    }
    this.currentProject?.risks?.forEach((risk: any) => {
      this.currentProject.risksTableParams.td.push([risk.name, `${risk.inf} %`, risk.des, risk.status, risk.value])
    })
  }

  public openDialogInfo(index: number): void {
    this.appCommunicationService.saveCurrentRisk(this.currentProject.risks[index])
    this.navigate(`risk/${this.currentProject.risks[index]._id}`)
  }

  public openDialogAddUpdateRow(index?: number): void {
    this.visible.creation = true
    if (!index && index !== 0) {
      this.appCommunicationService.saveCurrentRisk(null)
    } else {
      this.appCommunicationService.saveCurrentRisk(this.currentProject.risks[index])
    }
    this.appCommunicationService.sendCreateData({ inputRowsName: 'risk', header: !index && index !== 0 ? 'Створити ризик' : 'Оновити ризик' })
  }

  public remove(index: number): void {
    this.currentProject.risks.splice(index, 1)
    this.updateProject()
  }

  private changeCharts(): void {
    if (!this.currentProject.risks && this.currentProject.risks.LENGTH) {
      return
    }
    const risks = this.currentProject.risks.filter((risk: any) => risk.value > 5)
    const labels = [this.currentProject.dateCreation, ...risks.map((solution: any) => solution.name)]
    let continuity = 100
    const dataContinuity = [continuity, ...risks.map((risk: any, index: number) => {
      const currentRisks = risks.slice(0, index + 1)
      continuity = +((100 - risk.value) ** (1 / currentRisks.length)).toFixed(2)
      return continuity
    })]

    let perseverance = 100
    const dataPerseverance = [perseverance, ...risks.map((risk: any,  index: number) => {
      const currentRisks = risks.slice(0, index + 1)
      perseverance = perseverance - +((risk.value) ** (1 / currentRisks.length)).toFixed(2)
      return perseverance
    })]
    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Інтегральний індекс безперервності постачання',
          data: dataContinuity,
          fill: false,
          borderColor: 'darkcyan',
          tension: 0.4
        },
        {
          label: 'Запас стійкості системи постачання',
          data: dataPerseverance,
          fill: false,
          borderColor: 'darkblue',
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
