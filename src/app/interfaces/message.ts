export interface IMessageData {
  _id: string;
  email: string;
  status?: string;
  theme: string;
  message: string;
}

export interface IMessageRO {
  data: IMessageData;
}

export interface IFormMessage {
  email?: string;
  theme?: string;
  message?: string;
}
