import { Injectable } from '@angular/core';
import { IPortfolioDataRO } from '@port/interfaces';

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
  public lang: string = 'en'

}
