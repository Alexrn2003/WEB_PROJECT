let chart;
let gaugeTemp, gaugeHum;
const sensor1_gauge = document.getElementById("sensor1_gauge");
const sensor2_gauge = document.getElementById("sensor2_gauge");

function crearGaugeConfig(color) {
  return {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: [color, '#e0e0e0'],
        borderWidth: 0
      }]
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: '70%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false }
      }
    }
  };
}

function actualizarDatos() {
  fetch("/api/sensores")
    .then(res => res.json())
    .then(data => {
      const t1 = data.sensor1.temperatura;
      const h1 = data.sensor1.humedad;
      const t2 = data.sensor2.temperatura;
      const h2 = data.sensor2.humedad;

      sensor1_gauge.innerText = `Sensor 1: ${t1}°C / ${h1}%`;
      sensor2_gauge.innerText = `Sensor 2: ${t2}°C / ${h2}%`;

      // Actualizar gauges
      gaugeTemp.data.datasets[0].data = [t1, 100 - t1];
      gaugeHum.data.datasets[0].data = [h1, 100 - h1];
      gaugeTemp.update();
      gaugeHum.update();

      // Agregar datos al gráfico
      const now = new Date().toLocaleTimeString();
      chart.data.labels.push(now);
      chart.data.datasets[0].data.push(t1);
      chart.data.datasets[1].data.push(h1);

      if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
      }

      chart.update();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('sensorChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: [],
          borderColor: 'red',
          fill: false
        },
        {
          label: 'Humedad (%)',
          data: [],
          borderColor: 'blue',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  gaugeTemp = new Chart(document.getElementById("gaugeTemp"), crearGaugeConfig('red'));
  gaugeHum = new Chart(document.getElementById("gaugeHum"), crearGaugeConfig('blue'));

  actualizarDatos();
  setInterval(actualizarDatos, 2000);
});
