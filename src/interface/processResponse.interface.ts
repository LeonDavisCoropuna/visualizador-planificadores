export interface ProcessResponse {
  data: ProcessTime[];
  times: number[];
}

export interface ProcessTime {
  processID: string;
  array: number[];
}
