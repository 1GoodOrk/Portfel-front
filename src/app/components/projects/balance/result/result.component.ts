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
// import { NgClass } from "../../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
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
  }
}
