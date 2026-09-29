import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { StackholderComponent } from './stackholder/stackholder.component';

@Component({
  selector: 'app-analyze',
  imports: [
    AccordionModule,
    ButtonModule,
    DialogModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    TooltipModule,
    InfoDialogComponent,
    StackholderComponent,
    DividerModule,
    TableModule,
    ButtonModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.scss',
})
export class AnalyzeComponent {
  public current: any = {}
  public currentProject: any = {}
  public risksData: any = []

  public visible: any = {
    project: false
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    // this.current = this.appCommunicationService.getCurrentExpertise()
    if (this.currentProject.stackholderData) {
      if (!this.currentProject.stackholderData.tableParams) {
        this.currentProject.stackholderData.tableParams = { td: [], th: ['Стейкхолдер'] }
      }
      if (!this.currentProject.stackholderData.analyzeTable) {
        this.currentProject.stackholderData.analyzeTable = {
          tableParams: { td: [], th: [] }
        }
        this.currentProject.stackholderData.analyzeTable.tableParams.td = {td: [], th: []}
      }
      this.updateView()
    }
  }

  public updateView() {
    this.calculationOfMainTable()
    // this.current.risksData
    //   .forEach((el: any, index: number) => {

    //     this.risksData.push({
    //       expert: this.current.email.find((mail: any) => mail.email === el.email).name,
    //       tableParams: el.tableParams,
    //       analyzeTable: el.analyzeTable,
    //       additionalTableParams: el.additionalTableParams,
    //       recommendationDescription: el.recommendationDescription,
    //       fields: this.current.approve.fields.map((field: any) => ({ label: field.label, value: field.approve.find((appr: any) => appr.email === el.email).value })),
    //       graph: {}
    //     })
    //   })
    // if (this.risksData[0].additionalTableParams) {
    //   for (let i = 0; i < this.risksData.length; i++) {
    //     this.createCharts(i)
    //   }
    // }
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }

  private calculationOfMainTable() {

  }


  public showInfoProjectDialog(event?: any): void {
    event.stopPropagation()
    this.visible.project = !this.visible.project
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }


}
