import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule, NgForm } from '@angular/forms';

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
import { HttpService } from '@port/services/http/http.service';
import { FakeRequestService } from '@port/services/fake-request.service';
import {
  EInputRowsName,
  IInputRow,
  IInputRowContainer,
  IProjectData,
  IRiskButterflyFactorData,
  ITableContainer
} from '@port/interfaces';

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
  @Output() updateView = new EventEmitter();
  public currentProject!: IProjectData
  public inputs!: IInputRowContainer
  public factorData: { tableParams: ITableContainer<string | number>; } = {
    tableParams: { td: [], th: ['Фактор'] }
  }
  public timeOut!: number

  constructor(
    private appCommunicationService: AppCommunicationService,
    private fakeRequestService: FakeRequestService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm([EInputRowsName.factorLogistic])
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

  public removeFactor(index: number): void {
    this.removeFactorTable(this.currentProject.analyze.butterflyFactors[index].name)
    this.currentProject.analyze.butterflyFactors.splice(index, 1)
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.factorLogistic = this.inputs.factorLogistic.map((input: IInputRow) => {
          input.value = ''
          return input
        })
      })
  }

  public removeFactorTable(name: string): void {
    const elementIndex = this.factorData.tableParams.th.indexOf(name)
    this.factorData.tableParams.th.splice(elementIndex, 1)
    this.factorData.tableParams.td.splice(elementIndex - 1, 1)
    this.factorData.tableParams.td = this.factorData.tableParams.td
      .map((td: Array<string | number>) => {
        td.splice(elementIndex, 1)
        return td
      })
  }

  private fakeRequest(id: string, data: IProjectData): void {
    this.fakeRequestService.updateProject(id, data)
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
  }
  public updateProject(form: NgForm): void {
    if (form.valid) {
      form.resetForm()
      this.currentProject.analyze.butterflyFactors.push({
        name: this.inputs.factorLogistic[0].value,
        des: this.inputs.factorLogistic[1].value,
        cause: this.inputs.factorLogistic[2].value,
        type: this.inputs.factorLogistic[3].value,
      })
      this.recreateTable()
      this.fakeRequest(this.currentProject._id, this.currentProject)
      // this.httpService.updateProject(this.currentProject._id, this.currentProject)
      //   .subscribe(() => {
      //     this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
      //     console.log(this.currentProject)
      //     this.inputs.factorLogistic = this.inputs.factorLogistic.map((input: IInputRow) => {
      //       input.value = ''
      //       return input
      //     })
      //   })
    }
  }

  public recreateTable(): void {
    this.currentProject.analyze.butterflyFactors.forEach((factor: IRiskButterflyFactorData) => {
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

  public changeTable(event: string, rowIndex: number, index: number): void {
    this.factorData.tableParams.td[rowIndex][index] = event
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(() => {
      this.currentProject.analyze.butterflyFactorData = Object.assign(this.factorData)
      this.fakeRequest(this.currentProject._id, this.currentProject)
      // this.httpService.updateProject(this.currentProject._id, this.currentProject)
      //   .subscribe(() => {
      //     this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
      //     this.updateView.emit();
      //     clearTimeout(this.timeOut)
      //   })
    }, 500)
  }
}
