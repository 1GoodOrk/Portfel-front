import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { ScrollerModule } from 'primeng/scroller';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';

@Component({
  selector: 'app-factors',
  standalone: true,
  imports: [
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
    TableModule,
    TooltipModule,
    MultiSelectModule,
    DatePickerModule,
    ScrollerModule,
    TranslatePipe,
  ],
  templateUrl: './factors.component.html',
  styleUrl: './factors.component.scss',
})
export class FactorsComponent {
  public currentProject: any = {}
  public inputs: any = {}
  public factorData: any = {
    tableParams: { td: [], th: ['Фактор'] }
  }
  public timeOut: any
  @Output() updateView = new EventEmitter();

  constructor(
    private appCommunicationService: AppCommunicationService,
    private fakeRequestService: FakeRequestService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['factorLogistic'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (!this.currentProject.analyze.butterflyFactors) {
      this.currentProject.analyze.butterflyFactors = []
    }
    if (this.currentProject.analyze.butterflyFactors) {
      this.factorData = Object.assign(this.currentProject.analyze.butterflyFactorData)
    } else {
      this.recreateTable()
    }
  }

  public removeFactor(index: number) {
    this.removeFactorTable(this.currentProject.analyze.butterflyFactors[index].name)
    this.currentProject.analyze.butterflyFactors.splice(index, 1)
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.factorLogistic = this.inputs.factorLogistic.map((input: any) => {
          input.value = ''
          return input
        })
      })


  }

  public removeFactorTable(name: string) {
    const elementIndex = this.factorData.tableParams.th.indexOf(name)
    this.factorData.tableParams.th.splice(elementIndex, 1)
    this.factorData.tableParams.td.splice(elementIndex - 1, 1)
    this.factorData.tableParams.td = this.factorData.tableParams.td
      .map((td: any) => {
        td.splice(elementIndex, 1)
        return td
      })
  }

  public updateProject(form: any) {
    if (form.valid) {
      form.resetForm()
      this.currentProject.analyze.butterflyFactors.push({
        name: this.inputs.factorLogistic[0].value,
        des: this.inputs.factorLogistic[1].value,
        cause: this.inputs.factorLogistic[2].value,
        type: this.inputs.factorLogistic[3].value,
      })
      this.recreateTable()
      // this.fakeRequestService.updateProject(this.currentProject._id, this.currentProject)
      // this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
      // this.inputs.stackholdersLogistic = this.inputs.stackholdersLogistic.map((input: any) => {
      //   input.value = ''
      //   return input
      // })
      // this.getAllProjects()
      this.httpService.updateProject(this.currentProject._id, this.currentProject)
        .subscribe(() => {
          this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
          console.log(this.currentProject)
          this.inputs.factorLogistic = this.inputs.factorLogistic.map((input: any) => {
            input.value = ''
            return input
          })
        })
    }
  }

  public recreateTable() {
    this.currentProject.analyze.butterflyFactors.forEach((factor: any) => {
      const elementIndex = this.factorData.tableParams.th.indexOf(factor.name) - 1
      if (elementIndex > -1) {
        this.factorData.tableParams.td[elementIndex].push(0)
      } else {
        this.factorData.tableParams.td.push([factor.name])
        for (let index = 0; index < this.currentProject.analyze.butterflyFactors.length; index++) {
          this.factorData.tableParams.td[this.factorData.tableParams.td.length - 1].push(0)
        }
        this.factorData.tableParams.th.push(factor.name)
      }
    })
  }

  public changeTable(event: any, rowIndex: number, index: number) {
    this.factorData.tableParams.td[rowIndex][index] = event
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(() => {
      this.currentProject.analyze.butterflyFactorData = Object.assign(this.factorData)
      this.httpService.updateProject(this.currentProject._id, this.currentProject)
        .subscribe(() => {
          this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
          this.updateView.emit();
          clearTimeout(this.timeOut)
        })
    }, 500)
  }
}
