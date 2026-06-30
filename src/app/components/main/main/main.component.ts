import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
import { IProjectData } from '@port/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    InfoDialogComponent,
    CreationDialogComponent
  ],
  providers: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public projectsList: any = []
  public user: any = {}
  public projects: Array<IProjectData> = []

  public currentProject: IProjectData = {
    _id: '',
    name: '',
    des: '',
    subinfo: '',
    priority: 0,
    responsibleName: '',
    phases: '',
    stackholders: ''
  }
  public visible: any = {
    creation: false,
    info: false
  }
  public search: any = {
    portfolio: '',
    project: ''
  }
  public timeout: any = {
    portfolio: {},
    project: {}
  }

  constructor (
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.getAllProjects()
    this.user = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data
  }

  public getAllProjects(): void {
    this.httpService.getAllProjects(JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      .subscribe((data: any) => {
        this.projects = data
        this.projectsList = Array.from(this.projects)
      })
  }

  public visibleOnChange(key: string): void {
    this.appCommunicationService.emptyCurrentProject()
    this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    this.visible[key] = !this.visible[key]
  }

  public findProjects(): void {
    this.timeout.project = setTimeout(() => {
      this.projectsList = Array.from(this.projects)
      if (this.search.project) {
        this.projectsList = this.projectsList.filter((el : any) => el.name.match(this.search.project))
      }
      clearTimeout(this.timeout)
    }, 100)
  }

  public selectForCogAnalyzeModel(id: any, event: any) {
    event.stopPropagation()
    const index = this.projects.findIndex((el: any) => el._id === id)
    Object.keys(this.projects[index]).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.currentProject[key] = this.projects[index][key]
    })
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
    this.navigate('analyze')
  }

  public selectForCogBalanceModel(id: any, event: any) {
    event.stopPropagation()
    const index = this.projects.findIndex((el: any) => el._id === id)
    Object.keys(this.projects[index]).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.currentProject[key] = this.projects[index][key]
    })
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
    this.navigate('balance')
  }


  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public showInfoProjectDialog(id?: string): void {
    if (id) {
      const index = this.projects.findIndex((el: any) => el._id === id)
      Object.keys(this.projects[index]).forEach((key: string) => {
        // TODO: type error
        // @ts-expect-error
        this.currentProject[key] = this.projects[index][key]
      })
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    }
    this.visible.info = !this.visible.info
  }

  public showDialogProjects(mode?: boolean, id?: string, event?: any) {
    if (event) {
      event.stopPropagation()
    }
    if (id) {
      const index = this.projects.findIndex((el: any) => el._id === id)
      Object.keys(this.projects[index]).forEach((key: string) => {
        // TODO: type error
        // @ts-expect-error
        this.currentProject[key] = this.projects[index][key]
      })
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    }
    this.appCommunicationService.saveCurrentProject(this.currentProject)
    this.visible.creation = true
  }

  public removeProjects(id: string, event: any) {
    event.stopPropagation()
    this.httpService.removeProject(id, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      .subscribe(() => {
        const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
        const index = user.data.projectIds.indexOf(id);
        if (index > -1 && user && user.projectIds) {
          user.projectIds.splice(index, 1);
        }
        this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
        this.getAllProjects()
      })
  }
}
