import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function Formulario() {
  const navigate = useNavigate();

  // Estado formulario de registro
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "cedula",
    numeroDocumento: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
    ciudad: "",
    interes: "general",
    aceptaTerminos: false
  });
  
  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState("");

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  // Enviar datos de registro a Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      await addDoc(collection(db, "registros"), {
        ...formData,
        fechaRegistro: Timestamp.now(),
      });
      setConfirmacion("✅ ¡Registro exitoso! Te contactaremos pronto.");
      // Limpiar formulario después de registro exitoso
      setFormData({
        nombre: "",
        apellido: "",
        tipoDocumento: "cedula",
        numeroDocumento: "",
        email: "",
        telefono: "",
        fechaNacimiento: "",
        direccion: "",
        ciudad: "",
        interes: "general",
        aceptaTerminos: false
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      setConfirmacion("❌ Hubo un error en el registro, intenta nuevamente.");
    }
    
    setEnviando(false);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-md mb-4">
            Regístrate en Fundación Eco Entre Nubes
          </h1>
          <p className="text-lg text-gray-700">
            Únete a nuestra comunidad y participa en proyectos de sostenibilidad ambiental
          </p>
        </div>

        {/* Formulario de registro */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección información personal */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">
                Información Personal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Tipo de Documento *</label>
                  <select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  >
                    <option value="cedula">Cédula</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="tarjetaIdentidad">Tarjeta de Identidad</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Número de Documento *</label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 mb-2">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Sección información de contacto */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">
                Información de Contacto
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Ciudad *</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sección intereses */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2">
                Intereses y Participación
              </h2>
              
              <div>
                <label className="block text-gray-700 mb-2">¿En qué área estás interesado? *</label>
                <select
                  name="interes"
                  value={formData.interes}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="general">Información General</option>
                  <option value="voluntariado">Voluntariado</option>
                  <option value="donaciones">Donaciones</option>
                  <option value="cursos">Cursos y Talleres</option>
                  <option value="proyectos">Participación en Proyectos</option>
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
                    Acepto los términos y condiciones y la política de privacidad *
                  </span>
                </label>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition"
              >
                Volver al Inicio
              </button>
              
              <button
                type="submit"
                disabled={enviando}
                className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Completar Registro"}
              </button>
            </div>
          </form>
          
          {confirmacion && (
            <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
              confirmacion.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {confirmacion}
            </div>
          )}
        </div>
        
        <p className="text-gray-600 italic mt-12 text-center">
          🌱 Juntos construimos un futuro más sostenible y en armonía con la naturaleza.
        </p>
      </div>
    </div>
  );
}

export default Formulario;