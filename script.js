const hrElement = document.getElementById('hr');
const rrElement = document.getElementById('rr');
const statusElement = document.getElementById('status');

const hrData = [];
const rrData = [];
const labels = [];

const ctx = document.getElementById('chartHRRR').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        borderColor: '#e57373',
        backgroundColor: 'rgba(229, 115, 115, 0.2)',
        data: hrData,
        tension: 0.4
      },
      {
        label: 'Respiratory Rate (rpm)',
        borderColor: '#64b5f6',
        backgroundColor: 'rgba(100, 181, 246, 0.2)',
        data: rrData,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    animation: { duration: 500 },
    plugins: {
      legend: {
        labels: {
          font: { size: 12 }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 }
      }
    }
  }
});

let counter = 0;

// Inisialisasi MQTT
const clientID = "webClient-" + Math.random().toString(16).substr(2, 8);
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, clientID);

client.onConnectionLost = (response) => {
  console.error("Koneksi MQTT terputus:", response.errorMessage);
};

client.onMessageArrived = (message) => {
  try {
    const data = JSON.parse(message.payloadString);
    const hr = parseFloat(data.hr);
    const rr = parseFloat(data.rr);
    const status = data.status || 'Tidak diketahui';

    hrElement.textContent = `${hr} bpm`;
    rrElement.textContent = `${rr} rpm`;
    statusElement.textContent = status;

    // Tambahkan data ke grafik
    if (labels.length > 20) {
      labels.shift();
      hrData.shift();
      rrData.shift();
    }

    labels.push(counter++);
    hrData.push(hr);
    rrData.push(rr);
    chart.update();

    console.log("Data MQTT:", data);
  } catch (err) {
    console.error("Gagal parsing data:", err);
  }
};

client.connect({
  onSuccess: () => {
    console.log("Terhubung ke broker MQTT");
    client.subscribe("LAJUPERNAPASANDETAKJANTUNG");
  },
  useSSL: false
});
