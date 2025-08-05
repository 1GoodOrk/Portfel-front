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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';

import { HttpService } from '@port/services/http.service';

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
    DividerModule,
    DialogModule,
    TreeModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  public data = {
    name: 'Test',
    img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    projects: 14,
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
  public projects: any = [
    {
      name: 'Test',
      subinfo: 'Road 3 wdad',
      des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      budget: 1000000,
      duration: 60,
      mainRoad: false,
      road: 16,
      addressStart: '',
      addressEnd: '',
      options: {
        eco: 34,
        war: 55,
        log: 93,
        soc: 55,
        struc: 20
      },
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
      road: 15,
      addressStart: '',
      addressEnd: '',
      options: {
        eco: 20,
        war: 11,
        log: 47,
        soc: 15,
        struc: 20
      },
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
        eco: 90,
        war: 90,
        log: 0,
        soc: 0,
        struc: 0
      },
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
        eco: 0,
        war: 50,
        log: 50,
        soc: 0,
        struc: 0
      },
      inTown: false,
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg'
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
  nodes = [
    {
      key: '0',
      label: 'Introduction',
      children: [
        { key: '0-0', label: 'What is Angular', data: 'https://angular.io', type: 'url' },
        { key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url' },
        { key: '0-2', label: 'Learn and Explore', data: 'https://angular.io/guide/architecture', type: 'url' },
        { key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url' }
      ]
    },
    {
      key: '1',
      label: 'Components In-Depth',
      children: [
        { key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url' },
        { key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url' },
        { key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url' },
        { key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url' }
      ]
    }
];
  public projectsUnselected: any = []
  public projectsSelected: any = []
  public visible: boolean = false
  public showSpinner: boolean = false

  constructor(
    private router: Router,
    private httpService: HttpService
  ) {
    this.projectsUnselected = Array.from(this.projects)
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public onSubmit(): void {
    this.showSpinner = true
    // this.httpService.createPortfolio(this.data)
    //   .subscribe(() => {
    //     this.showSpinner = false
    //   })
  }

  public select(index: number): void {
    this.projectsSelected.push(this.projectsUnselected[index])
    this.projectsUnselected.splice(index, 1)
  }
  public unselect(index: number): void {
    this.projectsUnselected.push(this.projectsSelected[index])
    this.projectsSelected.splice(index, 1)

  }

  public updateProjects(id: string): void {
    this.httpService.updateProject(id, {});
  }
  public showDialogProjects(mode?: boolean) {
    this.visible = mode === undefined ? !this.visible : mode
  }
  public removeProjects(id: string) {
    this.httpService.removeProject(id);
  }

}
