import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import { InputTextModule } from 'primeng/inputtext';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { TextareaModule } from 'primeng/textarea';
// import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
// import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
// import { SelectModule } from 'primeng/select';
// import { DatePickerModule } from 'primeng/datepicker';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    // InputTextModule,
    // InputNumberModule,
    // TextareaModule,
    // CheckboxModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    // DialogModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    // SelectModule,
    // DatePickerModule,
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
  // public projectsList: Array<IProjectData> = []
  public projectsList: any = []
  public projects: Array<IProjectData> = []
  public portfoliosList: Array<IPortfolioDataRO> = []
  public portfolios: Array<IPortfolioDataRO> = []

  public currentProject: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    managerName: '',
    managerSurname: '',
    managerLastname: '',
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
  }

  public getAllProjects(): void {
    this.httpService.getAllProjects(JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      .subscribe((data: any) => {
        this.projects = data
        this.projectsList = Array.from(this.projects)
        this.getAllPortfolios()
      })
  }

  public visibleOnChange(key: string): void {
    this.appCommunicationService.emptyCurrentProject()
    this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    this.visible[key] = !this.visible[key]
  }

  public getAllPortfolios(): void {
    this.httpService.getAllPortfolios(JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      .subscribe((data: any) => {
        this.portfolios = data.map((port: IPortfolioDataRO) => {
          Object.keys(port.projectIds).forEach((tier: string) => {
            const array: Array<IProjectData> = []
            // TODO: type error
            // @ts-expect-error
            port.projectIds[tier].forEach((el: any) => {
              // TODO: type error
              // @ts-expect-error
              array.push(this.projects.find((proj: IProjectData) => proj._id === el))
            })
            // TODO: type error
            // @ts-expect-error
            port.projectIds[tier] = Array.from(array)
          })
          return port
        })
        this.portfoliosList = Array.from(this.portfolios)
      })
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

  public findPortfolios(): void {
    this.timeout.portfolio = setTimeout(() => {
      this.portfoliosList = Array.from(this.portfolios)
      if (this.search.portfolio) {
        this.portfoliosList = this.portfoliosList.filter((el : any) => el.name.match(this.search.portfolio))
      }
      clearTimeout(this.timeout)
    }, 100)
  }
  // TODO: check why DOM not updated
  // private searchData(search: string, arrayFrom: any, arrayTo: any, timeout: any): any {
  //   timeout = setTimeout(() => {
  //     arrayTo = Array.from(arrayFrom)
  //     console.log(arrayTo)
  //     if (search) {
  //       arrayTo = arrayTo.filter((el : any) => el.name.match(search))
  //     }
  //     console.log(arrayTo)
  //     clearTimeout(this.timeout)
  //   }, 500)
  // }

  public selectForCogModel(id: any, event: any) {
    event.stopPropagation()
    const index = this.projects.findIndex((el: any) => el._id === id)
    Object.keys(this.projects[index]).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.currentProject[key] = this.projects[index][key]
    })
    this.appCommunicationService.saveCurrentProject(Object.assign(this.currentProject))
    this.navigate('cog-model')
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public showInfoPortfolio(data: IPortfolioDataRO) {
    this.appCommunicationService.currentPortfolio = data
    this.navigate(`portfolio/port-${data._id}`)
  }

  public showInfoProjectDialog(id?: string): void {
    if (id) {
      const index = this.projects.findIndex((el: any) => el._id === id)
      Object.keys(this.projects[index]).forEach((key: string) => {
        // TODO: type error
        // @ts-expect-error
        this.currentProject[key] = this.projects[index][key]
      })
      this.currentProject.dateCreation = new Date(this.currentProject.dateCreation)
      this.currentProject.dateInitialization = new Date(this.currentProject.dateInitialization)
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

      this.currentProject.dateCreation = new Date(this.currentProject.dateCreation)
      this.currentProject.dateInitialization = new Date(this.currentProject.dateInitialization)
    } else {
      this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    }
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

  public updatePortfolio (data: any, event: any) {
    event.stopPropagation()
    this.appCommunicationService.currentPortfolio = data
    Object.keys(this.appCommunicationService.currentPortfolio.projectIds).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.appCommunicationService.currentPortfolio.projectIds[key] = this.appCommunicationService.currentPortfolio.projectIds[key]
        .map((projId: string) => this.projects.find((proj: any) => proj.id === projId))
    })
    this.navigate('cportfolio')
  }

  public removePortfolio (id: string, event: any) {
    event.stopPropagation()
    this.httpService.removePortfolio(id, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      .subscribe(() => {
        const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
        const index = user.data.portfolioIds.indexOf(id);
        if (index > -1 && user && user.portfolioIds) {
          user.portfolioIds.splice(index, 1);
        }
        this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
        this.getAllPortfolios()
      })
  }
}
