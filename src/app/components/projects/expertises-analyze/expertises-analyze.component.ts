import { Component } from '@angular/core';
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
  selector: 'app-expertises-analyze',
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
  templateUrl: './expertises-analyze.component.html',
  styleUrl: './expertises-analyze.component.scss',
})
export class ExpertisesAnalyzeComponent {
  public experts: any = []
  public expertises: any = []
  public currentProject: any = {}
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
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.getAllExpertise()
  }

  public getAllExpertise() {
    this.httpService.getAllExpertise(this.currentProject._id)
      .subscribe((data: any) => {
        data = data.filter((expertise: any) => expertise.status === 'pages.project.science.approvedStatus')
        data.forEach((expertise: any, index: number) => {
          this.resultCalculation(expertise, index)
        })
        this.expertises = data
        this.expertises = this.expertises.map((expertise: any) => {
          expertise.expertName = this.experts.find((expert: any) => expert.email === expertise.email).organization
          return expertise
        })
      })
  }

  private resultCalculation(current: any, index: number): void {
    this.results.push({
      risksLean: { label: 'pages.project.science.risksLeanCalucationLabel', value: 0 },
      risksDigital: { label: 'pages.project.science.risksDigitalCalucationLabel', value: 0 },
      risksClassic: { label: 'pages.project.science.risksClassicCalucationLabel', value: 0 },
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
    this.results[index].risksClassic.value = this.results[index].risksClassic.value.toFixed(2)
  }


}
