export interface IProjectData {
  _id: string;
  name: string;
  des: string;
  subinfo: string;
  code: string;
  priority: number;
  responsibleName: string;
  analyze: any;
  img?: string;
}

export interface IProjectRO {
  data: IProjectData;
}

export interface IFormProjectData {
  _id?: string;
  name?: string;
  des?: string;
  subinfo?: string;
  code?: string;
  priority?: number;
  responsibleName?: string;
  analyze?: string;
  img?: string;
}
