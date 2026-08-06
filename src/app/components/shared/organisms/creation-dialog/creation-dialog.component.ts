import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule, NgForm } from '@angular/forms';

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
import { v6 } from 'uuid';

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
export class CreationDialogComponent implements OnDestroy {
  @Input() visible: boolean = false;
  public subscription: any
  public currentProjectID: any
  public data: any = null
  public currentMode: string = 'logistic'
  public header: string = 'Створити проект'

  @Output() changeVisibleEvent = new EventEmitter<string>();
  @Output() submitionUpdateEvent = new EventEmitter<string>();
  @Output() submitionCreateEvent = new EventEmitter<string>();

  public inputs: any = {}

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm([this.currentMode])
    this.communicationUpdate()
  }

  private communicationUpdate(): void {
    this.subscription = this.appCommunicationService.infoCreate.subscribe((data: any) => {
      this.inputs = this.appCommunicationService.getInputsForm([data.inputRowsName])
      this.currentProjectID = this.appCommunicationService.currentProject.id
      this.currentMode = data.inputRowsName
      this.header = data.header
      if (data.inputRowsName === 'risk') {
        this.data = this.appCommunicationService.getCurrentRisk()
      } else if (data.inputRowsName === 'solution') {
        this.data = this.appCommunicationService.getCurrentSolution()
      } else {
        this.data = this.appCommunicationService.getCurrentProject()
      }
      this.inputs[this.currentMode] = this.inputs[this.currentMode].map((input: any) => {
        if (input.name) {
          input.value = this.data ? this.data[input.name] : ''
        }
        return input
      })
    })
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('creation');
  }

  public cancel(form: NgForm): void {
    form.resetForm()
    this.visibleOnChange()
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public update(form: any): void {
    if (form.valid) {
      this.inputs[this.currentMode].forEach((input: any) => {
        if (input.name) {
          this.data[input.name] = input.value
        }
      })
      form.resetForm()
      this.submitionUpdateEvent.emit(this.data)
    }
  }

  public create(form: any): void {
    console.log(this.inputs)
    if (form.valid) {
      this.data = {}
      this.data._id = v6()
      this.inputs[this.currentMode].forEach((input: any) => {
        if (input.name) {
          this.data[input.name] = input.value
        }
      })
      form.resetForm()
      this.submitionCreateEvent.emit(this.data)
    }
  }
}
