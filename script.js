const hrEl = document.getElementById("hr");
const rrEl = document.getElementById("rr");
const kondisiEl = document.getElementById("kondisi");

const clientID = "client-" + Math.random().toString(16).substr(2, 8);
const client = new Paho.MQTT.Client("broker.hivemq.com", 8000, clientID);

client.onConnectionLost = (response) => {
  console.error("🔌 Koneksi terputus:", response.errorMessage);
};

client.onMessageArrived = (message) => {
  console.log("📩 Pesan masuk dari topik:", message.destinationName);
  console.log("📦 Payload:", message.payloadString);

  try {
    const data = JSON.parse(message.payloadString);
    hrEl.textContent = data.hr + " bpm";
    rrEl.textContent = data.rr + " bpm";
    kondisiEl.textContent = data.status;
  } catch (e) {
    console.error("❌ Data tidak valid:", e);
  }
};

client.connect({
  onSuccess: () => {
    console.log("✅ Tersambung ke MQTT broker HiveMQ WebSocket");
    client.subscribe("LAJUPERNAPASANDETAKJANTUNG");
    console.log("📡 Subscribed to topic: LAJUPERNAPASANDETAKJANTUNG");
  },
  onFailure: (err) => {
    console.error("❌ Gagal koneksi MQTT:", err);
  }
});
