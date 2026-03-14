import { Component, OnDestroy } from '@angular/core';
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
import { DateCheckPipe } from 'src/app/pipes/date-check.pipe';

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
    DateCheckPipe
  ],
  templateUrl: './pcreation.component.html',
  styleUrl: './pcreation.component.scss',
})
export class PcreationComponent implements OnDestroy {
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
    if (this.currentPhase && this.currentPhase.name) {
      this.inputs.phasesLogistic = this.inputs.phasesLogistic.map((input: any) => {
        input.value = this.currentPhase[input.name]
        return input
      });
      this.currentPhase.time.forEach((logisticTime: any) => {
        this.inputs.phasesLogisticTime.push({
          label: logisticTime.label,
          date: logisticTime.date,
          items: Array.from(logisticTime.items).map((item: any) => {
            return {
              label: item.label,
              inputsVUCABANI: Array.from(item.inputsVUCABANI).map((input: any) => {
                const name: string = input.label.split(' (1-10)')[0]
                return {
                  "type": "number",
                  "displayCondition": true,
                  "name": name,
                  "label": input.label,
                  "placeholder": '',
                  "pTooltip": `Введіть дані для ймовірність виникнення поля '${name}'`,
                  "value": input.value,
                  "min": 1,
                  "max": 10,
                  "step": 1
                }
              }),
              analyzeVUCABANI: {
                Tvuca: item.analyzeVUCABANI.Tvuca,
                Tbani: item.analyzeVUCABANI.Tbani,
                indexAg: item.analyzeVUCABANI.indexAg,
                indexProactivity: item.analyzeVUCABANI.indexProactivity,
              },
              inputsRisks: Array.from(item.inputsRisks).map((input: any) => {
                if (input.label.match('Ймовірність')) {
                  const name: string = input.label.split('Ймовірність виникнення ')[1].split(' %')[0]
                  return {
                    "type": "number",
                    "displayCondition": true,
                    "name": name,
                    "label": input.label,
                    "placeholder": '',
                    "pTooltip": `Введіть дані для ймовірність виникнення поля '${name}'`,
                    "value": input.value,
                    "min": 1,
                    "max": 100,
                    "step": 1
                  }
                } else {
                  const name: string = input.label.split('Вплив ')[1]
                  return {
                    "type": "number",
                    "displayCondition": true,
                    "name": name,
                    "label": input.label,
                    "placeholder": '',
                    "pTooltip": `Введіть дані для вплив поля '${name}'`,
                    "value": input.value,
                    "min": 1,
                    "max": 10,
                    "step": 1
                  }
                }
              }),
              inputsWaiting: Array.from(item.inputsWaiting).map((input: any) => {
                const name: string = input.label.split('Ймовірність виникнення ')[1].split(' %')[0]
                return {
                  "type": "number",
                  "displayCondition": true,
                  "name": name,
                  "label": input.label,
                  "placeholder": '',
                  "pTooltip": `Введіть дані для ймовірність виникнення поля '${name}'`,
                  "value": input.value,
                  "min": 1,
                  "max": 100,
                  "step": 1
                }
              })
            }
          })
        })
      });
    } else if (this.currentProject.phases.length) {
      // добавлять поля, что были ранее
    }
  }

  public updateProject(form: any) {
    if (form.valid) {
      if (!this.currentPhase || !this.currentPhase.name) {
        this.currentProject.phases.push({})
        this.inputs.phasesLogistic.forEach((el: any) => {
          this.currentProject.phases[this.currentProject.phases.length - 1][el.name] = el.value
        });
        this.currentProject.phases[this.currentProject.phases.length - 1]._id = v6()
        this.currentProject.phases[this.currentProject.phases.length - 1].time = Array.from(this.inputs.phasesLogisticTime).map((phaseLogisticTime: any) => {
          return {
            label: phaseLogisticTime.label,
            date: phaseLogisticTime.date,
            items: Array.from(phaseLogisticTime.items).map((group: any) => {
              return {
                label: group.label,
                analyzeVUCABANI: {
                  Tvuca: group.analyzeVUCABANI.Tvuca,
                  Tbani: group.analyzeVUCABANI.Tbani,
                  indexAg: group.analyzeVUCABANI.indexAg,
                  indexProactivity: group.analyzeVUCABANI.indexProactivity,
                },
                inputsVUCABANI: Array.from(group.inputsVUCABANI).map((input: any) => ({ label: input.label, value: input.value })),
                inputsRisks: Array.from(group.inputsRisks).map((input: any) => ({ label: input.label, value: input.value })),
                inputsWaiting: Array.from(group.inputsWaiting).map((input: any) => ({ label: input.label, value: input.value }))
              }
            })
          }
        })
      } else if (this.currentProject.phases.findIndex((phase: any) => phase._id === this.currentPhase._id) > -1) {
        const phaseIndex = this.currentProject.phases.findIndex((phase: any) => phase._id === this.currentPhase._id)
        this.currentProject.phases[phaseIndex].time = []
        this.currentProject.phases[phaseIndex].time = Array.from(this.inputs.phasesLogisticTime).map((phaseLogisticTime: any) => {
          return {
            label: phaseLogisticTime.label,
            date: phaseLogisticTime.date,
            items: Array.from(phaseLogisticTime.items).map((group: any) => {
              return {
                label: group.label,
                inputsVUCABANI: Array.from(group.inputsVUCABANI).map((input: any) => ({ label: input.label, value: input.value })),
                analyzeVUCABANI: {
                  Tvuca: group.analyzeVUCABANI.Tvuca,
                  Tbani: group.analyzeVUCABANI.Tbani,
                  indexAg: group.analyzeVUCABANI.indexAg,
                  indexProactivity: group.analyzeVUCABANI.indexProactivity,
                },
                inputsRisks: Array.from(group.inputsRisks).map((input: any) => ({ label: input.label, value: input.value })),
                inputsWaiting: Array.from(group.inputsWaiting).map((input: any) => ({ label: input.label, value: input.value }))
              }
            })
          }
        })
      } else {
        const phaseIndex = this.currentProject.phases.findIndex((phase: any) => phase._id === this.currentPhase._id)
        Array
          .from(this.inputs.phasesLogisticTime)
          .forEach((phaseLogisticTime: any, timeIndex: number) => {
            phaseLogisticTime.items.forEach((item: any, itemindex: number) => {
              this.currentProject.phases[phaseIndex].time[timeIndex].items[itemindex].analyzeVUCABANI = {
                Tvuca: item.analyzeVUCABANI.Tvuca,
                Tbani: item.analyzeVUCABANI.Tbani,
                indexAg: item.analyzeVUCABANI.indexAg,
                indexProactivity: item.analyzeVUCABANI.indexProactivity,
              }
              this.currentProject.phases[phaseIndex].time[timeIndex].items[itemindex].inputsVUCABANI = Array.from(item.inputsVUCABANI).map((input: any) => ({ label: input.label, value: input.value }))
              this.currentProject.phases[phaseIndex].time[timeIndex].items[itemindex].inputsRisks = Array.from(item.inputsRisks).map((input: any) => ({ label: input.label, value: input.value }))
              this.currentProject.phases[phaseIndex].time[timeIndex].items[itemindex].inputsWaiting = Array.from(item.inputsWaiting).map((input: any) => ({ label: input.label, value: input.value }))
            })
          })
      }
      this.httpService.updateProject(this.currentProject._id, this.currentProject)
        .subscribe((data: any) => {
          this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
          form.resetForm()
        })
    }
  }

  public deleteDateTimeField(index: number) {
    if (this.currentPhase._id) {
      const phaseIndex = this.currentProject.phases.findIndex((phase: any) => phase._id === this.currentPhase._id)
      this.currentProject.phases[phaseIndex].time.splice(index, 1)
    }
    this.inputs.phasesLogisticTime.splice(index, 1)
  }

  public changeVUCABANI($event: any, groupIndex: number, stackholderIndex: number, inputIndex: number): void {
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[inputIndex].value = $event
    this.calculationVUCABANI(groupIndex, stackholderIndex)
  }

  public calculationVUCABANI(groupIndex: number, stackholderIndex: number): void {
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.Tvuca = (this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[0].value + this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[1].value + this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[2].value + this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[3].value) / 40
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.Tbani = (this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[4].value + this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[5].value + this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[6].value + this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsVUCABANI[7].value) / 40
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.indexAg = (this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.Tvuca / this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.Tbani).toFixed(4)
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.indexProactivity =
      ((this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.Tvuca * this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.Tbani) / +this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].analyzeVUCABANI.indexAg).toFixed(4)
  }

  public addDateTimeField() {
    this.inputs.phasesLogisticTime.push({
      label: 'Час оцінки',
      date: this.newTime.toISOString().split('T').join(' ').split('.')[0],
      items: Array.from(this.currentProject.stackholders).map((stackholder: any) => {
        return {
          label: `${stackholder.name} (${stackholder.type})`,
          inputsVUCABANI: this.appCommunicationService.getInputsFormDefault(stackholder.name),
          analyzeVUCABANI: {
            Tvuca: 0,
            Tbani: 0,
            indexAg: 0,
            indexProactivity: 0,
          },
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
      "label": `Вплив ${this.newRisk}`,
      "placeholder": '',
      "pTooltip": `Введіть дані для вплив поля '${this.newRisk}'`,
      "value": 0,
      "min": 1,
      "max": 10,
      "step": 1
    })
    this.newRisk = ''
  }

  public removeNewRisk(groupIndex: number, stackholderIndex: number, inputIndex: number): void {
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsRisks.splice(inputIndex, 2)
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

  public removeNewWaiting(groupIndex: number, stackholderIndex: number, inputIndex: number): void {
    this.inputs.phasesLogisticTime[groupIndex].items[stackholderIndex].inputsWaiting.splice(inputIndex, 1)
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.appCommunicationService.clearCurrentPhase()
    this.navigate('phase-risks')
  }

  public ngOnDestroy() {
    this.inputs = this.appCommunicationService.getInputsForm(['phasesLogistic', 'phasesLogisticDefault', 'phasesLogisticTime'])
    this.currentPhase = {}
  }

}
