import React from "react";
import { TableInfo } from "../interface/processResponse.interface";

export const TableResult = ({
  title,
  result,
}: {
  title: string;
  result: TableInfo[];
}) => {
  const calculateAverage = (property: keyof TableInfo) => {
    const sum = result.reduce((acc, item) => acc + item[property], 0);
    return result.length > 0 ? sum / result.length : 0;
  };

  const averageWaitingTime = calculateAverage("waiting_time");
  const averageTurnaroundTime = calculateAverage("turnaround_time");

  return (
    <div>
      <div className="max-h-[55em] overflow-auto text-center mb-6 mt-6">
        <strong>{title}</strong>
      </div>
      <table className="max-h-[25em] overflow-auto text-center">
        <thead>
          <tr className="bg-orange-200">
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Finish Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {result.map((r) => (
            <tr key={r.proccessID} className="[&>td]:w-44">
              <td>{r.proccessID}</td>
              <td>{r.arrival_time}</td>
              <td>{r.burst_time}</td>
              <td>{r.finish_time}</td>
              <td>{r.turnaround_time}</td>
              <td>{r.waiting_time}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4}>Average</td>
            <td><strong>{averageTurnaroundTime.toFixed(2)}</strong></td>
            <td><strong>{averageWaitingTime.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
