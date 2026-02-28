import { Injectable } from '@angular/core';
import { IProjectData } from '@port/interfaces';

import inputs from '@port/asserts/data/inputs.json'
import rows from '@port/asserts/data/rows.json'
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
  public lang: string = 'ua'


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
  public inputsForm: any = inputs

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

  public getInputsForm(setName: Array<string>, data?: any): any {
    const result: any = {}
    setName
      .forEach((el:string) => {
        result[el] = Array.from(this.inputsForm[el])
        if (data) {
          Object
            .keys(data[el])
            .forEach((key: string) => {
              const ind: number = result[el].findIndex((res: any) => res.name === key)
              if (ind > -1) {
                result[el][ind].value = data[el][key]
              }
            })
        }
      })
    return result
  }


  public getDynamicKOInputsForm(data: any, userEmail: string, inputs: any): any {
    data
      .forEach((field: any) => {
        const currentApprove = field.approve.find((app: any) => app.email === userEmail)
        inputs.push({
          type: 'number',
          displayCondition: true,
          name: field.label,
          label: field.label,
          pTooltip: `Задати дані для поля ${field.label}`,
          errors: {
            required: ''
          },
          value: currentApprove.value,
          min: 0,
          max: 100000,
          step: 1,
        })
      })
    return inputs
  }

  public getDynamicCLDInputsForm(data: any, userEmail: string, inputs: any): any {
    data
      .forEach((field: any) => {
        const currentApprove = field.approve.find((app: any) => app.email === userEmail)
        inputs.push({
          type: 'rating',
          displayCondition: true,
          name: field.label,
          label: `Вплив поля '${field.label}'`,
          pTooltip: `Задати дані для впливу поля ${field.label}`,
          value: currentApprove.quality,
        })
        inputs.push({
          type: 'number',
          displayCondition: true,
          name: field.label,
          label: `Ймовірність ризику '${field.label}'`,
          pTooltip: `Задати дані для ймовірність виникнення поля ${field.label}`,
          errors: {
            required: ''
          },
          value: currentApprove.value,
          min: 0,
          max: 100,
          step: 1,
        })
        inputs.push({
          type: 'number',
          displayCondition: true,
          name: field.label,
          label: field.label,
          pTooltip: `Задати дані для поля ${field.label}`,
          errors: {
            required: ''
          },
          value: currentApprove.value,
          min: 0,
          max: 100,
          step: 1,
        })
        inputs.push({
          "type": "selector",
          "displayCondition": true,
          "name": "staff",
          "label": 'Моделюючий коефіцієнт цифровізації',
          "pTooltip": `Задати дані для моделюючого коефіцієнту цифровізації ризику '${field.label}'`,
          "value": "",
          "refName": "staff",
          "items": [
            { "label": "Нульовий", "value": "0.01" },
            { "label": "Локальний", "value": "0.19" },
            { "label": "Системний", "value": "0.3" },
            { "label": "Інфраструктурний", "value": "0.5" }
          ]
        })
        inputs.push({
          "type": "radio-options",
          "displayCondition": true,
          "name": "staff",
          "label": 'Моделюючий коефіцієнт lean',
          "pTooltip": `Задати дані для моделюючого коефіцієнту lean ризику '${field.label}'`,
          "value": [],
          "refName": "staff",
          "items": [
            { "label": "Дефекти", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] },
            { "label": "Очікування", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] },
            { "label": "Надвиробництво", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] },
            { "label": "Зайві переміщення", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] },
            { "label": "Зайва обробка", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] },
            { "label": "Зайве транспортування", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] },
            { "label": "Нереалізований потенціал працівників", "value": 0, options: [0, 0.25, 0.5, 0.75, 1] }
          ]
        })
        inputs.push({
          "type": "radio-options",
          "displayCondition": true,
          "name": "staff",
          "label": 'Моделюючий коефіцієнт classic',
          "pTooltip": `Задати дані для моделюючого коефіцієнту classic ризику '${field.label}'`,
          "value": [],
          "refName": "staff",
          "items": [
            { "label": "Вплив на якість", "value": 0, options: [0, 0.5, 1] },
            { "label": "Вплив на гроші", "value": 0, options: [0, 0.5, 1] },
            { "label": "Вплив на час", "value": 0, options: [0, 0.5, 1] }
          ]
        })
        inputs.push({
          type: 'number',
          displayCondition: true,
          name: field.label,
          label: `Керованість ризику '${field.label}'`,
          pTooltip: `Задати дані для керованість ризику ${field.label}`,
          errors: {
            required: ''
          },
          value: currentApprove.value,
          min: 0,
          max: 100,
          step: 1,
        })
        inputs.push({ type: 'line', displayCondition: true })
      })
    return inputs
  }

  private infoPageProjectValueKeys: any = rows

  public getInfoPageProjectValueKeys(valueKeysSetName: string): any {
    return this.infoPageProjectValueKeys[valueKeysSetName]
  }

  public getDynamicValueKeys(valueKeysSetName: string, data: any): any {
    const infoDynamicValueKeys: any = Array.from(this.infoPageProjectValueKeys[valueKeysSetName])
    Object.keys(data[valueKeysSetName]).forEach((key: string) => {
      if (infoDynamicValueKeys.findIndex((el: any) => el.label === key) !== -1) {
        const groupIndex = infoDynamicValueKeys.findIndex((el: any) => el.label === key)
        Object.keys(data[valueKeysSetName][key]).forEach((keyData: string) => {
          if (infoDynamicValueKeys[groupIndex].items.findIndex((el: any) => el.propName === keyData) === -1) {
            infoDynamicValueKeys[groupIndex].items.push({ propName: keyData, label: keyData })
          }
        })
      } else {
        infoDynamicValueKeys.push({ type: 'divider' })
        infoDynamicValueKeys.push({
          type: 'risksClassic',
          label: key,
          items: Object.keys(data[valueKeysSetName][key]).map((keyData: string) => ({ propName: keyData, label: keyData }))
        })
      }
    })
    infoDynamicValueKeys.push({ propName: 'recommendationDescription', label: 'pages.project.science.recommendationDescriptionLabel' })
    return infoDynamicValueKeys
  }

  public getDynamicApproveKeys(valueKeysSetName: string, data: any): any {
    const infoDynamicApproveKeys: any = {}
    Object.keys(data[valueKeysSetName]).forEach((key: string) => {
      if (!key.match('pages')) {
        infoDynamicApproveKeys[key] = {}
        Object.keys(data[valueKeysSetName][key]).forEach((keyData: string) => {
          infoDynamicApproveKeys[key][keyData] = false
        })
      } else {
        const groupIndex = this.infoPageProjectValueKeys[valueKeysSetName].findIndex((el: any) => el.label === key)
        if (this.infoPageProjectValueKeys[valueKeysSetName][groupIndex].items.findIndex((el: any) => el.label.match('pages')) !== -1) {
          this.infoPageProjectValueKeys[valueKeysSetName][groupIndex].items.forEach((el: any) => {
            if (!el.label.match('pages')) {
              if (!infoDynamicApproveKeys[key]) {
                infoDynamicApproveKeys[key] = {}
              }
              infoDynamicApproveKeys[key][el.label] = false
            }
          })
        }
      }
    })
    return infoDynamicApproveKeys
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

  public currentExpertise: any = {}

  public saveCurrentExpertise(data: any): any {
    this.currentExpertise = data
  }

  public getCurrentExpertise(): any {
    return this.currentExpertise
  }
}
