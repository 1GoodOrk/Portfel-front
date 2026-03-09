import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";

import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { IProjectData } from '@port/interfaces';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [DialogModule, DividerModule, TranslatePipe],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  @Input() visible: boolean = false;
  @Output() changeVisibleEvent = new EventEmitter<string>();
  // @Output() visible: boolean = false;
  @Input() currentProject: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    responsibleName: '',
    managerName: '',
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

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('info');
  }
}
