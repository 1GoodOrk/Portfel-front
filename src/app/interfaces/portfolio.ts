import { IProjectData } from './project';

export interface IPortfolioData {
  _id: string;
  name: string;
  img: string;
  des: string;
  projects: number;
  projectIds: {
    tierI: Array<IProjectData>;
    tierII: Array<IProjectData>;
    tierIII: Array<IProjectData>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  duration: number;
  location: string;
  town?: string;
  optionEco: number;
  optionWar: number;
  optionLog: number;
  optionSoc: number;
  optionStruc: number;
}

export interface IPortfolioDataRO {
  _id: string;
  name: string;
  img: string;
  des: string;
  projects: number;
  projectIds: {
    tierI: Array<IProjectData>;
    tierII: Array<IProjectData>;
    tierIII: Array<IProjectData>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  duration: number;
  location: string;
  town?: string;
  options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
}

export interface IPortfolioRO {
  data: IPortfolioDataRO;
}
