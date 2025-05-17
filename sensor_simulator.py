import random
import time

def get_sensor_data():
    sensor_1 = {
        "temperatura": round(random.uniform(20, 30), 2),
        "humedad": round(random.uniform(40, 60), 2)
    }
    sensor_2 = {
        "temperatura": round(random.uniform(15, 25), 2),
        "humedad": round(random.uniform(30, 50), 2)
    }
    return {"sensor1": sensor_1, "sensor2": sensor_2, "timestamp": time.time()}
