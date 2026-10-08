export interface IUserData {
  _id: string;
  organization:string;
  email: string;
  password: string;
  token: string;
  projectIds: Array<string>;
  type: string;
}

export interface IUserRO {
  data: IUserData;
}

export interface IFormUser {
  organization?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  type?: string;
  terms?: boolean;
  projectIds?: Array<string>;
}
