import { Algorithm } from "../interface/algorithm.enum";
import axios from "../config/axios";
import { Process } from "../interface/process.interface";
import { ProcessResponse } from "../interface/processResponse.interface";
import { data } from "../data";

export const loadProcesses = async (): Promise<Process[]> => {
  try {
    const res = await axios.get<Process[]>("/loadProcess"); // Cambié el endpoint a "/loadProcesses" para reflejar que se obtendrá una lista de procesos
    return res.data; // Ahora, res.data será una lista de procesos
  } catch (err) {
    // Manejar el error según la lógica de tu aplicación
    console.error("Error al cargar procesos:", err);
    throw err; // Puedes manejar el error de otra manera si lo prefieres
  }
};
