export interface IDataset {
  label: string;
  data: number[];
  color: string;
}

export interface IGraphData {
  labels: Array<string>;
  datasets: Array<IDataset>;
}
