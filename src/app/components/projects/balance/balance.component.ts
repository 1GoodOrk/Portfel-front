import { Component } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from "@ngx-translate/core";

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { TooltipModule } from 'primeng/tooltip';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { StackholderComponent } from '../stackholder/stackholder.component';
// import { PhaseComponent } from '../phase/phase.component';
@Component({
  selector: 'app-balance',
  imports: [
    AccordionModule,
    StepperModule,
    ButtonModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    TooltipModule,
    InfoDialogComponent,
    // PhaseComponent,
    StackholderComponent
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  public currentProject: any = {}

  public visible: any = {
    project: false
  }

  constructor(
    private appCommunicationService: AppCommunicationService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public showInfoProjectDialog(event?: any): void {
    event.stopPropagation()
    this.visible.project = !this.visible.project
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }
}
