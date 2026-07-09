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
  selector: 'app-solution',
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
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.scss',
})
export class SolutionComponent {
  public currentProject: any = {}
  public inputs: any = {}
  public timeOut: any
  public conflictIndex: any
  public visible: any = false
  public currentIndex: any = -1
  @Output() updateView = new EventEmitter();

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['solution'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.inputs.solution[0].items = Array.from(this.currentProject.balance.conflicts).map((conflict: any) => conflict.conflictSides)
  }

  public catchIndex(event: any) {
    this.inputs.solution[0].value = event
    this.conflictIndex = this.currentProject.balance.conflicts.findIndex((conflict: any) => conflict.conflictSides === this.inputs.solution[0].value)
  }

  public removeSolution(index: number) {
    this.currentProject.balance.conflicts[this.conflictIndex].solutions.splice(index, 1)
    this.updateProjectRequest()
  }

  public updateProject(form: any) {
    if (form.valid) {
      this.conflictIndex = this.currentProject.balance.conflicts.findIndex((conflict: any) => conflict.conflictSides === this.inputs.solution[0].value)
      this.currentProject.balance.conflicts[this.conflictIndex].solutions.push({})
      this.inputs.solution.forEach((input: any) => {
        if (input.name) {
          this.currentProject.balance.conflicts[this.conflictIndex].solutions[this.currentProject.balance.conflicts[this.conflictIndex].solutions.length - 1][input.name] = input.value
        }
      })
      form.resetForm()
      this.updateProjectRequest()
    }
  }

  public showDialogSolution(index: number) {
    this.visible = true
    this.currentIndex = index
    this.inputs.solution = this.inputs.solution.map((input: any) => {
      input.value = this.currentProject.balance.conflicts[this.conflictIndex].solutions[this.currentIndex][input.name]
      return input
    })
  }

  public updateSolution() {
    if (this.currentIndex > -1) {
      this.inputs.solution.forEach((input: any) => {
        if (input.name) {
          this.currentProject.balance.conflicts[this.conflictIndex].solutions[this.currentIndex][input.name] = input.value
        }
      })
      this.updateProjectRequest()
      this.currentIndex = -1
    }
    this.visible = false
  }

  private updateProjectRequest () {
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.conflicts = this.inputs.conflicts.map((input: any) => {
          input.value = ''
          return input
        })
      })
  }
}
