import { useEffect, useState } from "react";
import { ProcessResponse } from "../interface/processResponse.interface";

export const GantChart = ({data}:{data:ProcessResponse}) => {
  const [result, setResult] = useState<
    { process: string; start: number; end: number }[]
  >([]);

  useEffect(() => {
    const calculate = () => {
      const tempResult: { process: string; time: number }[] = [];
      data.times.map((time) => {
        for (let i = 0; i < data.data.length; i++) {
          const columnValue = data.data[i].array[time];
          if (columnValue === 2) {
            tempResult.push({ process: data.data[i].processID, time: time });
          }
        }
      });
      const cleanResult: { process: string; start: number; end: number }[] = [
        { process: tempResult[0].process, start: 0, end: 0 },
      ];
      for (let i = 1; i < tempResult.length; i++) {
        if (tempResult[i].process !== tempResult[i - 1].process) {
          cleanResult[cleanResult.length - 1].end = tempResult[i].time;
          cleanResult.push({
            process: tempResult[i].process,
            start: tempResult[i].time,
            end: tempResult[i].time,
          });
        }
      }
      cleanResult[cleanResult.length - 1].end =
        tempResult[tempResult.length - 1].time + 1;
      setResult(cleanResult);
    };

    calculate();
  }, []);

  return (
    <table className="mt-5">
      <thead>
        <tr>
          {result.map(({ process }, index) => (
            <td
              key={index}
              className="py-2 border-[1px] border-black text-center"
            >
              {process}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {result.map(({ start }, index) => (
            <th className="w-20 text-start" key={index}>
              {start}
            </th>
          ))}
          <th className="w-20 text-start">
            {result.length > 0 && result[result.length - 1].end}
          </th>
        </tr>
      </tbody>
    </table>
  );
};
