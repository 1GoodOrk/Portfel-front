import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';

import { IProjectData } from '@port/interfaces';
import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';

@Component({
  selector: 'app-creation-dialog',
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
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrl: './creation-dialog.component.scss'
})
export class CreationDialogComponent {
  @Input() visible: boolean = false;
  @Input() formData: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
    responsibleName: '',
    managerName: '',
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
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/57/%D0%9F%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B8_%D0%91%D0%B0%D0%B6%D0%B0%D0%BD%D0%B0.JPG',
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
  };
  @Output() changeVisibleEvent = new EventEmitter<string>();
  @Output() submitionEvent = new EventEmitter<string>();

  public itemsBuild = [
    'Магістральні улиці загального значення',
    'Магістральні вулиці районного значення',
    'Дорога регіонального значення',
    'Дорога міжмуніципального значення',
    'Дорога федерального значення',
    'Дорога местного значения',
    'Частные автомобильные дороги',
    'Спеціалізовані вулиці/зони',
    'Проїзд'
  ]
  public items = ['Міст', 'Ремонт', 'Будівництво', 'Естакада', 'Тунель', `Об'їзд`, `З'їзд`, 'Диджиталізація']

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {

  }

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('creation');
  }

  public getAllProjects(): void {
    this.submitionEvent.emit();
  }

  public updateProject(id: string, form: any) {
    if (form.valid) {
      this.httpService
        .updateProjectLocal(id, this.formData)
        .then((data: any) => {
          this.getAllProjects()
        })
      // this.httpService.updateProject(id, this.formData)
      //   .subscribe((data: any) => {
      //     if (data) {
      //       this.getAllProjects()
      //     }
      //   })
      form.resetForm()
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      this.visibleOnChange()
    }
  }

  public createProject(form: any) {
    if (form.valid) {
      this.formData.score = 0.33 * (this.formData.budget) + 0.33 * this.formData.permissionDuration + 0.33 * this.formData.forecastProjectTaskAmount
      this.httpService
        .createProjectLocal(this.formData, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
        .then((data: any) => {
          const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
          user.data.projectIds.push(data._id)
          this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
          this.getAllProjects()
        })
      // this.httpService.createProject(this.formData, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
      //   .subscribe((data: any) => {
      //     const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
      //     user.data.projectIds.push(data._id)
      //     this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
      //     this.getAllProjects()
      //   })
      form.resetForm()
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      this.visibleOnChange()
    }
  }
}

// Проспект Миколи Бажана
// Осокорки, Позняки, Харківський
// Александр Петрович Бедромир
// Анна Петровна Гончар
// Build&Prod
// Государство
// Киев
// Южный мост
// ст. м. «Бориспільська»
// Це велика магістраль у Дарницькому районі Києва (Осокорки, Позняки, Харківський), що з'єднує Південний міст і Харківську площу. Вздовж нього розташовані шість станцій метро зеленої гілки: «Славутич», «Осокорки», «Позняки», «Харківська», «Вирлиця» та «Бориспільська».

// вул. Євгена Харченка
// От вул. Саксаганського до станції метро «Олімпійська»
// Бедромир Александр Петрович
// Гончар Анна Петровна
// Build&Prod
// Новый Взгляд
// Государство
// Киев
// ПМП
// Березняковськая
// Дорога местного значения
// Улица Евгения Харченко — улица в Дарницком районе города Киева, исторически сложившаяся местность Бортничи. Пролегает от перекрёстка улиц Светлая и Лесная до перекрёстка улиц Переяславская, Ивана Богуна и Автотранспортная.
