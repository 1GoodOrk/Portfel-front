import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogStackholderComponent } from '@port/shared/organisms/info-dialog-stackholders/info-dialog.component';
@Component({
  selector: 'app-experts',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    InfoDialogStackholderComponent
  ],
  templateUrl: './experts.component.html',
  styleUrl: './experts.component.scss',
})
export class ExpertsComponent {
  public currentProject: any = {}
  public stackholders: any = []
  public resultCalc: any = {
    PV: { label: 'Запланована цінність проєкту (PV)', value: 0 },
    R: { label: 'Ціна ризиків проєкту (R)', value: 0 },
    AV: { label: 'Досягнута цінність проєкту (AV)', value: 0 },
    AVL: { label: 'Рівень досягнення цінності проєкту (AVL)', value: 0 }
  }
  public risksStackholdersHighSorting: any = []
  public valuationStackholdersSorting: any = []
  public currentStackholder: any = {}
  public visible: any = {
    project: false,
    stackholder: false
  }

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.getStackholders()
    this.calculation()
  }

  public getStackholders() {
    this.stackholders = this.appCommunicationService.getStackholder()
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public calculation() {

    this.stackholders.forEach((el: any) => {
      this.resultCalc.R.value += ((el.influence / 100) * ((el.eco * (el.ecoPos / 100)) + (el.war * (el.warPos / 100)) + (el.log * (el.logPos / 100)) + (el.soc * (el.socPos / 100)) + (el.struc * (el.strucPos / 100))) / 5)
      this.resultCalc.PV.value += ((el.power / 100) * (el.transport + el.social + el.economic + el.ecologic + el.comfort + el.technologic + el.informative + el.security + el.managment) / 400) * this.currentProject.projectValuation
    })
    this.resultCalc.PV.value = (this.resultCalc.PV.value / (this.stackholders.length / 3)).toFixed(2)
    this.resultCalc.R.value = (this.resultCalc.R.value / this.stackholders.length).toFixed(2)
    this.resultCalc.AV.value = (this.resultCalc.PV.value - this.resultCalc.R.value).toFixed(2)
    this.resultCalc.AVL.value = (this.resultCalc.AV.value / this.resultCalc.PV.value).toFixed(2) + ' %'

    this.risksStackholdersHighSorting = Array.from(this.stackholders).sort((prev: any, next: any) => {
      if (((prev.influence / 100) * ((prev.eco * (prev.ecoPos / 100)) + (prev.war * (prev.warPos / 100)) + (prev.log * (prev.logPos / 100)) + (prev.soc * (prev.socPos / 100)) + (prev.struc * (prev.strucPos / 100))) / 5) >
      ((next.influence / 100) * ((next.eco * (next.ecoPos / 100)) + (next.war * (next.warPos / 100)) + (next.log * (next.logPos / 100)) + (next.soc * (next.socPos / 100)) + (next.struc * (next.strucPos / 100))) / 5)) {
        return 1;
      }
      if (((prev.influence / 100) * ((prev.eco * (prev.ecoPos / 100)) + (prev.war * (prev.warPos / 100)) + (prev.log * (prev.logPos / 100)) + (prev.soc * (prev.socPos / 100)) + (prev.struc * (prev.strucPos / 100))) / 5) <
      ((next.influence / 100) * ((next.eco * (next.ecoPos / 100)) + (next.war * (next.warPos / 100)) + (next.log * (next.logPos / 100)) + (next.soc * (next.socPos / 100)) + (next.struc * (next.strucPos / 100))) / 5)) {
        return -1;
      }
      return 0;
    })
    this.valuationStackholdersSorting = Array.from(this.stackholders).sort((prev: any, next: any) => {
      if ((prev.power / 100) * (prev.transport + prev.social + prev.economic + prev.ecologic + prev.comfort + prev.technologic + prev.informative + prev.security + prev.managment) / 4 >
      (next.power / 100) * (next.transport + next.social + next.economic + next.ecologic + next.comfort + next.technologic + next.informative + next.security + next.managment) / 4) {
        return 1;
      }
      if ((prev.power / 100) * (prev.transport + prev.social + prev.economic + prev.ecologic + prev.comfort + prev.technologic + prev.informative + prev.security + prev.managment) / 4 <
      (next.power / 100) * (next.transport + next.social + next.economic + next.ecologic + next.comfort + next.technologic + next.informative + next.security + next.managment) / 4) {
        return 1;
      }
      return 0;
    })
  }

  public showInfoStackholderDialog(index: number, event?: any) {
    event.stopPropagation()
    Object.keys(this.stackholders[index]).forEach((key: string) => {
      this.currentStackholder[key] = this.stackholders[index][key]
    })
    this.visible.info = !this.visible.info
  }

  public visibleOnChange(key: string): void {
    this.currentStackholder = Object.assign(this.appCommunicationService.clearStackholder)
    this.visible[key] = !this.visible[key]
  }
}
