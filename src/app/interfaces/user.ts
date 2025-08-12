export interface IUserData {
  _id: string;
  email: string;
  token: string;
  portfolioIds: Array<string>;
  projectIds: Array<string>;
}

export interface IUserRO {
  data: IUserData;
}
