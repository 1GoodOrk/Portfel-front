import { Component, Input, Output, EventEmitter } from '@angular/core';
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

import { IProjectData } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';

@Component({
  selector: 'app-creation-dialog',
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
    TranslatePipe,
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrl: './creation-dialog.component.scss'
})
export class CreationDialogComponent {
  @Input() visible: boolean = false;
  // TODO: generated type for input decorator
  // @Input() formData: T = {
  public current: any
  public formData: any = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    responsibleOrganization: '',
    budget: 0,
    budgetSource: '',
    processDuration: 0,
    profit: 0,
    traffic: 0,
    forecastProjectTaskAmount: 0,
    road: '',
    distance: 0,
    mainRoad: false,
    dateCreation: '',
    dateInitialization: '',
    permissionDuration: 0,
    score: 0,
    priority: 0
  };

  @Output() changeVisibleEvent = new EventEmitter<string>();
  @Output() submitionEvent = new EventEmitter<string>();

  public inputs: any = {}

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['logistic'])
    this.current = this.appCommunicationService.getCurrentProject()
    if (this.current._id) {
      this.inputs.logistic = this.inputs.logistic.map((input: any) => {
        input.value = this.current[input.name]
        return input
      })
    } else {
      this.inputs.logistic = this.inputs.logistic.map((input: any) => {
        input.value = typeof input.value === 'string' ? '' : 0
        return input
      })
    }
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('creation');
  }

  public getAllProjects(): void {
    this.submitionEvent.emit();
  }

  public updateProject(id: string, form: any) {
    if (form.valid) {
      form.resetForm()
      this.httpService.updateProject(id, this.formData)
        .subscribe((data: any) => {
          if (data) {
            this.getAllProjects()
          }
        })
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      this.visibleOnChange()
    }
  }

  public createProject(form: any) {
    if (form.valid) {
      const data: any = {
        options: {}
      }
      this.inputs.logistic.forEach((el: any) => {
        if (el.name === 'type') {
          data[el.name] = el.items.find((item: any) => item.value === el.value).label
        } else {
          data[el.name] = el.value
        }
      })
      data.analyze = {}
      data.balance = {}
      data.stackholderData = {}
      data.stackholders = []
      if (this.current._id) {
        this.httpService.updateProject(this.current._id, data)
          .subscribe((data: any) => {
            this.getAllProjects()
            this.visibleOnChange()
        })
      } else {
        this.httpService.createProject(data, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
          .subscribe((data: any) => {
            const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
            user.data.projectIds.push(data._id)
            this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
            this.getAllProjects()
            this.visibleOnChange()
        })
      }
    }
  }
}
