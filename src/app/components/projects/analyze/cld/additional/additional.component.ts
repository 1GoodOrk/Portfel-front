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
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';

import { HttpService } from '@port/services/http.service';
import { AppCommunicationService } from '@port/services/app-communication.service';

import { HeaderComponent } from '@port/shared/organisms/header/header.component';
import { FooterComponent } from '@port/shared/organisms/footer/footer.component';
@Component({
  selector: 'app-additional',
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
    RatingModule,
    TableModule
  ],
  templateUrl: './additional.component.html',
  styleUrl: './additional.component.scss',
})
export class AdditionalComponent {
  public inputs: any = []
  public currentProject: any = {}
  public currentExpertise: any = {}
  public currentSessionMail: string = ''
  public recommendationDescription: string = ''
  public tableParams: any = {}
  public weight = {
    lean: 0,
    digital: 0,
    classic: 0
  }

  public dig = 0

  public wcoef = {
    quality: 0,
    money: 0,
    time: 0
  }

  public wlean = {
    defect: 0,
    waiting: 0,
    overproduct: 0,
    motion: 0,
    proccessing: 0,
    transporting: 0,
    talents: 0
  }

  constructor(
    private router: Router,
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {
    this.pre()
  }

  private pre(): void {
    this.currentProject = this.appCommunicationService.getCurrentProject()
    this.currentExpertise = this.appCommunicationService.getCurrentExpertise()
    this.currentSessionMail = JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.email
  }

  public navigate(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  public back() {
    this.navigate('cog-model')
  }

  public updateExpertise() {
    this.currentExpertise.approve.weigth = {
      mainWeight: this.weight,
      wcoef: this.wcoef,
      wlean: this.wlean,
      wdig: this.dig,
    }
    this.currentExpertise.status = 'ОЦІНКА'
    this.httpService.updateExpertise(this.currentExpertise)
      .subscribe((data: any) => {})
  }
}
