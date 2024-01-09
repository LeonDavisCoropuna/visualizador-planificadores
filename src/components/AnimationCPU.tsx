import React, { useState, useEffect } from "react";
import { Test } from "./animation/Test";
import { Gantt } from "../interface/processResponse.interface";

export const AnimationCPU = ({ gantt }: { gantt: Gantt[] }) => {
  const [testData, setTestData] = useState<
    {
      end: number;
      start: number;
      proccessID: number;
      newX: number;
      newY: number;
      time: number;
      progress:boolean;
    }[]
  >([]);
  const isTerminate = ({ data, proccessID, index }: { data: Gantt[]; proccessID: number; index: number }) => {
    const aux500 = data.slice(index+1); // Utiliza slice para obtener una porción desde la posición index hasta el final
    const q = aux500.find((item) => item.proccessID === proccessID); // Corrige el error de sintaxis aquí
    console.log(q?.proccessID,index)
    return q !== undefined; // Devuelve true si q no es undefined, de lo contrario, devuelve false
  };
  
  useEffect(() => {
    console.log("Efecto secundario ejecutado con nuevos datos:", gantt);
    setTestData(
      gantt.map(({ end, proccessID, start }, index) => ({
        end,
        proccessID,
        start,
        newX: 50 * index,
        newY: 32 * index,
        time: end - start,
        progress: isTerminate({ data: gantt, proccessID, index }) // Ajusta esta línea
      }))
    );
  }, [gantt]);
  

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < testData.length ? prevIndex + 1 : prevIndex
      );
    }, 10);

    // Cleanup interval on component unmount or when all tests are created
    return () => clearInterval(interval);
  }, [currentIndex, testData.length]);

  return (
    <div className="border-[1px] border-black mt-20 relative h-[30em] w-[70em] flex ">
      {testData.slice(0, currentIndex).map((testDataItem, index) => (
        <Test
          key={index}
          newX={testDataItem.newX}
          newY={testDataItem.newY}
          time={testDataItem.time}
          proccessID={testDataItem.proccessID}
          isInQueue={testDataItem.progress}
        />
      ))}
      <div className="w-24 bg-red-300">START</div>
      <div className="w-32 bg-green-300">QUEUE</div>
      <div className="mt-30 ml-30 w-[38em] bg-blue-400 flex items-center h-full justify-center">
        <div className="pt-5 w-24 h-24 bg-yellow-500 text-center">CPU</div>
      </div>
      <div className="w-[18em] bg-cyan-500">FINISH</div>
    </div>
  );
};
