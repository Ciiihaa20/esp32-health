const hrEl = document.getElementById("hr");
const rrEl = document.getElementById("rr");
const kondisiEl = document.getElementById("kondisi");

const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "client-" + Math.random());

client.onConnectionLost = (response) => {
  console.error("Koneksi terputus:", response.errorMessage);
};

client.onMessageArrived = (message) => {
  try {
    const data = JSON.parse(message.payloadString);
    hrEl.textContent = data.hr + " bpm";
    rrEl.textContent = data.rr + " bpm";
    kondisiEl.textContent = data.status;
  } catch (e) {
    console.error("Data tidak valid:", e);
  }
};

client.connect({
  onSuccess: () => {
    console.log("Tersambung ke MQTT");
    client.subscribe("LAJUPERNAPASANDETAKJANTUNG");
  },
  onFailure: (err) => {
    console.error("Gagal koneksi MQTT:", err);
  }
});
