import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function Formulario() {
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    ciudad: "",
    interes: "huertosUrbanos",
    aceptaTerminos: false,
  });

  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar datos a Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await addDoc(collection(db, "interesadosAgriculturaUrbana"), {
        ...formData,
        fechaRegistro: Timestamp.now(),
      });
      setConfirmacion("✅ ¡Gracias por unirte! Pronto recibirás noticias de nuestros proyectos.");
      setFormData({
        nombre: "",
        email: "",
        ciudad: "",
        interes: "huertosUrbanos",
        aceptaTerminos: false,
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      setConfirmacion("❌ Hubo un problema. Intenta nuevamente más tarde.");
    }

    setEnviando(false);
  };

  return (
    <div className="bg-gradient-to-b from-green-100 via-white to-green-200 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-green-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 text-center mb-4">
          🌿 Súmate al movimiento de Agricultura Urbana
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Deja tus datos y sé parte de una red de personas que cultivan, aprenden y transforman la ciudad.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Correo Electrónico *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nombre@ejemplo.com"
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Ciudad o Localidad *</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ej. Bogotá, Medellín, Cali..."
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">¿Qué te interesa más?</label>
            <select
              name="interes"
              value={formData.interes}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="huertosUrbanos">Huertos Urbanos</option>
              <option value="talleres">Talleres y Capacitaciones</option>
              <option value="voluntariado">Voluntariado Verde</option>
              <option value="tecnologiaVerde">Tecnología y Agricultura Inteligente</option>
              <option value="reciclaje">Compostaje y Reciclaje</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                className="rounded text-green-600 focus:ring-green-400"
                required
              />
              <span className="ml-2 text-gray-700">
                Acepto recibir información y actualizaciones sobre proyectos sostenibles. *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {enviando ? "Enviando..." : "Unirme a la comunidad 🌱"}
          </button>
        </form>

        {confirmacion && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-medium ${
              confirmacion.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {confirmacion}
          </div>
        )}
      </div>

      <p className="text-gray-600 italic mt-8 text-center max-w-md">
        🌾 Tu participación puede inspirar a otros a cultivar en casa, en comunidad y en cada rincón de la ciudad.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

export default Formulario;
