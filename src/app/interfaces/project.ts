export interface IProjectData {
  _id: string;
  name: string;
  subinfo: string;
  type: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleLastname: string;
  managerName: string;
  managerSurname: string;
  managerLastname: string;
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

export interface IProjectDataVehicle {
  _id: string;
  name: string;
  subinfo: string;
  des: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleLastname: string;
  managerName: string;
  managerSurname: string;
  managerLastname: string;
  responsibleOrganization: string;
  volumeOfWork: number;
  forecastProjectTaskAmount: number;
  term: number;
  actionPlan: string;
  sphereOfAction: string;
  budget: number;
  budgetSource: string;
  mainLosses: number;
  actualCost: number;
  additionalLosses: number;
  passengerTraffic: number;
  ticketPrice: number;
  governmentSubsidies: number;
  vehicle: string;
  infrastructure: string;
  staff: string;
  technology: string;
  options: {
    eco: number;
    war: number;
    log: number;
    soc: number;
    struc: number;
  }
  performanceIndex: number;
  indexOfAssetsEmployed: number;
  projectValuation: number;
  riskScore: number;
}
