import { Algorithm } from "../interface/algorithm.enum";
import axios from "../config/axios";
import { Process } from "../interface/process.interface";
import { ProcessResponse } from "../interface/processResponse.interface";
import { data } from "../data";
export const sendProcess = async ({
  process,
  algorithmVisualize,
  quantum
}: {
  process: Process[];
  algorithmVisualize: Algorithm;
  quantum:number
}): Promise<ProcessResponse> => {
  try {
    const res = await axios.post<ProcessResponse>("/planificar", {
      processes: process,
      algorithm: algorithmVisualize,
      quantum,
    });
    return res.data;

    
  } catch (err) {
    return data;
  }
};
