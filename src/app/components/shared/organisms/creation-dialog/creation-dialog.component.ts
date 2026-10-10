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

import {
  EDialogVisibilityKeys,
  EInputRowsName,
  IDialogCommunicationSubjectData,
  IInputRowContainer,
  IInputRow,
  IProjectData,
  IRiskButterflyData
} from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { v6 } from 'uuid';
import { Observable, Subscription } from 'rxjs';

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
  @Output() changeVisibleEvent = new EventEmitter<EDialogVisibilityKeys>();
  @Output() submitionUpdateEvent = new EventEmitter<any>();
  @Output() submitionCreateEvent = new EventEmitter<any>();

  public inputs!: IInputRowContainer
  public subscription!: any
  public currentMode: EInputRowsName = EInputRowsName.logistic
  public data: IProjectData | IRiskButterflyData| any = null
  public header: string = 'Створити проект'


  constructor(
    private appCommunicationService: AppCommunicationService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm([this.currentMode])
    this.communicationUpdate()
  }

  private communicationUpdate(): void {
    this.subscription = this.appCommunicationService.infoCreate.subscribe((data: IDialogCommunicationSubjectData) => {
      this.inputs = this.appCommunicationService.getInputsForm([data.inputRowsName])
      this.currentMode = data.inputRowsName
      this.header = data.header
      if (data.inputRowsName === EInputRowsName.butterfly || data.inputRowsName === EInputRowsName.stairs) {
        this.data = this.appCommunicationService.getCurrentRisk()
      } else if (data.inputRowsName === EInputRowsName.solution) {
        this.data = this.appCommunicationService.getCurrentSolution()
      } else {
        this.data = this.appCommunicationService.getCurrentProject()
      }
      this.inputs[this.currentMode] = this.inputs[this.currentMode].map((input: IInputRow) => {
        if (input.name) {
          input.value = this.data ? this.data[input.name] : ''
        }
        return input
      })
    })
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit(EDialogVisibilityKeys.creation);
  }

  public cancel(form: NgForm): void {
    form.resetForm()
    this.visibleOnChange()
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public update(form: NgForm): void {
    if (form.valid) {
      this.inputs[this.currentMode].forEach((input: IInputRow) => {
        if (input.name) {
          this.data[input.name] = input.value
        }
      })
      form.resetForm()
      this.submitionUpdateEvent.emit(this.data)
    }
  }

  public create(form: NgForm): void {
    if (form.valid) {
      this.data = {}
      this.data._id = v6()
      this.inputs[this.currentMode].forEach((input: IInputRow) => {
        if (input.name) {
          this.data[input.name] = input.value
        }
      })
      form.resetForm()
      this.submitionCreateEvent.emit(this.data)
    }
  }
}
