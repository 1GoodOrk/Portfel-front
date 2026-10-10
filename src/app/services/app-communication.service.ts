import { Injectable } from '@angular/core';
import { IInfoRow, IInfoRowContainer, IInputRowContainer, IProjectData, IRiskButterflyData, IRiskStairsData } from '@port/interfaces';

import inputs from '@port/asserts/data/inputs.json'
import rows from '@port/asserts/data/rows.json'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppCommunicationService {
  public lang: string = 'ua'

  public sessionStorageSave(id: string, data: string): void {
    sessionStorage.setItem(id, data)
  }

  public sessionStorageGet(id: string): string {
    return String(sessionStorage.getItem(id))
  }

  public clearSessionStorage(): void {
    sessionStorage.clear()
  }

  public inputsForm: any = inputs

  public getInputsForm(setName: Array<string>, data?: any): IInputRowContainer {
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


// IInfoRowContainer
  private infoPageProjectValueKeys: any = rows

  public getInfoPageProjectValueKeys(valueKeysSetName: string): Array<IInfoRow> {
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

  private currentProject!: IProjectData

  public saveCurrentProject(data: IProjectData): void {
    this.currentProject = data
  }

  public getCurrentProject(): IProjectData {
    return this.currentProject
  }

  public clearCurrentProject(): IProjectData {
    this.currentProject = {
      _id: '',
      name: '',
      des: '',
      code:'',
      subinfo: '',
      priority: 0,
      responsibleName: '',
      analyze: {}
    }
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

  public currentRisk!: IRiskButterflyData | IRiskStairsData

  public saveCurrentRisk(data: IRiskButterflyData | IRiskStairsData): void {
    this.currentRisk = data
  }

  public getCurrentRisk(): IRiskButterflyData | IRiskStairsData {
    return this.currentRisk
  }

  public clearCurrentRisk(): IRiskButterflyData | IRiskStairsData {
    this.currentRisk = {
      _id: '',
      cause: '',
      code: '',
      consequences:'',
      dateCreation: '',
      des: '',
      responsibleName: '',
      firstValue: 0,
      influence: 0,
      moneyMax: 0,
      moveState: '',
      name: '',
      probability: 0,
      qualityMax: 0,
      solutionTableParams: { th: [], td: [] },
      solutions: [],
      sourcesMax: 0,
      sphere: '',
      status: '',
      timeMax: 0,
      value: 0
    }
    return this.currentRisk
  }
  private currentGroup: string = ''

  public saveCurrentGroup(data: string): void {
    this.currentGroup = data
  }

  public getCurrentGroup(): string {
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
