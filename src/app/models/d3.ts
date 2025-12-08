export interface IMessageData {
  _id: string;
  email: string;
  status?: string;
  theme: string;
  comment: string;
}

export interface IMessageRO {
  data: IMessageData;
}
