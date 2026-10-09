export interface IMessage {
  message: string;
}

export interface IError extends IMessage {
  code?: string;
}

export interface ISearchProperties {
  project: string;
}
export interface IDialogVisibility {
  creation: boolean;
  info: boolean;
}
export enum EDialogVisibilityKeys {
  creation = 'creation',
  info = 'info'
}
export interface ITimeoutContainer {
  project?: number | undefined;
}

export enum EInputRowsName {
  butterfly = 'butterfly',
  stairs = 'stairs',
  solution = 'solution',
  logistic = 'logistic',
  factorLogistic = 'factorLogistic'
}

export interface IInputRowItems {
  label: string;
  value: string;
}
export interface ISelectorItems extends IInputRowItems {}

// TODO: enum
export interface IInputRow {
  type: string;
  displayCondition: boolean;
  name: string;
  label: string;
  placeholder: string;
  pTooltip: string;
  value: string;
  suffix?: string;
  items?: Array<IInputRowItems>;
  min?: number;
  max?: number;
  step?: number;
}

export type IInputRowContainer = {
  [key in EInputRowsName]: Array<IInputRow>
}

export interface IInfoRow {
  type: string;
  propName: string;
  label: string;
  propPermission?: string;
  suffix?: string;
  postfix?: string;
  items?: Array<IInfoRow>;
  // Delete
  propNames: string;
}

export type IInfoRowContainer = {
  [key in EInputRowsName]: Array<IInfoRow>
}

export interface IDialogCommunicationSubjectData {
  inputRowsName: EInputRowsName;
  header: string;
}

export interface ITableContainer<T> {
  th: Array<string>;
  td: Array<Array<T>>;
}
export interface IChartsBarDatasetsContainer {
  label: string
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
}

export interface IChartsBarDataContainer {
  labels: Array<string>;
  datasets: Array<IChartsBarDatasetsContainer>;
}
export interface IChartsBarOptionsContainer {
  plugins: { legend: { labels: { color: string; } } },
  scales: {
    y: {
      beginAtZero?: boolean;
      ticks: { color: string; };
      grid: {
        color: string;
        drawBorder: boolean;
      }
    },
    x: {
      beginAtZero?: boolean;
      ticks: { color: string; };
      grid: {
        color: string;
        drawBorder: boolean;
      }
    }
  }
}
export interface IChartsLineDatasetsContainer {
  label: string
  data: Array<number>;
  fill: boolean;
  borderColor: string;
  tension: number;
}
export interface IChartsLineDataContainer {
  labels: Array<string>;
  datasets: Array<IChartsLineDatasetsContainer>;
}
export interface IChartsLineOptionsContainer {
  maintainAspectRatio: false;
  aspectRatio: number;
  plugins: { legend: { labels: { color: string; } } },
  scales: {
    y: {
      beginAtZero?: boolean;
      ticks: { color: string; };
      grid: {
        color: string;
        drawBorder: boolean;
      }
    },
    x: {
      beginAtZero?: boolean;
      ticks: { color: string; };
      grid: {
        color: string;
        drawBorder: boolean;
      }
    }
  }
}
