import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

import { HttpService } from '@port/services/http.service';
import { SortingService } from '@port/services/sorting.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    DialogModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    SelectModule,
    DatePickerModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public projectsList: Array<IProjectData> = []
  public projects: Array<IProjectData> = []
  public portfoliosList: Array<IPortfolioDataRO> = []
  public portfolios: Array<IPortfolioDataRO> = []

  public formData: any = {
    name: '',
    img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    des: '',
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    duration: 0,
    location: '',
    town: '',
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  }
  public currentProject: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    budget: 0,
    budgetSource: '',
    processDuration: 0,
    profit: 0,
    traffic: 0,
    road: 0,
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

  public items = [
    { label: 'Bridge', value: 'bridge' },
    { label: 'Fixing', value: 'fix' },
    { label: 'Build', value: 'build' },
    { label: 'Overpass', value: 'overpass' },
    { label: 'Tunnel', value: 'tunnel' },
    { label: 'Detour', value: 'detour' },
    { label: 'Cong', value: 'cong' },
    { label: 'Digitalization', value: 'digitalization' },
  ]

  constructor (
    private router: Router,
    private sortingService: SortingService,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    // TODO: recomment after server connection
    // this.getAllPortfolios()
    // this.getAllProjects()
    this.portfolios = Array.from(this.sortingService.testPortfolios)
    this.projects = Array.from(this.sortingService.testProjects)
    this.portfoliosList = Array.from(this.portfolios)
    this.projectsList = Array.from(this.projects)
  }

  public getAllProjects(): void {
    this.httpService.getAllProjects(localStorage.getItem('userID'));
  }

  public getAllPortfolios(): void {
    this.httpService.getAllPortfolios(localStorage.getItem('userID'));
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

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public showInfoPortfolio(data: IPortfolioDataRO) {
    this.appCommunicationService.currentPortfolio = data
    Object.keys(this.appCommunicationService.currentPortfolio.projectIds).forEach((key: string) => {
      // TODO: type error
      // @ts-expect-error
      this.appCommunicationService.currentPortfolio.projectIds[key] = this.appCommunicationService.currentPortfolio.projectIds[key]
        .map((projId: string) => this.projects.find((proj: any) => proj.id === projId))
    })
    this.navigate(`portfolio/port-${data._id}`)
  }

  public showInfoProjectDialog(id?: string): void {
    if (id) {
      const index = this.projects.findIndex((el: any) => el.id === id)
      Object.keys(this.projects[index]).forEach((key: string) => {
        // TODO: type error
        // @ts-expect-error
        this.currentProject[key] = this.projects[index][key]
      })
    } else {
      this.currentProject = {
        _id: '',
        name: '',
        subinfo: '',
        type: '',
        budget: 0,
        budgetSource: '',
        processDuration: 0,
        profit: 0,
        traffic: 0,
        road: 0,
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
    }
    this.visible.info = !this.visible.info
  }

  public showDialogProjects(mode?: boolean, id?: string, event?: any) {
    if (event) {
      event.stopPropagation()
    }
    if (id) {
      const index = this.projects.findIndex((el: any) => el.id === id)
      Object.keys(this.projects[index]).forEach((key: string) => {
        // TODO: type error
        // @ts-expect-error
        this.formData[key] = this.projects[index][key]
      })
    } else {
      this.formData = {
        _id: '',
        name: '',
        subinfo: '',
        type: '',
        budget: 0,
        budgetSource: '',
        processDuration: 0,
        profit: 0,
        traffic: 0,
        road: 0,
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
    }
    this.visible.creation = mode === undefined ? !this.visible.creation : mode
  }

  public getProject(id: string) {
    this.httpService.getProject(id);
  }

  public updateProject(id: string, form: any) {
    if (form.valid) {
      this.visible.creation = false
      this.httpService.updateProject(id, this.formData);
      this.formData = {
        _id: '',
        name: '',
        subinfo: '',
        type: '',
        budget: 0,
        budgetSource: '',
        processDuration: 0,
        profit: 0,
        traffic: 0,
        road: 0,
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
    }
  }

  public createProject(form: any) {
    if (form.valid) {
      this.visible = false
      this.httpService.createProject(this.formData);
      this.formData = {
        _id: '',
        name: '',
        subinfo: '',
        type: '',
        budget: 0,
        budgetSource: '',
        processDuration: 0,
        profit: 0,
        traffic: 0,
        road: 0,
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
    }
  }

  public removeProjects(id: string, event: any) {
    event.stopPropagation()
    this.httpService.removeProject(id);
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
    this.httpService.removePortfolio(id);
  }
}
