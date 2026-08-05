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

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';


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
    Times, Pencil, Eye
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public inputs: any = {}
  public currentProject: any = {}

  public visible: any = {
    creation: false,
    info: false
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
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
    data.digitalRiskIndex = +(multipleMax * (data.influence * data.probability / 100) * data.indexJudExpertRatio).toFixed(2)
    if (!data.dateCreation) {
      data.dateCreation = new Date().toISOString().split('T').join(' - ').split('Z')[0]
    }
    data.currentdigitalRiskIndex = data.digitalRiskIndex
    if (data.solutions) {
      data.solutions.forEach((solution: any) => {
        if (solution.finalState === 'Ситуація вирішено позитивно') {
          data.currentdigitalRiskIndex = data.currentdigitalRiskIndex - solution.digitalRiskIndex
        } else if (solution.finalState === 'Ситуація вирішено негативно') {
          data.currentdigitalRiskIndex = data.currentdigitalRiskIndex + solution.digitalRiskIndex
        }
      })
    }
    data.control = +(data.currentdigitalRiskIndex / data.digitalRiskIndex * 100).toFixed(2)
    data.status = data.control > 50 ?
      'Загроза' : data.control > 5 ? 'Стабілізовано' : 'Вирішено'
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
    if (!this.currentProject.risks) {
      this.currentProject.risks = []
    }
    this.currentProject.risks.push(data)
    this.visible.creation = false
    this.recreateTable()
    this.updateProject()
  }

  public recreateTable(): void {
    this.currentProject.risksTableParams = {
      th: ['Назва', 'Ймовірність виникнення', 'Індекс цифрового ризику', 'Поточний індекс цифрового ризику', 'Статус', 'Контроль', 'Взаємодія'],
      td: []
    }
    this.currentProject.risks.forEach((risk: any) => {
      this.currentProject.risksTableParams.td.push([risk.name, `${risk.probability * 10} %`, risk.digitalRiskIndex, risk.currentdigitalRiskIndex, risk.status, `${risk.control} %`])
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
  }
}
