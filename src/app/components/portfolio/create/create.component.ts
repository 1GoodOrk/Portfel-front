import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';

import { HttpService } from '@port/services/http.service';
import { SortingService } from '@port/services/sorting.service';
import { IProjectData, IPortfolioDataRO } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,

    InputTextModule,
    InputNumberModule,
    TextareaModule,
    MessageModule,
    ButtonModule,
    CardModule,
    FormsModule,
    TooltipModule,
    SelectModule,
    ProgressSpinnerModule,
    TranslatePipe,
    StepperModule,
    RadioButtonModule,
    MultiSelectModule,
    DividerModule,
    DialogModule,
    DatePickerModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  public data: IPortfolioDataRO
  public projects: Array<IProjectData> = []
  public formData: any = {
    name: '',
    subinfo: '',
    des: '',
    budget: 0,
    duration: 0,
    mainRoad: false,
    inTown: false,
    img: '',
  }
  public filterOptions = {
    type: '',
    profit: '',
    projectsAmount: -1,
    priority: 0,
    score: 0
  };
  public filterItems = {
    type: [
      { label: 'Bridge', value: 'bridge' },
      { label: 'Fixing', value: 'fix' },
      { label: 'Build', value: 'build' },
      { label: 'Overpass', value: 'overpass' },
      { label: 'Tunnel', value: 'tunnel' },
      { label: 'Detour', value: 'detour' },
      { label: 'Cong', value: 'cong' },
      { label: 'Digitalization', value: 'digitalization' },
    ],
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
  public selectedSorting: string = '';
  public projectsUnselected: Array<IProjectData> = []
  public projectsSelected: Array<IProjectData> = []
  public showSpinner: boolean = false
  public visible: any = {
    creation: false,
    info: false
  }

  public formDataProject: any = {
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

  constructor(
    private router: Router,
    private httpService: HttpService,
    private sortingService: SortingService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.projects = Array.from(this.sortingService.testProjects)
    this.data = Object.assign(this.sortingService.testPortfolios[0])
    this.projectsUnselected = Array.from(this.projects)
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public watchPortfolio(): void {
    this.appCommunicationService.currentPortfolio = Object.assign(this.data)
    this.navigate('confirmation')
  }

  public select(index: number): void {
    this.projectsSelected.push(this.projectsUnselected[index])
    this.projectsUnselected.splice(index, 1)
  }
  public unselect(index: number): void {
    this.projectsUnselected.push(this.projectsSelected[index])
    this.projectsSelected.splice(index, 1)
  }
  public selectSorting(type: string): void {
    this.projectsSelected = []
    this.projectsUnselected = Array.from(this.projects)
    if (type === 'Cancel') {
      this.selectedSorting = ''
    } else {
      this.selectedSorting = type
      this.projectsSelected = this.sortingService.sortingSystem(Array.from(this.projectsUnselected), type)
      if (this.filterOptions.projectsAmount > -1) {
        this.projectsUnselected = this.projectsSelected.splice(this.filterOptions.projectsAmount - 1)
      } else {
        this.projectsUnselected = []
      }
    }
  }

  public checkSortingType(type: string): boolean {
    return this.selectedSorting === type
  }

  public updateProjects(id: string): void {
    this.httpService.updateProject(id, {});
  }
  public removeProjects(id: string, event: any) {
    event.stopPropagation()
    this.httpService.removeProject(id);
  }

  public tiersFiltering(): void {
    this.data = this.sortingService.tierFormatting(this.projectsSelected, this.data)
  }

  public showInfoProjectDialog(_id?: string, event?: any): void {
    if (event) {
      event.stopPropagation()
    }
    if (_id) {
      const index = this.projects.findIndex((el: any) => el._id === _id)
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

  public showDialogProjects(mode?: boolean, _id?: string, event?: any) {
    if (event) {
      event.stopPropagation()
    }
    if (_id) {
      const index = this.projects.findIndex((el: any) => el._id === _id)
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
  public updateProject(_id: string, form: any) {
    if (form.valid) {
      this.visible.creation = false
      this.httpService.updateProject(_id, this.formData);
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

}
