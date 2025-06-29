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
    animation: {
      duration: 500
    },
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
        ticks: {
          stepSize: 10
        }
      }
    }
  }
});

let counter = 0;

setInterval(() => {
  const hr = Math.floor(Math.random() * 40) + 60; // 60–100 bpm
  const rr = Math.floor(Math.random() * 10) + 12; // 12–22 rpm

  hrElement.textContent = `${hr} bpm`;
  rrElement.textContent = `${rr} rpm`;

  let kondisi = '';
  if (hr < 60 || rr < 12) {
    kondisi = 'Tidak Sehat';
  } else if (hr > 100 || rr > 22) {
    kondisi = 'Cukup Sehat';
  } else {
    kondisi = 'Sehat';
  }
  statusElement.textContent = kondisi;

  if (labels.length > 20) {
    labels.shift();
    hrData.shift();
    rrData.shift();
  }

  labels.push(counter++);
  hrData.push(hr);
  rrData.push(rr);
  chart.update();
}, 2000);
