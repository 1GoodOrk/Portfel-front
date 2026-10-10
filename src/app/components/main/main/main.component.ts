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

import { HttpService } from '@port/services/http/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
import { EDialogVisibilityKeys, EInputRowsName, IDialogVisibility, IFormProjectData, IProjectData, ISearchProperties, ITimeoutContainer, IUserData } from '@port/interfaces';
import { FakeRequestService } from '@port/services/fake-request.service';

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
  public user!: IUserData
  public projects: Array<IProjectData> = []
  public projectsFilteredList: Array<IProjectData> = []

  public currentProject!: IProjectData
  public visible: IDialogVisibility = {
    creation: false,
    info: false
  }
  public search: ISearchProperties = {
    project: ''
  }
  public timeout: ITimeoutContainer = {}

  constructor (
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private fakeRequestService: FakeRequestService,
    private httpService: HttpService
  ) {
    this.user = JSON.parse(this.appCommunicationService.sessionStorageGet('user'))
    this.getAllProjects()
    this.currentProject = Object.assign(this.appCommunicationService.clearCurrentProject())
  }

  public getAllProjects(): void {
    this.fakeRequestGetAll()
    // this.httpService.getAllProjects(JSON.parse(this.appCommunicationService.sessionStorageGet('user')).token)
    //   .subscribe((data: Array<IProjectData>) => {
    //     this.projects = Array.from(data)
    //     this.projectsFilteredList = Array.from(this.projects)
    //   })
  }

  public visibleOnChange(key: EDialogVisibilityKeys): void {
    this.currentProject = Object.assign(this.appCommunicationService.clearCurrentProject())
    this.visible[key] = !this.visible[key]
  }

  public findProjects(): void {
    this.timeout.project = setTimeout(() => {
      this.projectsFilteredList = Array.from(this.projects)
      if (this.search.project) {
        this.projectsFilteredList = this.projectsFilteredList.filter((el : IProjectData) => el.name.match(this.search.project))
      }
      clearTimeout(this.timeout.project)
    }, 100)
  }

  private copySelectedProject(id: string):void {
    const index = this.projects.findIndex((el: IProjectData) => el._id === id)
    Object.keys(this.projects[index]).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.currentProject[key as keyof IProjectData] = this.projects[index][key as keyof IProjectData]
    })
  }

  public selectForCogAnalyzeModel(id: string, event: PointerEvent) {
    event.stopPropagation()
    this.copySelectedProject(id)
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
    this.navigate('analyze')
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }

  public showInfoProjectDialog(id?: string): void {
    if (id) {
      this.copySelectedProject(id)
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearCurrentProject())
    }
    this.appCommunicationService.saveCurrentProject(this.currentProject)
    this.visible.info = true
    this.appCommunicationService.sendInfoData({ inputRowsName: EInputRowsName.logistic, header: 'Переглянути проект' })
  }

  public showDialogProjects(id?: string, event?: PointerEvent) {
    if (event) {
      event.stopPropagation()
    }
    if (id) {
      this.copySelectedProject(id)
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearCurrentProject())
    }
    this.appCommunicationService.saveCurrentProject(this.currentProject)
    this.visible.creation = true
    this.appCommunicationService.sendCreateData({ inputRowsName: EInputRowsName.logistic, header: id ? 'Оновити проект' : 'Створити проект' })
  }

  public removeProjects(id: string, event: PointerEvent) {
    event.stopPropagation()
    this.fakeRequestRemoveProjects(id)
    this.getAllProjects()
    // this.httpService.removeProject(id, JSON.parse(this.appCommunicationService.sessionStorageGet('user')).token)
    //   .subscribe(() => {
    //     const user = JSON.parse(this.appCommunicationService.sessionStorageGet('user'))
    //     const index = user.projectIds.indexOf(id);
    //     if (index > -1 && user && user.projectIds) {
    //       user.projectIds.splice(index, 1);
    //     }
    //     this.appCommunicationService.sessionStorageSave('user', JSON.stringify(user))
    //     this.getAllProjects()
    //   })
  }

  public updateProject(data: IFormProjectData): void {
    this.fakeRequestUpdateProject(this.currentProject._id, data)
    this.getAllProjects()
    // this.httpService.updateProject(this.currentProject._id, data)
    //   .subscribe(() => {
    //     this.getAllProjects()
    //     this.visible.creation = false
    //   })
  }

  public createProject(data: IFormProjectData): void {
    this.fakeRequestCreateProject(data)
    this.getAllProjects()
    // this.httpService.createProject(data, JSON.parse(this.appCommunicationService.sessionStorageGet('user')).token)
    //   .subscribe((data: IProjectData) => {
    //     if (data) {
    //       const user = JSON.parse(this.appCommunicationService.sessionStorageGet('user'))
    //       user.projectIds.push(data._id)
    //       this.appCommunicationService.sessionStorageSave('user', JSON.stringify(user))
    //       this.getAllProjects()
    //       this.visible.creation = false
    //     }
    //   })
  }


  private fakeRequestGetAll(): void {
    this.projects = Array.from(this.fakeRequestService.getProjects(this.user))
    this.projectsFilteredList = Array.from(this.projects)
  }

  private fakeRequestCreateProject(data: any): void {
    this.fakeRequestService.createProject(data)
  }

  private fakeRequestUpdateProject(id: string, data: any): void {
    this.fakeRequestService.updateProject(id, data)
  }

  private fakeRequestRemoveProjects(id: string): void {
    this.fakeRequestService.deleteProjects(id)
  }
}
