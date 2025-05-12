import React, { useState, useEffect } from 'react';

export default function Pacak() {
  const [status, setStatus] = useState({
    triturado: false,
    circulacion: false,
    calentamiento: false,
  });

  const [sensors, setSensors] = useState({
    temperatura: '--',
    humedad: '--',
  });

  // Función para obtener los datos de los sensores desde Node-RED
  const fetchSensorsData = async () => {
    try {
      const response = await fetch('http://192.168.1.5:1880/sensores-pacak');
      if (!response.ok) throw new Error('Error en la respuesta de los sensores');
      const data = await response.json();
      setSensors(data);
    } catch (error) {
      console.error("Error al leer sensores: ", error.message);
    }
  };

  // Llamar a la función fetchSensorsData cada 2 segundos
  useEffect(() => {
    const interval = setInterval(fetchSensorsData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Función para controlar los ciclos (encender/apagar)
  const toggle = async (ciclo) => {
    const newState = !status[ciclo];
    setStatus(prev => ({ ...prev, [ciclo]: newState }));

    try {
      const response = await fetch(`http://192.168.1.5:1880/${ciclo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newState ? 1 : 0 }),
      });

      if (!response.ok) throw new Error('Error al enviar comando');
    } catch (error) {
      alert(`Error al enviar comando para ${ciclo}: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Sección PACAK – Máquina de descomposición</h2>

      <div>
        <h3>Controles</h3>
        <button onClick={() => toggle('triturado')}>
          {status.triturado ? 'Detener Triturado' : 'Iniciar Triturado'}
        </button>

        <button onClick={() => toggle('circulacion')}>
          {status.circulacion ? 'Detener Circulación' : 'Iniciar Circulación'}
        </button>

        <button onClick={() => toggle('calentamiento')}>
          {status.calentamiento ? 'Apagar Calentamiento' : 'Encender Calentamiento'}
        </button>
      </div>

      <div>
        <h3>Monitoreo</h3>
        <p>🌡️ Temperatura: {sensors.temperatura} °C</p>
        <p>💧 Humedad: {sensors.humedad} %</p>
      </div>
    </div>
  );
}
