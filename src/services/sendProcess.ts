import { Algorithm } from "../interface/algorithm.enum";
import axios from "../config/axios";
import { Process } from "../interface/process.interface";
import { ProcessResponse } from "../interface/processResponse.interface";
import { data } from "../data";
export const sendProcess = async ({
  process,
  algorithmVisualize,
}: {
  process: Process[];
  algorithmVisualize: Algorithm;
}): Promise<ProcessResponse> => {
  try {
    const res = await axios.post<ProcessResponse>("/api/algorithms", { process, algorithm: algorithmVisualize });
    return res.data;
  } catch (err) {
    return data;
  }
};
