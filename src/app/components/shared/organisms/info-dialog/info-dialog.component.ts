import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { IProjectData } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';


@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [DialogModule, DividerModule, TranslatePipe, DatePipe],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent implements OnDestroy {
  @Input() visible: boolean = false;
  @Output() changeVisibleEvent = new EventEmitter<string>();

  public currentMode: string = 'logistic'
  public data: any = null
  public header: string = 'Переглянути проект'
  public subscription: any
  public infoPageProjectValueKeys: any = []

  constructor (
    private appCommunicationService: AppCommunicationService
  ) {
    this.infoPageProjectValueKeys = [...this.appCommunicationService.getInfoPageProjectValueKeys(this.currentMode)]
    this.communicationUpdate()
  }

  private communicationUpdate(): void {
    this.subscription = this.appCommunicationService.infoSub.subscribe((data: any) => {
      this.infoPageProjectValueKeys = [...this.appCommunicationService.getInfoPageProjectValueKeys(data.inputRowsName)]
      this.currentMode = data.inputRowsName
      this.header = data.header
      if (data.inputRowsName === 'solution') {
        this.data = this.appCommunicationService.getCurrentSolution()
      } else {
        this.data = this.appCommunicationService.getCurrentProject()
      }
    })
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('info');
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
