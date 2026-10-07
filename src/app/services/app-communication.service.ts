import { Injectable } from '@angular/core';
import { IProjectData } from '@port/interfaces';

import inputs from '@port/asserts/data/inputs.json'
import rows from '@port/asserts/data/rows.json'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppCommunicationService {
  public stackholders: any = []

  public clearProject: IProjectData = {
    _id: '',
    name: '',
    des: '',
    subinfo: '',
    priority: 0,
    responsibleName: '',
    phases: '',
    stackholders: ''
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

  public sessionStorageSave(id: string, data: string): void {
    sessionStorage.setItem('id', data)
  }

  public sessionStorageGet(id: string): string {
    return String(sessionStorage.getItem('id'))
  }

  public clearSessionStorage(): void {
    sessionStorage.clear()
  }

  public inputsForm: any = inputs

  public emptyCurrentProject(): void {
    this.clearProject = {
      _id: '',
      name: '',
      des: '',
      subinfo: '',
      priority: 0,
      responsibleName: '',
      phases: '',
      stackholders: ''
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

  public getInputsFormDefault(name: string): any {
    const result: any = []
    Array
      .from(this.inputsForm.phasesLogisticDefault)
      .forEach((input: any) => {
        result.push({
          "type": "number",
          "displayCondition": true,
          "name": `${input.name}-${name}`,
          "label": input.label,
          "placeholder": input.placeholder,
          "pTooltip": input.pTooltip,
          "value": 0,
          "min": 1,
          "max": 10,
          "step": 1
        })
      })
    return result
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

  public currentSolution: any = {}

  public clearCurrentSolution(): any {
    this.currentSolution = {}
  }

  public saveCurrentSolution(data: any): any {
    this.currentSolution = data
  }

  public getCurrentSolution(): any {
    return this.currentSolution
  }

  public currentRisk: any = null

  public saveCurrentRisk(data: any): any {
    this.currentRisk = data
  }

  public getCurrentRisk(): any {
    return this.currentRisk
  }

  private currentGroup: any = null

  public saveCurrentGroup(data: any): any {
    this.currentGroup = data
  }

  public getCurrentGroup(): any {
    return this.currentGroup
  }

  public infoSub = new Subject<any>();

  public sendInfoData(data: any): void {
    this.infoSub.next(data);
  }

  public infoCreate = new Subject<any>();

  public sendCreateData(data: any): void {
    this.infoCreate.next(data);
  }
}
