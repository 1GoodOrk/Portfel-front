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

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
import { InfoDialogStackholderComponent } from '@port/shared/organisms/info-dialog-stackholders/info-dialog.component';

@Component({
  selector: 'app-stackholders',
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
    InfoDialogStackholderComponent
  ],
  templateUrl: './stackholders.component.html',
  styleUrl: './stackholders.component.scss',
})
export class StackholdersComponent {
  public inputs: any = []
  public stackholders: any = []
  public currentProject: any = {}
  public currentStackholder: any = {}
  public visible: any = {
    project: false,
    stackholder: false
  }

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.inputs = this.appCommunicationService.getInputsForm(['stackholders'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.getStackholders()
  }

  public addStackholder() {
    const data: any = {}
    this.inputs.stackholders.forEach((el: any) => {
      data[el.name] = el.value
    })
    this.appCommunicationService.saveStackholder(data)
    this.getStackholders()
    // return true
  }

  public removeStackholder(index: number, event?: any) {
    if (event) {
      event.stopPropagation()
    }
    this.appCommunicationService.deleteStackholder(index)
    this.getStackholders()
  }

  public getStackholders() {
    this.stackholders = this.appCommunicationService.getStackholder()
  }

  public showInfoStackholderDialog(index: number, event?: any) {
    event.stopPropagation()
    Object.keys(this.stackholders[index]).forEach((key: string) => {
      this.currentStackholder[key] = this.stackholders[index][key]
    })
    this.visible.info = !this.visible.info
  }

  public visibleOnChange(key: string): void {
    this.currentStackholder = Object.assign(this.appCommunicationService.clearStackholder)
    this.visible[key] = !this.visible[key]
  }

}
