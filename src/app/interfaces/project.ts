export interface IProjectData {
  _id: string;
  name: string;
  des: string;
  subinfo: string;
  priority: number;
  responsibleName: string;
  phases: any;
  stackholders: any;
}

export interface IProjectRO {
  data: IProjectData;
}
