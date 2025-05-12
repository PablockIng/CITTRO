import React, { useEffect, useState } from 'react';
import './Fungi.css';

export default function Fungi() {
  const [sensorData, setSensorData] = useState({
    temperatura: '--',
    humedad: '--',
    co2: '--'
  });

  // Simulamos la obtención de datos, luego esto se conecta con Node-RED
  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí irá el fetch a Node-RED
      setSensorData({
        temperatura: (20 + Math.random() * 5).toFixed(1),
        humedad: (60 + Math.random() * 10).toFixed(1),
        co2: (400 + Math.random() * 50).toFixed(0)
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fungi-container">
      <h2>🍄 Sección FUNGI - Cultivo Inteligente</h2>
      <div className="sensor-panel">
        <div className="sensor-box">
          <h3>🌡 Temperatura</h3>
          <p>{sensorData.temperatura} °C</p>
        </div>
        <div className="sensor-box">
          <h3>💧 Humedad</h3>
          <p>{sensorData.humedad} %</p>
        </div>
        <div className="sensor-box">
          <h3>🌫 CO₂</h3>
          <p>{sensorData.co2} ppm</p>
        </div>
      </div>

      <div className="controls">
        <h3>⚙️ Control Manual</h3>
        <button>Encender Resistencia</button>
        <button>Apagar Luz</button>
        <button>Ventilación</button>
      </div>
    </div>
  );
}
