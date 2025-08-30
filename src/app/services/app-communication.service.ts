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
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    duration: 0,
    location: '',
    town: '',
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  }
  public clearPortfolio: IPortfolioDataRO = {
    _id: '',
    name: '',
    img: '',
    des: '',
    projects: 0,
    projectIds: {
      tierI: [],
      tierII: [],
      tierIII: []
    },
    subinfo: '',
    budget: 0,
    profit: 0,
    duration: 0,
    location: '',
    town: '',
    options: {
      eco: 0,
      war: 0,
      log: 0,
      soc: 0,
      struc: 0
    }
  }
  public clearProject: IProjectData = {
    _id: '',
    name: '',
    subinfo: '',
    type: '',
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

  public sessionStorageSave(id: string, data: string): void {
    sessionStorage.setItem('id', data)
  }

  public sessionStorageGet(id: string): string {
    return String(sessionStorage.getItem('id'))
  }

  public emptyCurrent(): void {
    this.currentPortfolio = {
      _id: '',
      name: '',
      img: '',
      des: '',
      projects: 0,
      projectIds: {
        tierI: [],
        tierII: [],
        tierIII: []
      },
      subinfo: '',
      budget: 0,
      profit: 0,
      duration: 0,
      location: '',
      town: '',
      options: {
        eco: 0,
        war: 0,
        log: 0,
        soc: 0,
        struc: 0
      }
    }
  }

  public emptyCurrentProject(): void {
    this.clearProject = {
      _id: '',
      name: '',
      subinfo: '',
      type: '',
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
}
