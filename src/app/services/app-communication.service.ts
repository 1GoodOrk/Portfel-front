import { Injectable } from '@angular/core';
import { IProjectData } from '@port/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppCommunicationService {
  public stackholders: any = []

  public clearProject: IProjectData = {
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
  }
  public clearStackholder: any = {
    type: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    responsibleOrganization: '',
    power: 0,
    influence: 0,
    transport: 0,
    social: 0,
    economic: 0,
    ecologic: 0,
    comfort: 0,
    technologic: 0,
    informative: 0,
    security: 0,
    managment: 0,
    eco: 0,
    ecoPos: 0,
    war: 0,
    warPos: 0,
    log: 0,
    logPos: 0,
    soc: 0,
    socPos: 0,
    struc: 0,
    strucPos: 0
  }
  public lang: string = 'en'


  public testProjArray: any = [
    {
      _id: '1',
      name: '1',
      subinfo: '1',
      type: '1',
      responsibleName: '1',
      responsibleSurname: '1',
      responsibleLastname: '1',
      managerName: '1',
      managerSurname: '1',
      managerLastname: '1',
      responsibleOrganization: '1',
      volumeOfWork: 0,
      forecastProjectTaskAmount: 0,
      term: 0,
      actionPlan: 'string',
      sphereOfAction: 'string',
      budget: 0,
      budgetSource: '',
      mainLosses: 0,
      actualCost: 0,
      additionalLosses: 0,
      passengerTraffic: 0,
      ticketPrice: 0,
      governmentSubsidies: 0,
      vehicle: 'string',
      infrastructure: 'string',
      staff: 'string',
      technology: 'string',
      options: {
        eco: 0,
        war: 23,
        log: 35,
        soc: 24,
        struc: 0
      },
      performanceIndex: 100,
      indexOfAssetsEmployed: 100,
      projectValuation: 324,
      riskScore: 34,
    }, {
      _id: '2',
      name: '2',
      subinfo: '1',
      type: '1',
      responsibleName: '1',
      responsibleSurname: '1',
      responsibleLastname: '1',
      managerName: '1',
      managerSurname: '1',
      managerLastname: '1',
      responsibleOrganization: '1',
      volumeOfWork: 0,
      forecastProjectTaskAmount: 0,
      term: 0,
      actionPlan: 'string',
      sphereOfAction: 'string',
      budget: 0,
      budgetSource: '',
      mainLosses: 0,
      actualCost: 0,
      additionalLosses: 0,
      passengerTraffic: 0,
      ticketPrice: 0,
      governmentSubsidies: 0,
      vehicle: 'string',
      infrastructure: 'string',
      staff: 'string',
      technology: 'string',
      options: {
        eco: 0,
        war: 23,
        log: 35,
        soc: 24,
        struc: 0
      },
      performanceIndex: 100,
      indexOfAssetsEmployed: 100,
      projectValuation: 23455,
      riskScore: 22,
    }, {
      _id: '3',
      name: '3',
      subinfo: '1',
      type: '1',
      responsibleName: '1',
      responsibleSurname: '1',
      responsibleLastname: '1',
      managerName: '1',
      managerSurname: '1',
      managerLastname: '1',
      responsibleOrganization: '1',
      volumeOfWork: 0,
      forecastProjectTaskAmount: 0,
      term: 0,
      actionPlan: 'string',
      sphereOfAction: 'string',
      budget: 0,
      budgetSource: '',
      mainLosses: 0,
      actualCost: 0,
      additionalLosses: 0,
      passengerTraffic: 0,
      ticketPrice: 0,
      governmentSubsidies: 0,
      vehicle: 'string',
      infrastructure: 'string',
      staff: 'string',
      technology: 'string',
      options: {
        eco: 0,
        war: 23,
        log: 35,
        soc: 24,
        struc: 0
      },
      performanceIndex: 100,
      indexOfAssetsEmployed: 100,
      projectValuation: 43255,
      riskScore: 86,
    }
  ]

  public sessionStorageSave(id: string, data: string): void {
    sessionStorage.setItem('id', data)
  }

  public sessionStorageGet(id: string): string {
    return String(sessionStorage.getItem('id'))
  }
  public inputsForm: any = {
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
        value: '',
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
        value: '',
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
        value: '',
        refName: 'priority',
        min: 1,
        max: 10,
        step: 1
      },
      {
        type: 'selector',
        displayCondition: true,
        name: 'type',
        label: 'pages.portfolio.dialog.typeLabel',
        pTooltip: 'pages.portfolio.dialog.typeTolltip',
        value: '',
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
        name: 'des',
        label: 'pages.portfolio.dialog.descriptionLabel',
        placeholder: 'pages.portfolio.dialog.descriptionPlaceholder',
        pTooltip: 'pages.portfolio.dialog.descriptionTolltip',
        errors: {
          required: 'pages.portfolio.dialog.descriptionRequired'
        },
        value: '',
        refName: 'des'
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
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
        refName: 'volumeOfWork',
        min: 1,
        max: 5000,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'forecastProjectTaskAmount',
        label: 'pages.portfolio.dialog.forecastProjectTaskAmountLabel',
        pTooltip: 'pages.portfolio.dialog.forecastProjectTaskAmountTolltip',
        errors: {
          required: 'pages.portfolio.dialog.forecastProjectTaskAmountRequired'
        },
        value: '',
        refName: 'forecastProjectTaskAmount',
        min: 1,
        max: 5000,
        step: 1,
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
        value: '',
        refName: 'term',
        min: 1,
        max: 5000,
        step: 1,
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
        value: '',
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
        value: '',
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
        value: '',
        refName: 'vehicle',
        items: [
          { label: 'Мікроавтобус', value: 'minibus' },
          { label: 'Міський автобус', value: 'сityBus' },
          { label: 'Автобус загального призначення', value: 'generalPurposeBus' },
          { label: 'Міжміський автобус', value: 'intercityBus' },
          { label: 'Автобус далекого напрямку', value: 'longDistanceBus' },
          { label: 'Спеціалізований автобус', value: 'specializedBus' },
          { label: 'Тричленовий автобус', value: 'threeSeatBus' },
          { label: 'Двоярусний автобус', value: 'doubleDeckerBus' },
          { label: 'Тролейбуси', value: 'trolleybus' },
          { label: 'Трамвай', value: 'tram' },
        ]
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'infrastructure',
        label: 'pages.portfolio.dialog.infrastructureLabel',
        pTooltip: 'pages.portfolio.dialog.infrastructureTolltip',
        value: '',
        refName: 'infrastructure',
        items: [
          { label: 'Зупинка', value: 'stop' },
          { label: 'Станція', value: 'statin' },
          { label: 'Бензоколонка', value: 'fuel' },
          { label: 'Інформаційна система', value: 'infoSystem' },
        ]
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'staff',
        label: 'pages.portfolio.dialog.staffLabel',
        pTooltip: 'pages.portfolio.dialog.staffTolltip',
        value: '',
        refName: 'staff',
        items: [
          { label: 'Водій', value: 'driver' },
          { label: 'Диспетчер', value: 'dispatcher' },
          { label: 'Кондуктор', value: 'conductor' },
          { label: 'Технічний персонал', value: 'techPersonal' },
        ]
      },
      {
        type: 'multiselector',
        displayCondition: true,
        name: 'technology',
        label: 'pages.portfolio.dialog.technologyLabel',
        pTooltip: 'pages.portfolio.dialog.technologyTolltip',
        value: '',
        refName: 'technology',
        items: [
          { label: 'Система квитків', value: 'billet' },
          { label: 'Навігація', value: 'navigation' },
          { label: 'Електронний таблоїд', value: 'electronicTabloid' },
          { label: 'GPS', value: 'gps' },
          { label: 'CRM', value: 'crm' },
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
        value: '',
        refName: 'budget',
        min: 1,
        max: 1000000000,
        step: 1,
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
        value: '',
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
        value: '',
        refName: 'mainLosses',
        min: 1,
        max: 1000000000,
        step: 1,
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
        value: '',
        refName: 'actualCost',
        min: 1,
        max: 1000000000,
        step: 1,
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
        value: '',
        refName: 'additionalLosses',
        min: 1,
        max: 1000000000,
        step: 1,
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
        value: '',
        refName: 'passengerTraffic',
        min: 1,
        max: 10000,
        step: 1,
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
        value: '',
        refName: 'ticketPrice',
        min: 1,
        max: 100000,
        step: 1,
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
        value: '',
        refName: 'governmentSubsidies'
      },
      {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'eco',
        label: 'pages.portfolio.dialog.optionsEconomicLabel',
        pTooltip: 'pages.portfolio.dialog.optionsEconomicTolltip',
        errors: {
          required: 'pages.portfolio.dialog.optionsEconomicRequired'
        },
        value: '',
        refName: 'eco',
        min: 1,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'war',
        label: 'pages.portfolio.dialog.optionsWarLabel',
        pTooltip: 'pages.portfolio.dialog.optionsWarTolltip',
        errors: {
          required: 'pages.portfolio.dialog.optionsWarRequired'
        },
        value: '',
        refName: 'war',
        min: 1,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'log',
        label: 'pages.portfolio.dialog.optionsLogisticLabel',
        pTooltip: 'pages.portfolio.dialog.optionsLogisticTolltip',
        errors: {
          required: 'pages.portfolio.dialog.optionsLogisticRequired'
        },
        value: '',
        refName: 'log',
        min: 1,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'soc',
        label: 'pages.portfolio.dialog.optionsSocialLabel',
        pTooltip: 'pages.portfolio.dialog.optionsSocialTolltip',
        errors: {
          required: 'pages.portfolio.dialog.optionsSocialRequired'
        },
        value: '',
        refName: 'soc',
        min: 1,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'struc',
        label: 'pages.portfolio.dialog.optionsStructureLabel',
        pTooltip: 'pages.portfolio.dialog.optionsStructureTolltip',
        errors: {
          required: 'pages.portfolio.dialog.optionsStructureRequired'
        },
        value: '',
        refName: 'struc',
        min: 1,
        max: 100,
        step: 1,
      }
    ],
    road: [],
    stackholders: [
      {
        type: 'selector',
        displayCondition: true,
        name: 'type',
        label: 'pages.project.stackholder.typeStackholderLabel',
        pTooltip: 'pages.project.stackholder.typeStackholderTolltip',
        value: '',
        refName: 'type',
        items: [
          { label: 'Замовник проєкту', value: 'customer' },
          { label: 'Власник проєкту', value: 'owner' },
          { label: 'Керівник проєкту', value: 'team-lid' },
          { label: 'Команда проєкту', value: 'team' },
          { label: 'Інвестори', value: 'investors' },
          { label: 'Конкуренти', value: 'competitors' },
          { label: 'Органи влади', value: 'government' },
          { label: 'Транспортні регулятори', value: 'transportRegulators' },
          { label: 'Громадські організації', value: 'civilOrganizations' },
          { label: 'Населення', value: 'population' },
          { label: 'Перевізники', value: 'carriers' },
          { label: 'Інші групи', value: 'others' },
        ]
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleOrganization',
        label: 'pages.project.stackholder.responsibleOrganizationLabel',
        placeholder: 'pages.project.stackholder.responsibleOrganizationPlaceholder',
        pTooltip: 'pages.project.stackholder.responsibleOrganizationTolltip',
        errors: {
          required: 'pages.project.stackholder.responsibleOrganizationRequired'
        },
        value: '',
        refName: 'responsibleOrganization'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleName',
        label: 'pages.project.stackholder.responsibleNameLabel',
        placeholder: 'pages.project.stackholder.responsibleNamePlaceholder',
        pTooltip: 'pages.project.stackholder.responsibleNameTolltip',
        errors: {
          required: 'pages.project.stackholder.responsibleNameRequired'
        },
        value: '',
        refName: 'responsibleName'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleSurname',
        label: 'pages.project.stackholder.responsibleSurnameLabel',
        placeholder: 'pages.project.stackholder.responsibleSurnamePlaceholder',
        pTooltip: 'pages.project.stackholder.responsibleSurnameTolltip',
        errors: {
          required: 'pages.project.stackholder.responsibleSurnameRequired'
        },
        value: '',
        refName: 'responsibleSurname'
      },
      {
        type: 'text',
        displayCondition: true,
        name: 'responsibleLastname',
        label: 'pages.project.stackholder.responsibleLastnameLabel',
        placeholder: 'pages.project.stackholder.responsibleLastnamePlaceholder',
        pTooltip: 'pages.project.stackholder.responsibleLastnameTolltip',
        errors: {
          required: 'pages.project.stackholder.responsibleLastnameRequired'
        },
        value: '',
        refName: 'responsibleLastname'
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'power',
        label: 'pages.project.stackholder.powerLabel',
        pTooltip: 'pages.project.stackholder.powerTolltip',
        errors: {
          required: 'pages.project.stackholder.powerRequired'
        },
        value: 0,
        refName: 'power',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'influence',
        label: 'pages.project.stackholder.influenceLabel',
        pTooltip: 'pages.project.stackholder.influenceTolltip',
        errors: {
          required: 'pages.project.stackholder.influenceRequired'
        },
        value: 0,
        refName: 'influence',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'transport',
        label: 'pages.project.stackholder.transportFactorLabel',
        pTooltip: 'pages.project.stackholder.transportFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.transportFactorRequired'
        },
        value: 0,
        refName: 'transport',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'social',
        label: 'pages.project.stackholder.socialFactorLabel',
        pTooltip: 'pages.project.stackholder.socialFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.socialFactorRequired'
        },
        value: 0,
        refName: 'social',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'economic',
        label: 'pages.project.stackholder.economicFactorLabel',
        pTooltip: 'pages.project.stackholder.economicFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.economicFactorRequired'
        },
        value: 0,
        refName: 'economic',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'ecologic',
        label: 'pages.project.stackholder.ecologicFactorLabel',
        pTooltip: 'pages.project.stackholder.ecologicFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.ecologicFactorRequired'
        },
        value: 0,
        refName: 'ecologic',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'comfort',
        label: 'pages.project.stackholder.comfortFactorLabel',
        pTooltip: 'pages.project.stackholder.comfortFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.comfortFactorRequired'
        },
        value: 0,
        refName: 'comfort',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'technologic',
        label: 'pages.project.stackholder.technologicFactorLabel',
        pTooltip: 'pages.project.stackholder.technologicFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.technologicFactorRequired'
        },
        value: 0,
        refName: 'technologic',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'informative',
        label: 'pages.project.stackholder.informativeFactorLabel',
        pTooltip: 'pages.project.stackholder.informativeFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.informativeFactorRequired'
        },
        value: 0,
        refName: 'informative',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'security',
        label: 'pages.project.stackholder.securityFactorLabel',
        pTooltip: 'pages.project.stackholder.securityFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.securityFactorRequired'
        },
        value: 0,
        refName: 'security',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'managment',
        label: 'pages.project.stackholder.managmentFactorLabel',
        pTooltip: 'pages.project.stackholder.managmentFactorTolltip',
        errors: {
          required: 'pages.project.stackholder.managmentFactorRequired'
        },
        value: 0,
        refName: 'managment',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'line',
        displayCondition: true
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'eco',
        label: 'pages.project.stackholder.optionsEconomicLabel',
        pTooltip: 'pages.project.stackholder.optionsEconomicTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsEconomicRequired'
        },
        value: 0,
        refName: 'eco',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'ecoPos',
        label: 'pages.project.stackholder.optionsEconomicPosibilityLabel',
        pTooltip: 'pages.project.stackholder.optionsEconomicPosibilityTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsEconomicPosibilityRequired'
        },
        value: 0,
        refName: 'ecoPos',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'war',
        label: 'pages.project.stackholder.optionsWarLabel',
        pTooltip: 'pages.project.stackholder.optionsWarTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsWarRequired'
        },
        value: 0,
        refName: 'war',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'warPos',
        label: 'pages.project.stackholder.optionsWarPosibilityLabel',
        pTooltip: 'pages.project.stackholder.optionsWarPosibilityTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsWarRequired'
        },
        value: 0,
        refName: 'warPos',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'log',
        label: 'pages.project.stackholder.optionsLogisticLabel',
        pTooltip: 'pages.project.stackholder.optionsLogisticTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsLogisticRequired'
        },
        value: 0,
        refName: 'log',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'logPos',
        label: 'pages.project.stackholder.optionsLogisticPosibilityLabel',
        pTooltip: 'pages.project.stackholder.optionsLogisticPosibilityTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsLogisticPosibilityRequired'
        },
        value: 0,
        refName: 'logPos',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'soc',
        label: 'pages.project.stackholder.optionsSocialLabel',
        pTooltip: 'pages.project.stackholder.optionsSocialTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsSocialRequired'
        },
        value: 0,
        refName: 'soc',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'socPos',
        label: 'pages.project.stackholder.optionsSocialPosibilityLabel',
        pTooltip: 'pages.project.stackholder.optionsSocialPosibilityTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsSocialPosibilityRequired'
        },
        value: 0,
        refName: 'socPos',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'struc',
        label: 'pages.project.stackholder.optionsStructureLabel',
        pTooltip: 'pages.project.stackholder.optionsStructureTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsStructureRequired'
        },
        value: 0,
        refName: 'struc',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        type: 'number',
        displayCondition: true,
        name: 'strucPos',
        label: 'pages.project.stackholder.optionsStructurePosibilityLabel',
        pTooltip: 'pages.project.stackholder.optionsStructurePosibilityTolltip',
        errors: {
          required: 'pages.project.stackholder.optionsStructurePosibilityRequired'
        },
        value: 0,
        refName: 'strucPos',
        min: 0,
        max: 100,
        step: 1,
      }
    ]
  }

  public emptyCurrentProject(): void {
    this.clearProject = {
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
    }
  }

  public getInputsForm(setName: Array<string>): any {
    const result: any = {}
    setName.forEach((el:string) => {
      result[el] = Array.from(this.inputsForm[el])
    })
    return result
  }

  private infoPageProjectValueKeys: any = {
    vehicle: [
      { propName: 'subinfo', label: 'pages.portfolio.dialog.subinfoLabel' },
      { propName: 'priority', label: 'pages.portfolio.dialog.priorityLabel' },
      { propName: 'type', label: 'pages.portfolio.dialog.typeLabel' },
      { propName: 'riskScore', label: 'pages.main.main.riskScoreLabel' },
      { propName: 'projectValuation', label: 'pages.main.main.projectValuationLabel' },
      { type: 'divider' },
      { type: 'multyInOne', label: 'pages.portfolio.dialog.responsibleLabel', items: [
        { propName: 'responsibleName' },
        { propName: 'responsibleSurname' },
        { propName: 'responsibleLastname' }
      ] },
      { type: 'multyInOne', label: 'pages.portfolio.dialog.managerLabel', items: [
        { propName: 'managerName' },
        { propName: 'managerSurname' },
        { propName: 'managerLastname' }
      ] },
      { propName: 'responsibleOrganization', label: 'pages.portfolio.dialog.profitLabel' },
      { type: 'permission', propPermission: 'portfolioId', items: [
        { type: 'deepInside', propNames: ['portfolioId', 'name'], label: 'pages.portfolio.dialog.portfolioName' },
        { type: 'deepInside', propNames: ['portfolioId', 'tier'], label: 'pages.portfolio.dialog.portfolioTier' }
      ]},
      { propName: 'volumeOfWork', label: 'pages.portfolio.dialog.volumeOfWorkLabel' },
      { propName: 'forecastProjectTaskAmount', label: 'pages.portfolio.dialog.forecastProjectTaskAmountLabel' },
      { propName: 'term', label: 'pages.portfolio.dialog.termLabel' },
      { propName: 'actionPlan', label: 'pages.portfolio.dialog.actionPlanLabel' },
      { propName: 'sphereOfAction', label: 'pages.portfolio.dialog.sphereOfActionLabel' },
      { type: 'divider' },
      { propName: 'budget', label: 'pages.portfolio.dialog.budgetLabel', suffix: 'pages.portfolio.dialog.budgetSuffix' },
      { propName: 'budgetSource', label: 'pages.portfolio.dialog.budgetSourceLabel' },
      { propName: 'mainLosses', label: 'pages.portfolio.dialog.mainLossesLabel', suffix: 'pages.portfolio.dialog.budgetSuffix' },
      { propName: 'actualCost', label: 'pages.portfolio.dialog.actualCostLabel', suffix: 'pages.portfolio.dialog.budgetSuffix' },
      { propName: 'additionalLosses', label: 'pages.portfolio.dialog.additionalLossesLabel', suffix: 'pages.portfolio.dialog.budgetSuffix' },
      { propName: 'passengerTraffic', label: 'pages.portfolio.dialog.passengerTrafficLabel' },
      { propName: 'ticketPrice', label: 'pages.portfolio.dialog.ticketPriceLabel' },
      { propName: 'governmentSubsidies', label: 'pages.portfolio.dialog.governmentSubsidiesLabel' },
      { propName: 'vehicle', label: 'pages.portfolio.dialog.vehicleLabel' },
      { propName: 'infrastructure', label: 'pages.portfolio.dialog.infrastructureLabel' },
      { propName: 'staff', label: 'pages.portfolio.dialog.staffLabel' },
      { propName: 'technology', label: 'pages.portfolio.dialog.technologyLabel' },
      { type: 'divider' },
      { type: 'options', label: 'pages.portfolio.dialog.optionsLabel', items: [
        { propName: 'eco', label: 'pages.portfolio.dialog.optionsEconomicLabel' },
        { propName: 'war', label: 'pages.portfolio.dialog.optionsWarLabel' },
        { propName: 'log', label: 'pages.portfolio.dialog.optionsLogisticLabel' },
        { propName: 'soc', label: 'pages.portfolio.dialog.optionsSocialLabel' },
        { propName: 'struc', label: 'pages.portfolio.dialog.optionsStructureLabel' },
      ] },
      // { type: 'divider' },
      // { propName: 'addressStart', label: 'pages.portfolio.dialog.addressStartLabel' },
      // { propName: 'addressEnd', label: 'pages.portfolio.dialog.addressEndLabel' },
      { type: 'divider' },
      { propName: 'des', label: 'pages.portfolio.dialog.descriptionLabel' },
    ],
    roads: [
      { propName: 'subinfo', label: 'pages.portfolio.dialog.subinfoLabel' },
      { propName: 'priority', label: 'pages.portfolio.dialog.priorityLabel' },
      { propName: 'type', label: 'pages.portfolio.dialog.typeLabel' },
      { type: 'divider' },
      { type: 'multyInOne', label: 'pages.portfolio.dialog.responsibleLabel', items: [
        { propName: 'responsibleName' },
        { propName: 'responsibleSurname' },
        { propName: 'responsibleLastname' }
      ] },
      { type: 'multyInOne', label: 'pages.portfolio.dialog.managerLabel', items: [
        { propName: 'managerName' },
        { propName: 'managerSurname' },
        { propName: 'managerLastname' }
      ] },
      { propName: 'responsibleOrganization', label: 'pages.portfolio.dialog.profitLabel' },
      { type: 'permission', propPermission: 'portfolioId', items: [
        { type: 'deepInside', propNames: ['portfolioId', 'name'], label: 'pages.portfolio.dialog.portfolioName' },
        { type: 'deepInside', propNames: ['portfolioId', 'tier'], label: 'pages.portfolio.dialog.portfolioTier' }
      ]},
      { type: 'divider' },
      { propName: 'budget', label: 'pages.portfolio.dialog.budgetLabel', suffix: 'pages.portfolio.dialog.budgetSuffix' },
      { propName: 'budgetSource', label: 'pages.portfolio.dialog.budgetSourceLabel' },
      { propName: 'processDuration', label: 'pages.portfolio.dialog.processDurationLabel', suffix: 'pages.portfolio.dialog.processDurationSuffix' },
      { propName: 'traffic', label: 'pages.portfolio.dialog.trafficLabel', suffix: 'pages.portfolio.dialog.trafficSuffix'  },
      { propName: 'road', label: 'pages.portfolio.dialog.roadCodeLabel' },
      { propName: 'distance', label: 'pages.portfolio.dialog.distanceLabel', suffix: 'pages.portfolio.dialog.distanceSuffix'  },
      { type: 'divider' },
      { propName: 'mainRoad', label: 'pages.portfolio.dialog.mainRoadLabel' },
      { propName: 'inTown', label: 'pages.portfolio.dialog.inTownLabel' },
      { type: 'permission', propPermission: 'inTown', propName: 'dateCreation', label: 'pages.portfolio.dialog.dateCreationLabel' },
      { type: 'divider' },
      { type: 'date', propName: 'dateCreation', label: 'pages.portfolio.dialog.dateCreationLabel' },
      { type: 'date', propName: 'dateInitialization', label: 'pages.portfolio.dialog.dateInitializationLabel' },
      { type: 'divider' },
      { type: 'options', items: [
        { propName: 'eco', label: 'pages.portfolio.dialog.optionsEconomicLabel' },
        { propName: 'war', label: 'pages.portfolio.dialog.optionsWarLabel' },
        { propName: 'log', label: 'pages.portfolio.dialog.optionsLogisticLabel' },
        { propName: 'soc', label: 'pages.portfolio.dialog.optionsSocialLabel' },
        { propName: 'struc', label: 'pages.portfolio.dialog.optionsStructureLabel' },
      ] },
      { type: 'divider' },
      { propName: 'addressStart', label: 'pages.portfolio.dialog.addressStartLabel' },
      { propName: 'addressEnd', label: 'pages.portfolio.dialog.addressEndLabel' },
      { type: 'divider' },
      { propName: 'des', label: 'pages.portfolio.dialog.descriptionLabel' },
    ],
    stackholder: [
      { propName: 'type', label: 'pages.project.stackholder.typeStackholderLabel' },
      { propName: 'responsibleOrganization', label: 'pages.project.stackholder.profitLabel' },
      { type: 'multyInOne', label: 'pages.project.stackholder.responsibleLabel', items: [
        { propName: 'responsibleName' },
        { propName: 'responsibleSurname' },
        { propName: 'responsibleLastname' }
      ] },
      { propName: 'power', label: 'pages.project.stackholder.powerLabel' },
      { propName: 'influence', label: 'pages.project.stackholder.influenceLabel' },
      { type: 'divider' },
      { propName: 'transport', label: 'pages.project.stackholder.transportFactorLabel' },
      { propName: 'social', label: 'pages.project.stackholder.socialFactorLabel' },
      { propName: 'economic', label: 'pages.project.stackholder.economicFactorLabel' },
      { propName: 'ecologic', label: 'pages.project.stackholder.ecologicFactorLabel' },
      { propName: 'comfort', label: 'pages.project.stackholder.comfortFactorLabel' },
      { propName: 'technologic', label: 'pages.project.stackholder.technologicFactorLabel' },
      { propName: 'informative', label: 'pages.project.stackholder.informativeFactorLabel' },
      { propName: 'security', label: 'pages.project.stackholder.securityFactorLabel' },
      { propName: 'managment', label: 'pages.project.stackholder.managmentFactorLabel' },
      { type: 'divider' },
      { propName: 'eco', label: 'pages.project.stackholder.optionsEconomicLabel' },
      { propName: 'ecoPos', label: 'pages.project.stackholder.optionsEconomicPosibilityLabel' },
      { propName: 'war', label: 'pages.project.stackholder.optionsWarLabel' },
      { propName: 'warPos', label: 'pages.project.stackholder.optionsWarPosibilityLabel' },
      { propName: 'log', label: 'pages.project.stackholder.optionsLogisticLabel' },
      { propName: 'logPos', label: 'pages.project.stackholder.optionsLogisticPosibilityLabel' },
      { propName: 'soc', label: 'pages.project.stackholder.optionsSocialLabel' },
      { propName: 'socPos', label: 'pages.project.stackholder.optionsSocialPosibilityLabel' },
      { propName: 'struc', label: 'pages.project.stackholder.optionsStructureLabel' },
      { propName: 'strucPos', label: 'pages.project.stackholder.optionsStructurePosibilityLabel' },
    ]
  }

  public getInfoPageProjectValueKeys(valueKeysSetName: string): any {
    return this.infoPageProjectValueKeys[valueKeysSetName]
  }

  public saveStackholder(data: any): any {
    this.stackholders.push(data)
  }

  public getStackholder(): any {
    return this.stackholders
  }

  public deleteStackholder(index: any): any {
    this.stackholders.splice(index, 1)
  }
  public currentProject: any = {}

  public saveCurrentProject(data: any): any {
    this.currentProject = data
  }

  public getCurrentProject(): any {
    return this.currentProject
  }
}
