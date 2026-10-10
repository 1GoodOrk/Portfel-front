import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Eye } from '@primeicons/angular';
import { FormsModule, NgForm } from '@angular/forms';

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

import { AppCommunicationService } from '@port/services/app-communication.service';
import {
  ERiskButterflyStatus,
  IDialogVisibility,
  IProjectData,
  IRiskButterflyData,
  IRiskStairsData,
  ITableContainer
} from '@port/interfaces';
@Component({
  selector: 'app-solutions',
  imports: [
    AccordionModule,
    StepperModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    TooltipModule,
    FormsModule,
    DividerModule,
    InputNumberModule,
    SelectModule,
    TableModule,
    Eye
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  public currentProject!: IProjectData
  public currentButterflyRiskTables: ITableContainer<string> = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
    td: []
  }
  public currentStairsRiskTables: ITableContainer<string> = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
    td: []
  }

  public visible: IDialogVisibility = {
    creation: false,
    info: false
  }
  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.recreateTableButterfly()
    this.recreateTableStairs()
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  public back(): void {
    this.navigate('analyze')
  }

  public openDialogInfo(index: number, riskGroup: string): void {
    this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze[riskGroup][index])
    this.appCommunicationService.saveCurrentGroup(riskGroup)
    this.navigate(`analyze-solution/current/${this.currentProject.analyze[riskGroup][index]._id}`)
  }

  public recreateTableButterfly(): void {
    this.currentButterflyRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Тип діяльності', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.butterfly.forEach((risk: IRiskButterflyData) => {
      if (risk.status === ERiskButterflyStatus.critical || risk.status === ERiskButterflyStatus.high) {
        this.currentButterflyRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.moveState, risk.status, `${risk.value} %`])
      }
    })
  }

  public recreateTableStairs(): void {
    this.currentStairsRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Рівень інтегрованого ризику (Низький, Помірний, Високий, Критичний)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.stairs.forEach((risk: IRiskStairsData) => {
      if (risk.value >= 50) {
        this.currentStairsRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
      }
    })
  }
}
