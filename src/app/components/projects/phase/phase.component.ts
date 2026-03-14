import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DragDropModule } from 'primeng/dragdrop';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';
@Component({
  selector: 'app-phase',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TooltipModule,
    DragDropModule
  ],
  templateUrl: './phase.component.html',
  styleUrl: './phase.component.scss',
})
export class PhaseComponent {
  public currentProject: any = {}
  public draggedElem: any | undefined | null;

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public removePhase($event: any, index: number) {
    $event.stopPropagation()
    this.currentProject.phases.splice(index, 1)
    this.updateProject()
  }

  public createPhase() {
    this.appCommunicationService.clearCurrentPhase()
    this.navigate('phase-creation')
  }

  public analazyPhases() {
    this.navigate('phases-analyze')
  }

  public updatePhase($event: any, index: number) {
    $event.stopPropagation()
    this.appCommunicationService.saveCurrentPhase(this.currentProject.phases[index])
    this.navigate('phase-creation')
  }

  public showCurrentPhase($event: any, index: number) {
    $event.stopPropagation()
    this.appCommunicationService.saveCurrentPhase(this.currentProject.phases[index])
    this.navigate(`phase-info/${this.currentProject.phases[index]._id}`)
  }

  public updateProject() {
    this.httpService.updateProject(this.currentProject._id, this.currentProject)
      .subscribe((data: any) => {
        this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
      })
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public dragStart(data: any, index: any) {
    this.draggedElem = data;
  }

  public drop(index: number) {
    if (this.draggedElem) {
      let draggedIndex = this.currentProject.phases.findIndex((el: any) => el._id === this.draggedElem._id);
      if (draggedIndex !== index) {
        this.currentProject.phases.splice(draggedIndex, 1);
        this.currentProject.phases.splice(index, 0, this.draggedElem);
      }
      this.updateProject()
      this.draggedElem = null;
    }
  }

  public dragEnd() {
    this.draggedElem = null;
  }
}
