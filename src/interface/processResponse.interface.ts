export interface ProcessResponse {
  data: ProcessTime[];
  times: number[];
  table: TableInfo[];
  gantt: Gantt[];
}

export interface ProcessTime {
  processID: string;
  array: number[];
}

export interface TableInfo {
  arrival_time: number;
  burst_time: number;
  finish_time: number;
  proccessID: number;
  turnaround_time: number;
  waiting_time: number;
}

export interface Gantt {
  proccessID: number;
  start: number;
  end: number;
}
