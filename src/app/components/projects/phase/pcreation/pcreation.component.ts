import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { v6 } from 'uuid';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
@Component({
  selector: 'app-pcreation',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    DialogModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    AccordionModule,
    TranslatePipe,
  ],
  templateUrl: './pcreation.component.html',
  styleUrl: './pcreation.component.scss',
})
export class PcreationComponent {
  public currentProject: any = {}
  public currentPhase: any = {}
  public inputs: any = {}
  public newTime: any = ''
  public newRisk: string = ''
  public newWaiting: string = ''

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['phasesLogistic', 'phasesLogisticDefault', 'phasesLogisticTime'])

    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.currentPhase = this.appCommunicationService.getCurrentPhase()
    if (this.currentPhase.name) {

    }
  }

  public updateProject(form: any) {
    if (form.valid) {
      this.currentProject.phase.push({})
      this.inputs.phasesLogistic.forEach((el: any) => {
        this.currentProject.phase[this.currentProject.phase.length - 1][el.name] = el.value
      });
      this.currentProject.phase[this.currentProject.phase.length - 1]._id = v6()
      this.currentProject.phase[this.currentProject.phase.length - 1].time = Array.from(this.inputs.phasesLogisticTime).map((phaseLogisticTime: any) => {
        this.currentProject.phase.push({
          label: phaseLogisticTime.label,
          date: phaseLogisticTime.date,
          items: Array.from(phaseLogisticTime.items).map((group: any) => {
            return {
              label: group.label,
              inputsVUCABANI: Array.from(group.inputsVUCABANI).map((input: any) => ({ label: input.label, value: input.value })),
              inputsRisks: Array.from(group.inputsRisks).map((input: any) => ({ label: input.label, value: input.value })),
              inputsWaiting: Array.from(group.inputsWaiting).map((input: any) => ({ label: input.label, value: input.value }))
            }
          })
        })
      })

      console.log(this.currentProject.phase)
      // this.httpService.updateProject(this.currentProject._id, this.currentProject)
      //   .subscribe((data: any) => {
      //     this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
      //     form.resetForm()
      //   })
    }
  }

  public deleteDateTimeField(index: number) {
    this.inputs.phasesLogisticTime.splice(index, 1)
  }

  public addDateTimeField() {
    console.log(Array.from(this.currentProject.stackholders))
    this.inputs.phasesLogisticTime.push({
      label: 'Час оцінки',
      date: this.newTime.toISOString().split('T').join(' ').split('.')[0],
      items: Array.from(this.currentProject.stackholders).map((stackholder: any) => {
        // const inputsVUCABANI: any = []
        // Array.from(this.inputs.phasesLogisticDefault).forEach((el: any) => inputsVUCABANI.push(Object.assign(el)))
        return {
          label: `${stackholder.name} (${stackholder.type})`,
          inputsVUCABANI: this.appCommunicationService.getInputsFormDefault(),
          inputsRisks: [],
          inputsWaiting: []
        }
      })
    })
    this.newTime = ''
  }

  public addNewRisk(groupIndex: number, stackholderIndex: number) {
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsRisks.push({
      "type": "number",
      "displayCondition": true,
      "name": this.newRisk,
      "label": `Ймовірність виникнення ${this.newRisk} %`,
      "placeholder": '',
      "pTooltip": `Введіть дані для ймовірність виникнення поля '${this.newRisk}'`,
      "value": 0,
      "min": 1,
      "max": 100,
      "step": 1
    })
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsRisks.push({
      "type": "number",
      "displayCondition": true,
      "name": this.newRisk,
      "label": `Вплив ${this.newRisk} %`,
      "placeholder": '',
      "pTooltip": `Введіть дані для вплив поля '${this.newRisk}'`,
      "value": 0,
      "min": 1,
      "max": 100,
      "step": 1
    })
    this.newRisk = ''
  }

  public addNewWaiting(groupIndex: number, stackholderIndex: number) {
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsWaiting.push({
      "type": "number",
      "displayCondition": true,
      "name": this.newWaiting,
      "label": `Ймовірність виникнення ${this.newWaiting} %`,
      "placeholder": '',
      "pTooltip": `Введіть дані для ймовірність виникнення поля '${this.newWaiting}'`,
      "value": 0,
      "min": 1,
      "max": 100,
      "step": 1
    })
    this.newWaiting = ''
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }
}
