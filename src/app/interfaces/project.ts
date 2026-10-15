import { IAnalyzeData } from "./analyze";

export interface IProjectData {
  _id: string;
  name: string;
  des: string;
  subinfo: string;
  code: string;
  priority: number;
  responsibleName: string;
  analyze: IAnalyzeData;
  img?: string;
}

export interface IProjectRO {
  data: IFormProjectData;
}

export interface IFormProjectData {
  _id?: string;
  name?: string;
  des?: string;
  subinfo?: string;
  code?: string;
  priority?: number;
  responsibleName?: string;
  analyze?: IAnalyzeData;
  img?: string;
}
