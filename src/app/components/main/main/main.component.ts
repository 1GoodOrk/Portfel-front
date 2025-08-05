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

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

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
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public projectsList: any = []
  public projects: any = [
    {
      id: 1,
      name: 'Test 1',
      subinfo: 'Road 3 wdad',
      budget: 1000000,
      duration: 60,
      road: 14,
      inTown: false,
      mainRoad: false,
      addressStart: '',
      addressEnd: '',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    },
    {
      id: 2,
      name: 'Test 2',
      subinfo: 'Road 3 wdad',
      budget: 1000000,
      duration: 60,
      road: 14,
      inTown: false,
      mainRoad: false,
      addressStart: '',
      addressEnd: '',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    },
    {
      id: 3,
      name: 'Test 3',
      subinfo: 'Road 3 wdad',
      budget: 1000000,
      duration: 60,
      road: 14,
      inTown: false,
      mainRoad: false,
      addressStart: '',
      addressEnd: '',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    },
    {
      id: 4,
      name: 'Test 4',
      subinfo: 'Road 3 wdad',
      budget: 1000000,
      duration: 60,
      road: 14,
      inTown: false,
      mainRoad: false,
      addressStart: '',
      addressEnd: '',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    }
  ]
  public portfoliosList: any = []
  public portfolios: any = [
    {
      id: 1,
      name: 'Test 1',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      projects: 14,
      projectIds: [1, 3],
      budget: 1000000,
      duration: 60,
      workAmount: 15,
      location: 'inside',
      town: 'Полтава',
      options: {
        eco: 3,
        war: 5,
        log: 9,
        soc: 5,
        struc: 2
      }
    },
    {
      id: 2,
      name: 'Test 2',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      projects: 14,
      projectIds: [1, 4],
      budget: 1000000,
      duration: 60,
      workAmount: 15,
      location: 'inside',
      town: 'Полтава',
      options: {
        eco: 3,
        war: 5,
        log: 9,
        soc: 5,
        struc: 2
      }
    },
    {
      id: 2,
      name: 'Test 3',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      projects: 14,
      projectIds: [2, 3],
      budget: 1000000,
      duration: 60,
      workAmount: 15,
      location: 'inside',
      town: 'Полтава',
      options: {
        eco: 3,
        war: 5,
        log: 9,
        soc: 5,
        struc: 2
      }
    }
  ]

  public formData: any = {
    name: '',
    subinfo: '',
    budget: 0,
    duration: 0,
    road: 0,
    mainRoad: false,
    inTown: false,
    town: '',
    addressStart: '',
    addressEnd: '',
    des: '',
    img: '',
  }
  public currentProject: any = {
    name: '',
    subinfo: '',
    budget: 0,
    duration: 0,
    road: 0,
    mainRoad: false,
    inTown: false,
    town: '',
    addressStart: '',
    addressEnd: '',
    des: '',
    img: '',
  }
  // public visible: boolean = false
  // public visibleProjectInfo: boolean = false
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
    // TODO: recomment after server connection
    // this.getAllPortfolios()
    // this.getAllProjects()
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

  public showInfoPortfolio(data: any) {
    this.appCommunicationService.currentPortfolio = data
    this.appCommunicationService.currentPortfolio.projectIds = this.appCommunicationService.currentPortfolio.projectIds
      .map((projId: string) => this.projects.find((proj: any) => proj.id === projId))
    this.navigate(`portfolio/port-${data.id}`)
  }

  public showInfoProjectDialog(id?: string): void {
    if (id) {
      const index = this.projects.findIndex((el: any) => el.id === id)
      Object.keys(this.projects[index]).forEach((key: string) => {
        this.currentProject[key] = this.projects[index][key]
      })
    } else {
      this.currentProject = {
        name: '',
        subinfo: '',
        budget: 0,
        duration: 0,
        road: 0,
        mainRoad: false,
        inTown: false,
        town: '',
        addressStart: '',
        addressEnd: '',
        des: '',
        img: '',
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
        this.formData[key] = this.projects[index][key]
      })
    } else {
      this.formData = {
        name: '',
        subinfo: '',
        budget: 0,
        duration: 0,
        road: 0,
        mainRoad: false,
        inTown: false,
        town: '',
        addressStart: '',
        addressEnd: '',
        des: '',
        img: '',
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
        name: '',
        subinfo: '',
        budget: 0,
        duration: 0,
        road: 0,
        mainRoad: false,
        inTown: false,
        town: '',
        addressStart: '',
        addressEnd: '',
        des: '',
        img: '',
      }
    }
  }

  public createProject(form: any) {
    if (form.valid) {
      this.visible = false
      this.httpService.createProject(this.formData);
      this.formData = {
        name: '',
        subinfo: '',
        budget: 0,
        duration: 0,
        road: 0,
        mainRoad: false,
        inTown: false,
        town: '',
        addressStart: '',
        addressEnd: '',
        des: '',
        img: '',
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
    this.appCommunicationService.currentPortfolio.projectIds = this.appCommunicationService.currentPortfolio.projectIds
      .map((projId: string) => this.projects.find((proj: any) => proj.id === projId))
    this.navigate('cportfolio')
  }

  public removePortfolio (id: string, event: any) {
    event.stopPropagation()
    this.httpService.removePortfolio(id);
  }
}
