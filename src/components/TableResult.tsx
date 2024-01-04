import { useEffect, useState } from "react";
import { Result } from "../interface/result.interface";

export const TableResult = ({
  title,
  result,   
}: {
  title: string;
  result: Result[];
}) => {
  const [average, setAverage] = useState<{ turn: number; wait: number }>({
    turn: 0,
    wait: 0,
  });
  useEffect(() => {
    const calculate = () => {
      let sumTurn = 0;
      let sumWait = 0;
      result.forEach((r) => {
        sumTurn += r.waitTime;
        sumWait += r.turnaroundTime;
      });
      setAverage({
        turn: sumTurn / result.length,
        wait: sumWait / result.length,
      });
    };
    calculate();
  }, []);
  return (
    <div>
        <div>
            {title}
        </div>
      <table>
        <thead>
          <tr>
            <th>Process ID</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {result.map((result) => (
            <tr>
              <td>{result.processID}</td>
              <td>{result.turnaroundTime}</td>
              <td>{result.waitTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Average Turnaround Time: {average.turn}</div>
      <div>Average Wait Time: {average.wait}</div>
    </div>
  );
};
