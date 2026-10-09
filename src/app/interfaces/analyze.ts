import { ITableContainer } from "./shared";
import { ISolutionData } from "./solution";

export interface IAnalyzeData {
  butterfly: Array<IRiskButterflyData>;
  butterflyRisksTableParams: ITableContainer<string>;
  butterflyFactors: Array<IRiskButterflyFactorData>;
  butterflyFactorData: { tableParams: ITableContainer<string>; };
  stairs: Array<IRiskStairsData>;
  stairsRisksTableParams: ITableContainer<string>;
}

export interface IRiskButterflyData {
  _id: string;
  cause: string;
  code: string;
  consequences: string;
  dateCreation: string;
  des: string;
  responsibleName: string;
  firstValue: number;
  influence: number;
  moneyMax: number;
  moveState: string;
  name: string;
  probability: number;
  qualityMax: number;
  solutionTableParams: ITableContainer<string>;
  solutions: Array<ISolutionData>
  sourcesMax: number;
  sphere: string;
  status: string;
  timeMax: number;
  value: number;
}

export interface IRiskStairsData {
  _id: string;
  aCoef: number;
  bCoef: number;
  yCoef: number;
  cause: string;
  code: string;
  consequences: string;
  dateCreation: string;
  des: string;
  doubleValue: number;
  firstValue: number;
  influence: number;
  integrateValue: number;
  moneyMax: number;
  name: string;
  operationValue: number;
  probability: number;
  projectValue: number;
  qualityMax: number;
  solutionTableParams: ITableContainer<string>;
  solutions: Array<ISolutionData>
  sourcesMax: number;
  sphere: string;
  status: string;
  timeMax: number;
  value: number;
}

export interface IRiskButterflyFactorData {
  name: string;
  des: string;
  cause: string;
  type: string;
}

export interface IAnalyzeRiskAmount {
  all: number;
  check: number;
  critical: number;
}

export enum ERiskButterflyStatus {
  critical = 'Критична',
  high = 'Висока',
  middle = 'Помірна',
  low = 'Низька'
}

export enum ERiskStairsStatus {
  critical = 'Критичний',
  high = 'Високий',
  middle = 'Помірний',
  low = 'Низький'
}

export enum EButterflyFilterModes {
  all = 'All',
  project = 'Проектний',
  operational = 'Операційний',
  double = 'Дублюючий'
}

export enum EStairsFilterModes {
  all = 'All',
  critical = 'Критичний',
  high = 'Високий',
  middle = 'Помірний',
  low = 'Низький',
  used = 'Used',
  unused = 'Unused'
}
