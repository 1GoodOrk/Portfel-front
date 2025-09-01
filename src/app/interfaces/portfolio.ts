import { IProjectData } from './project';

export interface IPortfolioData {
  _id: string;
  name: string;
  img: string;
  des: string;
  responsibleName: string,
  responsibleSurname: string,
  responsibleLastname: string,
  responsibleOrganization: string,
  projects: number;
  projectIds: {
    tierI: Array<IProjectData>;
    tierII: Array<IProjectData>;
    tierIII: Array<IProjectData>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  location: string;
  town?: string;
}

export interface IPortfolioDataRO {
  _id: string;
  name: string;
  img: string;
  des: string;
  responsibleName: string,
  responsibleSurname: string,
  responsibleLastname: string,
  responsibleOrganization: string,
  projects: number;
  projectIds: {
    tierI: Array<IProjectData>;
    tierII: Array<IProjectData>;
    tierIII: Array<IProjectData>;
  };
  subinfo: string;
  budget: number;
  profit: number;
  location: string;
  town?: string;
}

export interface IPortfolioRO {
  data: IPortfolioDataRO;
}
