import { useEffect, useState } from "react";
import { ProcessResponse } from "../interface/processResponse.interface";

export const TableVisualization = ({data}:{data: ProcessResponse}) => {
  const [currentColumn, setCurrentColumn] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentColumn < data.times.length - 1) {
        setCurrentColumn(currentColumn + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentColumn]);

  return (
    <div className="gap-3 mt-5">
      <div className="flex flex-col border-[1px] border-black w-64 [&>div]:gap-x-3 p-3 mb-3">
        <div className="text-center">LEYENDA</div>
        <div className="flex">
          <div className="w-5 h-5 border-[1px] border-black bg-pink-100"></div>
          <div>AUN NO ENTRA A LA COLA</div>
        </div>
        <div className="flex">
          <div className="w-5 h-5 border-[1px] border-black bg-blue-700"></div>
          <div>EN EJECUCION</div>
        </div>
        <div className="flex">
          <div className="w-5 h-5 border-[1px] border-black bg-green-900"></div>
          <div>PROCESO TERMINADO</div>
        </div>
        <div className="flex">
          <div className="w-5 h-5 border-[1px] border-black bg-orange-400"></div>
          <div>PROCESO EN ESPERA</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="w-32 bg-orange-300">ProcessID</th>
            {data.times.map((time, index) => (
              <th className="w-20 bg-orange-300" key={index}>
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map(({ processID, array }) => (
            <tr key={processID}>
              <td className="border-[1px] border-black">{processID}</td>
              {array
                .map((a, index) => (
                  <td
                    key={index}
                    className={`border-[1px] border-black ${
                      a === 1
                        ? "bg-orange-400"
                        : a === 2
                        ? "bg-blue-700"
                        : a === 3
                        ? "bg-green-900"
                        : "bg-pink-100"
                    }`}
                  ></td>
                ))
                .slice(0, currentColumn + 1)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
