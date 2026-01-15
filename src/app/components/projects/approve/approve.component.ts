import { Component } from '@angular/core';

import { DatePipe, JsonPipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';


import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DialogModule,
    DividerModule,
    TranslatePipe,
    ButtonModule,
    DatePipe,
    JsonPipe
  ],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.scss',
})
export class ApproveComponent {
  public current: any = {
    risksLean: [],
    risksDigital: [],
    risksClassic: [],
  }
  public infoPageProjectValueKeys: any = []

  constructor (
    private appCommunicationService: AppCommunicationService,
  ) {
    this.infoPageProjectValueKeys = [
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksLean'),
      ...this.appCommunicationService.getInfoPageProjectValueKeys('risksDigital'),
      ...this.appCommunicationService.getDynamicValueKeys('risksClassic', this.current.risksClassic)
    ]
    this.current = this.appCommunicationService.getCurrentExpertise()
  }

}
