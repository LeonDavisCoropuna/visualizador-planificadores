from flask import Flask, request, jsonify
from flask_cors import CORS  
from typing import List, Optional
from enum import Enum
import copy
import json
app = Flask(__name__)
CORS(app)
class Algorithm(Enum):
    FCFS = "FCFS"
    SJF = "SJF"
    PRIORITY = "PRIORITY"
    ROUND_ROBIN = "ROUND_ROBIN"

class Process:
    def __init__(self, id: int, arrivalTime: Optional[int], burstTime: Optional[int]):
        self.id = id
        self.arrivalTime = arrivalTime
        self.burstTime = burstTime


class Proceso:
    def __init__(self, job, burst_time, arrival_time):
        self.job = job
        self.burst_time = burst_time
        self.arrival_time = arrival_time
        self.finish_time = None
        self.turnaround_time = None
        self.waiting_time = None

class Result:
    def __init__(self, job, start, end):
        self.job = job
        self.start = start
        self.end = end

def fcfs(procesos):
    procesos.sort(key=lambda x: x.arrival_time)

    tiempo_actual = 0
    resultados = []

    for proceso in procesos:
        if tiempo_actual < proceso.arrival_time:
            tiempo_actual = proceso.arrival_time

        resultado = Result(proceso.job, tiempo_actual, tiempo_actual + proceso.burst_time)
        resultados.append(resultado)

        tiempo_actual = resultado.end

        proceso.finish_time = resultado.end
        proceso.turnaround_time = proceso.finish_time - proceso.arrival_time
        proceso.waiting_time = proceso.turnaround_time - proceso.burst_time

    return resultados

def sjf(procesos):
    procesos.sort(key=lambda x: (x.arrival_time, x.burst_time))

    tiempo_actual = 0
    resultados = []

    while procesos:
        procesos_en_espera = [p for p in procesos if p.arrival_time <= tiempo_actual]
        if not procesos_en_espera:
            tiempo_actual = procesos[0].arrival_time
            continue

        proceso_elegido = min(procesos_en_espera, key=lambda x: x.burst_time)
        procesos.remove(proceso_elegido)

        resultado = Result(proceso_elegido.job, tiempo_actual, tiempo_actual + proceso_elegido.burst_time)
        resultados.append(resultado)

        tiempo_actual = resultado.end

        proceso_elegido.finish_time = resultado.end
        proceso_elegido.turnaround_time = proceso_elegido.finish_time - proceso_elegido.arrival_time
        proceso_elegido.waiting_time = proceso_elegido.turnaround_time - proceso_elegido.burst_time

    return resultados

def round_robin(procesos, quantum):
    tiempo_actual = 0
    procesos_temp = procesos.copy()
    procesos_temp2 = copy.deepcopy(procesos)
    
    # Encontrar el proceso con el menor tiempo de llegada y menor ráfaga en caso de empate
    proceso_menor_llegada_rafaga = min(procesos_temp, key=lambda x: (x.arrival_time, x.burst_time))

    cola = [proceso_menor_llegada_rafaga]
    
    # Eliminar el proceso encontrado de la lista
    procesos_temp.remove(proceso_menor_llegada_rafaga)
     
    resultados = []
    

    while cola:
        proceso_actual = cola.pop(0)

        tiempo_ejecucion = min(quantum, proceso_actual.burst_time)
        
        resultado = Result(proceso_actual.job, tiempo_actual, tiempo_actual + tiempo_ejecucion)
        resultados.append(resultado)

        tiempo_actual = resultado.end
        
        if len(procesos_temp) > 0:
            proceso_menor_llegada_rafaga = min(procesos_temp, key=lambda x: (x.arrival_time, x.burst_time))
        
            if tiempo_actual >= proceso_menor_llegada_rafaga.arrival_time :
                cola.append(proceso_menor_llegada_rafaga)
                procesos_temp.remove(proceso_menor_llegada_rafaga)
       
        proceso_actual.burst_time -= tiempo_ejecucion

        if proceso_actual.burst_time > 0:
            cola.append(proceso_actual)
        else:
            proceso_encontrado = next(proceso for proceso in procesos_temp2 if proceso.job == proceso_actual.job)
            proceso_actual.burst_time = proceso_encontrado.burst_time
            proceso_actual.finish_time = resultado.end
            proceso_actual.turnaround_time = proceso_actual.finish_time - proceso_actual.arrival_time
            proceso_actual.waiting_time = proceso_actual.turnaround_time - proceso_actual.burst_time

    return resultados

def imprimir_tabla(procesos):
    print("{:<5} {:<15} {:<15} {:<15} {:<18} {:<15}".format("Job", "Arrival Time", "Burst Time", "Finish Time", "Turnaround Time", "Waiting Time"))
    for proceso in procesos:
        print("{:<5} {:<15} {:<15} {:<15} {:<18} {:<15}".format(proceso.job, proceso.arrival_time, proceso.burst_time, proceso.finish_time, proceso.turnaround_time, proceso.waiting_time))

def imprimir_diagrama_gantt(resultados):
    print("\nDiagrama de Gantt:")
    print("{:<5} {:<15} {:<15}".format("Job", "Start", "End"))
    for resultado in resultados:
        print("{:<5} {:<15} {:<15}".format(resultado.job, resultado.start, resultado.end))


def obtener_matriz(tabla_result, gantt_result):
    tabla_temp  = copy.deepcopy(tabla_result)
    
    col = max(tabla_result, key=lambda x: (x.finish_time)).finish_time
    fil = len(tabla_result)
    matriz = []
    
    for i in range(fil):
        array = [0] * col
        array[tabla_result[i].arrival_time:] = [1] * (col - tabla_result[i].arrival_time)
        temp = [tabla_result[i].job, array]
        matriz.append(temp)
    
    for result in gantt_result:
        job = result.job
        
        for element in matriz:
            if element[0] == job:
                aux = result.end - result.start
                
                
                element[1][result.start : result.end -1] = [2] * (aux)
                for proces in tabla_temp:
                    if proces.job == element[0]:
                        proces.burst_time-=aux
                        
                        if proces.burst_time > 0:
                            element[1][result.end: ] = [1] * (col -result.end)
                        else:
                            element[1][result.end: ] = [3] * (col -result.end)
                        break
                break
            
            

    # Imprimir los datos
    for fila in matriz:
        print(f"{fila[0]} | {' | '.join(map(str, fila[1]))}")
              
    return matriz


def select_algortimo(algoritmo, procesos_lst, quantum):
    
    procesos =[]
    for i in range(len(procesos_lst)):
        procesos.append(Proceso(procesos_lst[i].id, procesos_lst[i].burstTime, procesos_lst[i].arrivalTime))
        
    if algoritmo.value == 'SJF':
        
        gantt = sjf(procesos.copy())
        
        temp = obtener_matriz(procesos, gantt)
        return (procesos, temp, gantt)
    elif algoritmo.value == 'FCFS':
        gantt = fcfs(procesos)
        
        temp = obtener_matriz(procesos, gantt)
        return (procesos, temp, gantt)
    elif algoritmo.value == 'ROUND_ROBIN':
        gantt = round_robin(procesos.copy(), quantum)
        
        temp = obtener_matriz(procesos, gantt)
        return (procesos, temp, gantt)
    return None
        

@app.route('/planificar', methods=['POST'])
def planificar():
    data = request.get_json()

    processes_data = data.get('processes', [])
    algorithm = Algorithm(data.get('algorithm'))
    quantum = data.get('quantum')

    processes = [Process(**process_data) for process_data in processes_data]
    
    all_result = select_algortimo(algorithm, processes, quantum)
    
    table = all_result[0]
    matriz = all_result[1]
    gantt = all_result[2]
    
    # Estructurar la tabla resultados
    formatted_table = [
        {
            'proccessID': element.job,
            'burst_time': element.burst_time,
            'arrival_time': element.arrival_time,
            'finish_time': element.finish_time,
            'turnaround_time': element.turnaround_time,
            'waiting_time': element.waiting_time
        } for element in table
    ]
    
    # Estructurar el diagrama de gantt
    formatted_gantt = [
        {
            'proccessID': element.job,
            'start': element.start,
            'end': element.end
        } for element in gantt
    ]   
    # Estructurar varr de acuerdo al formato deseado
    formatted_varr = [
        {'processID': element[0], 'array': element[1]} for element in matriz
    ]

    # Crear el objeto JSON completo
    json_result = {
        'data': formatted_varr,
        'times': list(range(len(matriz[0][1]))),
        'table': formatted_table,
        'gantt': formatted_gantt
    }

    # Convertir el objeto JSON a una cadena
    json_result_str = json.dumps(json_result, separators=(',', ':')).replace('"', "'")

    # Devolver el resultado al frontend
    return jsonify(json_result)

    

    


# Ejemplo de uso
if __name__ == "__main__":
     app.run(debug=True)