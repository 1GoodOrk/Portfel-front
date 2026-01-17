import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { MessageModule  } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';

@Component({
  selector: 'app-experts',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    StepperModule,
    TranslatePipe,
  ],
  templateUrl: './experts.component.html',
  styleUrl: './experts.component.scss',
})
export class ExpertsComponent {
  public inputs: any = {}
  public currentProject: any = {}
  public currentExpertise: any = {}
  public experts: any = []
  public expertises: any = []
  public newInputName: any = []
  public newGroupName: any = ''
  public recommendationDescription: string = ''

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.currentExpertise = this.appCommunicationService.getCurrentExpertise()
    this.inputs = this.appCommunicationService.getDynamicInputsForm('risksClassic', this.appCommunicationService.getInputsForm(['risksLean', 'risksDigital']), this.currentExpertise)
  }

  public addNewGroup() {
    this.inputs.risksClassic.push({
      name: this.newGroupName,
      inputs: []
    })
    this.newGroupName = ''
  }

  public addNewInput(name: string, index: number) {
    this.inputs.risksClassic[index].inputs.push({
      type: 'number',
      displayCondition: true,
      name: name,
      label: name,
      pTooltip: name,
      errors: {
        required: ''
      },
      value: 0,
      refName: name,
      min: 0,
      max: 100,
      step: 1,
    })
    this.newInputName[index] = ''
  }

  public updateExpertise(form: any) {
    if (form.valid) {
      this.currentExpertise
      this.inputs.risksLean.forEach((el: any) => {
        this.currentExpertise.risksLean[el.name] = el.value
      })
      this.inputs.risksDigital.forEach((el: any) => {
        this.currentExpertise.risksDigital[el.name] = el.value
      })
      this.inputs.risksClassic.forEach((el: any) => {
        if (!this.currentExpertise.risksClassic[el.name]) {
          this.currentExpertise.risksClassic[el.name] = {}
        }
        el.inputs.forEach((input: any) => {
          this.currentExpertise.risksClassic[el.name][input.name] = input.value
        })
      })
      if (this.currentExpertise.status === 'pages.project.science.newStatus') {
        this.currentExpertise.status = 'pages.project.science.updatedStatus'
      }
      this.currentExpertise.approve = []
      this.currentExpertise.recommendationDescription = this.recommendationDescription
      this.httpService.updateExpertise(this.currentExpertise)
        .subscribe((data: any) => {
          form.resetForm()
          this.back()
      })
    }
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }

}
