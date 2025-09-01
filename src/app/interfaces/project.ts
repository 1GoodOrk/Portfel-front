export interface IProjectData {
  _id: string;
  name: string;
  subinfo: string;
  type: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleLastname: string;
  responsibleOrganization: string;
  budget: number;
  budgetSource: string;
  processDuration: number;
  profit: number;
  traffic: number;
  forecastProjectTaskAmount: number;
  road: string;
  distance: number;
  mainRoad: boolean;
  inTown: boolean;
  town?: string;
  addressStart: string;
  addressEnd: string;
  des: string;
  img: string;
  portfolioId?: {
    name: string;
    tier: string;
    _id: string;
  };
  dateCreation: string | Date;
  dateInitialization: string | Date;
  permissionDuration: number;
  score: number;
  priority: number;
  options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
}

export interface IProjectRO {
  data: IProjectData;
}
