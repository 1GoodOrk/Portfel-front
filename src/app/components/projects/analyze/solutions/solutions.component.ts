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
  selector: 'app-solutions',
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
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  public inputs: any = {}
  public currentProject: any = {}
  public currentButterflyRiskTables: any = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
    td: []
  }
  public currentStairsRiskTables: any = {
    th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
    td: []
  }

  public visible: any = {
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

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('analyze')
  }

  public openDialogInfo(index: number, riskGroup: string): void {
    this.appCommunicationService.saveCurrentRisk(this.currentProject.analyze[riskGroup][index])
    this.appCommunicationService.saveCurrentGroup(riskGroup)
    this.navigate(`analyze-solution/current/${this.currentProject.analyze[riskGroup][index]._id}`)
  }

  public recreateTableButterfly(): void {
    this.currentButterflyRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.butterfly.forEach((risk: any) => {
      this.currentButterflyRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
    })
  }

  public recreateTableStairs(): void {
    this.currentStairsRiskTables = {
      th: ['Назва', 'Ймовірність виникнення (1 - 100)', 'Вплив ризику на перебіг проекту (1 - 100)', 'Ймовірні наслідки', 'Статус загрози ризику (Низька, Помірна, Висока, Критична)', 'Актуальність %', 'Взаємодія'],
      td: []
    }
    this.currentProject.analyze.stairs.forEach((risk: any) => {
      this.currentStairsRiskTables.td.push([risk.name, `${risk.probability} %`, `${risk.influence} %`, risk.consequences, risk.status, `${risk.value} %`])
    })
  }
}
