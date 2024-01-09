import tkinter as tk
import time
import os

class ProcessInfo:
    @staticmethod
    def get_burst_time(pid):
        try:
            with open(f"/proc/{pid}/stat", 'r') as stat_file:
                stat_data = stat_file.read().split()
                utime_ticks = int(stat_data[13])
                stime_ticks = int(stat_data[14])
                hz = os.sysconf(os.sysconf_names['SC_CLK_TCK'])
                burst_time = (stime_ticks / hz) * 1000  # en segundos
                burst_time = str(int(burst_time))[:1]
                return int(burst_time)
        except FileNotFoundError:
            return 0

    @staticmethod
    def get_priority(pid):
        try:
            with open(f"/proc/{pid}/stat", 'r') as stat_file:
                stat_data = stat_file.read().split()
                priority = int(stat_data[17])
                return priority
        except FileNotFoundError:
            return 0

class CPUVisualizer:
    def __init__(self, root):
        self.root = root
        
        self.processes = []  # Lista de procesos
        self.time = 0  # Tiempo actual

        # Resto del código de la clase...

    def load_processes(self):
        process_list = "process_queue.txt"

        with open(process_list, 'w') as file:
            file.truncate(0)

        num_processes = 0

        with os.scandir('/proc') as entries:
            with open(process_list, 'a') as process_file:
                for entry in entries:
                    if entry.name.isdigit():
                        pid = entry.name
                        cmdline_path = f"/proc/{pid}/status"

                        try:
                            with open(cmdline_path, 'r') as cmdline_file:
                                cmdline = cmdline_file.readline().strip()
                                name = cmdline.split()[1] if cmdline else ''

                                burst_time = ProcessInfo.get_burst_time(pid)
                                priority = ProcessInfo.get_priority(pid)

                                if burst_time != 0:
                                    process_info = f"{pid} {name} {burst_time} {priority}\n"
                                    process_file.write(process_info)

                                    self.add_process(int(pid), burst_time)
                                    num_processes += 1
                        except FileNotFoundError:
                            continue

        print(f"Total de procesos cargados: {num_processes}")


