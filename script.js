// Ambil elemen HTML
const hrEl = document.getElementById("hr");
const rrEl = document.getElementById("rr");
const kondisiEl = document.getElementById("kondisi");

// Buat client MQTT dengan client ID acak
const clientID = "client-" + Math.floor(Math.random() * 10000);
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, clientID);

// Jika koneksi terputus
client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.error("Koneksi MQTT terputus:", responseObject.errorMessage);
  }
};

// Saat pesan tiba
client.onMessageArrived = (message) => {
  try {
    const data = JSON.parse(message.payloadString);
    console.log("Data diterima:", data);

    hrEl.textContent = data.hr + " bpm";
    rrEl.textContent = data.rr + " bpm";
    kondisiEl.textContent = data.status;
  } catch (error) {
    console.error("Gagal parsing JSON:", error);
  }
};

// Hubungkan ke broker MQTT
client.connect({
  onSuccess: () => {
    console.log("Tersambung ke MQTT broker");
    client.subscribe("LAJUPERNAPASANDETAKJANTUNG");
  },
  onFailure: (err) => {
    console.error("Gagal tersambung:", err.errorMessage);
  }
});
