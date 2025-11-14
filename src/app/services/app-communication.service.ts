import { Injectable } from '@angular/core';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppCommunicationService {
  public currentPortfolio: IPortfolioDataRO = {
    _id: '',
    name: '',
    img: '',
    des: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    responsibleOrganization: '',
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    location: '',
    town: ''
  }
  public clearPortfolio: IPortfolioDataRO = {
    _id: '',
    name: '',
    img: '',
    des: '',
    responsibleName: '',
    responsibleSurname: '',
    responsibleLastname: '',
    responsibleOrganization: '',
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    location: '',
    town: ''
  }
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
        name: 'description',
        label: 'pages.portfolio.dialog.descriptionLabel',
        placeholder: 'pages.portfolio.dialog.descriptionPlaceholder',
        pTooltip: 'pages.portfolio.dialog.descriptionTolltip',
        errors: {
          required: 'pages.portfolio.dialog.descriptionRequired'
        },
        value: '',
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
        value: '',
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
        value: '',
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
        value: '',
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
    road: []
  }

  public emptyCurrent(): void {
    this.currentPortfolio = {
      _id: '',
      name: '',
      img: '',
      des: '',
      responsibleName: '',
      responsibleSurname: '',
      responsibleLastname: '',
      responsibleOrganization: '',
      projects: 0,
      projectIds: {
        tierI: [],
        tierII: [],
        tierIII: []
      },
      subinfo: '',
      budget: 0,
      profit: 0,
      location: '',
      town: ''
    }
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
}
