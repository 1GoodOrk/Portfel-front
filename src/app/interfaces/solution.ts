import { ISelectorItems } from "./shared";

export interface ISolutionData {
  _id: string;
  code:string;
  consequences: string;
  control: number;
  des: string;
  finalState: string;
  influence: number;
  money: number;
  name: string;
  probability: number;
  quality: number;
  responsible: string;
  dateFinish: string;
  restrictions: Array<ISelectorItems>;
  sources: number;
  sourcesDes: string;
  sourcesDesReal: string;
  sphere: string;
  time: number;
  timeWork: number;
  value: number;
  valueInfluence: number;
}

export enum ESolutionFinalStatus {
  inProgress = 'Рішення не реалізовано',
  success = 'Рішення реалізовано',
  noPurpose = 'Рішення реалізовано, але не вплинуло на ризик',
  unsuccess = 'Рішення реалізовано з негативним результатом'
}
