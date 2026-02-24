import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';

import { AppCommunicationService } from '@port/services/app-communication.service';
import { HttpService } from '@port/services/http.service';

@Component({
  selector: 'app-cog-card',
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
    MultiSelectModule,
    DatePickerModule,
    TranslatePipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public inputs: any = {}
  public currentProject: any = {}
  public currentExpertise: any = {
    risksLean: [],
    risksDigital: [],
    risksClassic: [],
  }
  public user: any = {}
  public experts: any = []
  public expertises: any = []
  public newInputName: any = []
  public newGroupName: any = ''
  public selectedEmail: any = []
  public types: any = ['CLD', 'КО']
  public selectedType: any = ''
  public results: any = []

  public visible: any = {
    expertise: false
  }
  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.httpService.getExperts()
      .subscribe((data: any) => {
        this.experts = data
      })
    this.user = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data
    this.inputs = this.appCommunicationService.getInputsForm(['risksLean', 'risksDigital', 'risksClassic'])
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.getAllExpertise()
  }

  public getAllExpertise() {
    this.httpService.getAllExpertise(this.currentProject._id)
      .subscribe((data: any) => {
        this.expertises = data
        // data.forEach((expertise: any, index: number) => {
        //   this.resultCalculation(expertise, index)
        // })
        this.expertises = this.expertises.map((expertise: any) => {
          expertise.expertName = expertise.email.map((item: any) => item.name).join(', ')
          return expertise
        })
        if (this.user.type === 'EXPERT') {
          this.expertises = this.expertises.filter((expertise: any) => expertise.email.find((item: any) => item.email === this.user.email))
        }
      })
  }

  public createExpertise() {
    const data: any = {
      email: this.selectedEmail,
      type: this.selectedType,
      recommendationDescription: '',
      status: 'НОВИЙ',
      approve: {}
    }
    data.email = data.email.map((item: any) => ({ name: item.organization, email: item.email }))
    this.inputs.risksLean.forEach((el: any) => {
      data.risksLean[el.name] = el.value
    })
    this.inputs.risksDigital.forEach((el: any) => {
      data.risksDigital[el.name] = el.value
    })
    this.inputs.risksClassic.forEach((el: any) => {
      data.risksClassic[el.name] = {}
      el.inputs.forEach((input: any) => {
        data.risksClassic[el.name][input.name] = input.value
      })
    })
    this.httpService.addExpertise(data, this.currentProject._id)
      .subscribe((data: any) => {
        this.selectedEmail = []
        this.selectedType = ''
        this.getAllExpertise()
    })
  }

  private resultCalculation(current: any, index: number): void {
    this.results.push({
      risksLean: { label: 'pages.project.science.risksLeanLabel', value: 0 },
      risksDigital: { label: 'pages.project.science.risksDigitalLabel', value: 0 },
      risksClassic: { label: 'pages.project.science.risksClassicLabel', value: 0 },
    })
    Object.keys(current.risksLean).forEach((key: string) => {
      this.results[index].risksLean.value += current.risksLean[key]
    })
    this.results[index].risksLean.value = (this.results[index].risksLean.value / Object.keys(current.risksLean).length).toFixed(2)
    Object.keys(current.risksDigital).forEach((key: string) => {
      this.results[index].risksDigital.value += current.risksDigital[key]
    })
    this.results[index].risksDigital.value = (this.results[index].risksDigital.value / Object.keys(current.risksDigital).length).toFixed(2)
    Object.keys(current.risksClassic).forEach((keyGroup: string) => {
      this.results[index].risksClassic.value += Object.keys(current.risksClassic[keyGroup])
        .reduce((prev: number, next: any) => current.risksClassic[keyGroup][next] ?
          prev * current.risksClassic[keyGroup][next] :
          prev, 1) ** (1 / Object.keys(current.risksClassic[keyGroup]).length)
    })
    // this.results[index].risksClassic.value = this.results[index].risksClassic.value.toFixed(2)
  }

  public removeExpertise(id: string, event: any) {
    event.stopPropagation()
    this.httpService.removeExpertise(id, this.currentProject._id)
      .subscribe(() => this.getAllExpertise())
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public approveExpertise(data: any, event: any) {
    event.stopPropagation()
    this.appCommunicationService.saveCurrentExpertise(data)
    this.navigate(`approve/${data._id}`)
  }

  public updateExpertise(data: any, event: any, type: string) {
    event.stopPropagation()
    this.appCommunicationService.saveCurrentExpertise(data)
    this.navigate(`${type === 'KO' ? 'analyze-ko' : 'analyze-cld'}/${data._id}`)
  }

  public showInfoDialogExpertise(index: number): void {
    Object.keys(this.expertises[index]).forEach((key: string) => {
      this.currentExpertise[key] = this.expertises[index][key]
    })
    this.appCommunicationService.saveCurrentExpertise(this.currentExpertise)
    this.navigate(`expert/${this.currentExpertise._id}`)
  }

  public visibleOnChange(key: string): void {
    this.visible[key] = !this.visible[key]
  }
}
