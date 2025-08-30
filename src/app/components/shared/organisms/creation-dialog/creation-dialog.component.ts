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
    DatePickerModule,
    TranslatePipe,
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrl: './creation-dialog.component.scss'
})
export class CreationDialogComponent {
  @Input() visible: boolean = false;
  @Input() formData: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    budget: 0,
    budgetSource: '',
    processDuration: 0,
    profit: 0,
    traffic: 0,
    forecastProjectTaskAmount: 0,
    road: '',
    distance: 0,
    mainRoad: false,
    inTown: false,
    town: '',
    addressStart: '',
    addressEnd: '',
    des: '',
    img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    dateCreation: '',
    dateInitialization: '',
    permissionDuration: 0,
    score: 0,
    priority: 0,
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  };
  @Output() changeVisibleEvent = new EventEmitter<string>();
  @Output() submitionEvent = new EventEmitter<string>();

  public items = [
    { label: 'Bridge', value: 'bridge' },
    { label: 'Fixing', value: 'fix' },
    { label: 'Build', value: 'build' },
    { label: 'Overpass', value: 'overpass' },
    { label: 'Tunnel', value: 'tunnel' },
    { label: 'Detour', value: 'detour' },
    { label: 'Cong', value: 'cong' },
    { label: 'Digitalization', value: 'digitalization' },
  ]

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {

  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('creation');
  }

  public getAllProjects(): void {
    this.submitionEvent.emit();
  }

  public updateProject(id: string, form: any) {
    if (form.valid) {
      this.httpService.updateProject(id, this.formData)
        .subscribe((data: any) => {
          if (data) {
            this.getAllProjects()
          }
        })
      form.resetForm()
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      this.visibleOnChange()
    }
  }

  public createProject(form: any) {
    if (form.valid) {
      this.formData.score = 0.33 * (this.formData.profit - this.formData.budget) + 0.33 * this.formData.permissionDuration + 0.33 * this.formData.forecastProjectTaskAmount
      this.httpService.createProject(this.formData, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
        .subscribe((data: any) => {
          const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
          user.data.projectIds.push(data._id)
          this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
          this.getAllProjects()
        })
      form.resetForm()
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      this.visibleOnChange()
    }
  }
}
