import { ProcessResponse } from "./interface/processResponse.interface";

export const data : ProcessResponse = {
  data: [
    { processID: "E", array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2] },
    { processID: "D", array: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3] },
    { processID: "C", array: [0, 1, 2, 2, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3] },
    { processID: "B", array: [2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 3, 3, 3, 3, 3] },
    { processID: "A", array: [0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3] },
  ],
  times: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
};
