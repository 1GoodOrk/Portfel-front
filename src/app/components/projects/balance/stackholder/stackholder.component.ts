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
import { OrganizationChartModule } from 'primeng/organizationchart';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';

@Component({
  selector: 'app-stackholder-balance',
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
    OrganizationChartModule,
    TranslatePipe,
  ],
  templateUrl: './stackholder.component.html',
  styleUrl: './stackholder.component.scss',
})
export class StackholderBalanceComponent {
  public currentProject: any = {}
  public inputs: any = {}
  public timeOut: any
  @Output() updateView = new EventEmitter();

  data: any[] = [{
      key: '0',
      label: 'Founder',
      children: [
        {
          key: '0-0',
          label: 'Product Lead',
          children: [
            {
              key: '0-0-0',
              label: 'UX/UI Designer'
            },
            {
              key: '0-0-1',
              label: 'Product Manager'
            }
          ]
        },
        {
          key: '0-1',
          label: 'Engineering Lead',
          children: [
            {
              key: '0-1-0',
              label: 'Frontend Developer'
            },
            {
              key: '0-1-1',
              label: 'Backend Developer'
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['stackholdersBalance'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public removeStackholder(index: number) {
    this.currentProject.balance.stackholders.splice(index, 1)
    this.updateProjectRequest()
  }

  public updateProject(form: any) {
    if (form.valid) {
      form.resetForm()
      if (!this.currentProject.balance || !this.currentProject.balance.stackholders) {
        this.currentProject.balance = { stackholders: [] }
      }
      this.currentProject.balance.stackholders.push({})
      this.inputs.stackholdersBalance.forEach((input: any) => {
        if (input.name) {
          this.currentProject.balance.stackholders[this.currentProject.balance.stackholders.length - 1][input.name] = input.value
        }
      })
      this.updateProjectRequest()
    }
  }

  private updateProjectRequest () {
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
        this.inputs.stackholdersBalance = this.inputs.stackholdersBalance.map((input: any) => {
          input.value = ''
          return input
        })
      })
  }
}
