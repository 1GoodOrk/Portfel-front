import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../shared/organisms/header/header.component';
import { FooterComponent } from '../../shared/organisms/footer/footer.component';

import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { MessageModule  } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { FormsModule } from '@angular/forms';

import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    MessageModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    DialogModule,
    CheckboxModule,
    FormsModule
  ],
  providers: [MessageService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public projects: any = [
    {
      name: 'Test',
      subinfo: 'Road 3 wdad',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60,
      mainRoad: false,
      inTown: false,
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    },
    {
      name: 'Test',
      subinfo: 'Road 3 wdad',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60,
      mainRoad: false,
      inTown: false,
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    },
    {
      name: 'Test',
      subinfo: 'Road 3 wdad',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60,
      mainRoad: false,
      inTown: false,
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    },
    {
      name: 'Test',
      subinfo: 'Road 3 wdad',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60,
      mainRoad: false,
      road: 14,
      addressStart: '',
      addressEnd: '',
      options: {
        eco: 3,
        war: 5,
        log: 9,
        soc: 5,
        struc: 2
      },
      inTown: false,
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
    }
  ]
  public portfolios: any = [
    {
      name: 'Test',
      projects: 14,
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60
    },
    {
      name: 'Test',
      projects: 14,
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60
    },
    {
      name: 'Test',
      projects: 14,
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60
    },
    {
      name: 'Test',
      projects: 14,
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60
    }
  ]

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
  public visible: boolean = false
  constructor (
    private router: Router,
    private messageService: MessageService,
    private httpService: HttpService
  ) {}

  public getAllProjects() {
    this.httpService.getAllProjects(localStorage.getItem('userID'));
  }

  public getAllPortfolios() {
    this.httpService.getAllPortfolios(localStorage.getItem('userID'));
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public showDialogProjects(mode?: boolean) {
    this.visible = mode === undefined ? !this.visible : mode
  }

  public getProject(id: string) {
    this.httpService.getProject(id);
  }

  public updateProjects(id: string) {
    this.httpService.updateProject(id, {});
  }

  public removeProjects(id: string) {
    this.httpService.removeProject(id);
  }

  public updatePortfolio (id: string) {
    this.httpService.updatePortfolio(id, {});
  }

  public removePortfolio (id: string) {
    this.httpService.removePortfolio(id);
  }
}
