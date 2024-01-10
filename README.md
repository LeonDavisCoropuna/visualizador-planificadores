# Proyecto de Visualización de Algoritmos de Planificación

Este proyecto tiene como objetivo desarrollar un visualizador de algoritmos de planificación. Aquí se detallan las herramientas utilizadas y una breve descripción del proyecto:

## Herramientas Utilizadas:

### Frontend:
- **React:** Una biblioteca de JavaScript para construir interfaces de usuario interactivas y componentes reutilizables.

- **React Spring:** Biblioteca para animaciones fluidas en React, utilizada para crear animaciones visuales atractivas en el visualizador.

### Backend:
- **Python:** Lenguaje de programación utilizado para implementar el backend. Se encarga de obtener información del sistema operativo y alimentarla a la interfaz.

## Algoritmos de Planificación Implementados:

1. **FCFS (First-Come, First-Served):** Los procesos se ejecutan en el orden en que llegan, siguiendo el principio "primero en llegar, primero en ser atendido".

2. **SJF (Shortest Job First):** Planificación basada en el tiempo de ejecución estimado, dando prioridad a los procesos más cortos primero.

3. **Round Robin:** Asigna tiempos de CPU en turnos a cada proceso, permitiendo que cada uno se ejecute antes de pasar al siguiente.

## Funcionalidades del Visualizador:

- **Animaciones Interactivas:** React Spring se utiliza para crear animaciones interactivas que visualizan el comportamiento de los procesos bajo diferentes algoritmos de planificación.

- **Información en Tiempo Real:** El backend en Python obtiene información en tiempo real sobre los procesos del sistema operativo para proporcionar datos precisos en la visualización.

## Instalación y Ejecución:

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/visualizador-algoritmos-planificacion.git
   ```
## Instalación y Ejecución:

### Instalar Dependencias Frontend:

```bash
npm install
```

## Ejecutar Aplicación:
### Frontend
``` bash
npm run dev

```
### Backend
```bash

cd ../backend
python codigo.py
l
```
