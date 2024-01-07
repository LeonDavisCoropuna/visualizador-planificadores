// ProcessContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Process } from "../interface/process.interface";
import { Algorithm } from "../interface/algorithm.enum";
import { ProcessResponse } from "../interface/processResponse.interface";

export type ProcessContextType = {
  /* algoritmos que mostraran wait y around time */
  algorithm: Algorithm[];
  setAlgorithm: (algorithm: Algorithm[]) => void;
  deleteAlgorithm: (algorithm: Algorithm) => void;
  /* algoritmo escogido para ser visualizado */
  algorithmVisualize: Algorithm;
  setAlgorithmVisualize: (algorithm: Algorithm) => void;
  /* procesos  */
  processes: Process[];
  addProcess: (process: Process) => void;
  deleteProcess: (processId: number) => void;
  updateProcess: (idProcess: number, process: Process) => void;

  processVisualization: ProcessResponse | null;
  setProcessVisualization: (response: ProcessResponse) => void;
};
export const ProcessContext = createContext<ProcessContextType | undefined>(
  undefined
);

export const ProcessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [algorithm, setAlgorithm] = useState<Algorithm[]>([
    Algorithm.FCFS,
    Algorithm.PRIORITY,
    Algorithm.ROUND_ROBIN,
    Algorithm.SJF,
  ]);
  const [algorithmVisualize, setAlgorithmVisualize] = useState<Algorithm>(
    Algorithm.FCFS
  );

  const [processVisualization, setProcessVisualization] =
    useState<ProcessResponse | null>(null);
  const [processes, setProcesses] = useState<Process[]>([
    { arrivalTime: 4, burstTime: 1, id: 1},
    { arrivalTime: 0, burstTime: 5, id: 2},
    { arrivalTime: 1, burstTime: 4, id: 3},
    { arrivalTime: 8, burstTime: 3, id: 4},
    { arrivalTime: 12, burstTime: 2, id: 5},

  ]);

  const addProcess = (process: Process) => {
    setProcesses((prevProcesses) => [...prevProcesses, process]);
  };

  const deleteAlgorithm = (algorithmToDelete: Algorithm) => {
    // Filtrar la lista de algoritmos eliminando el que deseamos eliminar
    setAlgorithm((prevAlgorithms) =>
      prevAlgorithms.filter((algo) => algo !== algorithmToDelete)
    );
  };

  const deleteProcess = (index: number) => {
    setProcesses((prevProcesses) =>
      prevProcesses.filter((process) => process.id !== index)
    );
  };

  const updateProcess = (idProcess: number, updatedProcess: Process) => {
    setProcesses((prevProcesses) =>
      prevProcesses.map((process) =>
        process.id === idProcess ? updatedProcess : process
      )
    );
  };

  return (
    <ProcessContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        deleteAlgorithm,
        algorithmVisualize,
        setAlgorithmVisualize,
        processes,
        addProcess,
        deleteProcess,
        updateProcess,
        processVisualization,
        setProcessVisualization
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcessContext = () => {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error("useProcessContext must be used within a ProcessProvider");
  }
  return context;
};
