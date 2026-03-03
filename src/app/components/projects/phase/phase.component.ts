import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';

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
  ],
  templateUrl: './phase.component.html',
  styleUrl: './phase.component.scss',
})
export class PhaseComponent {
  public currentProject: any = {}

  constructor(
    private appCommunicationService: AppCommunicationService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
  }

  public removePhase($event: any, index: number) {
    $event.stopPropagation()
    this.currentProject.phase.splice(index, 1)
    this.updateProject()
  }

  public createPhase() {
    this.navigate('phase-creation')
  }

  public showCurrentPhase($event: any, index: number) {
    $event.stopPropagation()
    this.appCommunicationService.saveCurrentPhase(this.currentProject.phase[index])
    this.navigate(`phase-info/${this.currentProject.phase[index]._id}`)
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
}
