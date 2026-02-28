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
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
@Component({
  selector: 'app-cld',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    StepperModule,
    TranslatePipe,
    RatingModule,
    TableModule,
    RadioButtonModule
  ],
  templateUrl: './cld.component.html',
  styleUrl: './cld.component.scss',
})
export class CLDComponent {
  public inputs: any = []
  public currentProject: any = {}
  public currentExpertise: any = {}
  public currentSessionMail: string = ''
  public recommendationDescription: string = ''
  public tableParams: any = {}

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.pre()
  }

  private pre(): void {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.currentExpertise = this.appCommunicationService.getCurrentExpertise()
    this.currentSessionMail = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.email
    this.inputs = this.appCommunicationService.getDynamicCLDInputsForm(this.currentExpertise.approve.fields, this.currentSessionMail, this.inputs)

    const findRisksDataIndex = this.currentExpertise.risksData ? this.currentExpertise.risksData.findIndex((riskData: any) => riskData.email === this.currentSessionMail) : -1
    this.tableParams = {
      th: ['/', 'Rclassicj', 'Rleanj', 'Rdigj', 'Rmodj', 'Cntrlg'],
      td: findRisksDataIndex > -1 ? this.currentExpertise.risksData[findRisksDataIndex].tableParams.td : []
    }
    if (findRisksDataIndex !== -1) {
      this.recommendationDescription = this.currentExpertise.risksData[findRisksDataIndex].recommendationDescription
      for (let i = 0; i < this.inputs.length; i += 8) {
        const updateFieldIndex = this.currentExpertise.approve.fields.findIndex((field: any) => field.label === this.inputs[i + 2].label)
        const approveIndex = this.currentExpertise.approve.fields[updateFieldIndex].approve.findIndex((appr: any) => appr.email === this.currentSessionMail)
        if (this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data) {
          this.inputs[i].value = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[this.inputs[i].label] * 10
          this.inputs[i + 1].value = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[this.inputs[i + 1].label] * 100
          this.inputs[i + 2].value = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].value
          this.inputs[i + 3].value = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[this.inputs[i + 3].label]
          this.inputs[i + 4].items = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[this.inputs[i + 4].label]
          this.inputs[i + 5].items = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[this.inputs[i + 5].label]
          this.inputs[i + 6].value = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[this.inputs[i + 6].label] * 100
        }
      }
    }
    this.tableRecalculation()
  }

  public tableCalculation() {
    this.tableParams.td = []
    for (let i = 0; i < this.inputs.length; i += 2) {
      this.tableParams.td.push([ this.inputs[i].label, 0, 0, 0, 0, 0 ])
    }
  }


  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }

  public updateExpertise() {
    for (let i = 0; i < this.inputs.length; i += 8) {
      const updateFieldIndex = this.currentExpertise.approve.fields.findIndex((field: any) => field.label === this.inputs[i + 2].label)
      const approveIndex = this.currentExpertise.approve.fields[updateFieldIndex].approve.findIndex((appr: any) => appr.email === this.currentSessionMail)
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].value = this.inputs[i + 2].value
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data = {
        [this.inputs[i].label]: this.inputs[i].value / 10,
        [this.inputs[i + 1].label]: this.inputs[i + 1].value / 100,
        [this.inputs[i + 3].label]: this.inputs[i + 3].value,
        [this.inputs[i + 4].label]: this.inputs[i + 4].items,
        [this.inputs[i + 5].label]: this.inputs[i + 5].items,
        [this.inputs[i + 6].label]: this.inputs[i + 6].value / 100
      }
    }
    if (this.currentExpertise.status === 'ОЦІНКА' && this.currentExpertise.risksData && this.currentExpertise.risksData.length === this.currentExpertise.email.length) {
      this.currentExpertise.status = 'ЗАКІНЧЕНО'
    }
    this.tableRecalculation()
    const findRisksDataIndex = this.currentExpertise.risksData ? this.currentExpertise.risksData.findIndex((riskData: any) => riskData.email === this.currentSessionMail) : -1
    if (findRisksDataIndex !== -1) {
      this.currentExpertise.risksData[findRisksDataIndex].tableParams = this.tableParams
      this.currentExpertise.risksData[findRisksDataIndex].recommendationDescription = this.recommendationDescription
    } else {
      if (!this.currentExpertise.risksData) {
        this.currentExpertise.risksData = []
      }
      this.currentExpertise.risksData.push({
        email: this.currentSessionMail,
        tableParams: this.tableParams,
        recommendationDescription: this.recommendationDescription
      })
    }
    this.httpService.updateExpertise(this.currentExpertise)
      .subscribe((data: any) => {})
  }

  private tableRecalculation() {
    this.tableParams.td = []
    for (let i = 0; i < this.inputs.length; i += 8) {
      const updateFieldIndex = this.currentExpertise.approve.fields.findIndex((field: any) => field.label === this.inputs[i + 2].label)
      const approveIndex = this.currentExpertise.approve.fields[updateFieldIndex].approve.findIndex((appr: any) => appr.email === this.currentSessionMail)

      const classicWm = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data ?
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт classic'][0].value * this.currentExpertise.approve.weigth.wcoef.quality / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт classic'][1].value * this.currentExpertise.approve.weigth.wcoef.money / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт classic'][2].value * this.currentExpertise.approve.weigth.wcoef.time / 100 : 0
      const Rclassicj = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data ?
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[`Вплив поля '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] *
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[`Ймовірність ризику '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] * classicWm : 0

      const leanWm = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data ?
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][0].value * this.currentExpertise.approve.weigth.wlean.defect / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][1].value * this.currentExpertise.approve.weigth.wlean.waiting / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][2].value * this.currentExpertise.approve.weigth.wlean.overproduct / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][3].value * this.currentExpertise.approve.weigth.wlean.motion / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][4].value * this.currentExpertise.approve.weigth.wlean.proccessing / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][5].value * this.currentExpertise.approve.weigth.wlean.transporting / 100 +
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт lean'][6].value * this.currentExpertise.approve.weigth.wlean.talents / 100 : 0
      const Rleanj = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data ?
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[`Вплив поля '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] *
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[`Ймовірність ризику '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] * leanWm : 0

      const Rdigj = this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data ?
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data['Моделюючий коефіцієнт цифровізації'] *
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[`Вплив поля '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] *
      this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data[`Ймовірність ризику '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] *
      this.currentExpertise.approve.weigth.wdig / 100 : 0
      const Rmodj = Rclassicj + Rleanj + Rdigj

      this.tableParams.td.push([
        this.inputs[i].label,
        Rclassicj.toFixed(4),
        Rleanj.toFixed(4),
        Rdigj.toFixed(4),
        Rmodj.toFixed(4),
        this.currentExpertise.approve.fields[updateFieldIndex].approve[approveIndex].data ?
        this.currentExpertise.approve.fields[updateFieldIndex].approve
          .reduce((prev: number, next: any) => next.data ? prev * next.data[`Керованість ризику '${this.currentExpertise.approve.fields[updateFieldIndex].label}'`] : prev, 1) ** (1 / this.currentExpertise.approve.fields[updateFieldIndex].approve.length) : 0
      ])
    }

  }
}
