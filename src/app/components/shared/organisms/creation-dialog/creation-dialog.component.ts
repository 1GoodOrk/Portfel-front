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
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';

import { IProjectData, IProjectDataVehicle } from '@port/interfaces';
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
    MultiSelectModule,
    DatePickerModule,
    TranslatePipe,
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrl: './creation-dialog.component.scss'
})
export class CreationDialogComponent {
  @Input() visible: boolean = false;
  // IProjectData | IProjectDataVehicle
  // @Input() formData: T = {
  @Input() formData: any = {
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
  };
  @Output() changeVisibleEvent = new EventEmitter<string>();
  @Output() submitionEvent = new EventEmitter<string>();

  public inputs = {
    road: [
      {
        type: 'text',
        displayCondition: true,
        name: 'name',
        label: 'pages.portfolio.dialog.nameLabel',
        placeholder: 'pages.portfolio.dialog.namePlaceholder',
        pTooltip: 'pages.portfolio.dialog.nameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.nameRequired'
        },
        model: this.formData.name,
        refName: 'name'
      },
      {
        type: 'textarea',
        displayCondition: true,
        name: 'name',
        label: 'pages.portfolio.dialog.nameLabel',
        placeholder: 'pages.portfolio.dialog.namePlaceholder',
        pTooltip: 'pages.portfolio.dialog.nameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.nameRequired'
        },
        model: this.formData.name,
        refName: 'name'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'priority',
        label: 'pages.portfolio.dialog.priorityLabel',
        pTooltip: 'pages.portfolio.dialog.priorityTolltip',
        errors: {
          required: 'pages.portfolio.dialog.priorityRequired'
        },
        model: this.formData.priority,
        min: 1,
        max: 10,
        step: 1,
        refName: 'priority'
      },
      {
        type: 'datepicker',
        displayCondition: true,
        name: 'dateInitialization',
        label: 'pages.portfolio.dialog.dateInitializationLabel',
        placeholder: 'pages.portfolio.dialog.dateInitializationPlaceholder',
        pTooltip: 'pages.portfolio.dialog.dateInitializationTolltip',
        errors: {
          required: 'pages.portfolio.dialog.nameRequired'
        },
        model: this.formData.dateInitialization,
        refName: 'dateInitialization'
      },
      {
        type: 'checklist',
        displayCondition: true,
        name: 'mainRoad',
        label: 'pages.portfolio.dialog.mainRoadLabel',
        placeholder: 'pages.portfolio.dialog.dateInitializationPlaceholder',
        pTooltip: 'pages.portfolio.dialog.mainRoadTolltip',
        model: this.formData.mainRoad,
        refName: 'mainRoad'
      },
      {
        type: 'selector',
        displayCondition: true,
        name: 'type',
        label: 'pages.portfolio.dialog.typeLabel',
        pTooltip: 'pages.portfolio.dialog.typeTolltip',
        model: this.formData.type,
        refName: 'mainRoad',
        items: [
          { label: 'Міст', value: 'bridge' },
          { label: 'Ремонт', value: 'fix' },
          { label: 'Будівництво', value: 'build' },
          { label: 'Естакада', value: 'overpass' },
          { label: 'Тунель', value: 'tunnel' },
          { label: 'Об’їзд', value: 'detour' },
          { label: 'З’їзд', value: 'cong' },
          { label: 'Цифровізація', value: 'digitalization' },
        ]
      },
    ],
    vehicle: [
      {
        type: 'text',
        displayCondition: true,
        name: 'name',
        label: 'pages.portfolio.dialog.nameLabel',
        placeholder: 'pages.portfolio.dialog.namePlaceholder',
        pTooltip: 'pages.portfolio.dialog.nameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.nameRequired'
        },
        model: this.formData.name,
        refName: 'name'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'subinfo',
        label: 'pages.portfolio.dialog.subinfoLabel',
        placeholder: 'pages.portfolio.dialog.subinfoPlaceholder',
        pTooltip: 'pages.portfolio.dialog.subinfoTolltip',
        errors: {
          required: 'pages.portfolio.dialog.subinfoRequired'
        },
        model: this.formData.subinfo,
        refName: 'subinfo'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'priority',
        label: 'pages.portfolio.dialog.priorityLabel',
        pTooltip: 'pages.portfolio.dialog.priorityTolltip',
        errors: {
          required: 'pages.portfolio.dialog.priorityRequired'
        },
        model: this.formData.priority,
        min: 1,
        max: 10,
        step: 1,
        refName: 'priority'
      },
      {
        type: 'selector',
        displayCondition: true,
        name: 'type',
        label: 'pages.portfolio.dialog.typeLabel',
        pTooltip: 'pages.portfolio.dialog.typeTolltip',
        model: this.formData.type,
        refName: 'type',
        items: [
          { label: 'Ремонт', value: 'fix' },
          { label: 'Будівництво', value: 'build' },
          { label: 'Зміна', value: 'change' },
          { label: 'Цифровізація', value: 'digitalization' },
        ]
      },
      {
        type: 'textarea',
        displayCondition: true,
        name: 'description',
        label: 'pages.portfolio.dialog.descriptionLabel',
        placeholder: 'pages.portfolio.dialog.descriptionPlaceholder',
        pTooltip: 'pages.portfolio.dialog.descriptionTolltip',
        errors: {
          required: 'pages.portfolio.dialog.descriptionRequired'
        },
        model: this.formData.des,
        refName: 'description'
      },
      {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleName',
        label: 'pages.portfolio.dialog.responsibleNameLabel',
        placeholder: 'pages.portfolio.dialog.responsibleNamePlaceholder',
        pTooltip: 'pages.portfolio.dialog.responsibleNameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.responsibleNameRequired'
        },
        model: this.formData.responsibleName,
        refName: 'responsibleName'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleSurname',
        label: 'pages.portfolio.dialog.responsibleSurnameLabel',
        placeholder: 'pages.portfolio.dialog.responsibleSurnamePlaceholder',
        pTooltip: 'pages.portfolio.dialog.responsibleSurnameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.responsibleSurnameRequired'
        },
        model: this.formData.responsibleSurname,
        refName: 'responsibleSurname'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleLastname',
        label: 'pages.portfolio.dialog.responsibleLastnameLabel',
        placeholder: 'pages.portfolio.dialog.responsibleLastnamePlaceholder',
        pTooltip: 'pages.portfolio.dialog.responsibleLastnameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.responsibleLastnameRequired'
        },
        model: this.formData.responsibleLastname,
        refName: 'responsibleLastname'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'managerName',
        label: 'pages.portfolio.dialog.managerNameLabel',
        placeholder: 'pages.portfolio.dialog.managerNamePlaceholder',
        pTooltip: 'pages.portfolio.dialog.managerNameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.managerNameRequired'
        },
        model: this.formData.managerName,
        refName: 'managerName'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'managerSurname',
        label: 'pages.portfolio.dialog.managerSurnameLabel',
        placeholder: 'pages.portfolio.dialog.managerSurnamePlaceholder',
        pTooltip: 'pages.portfolio.dialog.managerSurnameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.managerSurnameRequired'
        },
        model: this.formData.managerSurname,
        refName: 'managerSurname'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'managerLastname',
        label: 'pages.portfolio.dialog.managerLastnameLabel',
        placeholder: 'pages.portfolio.dialog.managerLastnamePlaceholder',
        pTooltip: 'pages.portfolio.dialog.managerLastnameTolltip',
        errors: {
          required: 'pages.portfolio.dialog.managerLastnameRequired'
        },
        model: this.formData.managerLastname,
        refName: 'managerLastname'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleOrganization',
        label: 'pages.portfolio.dialog.responsibleOrganizationLabel',
        placeholder: 'pages.portfolio.dialog.responsibleOrganizationPlaceholder',
        pTooltip: 'pages.portfolio.dialog.responsibleOrganizationTolltip',
        errors: {
          required: 'pages.portfolio.dialog.responsibleOrganizationRequired'
        },
        model: this.formData.responsibleOrganization,
        refName: 'responsibleOrganization'
      },
      {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'volumeOfWork',
        label: 'pages.portfolio.dialog.volumeOfWorkLabel',
        pTooltip: 'pages.portfolio.dialog.volumeOfWorkTolltip',
        errors: {
          required: 'pages.portfolio.dialog.volumeOfWorkRequired'
        },
        model: this.formData.volumeOfWork,
        min: 1,
        max: 5000,
        step: 1,
        refName: 'volumeOfWork'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'term',
        label: 'pages.portfolio.dialog.termLabel',
        pTooltip: 'pages.portfolio.dialog.termTolltip',
        errors: {
          required: 'pages.portfolio.dialog.termRequired'
        },
        model: this.formData.term,
        min: 1,
        max: 5000,
        step: 1,
        refName: 'term'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'actionPlan',
        label: 'pages.portfolio.dialog.actionPlanLabel',
        placeholder: 'pages.portfolio.dialog.actionPlanPlaceholder',
        pTooltip: 'pages.portfolio.dialog.actionPlanTolltip',
        errors: {
          required: 'pages.portfolio.dialog.actionPlanRequired'
        },
        model: this.formData.actionPlan,
        refName: 'actionPlan'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'sphereOfAction',
        label: 'pages.portfolio.dialog.sphereOfActionLabel',
        placeholder: 'pages.portfolio.dialog.sphereOfActionPlaceholder',
        pTooltip: 'pages.portfolio.dialog.sphereOfActionTolltip',
        errors: {
          required: 'pages.portfolio.dialog.sphereOfActionRequired'
        },
        model: this.formData.sphereOfAction,
        refName: 'sphereOfAction'
      },
            {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'vehicle',
        label: 'pages.portfolio.dialog.vehicleLabel',
        pTooltip: 'pages.portfolio.dialog.vehicleTolltip',
        model: this.formData.vehicle,
        refName: 'vehicle',
        items: [
          { label: 'bus', value: 'bus' },
          { label: 'car', value: 'car' },
          { label: 'low-bus', value: 'low-bus' },
          { label: 'big-bus', value: 'big-bus' },
        ]
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'infrastructure',
        label: 'pages.portfolio.dialog.infrastructureLabel',
        pTooltip: 'pages.portfolio.dialog.infrastructureTolltip',
        model: this.formData.infrastructure,
        refName: 'infrastructure',
        items: [
          { label: 'Отсановка', value: 'stop' },
          { label: 'Станция', value: 'statin' },
          { label: 'Бензоколонка', value: 'fuel' },
          { label: 'Информационная система', value: 'infoSystem' },
        ]
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'staff',
        label: 'pages.portfolio.dialog.staffLabel',
        pTooltip: 'pages.portfolio.dialog.staffTolltip',
        model: this.formData.staff,
        refName: 'staff',
        items: [
          { label: 'driver', value: 'driver' },
          { label: 'dispetcher', value: 'dispetcher' },
          { label: 'conductor', value: 'conductor' },
          { label: 'techPersonal', value: 'techPersonal' },
        ]
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'technology',
        label: 'pages.portfolio.dialog.technologyLabel',
        pTooltip: 'pages.portfolio.dialog.technologyTolltip',
        model: this.formData.technology,
        refName: 'technology',
        items: [
          { label: 'billet', value: 'billet' },
          { label: 'gps', value: 'gps' },
          { label: 'crm', value: 'crm' },
        ]
      },
      {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'budget',
        label: 'pages.portfolio.dialog.budgetLabel',
        pTooltip: 'pages.portfolio.dialog.budgetTolltip',
        errors: {
          required: 'pages.portfolio.dialog.budgetRequired'
        },
        model: this.formData.budget,
        min: 1,
        max: 1000000000,
        step: 1,
        refName: 'budget'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'budgetSource',
        label: 'pages.portfolio.dialog.budgetSourceLabel',
        placeholder: 'pages.portfolio.dialog.budgetSourcePlaceholder',
        pTooltip: 'pages.portfolio.dialog.budgetSourceTolltip',
        errors: {
          required: 'pages.portfolio.dialog.budgetSourceRequired'
        },
        model: this.formData.budgetSource,
        refName: 'budgetSource'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'mainLosses',
        label: 'pages.portfolio.dialog.mainLossesLabel',
        pTooltip: 'pages.portfolio.dialog.mainLossesTolltip',
        errors: {
          required: 'pages.portfolio.dialog.mainLossesRequired'
        },
        model: this.formData.mainLosses,
        min: 1,
        max: 1000000000,
        step: 1,
        refName: 'mainLosses'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'actualCost',
        label: 'pages.portfolio.dialog.actualCostLabel',
        pTooltip: 'pages.portfolio.dialog.actualCostTolltip',
        errors: {
          required: 'pages.portfolio.dialog.actualCostRequired'
        },
        model: this.formData.actualCost,
        min: 1,
        max: 1000000000,
        step: 1,
        refName: 'actualCost'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'additionalLosses',
        label: 'pages.portfolio.dialog.additionalLossesLabel',
        pTooltip: 'pages.portfolio.dialog.additionalLossesTolltip',
        errors: {
          required: 'pages.portfolio.dialog.additionalLossesRequired'
        },
        model: this.formData.additionalLosses,
        min: 1,
        max: 1000000000,
        step: 1,
        refName: 'additionalLosses'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'passengerTraffic',
        label: 'pages.portfolio.dialog.passengerTrafficLabel',
        pTooltip: 'pages.portfolio.dialog.passengerTrafficTolltip',
        errors: {
          required: 'pages.portfolio.dialog.passengerTrafficRequired'
        },
        model: this.formData.passengerTraffic,
        min: 1,
        max: 10000,
        step: 1,
        refName: 'passengerTraffic'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'ticketPrice',
        label: 'pages.portfolio.dialog.ticketPriceLabel',
        pTooltip: 'pages.portfolio.dialog.ticketPriceTolltip',
        errors: {
          required: 'pages.portfolio.dialog.ticketPriceRequired'
        },
        model: this.formData.ticketPrice,
        min: 1,
        max: 100000,
        step: 1,
        refName: 'ticketPrice'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'governmentSubsidies',
        label: 'pages.portfolio.dialog.governmentSubsidiesLabel',
        placeholder: 'pages.portfolio.dialog.governmentSubsidiesPlaceholder',
        pTooltip: 'pages.portfolio.dialog.governmentSubsidiesTolltip',
        errors: {
          required: 'pages.portfolio.dialog.governmentSubsidiesRequired'
        },
        model: this.formData.governmentSubsidies,
        refName: 'governmentSubsidies'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'numberOfPassengers',
        label: 'pages.portfolio.dialog.numberOfPassengersLabel',
        pTooltip: 'pages.portfolio.dialog.numberOfPassengersTolltip',
        errors: {
          required: 'pages.portfolio.dialog.numberOfPassengersRequired'
        },
        model: this.formData.numberOfPassengers,
        min: 1,
        max: 10000,
        step: 1,
        refName: 'numberOfPassengers'
      },
    ]
  }
  public items = [
    // { label: 'Bridge', value: 'bridge' },
    // { label: 'Fixing', value: 'fix' },
    // { label: 'Build', value: 'build' },
    // { label: 'Overpass', value: 'overpass' },
    // { label: 'Tunnel', value: 'tunnel' },
    // { label: 'Detour', value: 'detour' },
    // { label: 'Cong', value: 'cong' },
    // { label: 'Digitalization', value: 'digitalization' },
    { label: 'Міст', value: 'bridge' },
    { label: 'Ремонт', value: 'fix' },
    { label: 'Будівництво', value: 'build' },
    { label: 'Естакада', value: 'overpass' },
    { label: 'Тунель', value: 'tunnel' },
    { label: 'Об’їзд', value: 'detour' },
    { label: 'З’їзд', value: 'cong' },
    { label: 'Цифровізація', value: 'digitalization' },
  ]

  constructor(
    private appCommunicationService: AppCommunicationService,
    private httpService: HttpService
  ) {}

  public visibleOnChange(): void {
    this.changeVisibleEvent.emit('creation');
  }

  public getAllProjects(): void {
    this.submitionEvent.emit();
  }

  public updateProject(id: string, form: any) {
    if (form.valid) {
      form.resetForm()
      this.httpService.updateProject(id, this.formData)
        .subscribe((data: any) => {
          if (data) {
            this.getAllProjects()
          }
        })
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      this.visibleOnChange()
    }
  }

  public createProject(form: any) {
    console.log(this.formData.options)
    if (form.valid) {
      this.formData.score = 0.33 * (this.formData.profit - this.formData.budget) + 0.33 * this.formData.permissionDuration + 0.33 * this.formData.forecastProjectTaskAmount
      this.httpService.createProject(this.formData, JSON.parse(this.appCommunicationService.sessionStorageGet('id')).data.token)
        .subscribe((data: any) => {
          const user = JSON.parse(this.appCommunicationService.sessionStorageGet('id'))
          user.data.projectIds.push(data._id)
          this.appCommunicationService.sessionStorageSave('id', JSON.stringify(user))
          this.getAllProjects()
        })
      this.formData = Object.assign(this.appCommunicationService.clearProject)
      form.resetForm()
      this.visibleOnChange()
    }
  }
}
