import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Encabezado */}
        <h1 className="text-5xl font-extrabold text-green-800 drop-shadow-md mb-4">
          Fundación Eco Entre Nubes
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Conservamos los ecosistemas urbanos y periurbanos, impulsando la
          sostenibilidad a través de la agricultura urbana y la economía circular.
        </p>

        {/* Sección misión con logo a la izquierda */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
          <img
            src="/logo1.png"
            alt="Logo Fundación Eco Entre Nubes"
            className="w-36 h-36 object-contain rounded-full shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Promover procesos ambientales y sociales que mejoren la calidad de
              vida, conecten a la comunidad con la naturaleza y fortalezcan la
              seguridad alimentaria.
            </p>
          </div>
        </div>

        {/* Sección actividades con logo a la derecha */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Qué Hacemos
            </h2>
            <ul className="list-disc text-left text-gray-700 pl-6 space-y-2">
              <li>Compostaje y aprovechamiento de residuos orgánicos.</li>
              <li>Agricultura urbana, agroforestería y biodiversidad.</li>
              <li>Educación y sensibilización ambiental para comunidades.</li>
              <li>Proyectos de bonos de carbono y trazabilidad digital.</li>
              <li>
                Producción y comercialización de abonos y alimentos sostenibles.
              </li>
            </ul>
          </div>
          <img
            src="/logo2.png"
            alt="Logo Alternativo Fundación Eco Entre Nubes"
            className="w-36 h-36 object-contain rounded-full shadow-md"
          />
        </div>

        {/* Video */}
        <div className="my-12">
          <video
            width="100%"
            controls
            className="rounded-xl shadow-lg border-4 border-green-200"
          >
            <source src="Render.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>

        {/* Botón de registro */}
        <div className="mt-6 mb-16">
          <button
            onClick={() => navigate("/Formulario")}
            className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105"
          >
            REGISTRATE
          </button>
        </div>

        <p className="text-gray-600 italic mt-12">
          🌱 Transparencia, sostenibilidad e innovación para un futuro en
          armonía con la naturaleza.
        </p>
      </div>
    </div>
  );
}

export default Home;