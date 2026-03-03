import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';

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
import { ScrollerModule } from 'primeng/scroller';

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

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['stackholdersLogistic'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public removeStackholder(index: number) {
    this.currentProject.stackholders.splice(index, 1)
  }

  public updateProject(form: any) {
    if (form.valid) {
      form.resetForm()
      this.currentProject.stackholders.push({
        name: this.inputs.stackholdersLogistic[0].value,
        type: this.inputs.stackholdersLogistic[1].value
      })
      this.httpService.updateProject(this.currentProject._id, this.currentProject)
        .subscribe((data: any) => {
          this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
          this.inputs.stackholdersLogistic = this.inputs.stackholdersLogistic.map((input: any) => {
            input.value = ''
            return input
          })
        })
    }
  }
}
