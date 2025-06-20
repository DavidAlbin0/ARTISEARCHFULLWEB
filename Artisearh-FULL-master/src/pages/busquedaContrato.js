import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

const OBTENER_ARTISTAS = gql`
  query ObtenerArtistaBusqueda {
    obtenerArtistaBusqueda {
      id
      nombreArtistico
      nombre
      apellidoP
      email
      telefono
      imagen
      especialidad
      descripcion
    }
  }
`;

const OBTENER_USUARIOS = gql`
  query ObtenerUsuarioBusqueda {
    obtenerUsuarioBusqueda {
      id
      nombre
      apellidoP
      email
      telefono
      imagen
    }
  }
`;

const nuevoContrato = () => {
  const [token, setToken] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [resultados, setResultados] = useState([]);
  const router = useRouter();

  // Queries
  const [buscarArtistas, { data: dataArtistas, loading: loadingArtistas }] = useLazyQuery(OBTENER_ARTISTAS);
  const [buscarUsuarios, { data: dataUsuarios, loading: loadingUsuarios }] = useLazyQuery(OBTENER_USUARIOS);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setTipo(payload.nombreArtistico ? "artista" : "usuario");
      } catch {
        setTipo(null);
      }
    }
  }, []);

  // Ejecuta la búsqueda automáticamente al cargar la página
  useEffect(() => {
    if (tipo === "usuario") buscarArtistas();
    if (tipo === "artista") buscarUsuarios();
  }, [tipo]);

  // Filtrado en frontend
  useEffect(() => {
    if (tipo === "usuario" && dataArtistas?.obtenerArtistaBusqueda) {
      setResultados(
        dataArtistas.obtenerArtistaBusqueda.filter(
          (a) =>
            a.nombreArtistico?.toLowerCase().includes(filtro.toLowerCase()) ||
            a.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
            a.email?.toLowerCase().includes(filtro.toLowerCase()) ||
            a.telefono?.toString().includes(filtro)
        )
      );
    }
    if (tipo === "artista" && dataUsuarios?.obtenerUsuarioBusqueda) {
      setResultados(
        dataUsuarios.obtenerUsuarioBusqueda.filter(
          (u) =>
            u.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
            u.email?.toLowerCase().includes(filtro.toLowerCase()) ||
            u.telefono?.toString().includes(filtro)
        )
      );
    }
  }, [dataArtistas, dataUsuarios, filtro, tipo]);

  // Muestra todos los perfiles si no hay filtro
  useEffect(() => {
    if (tipo === "usuario" && dataArtistas?.obtenerArtistaBusqueda && filtro === "") {
      setResultados(dataArtistas.obtenerArtistaBusqueda);
    }
    if (tipo === "artista" && dataUsuarios?.obtenerUsuarioBusqueda && filtro === "") {
      setResultados(dataUsuarios.obtenerUsuarioBusqueda);
    }
  }, [dataArtistas, dataUsuarios, filtro, tipo]);

  // Función para mostrar imagen igual que en profile.js
  const getImageSrc = (imagen) =>
    imagen && imagen.startsWith("data:image")
      ? imagen
      : `data:image/jpeg;base64,${imagen}`;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
            Buscar {tipo === "usuario" ? "Artistas" : "Usuarios"}
          </h2>
          <div className="flex gap-2 mb-8">
            <input
              type="text"
              placeholder={`Buscar por nombre, correo o teléfono`}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-orange-300 shadow"
            />
          </div>
          {(loadingArtistas || loadingUsuarios) ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : (
            <div className="grid gap-6">
              {resultados.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-4 border-l-8 border-orange-400"
                >
                  <img
                    src={getImageSrc(item.imagen)}
                    alt="perfil"
                    className="w-24 h-24 rounded-full object-cover border-2 border-orange-300"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-700">
                      {item.nombreArtistico || item.nombre} {item.apellidoP || ""}
                    </h3>
                    <p className="text-gray-700">{item.email}</p>
                    <p className="text-gray-500">{item.telefono}</p>
                    {item.especialidad && (
                      <p className="text-gray-600 italic">{item.especialidad}</p>
                    )}
                    {item.descripcion && (
                      <p className="text-gray-600">{item.descripcion}</p>
                    )}
                  </div>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-lg shadow"
                    onClick={() =>
                      router.push(`./contratosDinamicos/${item.id}`)
                    }
                  >
                    Iniciar contrato
                  </button>
                </div>
              ))}
              {resultados.length === 0 && (
                <p className="text-center text-gray-500">No hay resultados.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default nuevoContrato;