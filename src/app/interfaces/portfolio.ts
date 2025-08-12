export interface IPortfolioData {
  _id: string;
  name: string;
  img: string;
  des: string;
  projects: number;
  projectIds: Array<string>;
  subinfo: string;
  budget: number;
  profit: number;
  duration: number;
  location: string;
  town?: string;
  optionEco: number;
  optionWar: number;
  optionLog: number;
  optionDoc: number;
  optionStruc: number;
}

export interface IPortfolioDataRO {
  _id: string;
  name: string;
  img: string;
  des: string;
  projects: number;
  projectIds: Array<string>;
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
    doc: number;
    struc: number;
  }
}

export interface IPortfolioRO {
  data: IPortfolioDataRO;
}
