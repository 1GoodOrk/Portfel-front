export interface IProjectData {
  _id: string;
  name: string;
  subinfo: string;
  type: string;
  budgetSource: number;
  processDuration: number;
  profit: number;
  road: number;
  distance: number;
  mainRoad: boolean;
  inTown: boolean;
  town?: string;
  addressStart: string;
  addressEnd: string;
  des: string;
  img: string;
  portfolioId: string;
  dateCreation: string;
  dateInitialization: string;
  permissionDuration: string;
  score: number;
  priority: number;
  options: {
    eco: number;
    war: number;
    log: number;
    doc: number;
    struc: number;
  }
}

export interface IProjectRO {
  data: IProjectData;
}
