import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslatePipe } from "@ngx-translate/core";
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepperModule } from 'primeng/stepper';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DialogModule,
    DividerModule,
    TextareaModule,
    FormsModule,
    TranslatePipe,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    InputNumberModule,
    StepperModule,
    TooltipModule
  ],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.scss',
})
export class ApproveComponent {
  // public step: string = 'first'
  public fields: string[] = [
    'Навантаження',
    'Якість контенту',
    'Якість персоналу',
    'Кількість персоналу',
    'Якість управління',
    'Надмірність даних',
    'Неточності',
    'Систематичні помилки',
    'Інфраструктура',
    'Логістика',
    'Рівень компетентності НПП',
    'Забезпечення кількості НПП',
    'Плинність кадрів',
    'Людський фактор компетенції НПП',
    'Недостатній набір',
    'Коефіцієнт успішності',
    'Вихідні показники',
    'Дісбаланс',
    'Зовнішні фактори',
    'Угода',
    'Затримка',
    'Навантаження системи',
    'Навантаження відділу',
    'Навантаження персоналу',
    'Епідемія',
    'Воєнний час',
    'Стихійне лихо',
    'Людський фактор'
  ]
  public selectedFields: string[] = []
  public additionalFields: string = ''
  public fieldsToApprove: any[] = []
  public currentFields: any[] = []
  public currentSessionMail: string = ''
  public timeout: any

  public current: any = {}

  constructor (
    private router: Router,
    private httpService: HttpService,
    private appCommunicationService: AppCommunicationService,
  ) {
    this.pre()
  }

  public changeSelectedFields(data: any): void {
    if (this.selectedFields.length > data.length) {
      [...this.selectedFields]
        .filter((key: string) => data.indexOf(key) === -1)
        .forEach((key: string) => {
          this.fieldsToApprove.splice(this.fieldsToApprove.findIndex((field: any) => field.label === key), 1)
        })
    } else {
      data.forEach((key: string) => {
        if (this.fieldsToApprove.findIndex((field: any) => field.label === key) === -1) {
          this.fieldsToApprove.push({
            label: key,
            grade: 0,
            quality: 0,
            value: 0
          })
        }
      })
    }
    this.selectedFields = data
  }

  public addField (): void {
    this.fieldsToApprove.push({
      label: this.additionalFields,
      grade: 0,
      quality: 0,
      value: 0
    })
    this.additionalFields = ''
  }

  public removeField(index: number): void {
    const selectedFieldsIndex = this.selectedFields.indexOf(this.fieldsToApprove[index].label)
    if (selectedFieldsIndex > -1) {
      this.selectedFields.splice(selectedFieldsIndex, 1)
    }
    this.fieldsToApprove.splice(index, 1)
  }

  private pre() {
    this.current = this.appCommunicationService.getCurrentExpertise()
    if (!this.current.approve.fields) {
      this.current.approve = {
        fields: []
      }
    }
    this.currentSessionMail = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.email
    if (this.current.approve && this.current.approve.fields) {
      this.current.approve.fields.forEach((field: any) => {
        const currentApproveIndex = field.approve.findIndex((approve: any) => approve.email === this.currentSessionMail)
        if (currentApproveIndex > -1) {
          this.fieldsToApprove.push({
            label: field.label,
            grade: field.approve[currentApproveIndex].grade,
            quality: field.approve[currentApproveIndex].quality,
            value: field.approve[currentApproveIndex].value
          })
        } else {
          this.fieldsToApprove.push({
            label: field.label,
            grade: 0,
            quality: 0,
            value: 0
          })
        }
      })
    }
  }



  public updateExpertise(): void {
    if (this.current.status === 'НОВИЙ') {
      this.current.status = 'ПОГОДЖЕННЯ'
    }
    if (!this.current.approve.fields) {
      this.current.approve = {
        fields: [],
        consistency: 0
      }
    }
    this.fieldsToApprove.forEach((currentField: any) => {
      const indexField = this.current.approve.fields.findIndex((field: any) => field.label === currentField.label)
      if (indexField > -1) {
        const currentApproveIndex =  this.current.approve.fields[indexField].approve
          .findIndex((approve: any) => approve.email === this.currentSessionMail)
        if (currentApproveIndex === -1) {
          this.current.approve.fields[indexField].approve.push({
            email: this.currentSessionMail,
            grade: currentField.grade,
            quality: currentField.quality,
            value: currentField.value
          })
        } else {
          this.current.approve.fields[indexField].approve[currentApproveIndex] = {
            email: this.currentSessionMail,
            grade: currentField.grade,
            quality: currentField.quality,
            value: currentField.value
          }
        }
      } else {
        this.current.approve.fields.push({
          label: currentField.label,
          approve: [
            {
              email: this.currentSessionMail,
              grade: currentField.grade,
              quality: currentField.quality,
              value: currentField.value
            }
          ]
        })
      }
    })

    if (this.current.approve.fields[0].approve.length === this.current.email.length) {
      this.current.status = 'ОЦІНКА'
      this.current.approve.consistency = 0
      this.current.approve.fields.forEach((field: any) => {
        this.current.approve.consistency += (field.approve.map((el: any) => el.grade).reduce((p: number, n: number) => p + n) - ((this.current.email.length * (this.current.approve.fields.length + 1)) / 2)) ** 2
      });
      this.current.approve.consistency = (this.current.approve.consistency / (this.current.email.length ** 2 * (this.current.approve.fields.length ** 2 - this.current.approve.fields.length))).toFixed(2)
    }
    this.httpService.updateExpertise(this.current)
      .subscribe(() => {
        this.appCommunicationService.saveCurrentExpertise(this.current)
      })
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }
}
