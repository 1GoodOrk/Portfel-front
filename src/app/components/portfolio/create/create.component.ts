import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
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
import { DragDropModule } from 'primeng/dragdrop';
import { ChartModule } from 'primeng/chart';

import { HttpService } from '@port/services/http.service';
import { SortingService } from '@port/services/sorting.service';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { IProjectData, IPortfolioDataRO } from '@port/interfaces';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
import { InfoDialogComponent } from '@port/shared/organisms/info-dialog/info-dialog.component';
import { CreationDialogComponent } from '@port/shared/organisms/creation-dialog/creation-dialog.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    InfoDialogComponent,
    CreationDialogComponent,

    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CheckboxModule,
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
    DatePickerModule,
    DragDropModule,
    ChartModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  // public data: IPortfolioDataRO
  // public projects: Array<IProjectData> = []
  public data: any
  public projects: Array<any> = []
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
    projectsAmount: 0,
    priority: 0,
    score: 0,
    options: {
      eco: 50,
      war: 50,
      log: 0,
      soc: 50,
      struc: 0
    }
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
  public projectsUnselected: Array<any> = []
  public projectsSelected: Array<any> = []
  // public projectsUnselected: Array<IProjectData> = []
  // public projectsSelected: Array<IProjectData> = []
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

  public draggedTier: string = 'unselected';
  public draggedProject: IProjectData | undefined | null;
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

  public dataProjectValuation: any = {
      labels: [],
      datasets: [
        {
          label: 'Valuation',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
  public basicProjectValuationOptions: any;
  public dataRiskScore: any = {
      labels: [],
      datasets: [
        {
          label: 'Risks',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
  public basicRiskScoreOptions: any;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private httpService: HttpService,
    private sortingService: SortingService,
    private appCommunicationService: AppCommunicationService
  ) {
    this.getAllProjects()
    this.refreshCharts()
    this.data = Object.assign(this.appCommunicationService.currentPortfolio)
  }

  public navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  public getAllProjects(): void {
  this.httpService.getAllProjects(JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
    .subscribe((data: any) => {
      this.projects = data.filter((el: IProjectData) => !el.portfolioId)
      this.projectsUnselected = Array.from(this.projects)
    })
}

  public watchPortfolio(): void {
    this.appCommunicationService.currentPortfolio = Object.assign(this.data)
    this.appCommunicationService.currentPortfolio.projects = this.appCommunicationService.currentPortfolio.projectIds.tierI.length + this.appCommunicationService.currentPortfolio.projectIds.tierII.length + this.appCommunicationService.currentPortfolio.projectIds.tierIII.length
    this.navigate('confirmation')
  }

  public refreshCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    this.dataRiskScore = {
      labels: [],
      datasets: [
        {
          label: 'Risks',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
    this.dataProjectValuation = {
      labels: [],
      datasets: [
        {
          label: 'Valuation',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }

    this.projectsSelected.forEach((el: any) => {
      console.log(el)
      this.dataRiskScore.labels.push(el.name)
      this.dataProjectValuation.labels.push(el.name)
      this.dataRiskScore.datasets[0].data.push(el.riskScore)
      this.dataProjectValuation.datasets[0].data.push(el.projectValuation)
      this.dataRiskScore.datasets[0].backgroundColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
      this.dataProjectValuation.datasets[0].backgroundColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
      this.dataRiskScore.datasets[0].borderColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
      this.dataProjectValuation.datasets[0].borderColor.push(`rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`)
    })

    this.basicRiskScoreOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }
    this.basicProjectValuationOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }
    this.cd.markForCheck()
  }


  public select(index: number, event: any): void {
    event.stopPropagation()
    this.projectsSelected.push(this.projectsUnselected[index])
    this.projectsUnselected.splice(index, 1)
    this.refreshCharts()
  }
  public unselect(index: number, event: any): void {
    event.stopPropagation()
    this.projectsUnselected.push(this.projectsSelected[index])
    this.projectsSelected.splice(index, 1)
    this.refreshCharts()
  }
  public selectSorting(type: string): void {
    this.projectsSelected = []
    this.projectsUnselected = Array.from(this.projects)
    if (type === 'Cancel') {
      this.selectedSorting = ''
    } else {
      this.selectedSorting = type
      this.projectsSelected = this.sortingService.sortingSystem(Array.from(this.projectsUnselected), type)
      if (this.filterOptions.projectsAmount > 0) {
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

  public tiersFiltering(): void {
    // this.data = this.sortingService.tierFormatting(this.projectsSelected, this.data)
    this.data = this.sortingService.tierVehicleFormatting(this.projectsSelected, this.data)
  }

  public removeProjects(id: string, event: any) {
    event.stopPropagation()
    this.httpService.removeProject(id, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      .subscribe(() => {
        const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
        const index = user.data.projectIds.indexOf(id);
        if (index > -1) { // only splice array when item is found
          user.projectIds.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
      })
  }

  public showInfoProjectDialog(id?: string, event?: any): void {
    event.stopPropagation()
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

  public visibleOnChange(key: string): void {
    this.appCommunicationService.emptyCurrentProject()
    this.currentProject = Object.assign(this.appCommunicationService.clearProject)
    this.visible[key] = !this.visible[key]
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

  public dragStart(data: IProjectData, tier: string): void {
    this.draggedTier = tier
    this.draggedProject = data;
  }

  public drop(tier: string): void {
    if (this.draggedProject && tier !== this.draggedTier) {
      if (tier !== 'unselected') {
        // TODO: type error @ts-expect-error
        this.data.projectIds[tier].push(this.draggedProject)
      } else {
        this.projectsUnselected.push(this.draggedProject)
      }
      if (this.draggedTier !== 'unselected') {
        // TODO: type error @ts-expect-error
        this.data.projectIds[this.draggedTier] = this.data.projectIds[this.draggedTier].filter((el: any) => el._id !== this.draggedProject?._id)
      } else {
        this.projectsUnselected = this.projectsUnselected.filter((el: any) => el._id !== this.draggedProject?._id)
      }

      this.draggedProject = null;
    }
  }

  public dragEnd(): void {
    this.draggedProject = null;
  }
}
