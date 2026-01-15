import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { AppCommunicationService } from '@port/services/app-communication.service';


@Component({
  selector: 'app-info-expertise-dialog',
  standalone: true,
  imports: [DialogModule, DividerModule, TranslatePipe, DatePipe, JsonPipe],
  templateUrl: './info-expertise-dialog.component.html',
  styleUrl: './info-expertise-dialog.component.scss'
})
export class InfoDialogExpertiseComponent {
  @Input() visible: boolean = false;
  @Output() changeVisibleEvent = new EventEmitter<string>();
  // @Output() visible: boolean = false;
  @Input() current: any = {
    risksLean: [],
    risksDigital: [],
    risksClassic: [],
  }
  public infoPageProjectValueKeys: any = []

  constructor (
    private appCommunicationService: AppCommunicationService,
  ) {
  }

  public updateView() {
    this.infoPageProjectValueKeys = [
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksLean'),
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksDigital'),
      ...this.appCommunicationService.getDynamicValueKeys('risksClassic', this.current)
    ]
  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('info');
  }
}
