import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { IProjectData } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';


@Component({
  selector: 'app-info-dialog-stack',
  standalone: true,
  imports: [DialogModule, DividerModule, TranslatePipe, DatePipe, JsonPipe],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogStackholderComponent {
  @Input() visible: boolean = false;
  @Output() changeVisibleEvent = new EventEmitter<string>();
  // @Output() visible: boolean = false;
  @Input() currentStackholder: any = {
    type: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    responsibleOrganization: '',
    power: 0,
    influence: 0,
    transport: 0,
    social: 0,
    economic: 0,
    ecologic: 0,
    comfort: 0,
    technologic: 0,
    informative: 0,
    security: 0,
    managment: 0,
    eco: 0,
    ecoPos: 0,
    war: 0,
    warPos: 0,
    log: 0,
    logPos: 0,
    soc: 0,
    socPos: 0,
    struc: 0,
    strucPos: 0
  }
  public infoPageProjectValueKeys: any = []

  constructor (
    private appCommunicationService: AppCommunicationService
  ) {
    this.infoPageProjectValueKeys = this.appCommunicationService.getInfoPageProjectValueKeys('stackholder')
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('info');
  }
}
