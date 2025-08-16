export interface IProjectData {
  _id: string;
  name: string;
  subinfo: string;
  type: string;
  budget: number;
  budgetSource: string;
  processDuration: number;
  profit: number;
  traffic: number;
  road: number;
  distance: number;
  mainRoad: boolean;
  inTown: boolean;
  town?: string;
  addressStart: string;
  addressEnd: string;
  des: string;
  img: string;
  portfolioId?: {
    tier: number;
    _id: string;
  };
  dateCreation: string;
  dateInitialization: string;
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
