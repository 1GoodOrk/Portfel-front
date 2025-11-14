import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { IProjectData } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';


@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [DialogModule, DividerModule, TranslatePipe, DatePipe, JsonPipe],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  @Input() visible: boolean = false;
  @Output() changeVisibleEvent = new EventEmitter<string>();
  // @Output() visible: boolean = false;
  @Input() currentProject: any = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    managerName: '',
    managerSurname: '',
    managerLastname: '',
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
  }
  public infoPageProjectValueKeys: any = []

  constructor (
    private appCommunicationService: AppCommunicationService
  ) {
    this.infoPageProjectValueKeys = this.appCommunicationService.getInfoPageProjectValueKeys('vehicle')
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('info');
  }
}
