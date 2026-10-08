export interface IMessage {
  message: string;
}

export interface IError extends IMessage {
  code?: string;
}
