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
  selector: 'app-conflict',
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
  templateUrl: './conflict.component.html',
  styleUrl: './conflict.component.scss',
})
export class ConflictComponent {
  public currentProject: any = {}
  public inputs: any = {}
  public timeOut: any
  @Output() updateView = new EventEmitter();

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['conflict'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.inputs.conflict[0].items = Array.from(this.currentProject.balance.stackholders).map((stackholder: any) => `${stackholder.type} - ${stackholder.name}`)
    if (!this.currentProject.balance.conflicts) {
      this.currentProject.balance.conflicts = []
    }
  }

  public removeConflict(index: number) {
    this.currentProject.balance.conflicts.splice(index, 1)
    this.updateProjectRequest()
  }

  public updateProject(form: any) {
    if (form.valid) {
      form.resetForm()
      this.currentProject.balance.conflicts.push({})
      this.inputs.conflict.forEach((input: any) => {
        if (input.name) {
          this.currentProject.balance.conflicts[this.currentProject.balance.conflicts.length - 1][input.name] = input.value
        }
      })
      this.currentProject.balance.conflicts[this.currentProject.balance.conflicts.length - 1].solutions = []
      this.updateProjectRequest()
    }
  }

  private updateProjectRequest () {
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.conflict = this.inputs.conflict.map((input: any) => {
          input.value = ''
          return input
        })
      })
  }
}
