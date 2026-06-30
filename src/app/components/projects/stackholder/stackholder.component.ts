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

@Component({
  selector: 'app-stackholder',
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
  templateUrl: './stackholder.component.html',
  styleUrl: './stackholder.component.scss',
})
export class StackholderComponent {
  public currentProject: any = {}
  public inputs: any = {}
  public stackholderData: any = {
    tableParams: { td: [], th: ['Стейкхолдер'] }
  }
  public timeOut: any
  @Output() updateView = new EventEmitter();

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['stackholdersLogistic'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    if (this.currentProject.stackholderData) {
      this.stackholderData = Object.assign(this.currentProject.stackholderData)
    } else {
      this.recreateTable()
    }
  }

  public removeStackholder(index: number) {
    // this.stackholderData.tableParams = { td: [], th: ['Стейкхолдер'] }
    // this.currentProject.stackholders = []
    this.removeStackholderTable(this.currentProject.stackholders[index].name)
    this.currentProject.stackholders.splice(index, 1)
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.stackholdersLogistic = this.inputs.stackholdersLogistic.map((input: any) => {
          input.value = ''
          return input
        })
      })


  }

  public removeStackholderTable(name: string) {
    const indexStackholder = this.stackholderData.tableParams.th.indexOf(name)
    this.stackholderData.tableParams.th.splice(indexStackholder, 1)
    this.stackholderData.tableParams.td.splice(indexStackholder - 1, 1)
    this.stackholderData.tableParams.td = this.stackholderData.tableParams.td
      .map((td: any) => {
        td.splice(indexStackholder, 1)
        return td
      })
  }

  public updateProject(form: any) {
    if (form.valid) {
      form.resetForm()
      this.currentProject.stackholders.push({
        name: this.inputs.stackholdersLogistic[0].value,
        type: this.inputs.stackholdersLogistic[1].value
      })
      this.recreateTable()
      this.httpService.updateProject(this.currentProject._id, this.currentProject)
        .subscribe(() => {
          this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
          this.inputs.stackholdersLogistic = this.inputs.stackholdersLogistic.map((input: any) => {
            input.value = ''
            return input
          })
        })
    }
  }

  public recreateTable() {
    this.currentProject.stackholders.forEach((stackholder: any) => {
      const indexStackholder = this.stackholderData.tableParams.th.indexOf(stackholder.name) - 1
      if (indexStackholder > -1) {
        this.stackholderData.tableParams.td[indexStackholder].push(0)
      } else {
        this.stackholderData.tableParams.td.push([stackholder.name])
        for (let index = 0; index < this.currentProject.stackholders.length; index++) {
          this.stackholderData.tableParams.td[this.stackholderData.tableParams.td.length - 1].push(0)
        }
        this.stackholderData.tableParams.th.push(stackholder.name)
      }
    })
  }

  public changeTable(event: any, rowIndex: number, index: number) {
    this.stackholderData.tableParams.td[rowIndex][index] = event
    clearTimeout(this.timeOut)
    this.timeOut = setTimeout(() => {
      this.currentProject.stackholderData = Object.assign(this.stackholderData)
      this.httpService.updateProject(this.currentProject._id, this.currentProject)
        .subscribe(() => {
          this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
          this.updateView.emit();
          clearTimeout(this.timeOut)
        })
    }, 500)
  }
}
