// Importa ProcessContext, no PromtContext
import { useContext, useState, useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { useModal } from "./hooks/useModal";
import { ProcessContext, ProcessContextType } from "./context/ProcessContext";
import { Title } from "./components/Title";
import { Process } from "./interface/process.interface";
import { MdDelete } from "react-icons/md";
import { TableVisualization } from "./components/TableVisualization";
import { GantChart } from "./components/GantChart";
import { Algorithm } from "./interface/algorithm.enum";
import { sendProcess } from "./services/sendProcess";
import { ProcessResponse } from "./interface/processResponse.interface";

function App() {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isOpenModal2, openModal2, closeModal2] = useModal();

  const {
    algorithm,
    setAlgorithm,
    deleteAlgorithm,

    algorithmVisualize,
    setAlgorithmVisualize,
    processes,
    addProcess,
    deleteProcess,
    updateProcess,
  } = useContext(ProcessContext) as ProcessContextType; // Desestructura el contexto
  const [newProcess, setNewProcess] = useState<Process>({
    id: algorithm.length + 1,
    arrivalTime: null,
    burstTime: null,
    priority: null,
  });
  const [idProcessEdit, setIdProcessEdit] = useState<number>(0);
  const [responseAlgorithms, setResponseAlgorithms] =
    useState<ProcessResponse | null>(null);
  useEffect(() => {
    // Actualizar el proceso de edición cuando cambia el ID seleccionado
    const selectedProcess = processes.find(
      (process) => process.id === idProcessEdit
    );
    setNewProcess(
      selectedProcess || {
        id: idProcessEdit,
        arrivalTime: null,
        burstTime: null,
        priority: null,
      }
    );
  }, [idProcessEdit]);

  const handleNewProcess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProcess({
      ...newProcess,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProcess = (e: React.MouseEvent) => {
    e.preventDefault();

    // Copia el nuevo proceso actual y actualiza su ID
    const updatedNewProcess = {
      ...newProcess,
      id: processes.length > 0 ? processes[processes.length - 1].id + 1 : 1,
    };

    // Agrega el nuevo proceso al array
    addProcess(updatedNewProcess);

    // Reinicia el estado del nuevo proceso
    setNewProcess({
      id: algorithm.length + 1,
      arrivalTime: null,
      burstTime: null,
      priority: null,
    });
  };

  const handleChangeSelectProcess = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const extractNum = e.target.value.substring(7);
    const selectedProcessId = parseInt(extractNum);
    setIdProcessEdit(selectedProcessId);
  };

  const handleEditProcess = (e: React.MouseEvent) => {
    e.preventDefault();
    updateProcess(idProcessEdit, newProcess);
  };
  const handleDeleteProcess = (index: number) => {
    deleteProcess(index);
  };

  const handleChangeAlgorithmVisualization = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let val = e.target.value as Algorithm;
    setAlgorithmVisualize(val);
  };
  const handleSubmitExecute = async () => {
    const res = await sendProcess({
      process: processes,
      algorithmVisualize: algorithmVisualize,
    });
    setResponseAlgorithms(res);
  };
  return (
    <div className="flex flex-col items-center h-screen relative">
      <Title title="Visualizador de Procesos" />
      <div className="max-h-[25em] overflow-auto">
        <table>
          <thead className="px-32">
            <tr className="px-32 [&>th]:bg-gray-500 [&>th]:w-72">
              <th>ID Process</th>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              <th>Priotity</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr
                key={p.id}
                className="[&>td]:py-2 border-b-[1px] border-gray-600 hover:bg-gray-200 "
              >
                <td>{p.id}</td>
                <td>{p.burstTime}</td>
                <td>{p.arrivalTime}</td>
                <td>{p.priority}</td>
                <td className="text-center">
                  <button onClick={() => handleDeleteProcess(p.id)}>
                    <MdDelete size={20} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between w-full px-20 [&>*]:w-48 [&>*]:text-center pt-5 [&>*]:py-2">
        <button className="bg-green-400" onClick={() => openModal()}>
          Add process
        </button>
        <button className="bg-blue-400" onClick={() => openModal2()}>
          Edit Process
        </button>
        <select
          className="w-32 bg-white border border-gray-500"
          onChange={handleChangeAlgorithmVisualization}
        >
          <option value="FCFS">FCFS</option>
          <option value="SJF">SJF</option>
          <option value="PRIORITY">PRIORITY</option>
          <option value="ROUND_ROBIN">ROUND_ROBIN</option>
        </select>
        <button className="bg-green-600" onClick={handleSubmitExecute}>
          EXECUTE
        </button>
      </div>
      {/* Añadir nuevo proceso */}
      <Modal
        closeModal={closeModal}
        isOpen={isOpenModal}
        height={20}
        width={16}
      >
        <div className="flex flex-col items-center justify-around w-full">
          <div className="flex">
            <h2 className="w-24 ">ID Process: </h2>
            <h2 className="w-24 "> {processes[processes.length - 1].id + 1}</h2>
          </div>
          <div>
            <label className="flex items-center">
              <h2 className="w-24 "> Burts Time:</h2>
              <input
                className="w-24 border-[1px] border-gray-500 rounded-md pl-2 py-1"
                onChange={handleNewProcess}
                name="burstTime"
                value={newProcess.burstTime ? newProcess.burstTime : ""}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <h2 className="w-24 ">Arrival Time:</h2>
              <input
                className="w-24 border-[1px] border-gray-500 rounded-md pl-2 py-1"
                onChange={handleNewProcess}
                name="arrivalTime"
                value={newProcess.arrivalTime ? newProcess.arrivalTime : ""}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <h2 className="w-24 ">Priority:</h2>
              <input
                className="w-24 border-[1px] border-gray-500 rounded-md pl-2 py-1"
                onChange={handleNewProcess}
                name="priority"
                value={newProcess.priority ? newProcess.priority : ""}
              />
            </label>
          </div>
          <div>
            <button
              className="bg-green-400 w-48 py-1 rounded-md"
              onClick={handleAddProcess}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      {/* edit process */}

      <Modal
        closeModal={closeModal2}
        isOpen={isOpenModal2}
        height={20}
        width={19}
      >
        <div className="flex flex-col items-center justify-around w-full">
          <div className="flex">
            <h2 className="w-24 ">ID Process: </h2>
            <select className="w-32 " onChange={handleChangeSelectProcess}>
              {processes.map((p) => (
                <option>Proceso {p.id}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <h2 className="w-24 "> Burts Time:</h2>
              <input
                className="w-24 border-[1px] border-gray-500 rounded-md pl-2 py-1"
                onChange={handleNewProcess}
                name="burstTime"
                value={newProcess.burstTime ? newProcess.burstTime : ""}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <h2 className="w-24 ">Arrival Time:</h2>
              <input
                className="w-24 border-[1px] border-gray-500 rounded-md pl-2 py-1"
                onChange={handleNewProcess}
                name="arrivalTime"
                value={newProcess.arrivalTime ? newProcess.arrivalTime : ""}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <h2 className="w-24 ">Priority:</h2>
              <input
                className="w-24 border-[1px] border-gray-500 rounded-md pl-2 py-1"
                onChange={handleNewProcess}
                name="priority"
                value={newProcess.priority ? newProcess.priority : ""}
              />
            </label>
          </div>
          <div>
            <button
              className="bg-green-400 w-48 py-1 rounded-md"
              onClick={handleEditProcess}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
      {responseAlgorithms ? (
        <>
          <TableVisualization data={responseAlgorithms} />
          <GantChart data={responseAlgorithms} />
        </>
      ) : null}
    </div>
  );
}

export default App;
