import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, gql } from "@apollo/client";
import Layout from "../../../components/layout";

const NUEVO_CONTRATO = gql`
  mutation NuevoContrato($input: ContratoInput) {
    nuevoContrato(input: $input) {
      id
      estado
      monto
      detalles
      fechaEstimadaFin
      usuario
      artista
    }
  }
`;

const OBTENER_USUARIO = gql`
  query ObtenerUsuario($id: ID!) {
    obtenerUsuarioClick(id: $id) {
      id
      nombre
      apellidoP
      apellidoM
    }
  }
`;

const OBTENER_ARTISTA = gql`
  query ObtenerArtista($id: ID!) {
    obtenerArtistaClick(id: $id) {
      id
      nombre
      apellidoP
      apellidoM
      nombreArtistico
    }
  }
`;

const ContratoDinamico = () => {
  const router = useRouter();
  const { idCon } = router.query;

  const [token, setToken] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [nombreToken, setNombreToken] = useState("");
  const [nombreUrl, setNombreUrl] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [idArtista, setIdArtista] = useState("");

  const [monto, setMonto] = useState("");
  const [detalles, setDetalles] = useState("");
  const [fechaEstimada, setFechaEstimada] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nuevoContrato, { loading }] = useMutation(NUEVO_CONTRATO);

  // Decodifica el token y determina tipo e ID
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setTipo(payload.nombreArtistico ? "artista" : "usuario");
        setIdToken(payload.id);
      } catch {
        setTipo(null);
        setIdToken(null);
      }
    }
  }, []);

  // Queries para obtener los nombres
  const { data: dataUsuario } = useQuery(
    OBTENER_USUARIO,
    {
      variables: { id: tipo === "artista" ? idCon : idToken },
      skip: !idCon || !idToken || tipo === null,
    }
  );
  const { data: dataArtista } = useQuery(
    OBTENER_ARTISTA,
    {
      variables: { id: tipo === "usuario" ? idCon : idToken },
      skip: !idCon || !idToken || tipo === null,
    }
  );

  useEffect(() => {
    if (!idCon || !idToken) return;
    if (tipo === "usuario") {
      setIdUsuario(idToken);
      setIdArtista(idCon);
      if (dataUsuario?.obtenerUsuarioClick) {
        const u = dataUsuario.obtenerUsuarioClick;
        setNombreToken(""); // El usuario eres tú, puedes mostrar tu nombre desde el token si quieres
      }
      if (dataArtista?.obtenerArtistaClick) {
        const a = dataArtista.obtenerArtistaClick;
        setNombreUrl(
          a.nombreArtistico ||
            `${a.nombre} ${a.apellidoP || ""} ${a.apellidoM || ""}`
        );
      }
    }
    if (tipo === "artista") {
      setIdArtista(idToken);
      setIdUsuario(idCon);
      if (dataUsuario?.obtenerUsuarioClick) {
        const u = dataUsuario.obtenerUsuarioClick;
        setNombreUrl(
          `${u.nombre} ${u.apellidoP || ""} ${u.apellidoM || ""}`
        );
      }
      if (dataArtista?.obtenerArtistaClick) {
        const a = dataArtista.obtenerArtistaClick;
        setNombreToken(
          a.nombreArtistico ||
            `${a.nombre} ${a.apellidoP || ""} ${a.apellidoM || ""}`
        );
      }
    }
  }, [tipo, idToken, idCon, dataUsuario, dataArtista]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!idUsuario || !idArtista) {
      setMensaje("Error: Faltan datos para crear el contrato.");
      return;
    }
    let input = {
      usuario: idUsuario,
      artista: idArtista,
      monto: Number(monto),
      detalles,
      fechaEstimadaFin: fechaEstimada,
      estado: "Pendiente",
      hechoPor: {
        id: idToken,
        tipo: tipo === "usuario" ? "Usuario" : "Artista"
      }
    };
    try {
      await nuevoContrato({ variables: { input } });
      setMensaje("Contrato creado correctamente.");
      setMonto("");
      setDetalles("");
      setFechaEstimada("");
      setTimeout(() => router.push("/contratos"), 1500);
    } catch (err) {
      setMensaje("Error al crear el contrato.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 flex flex-col items-center justify-center py-10 px-2">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border-l-8 border-orange-400">
          <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
            Nuevo Contrato
          </h2>
          <div className="mb-6">
            <div className="mb-2 text-gray-700 font-semibold">
              <span className="block">
                <span className="font-bold">ID usuario:</span> {idUsuario}
              </span>
              <span className="block">
                <span className="font-bold">Nombre usuario:</span>{" "}
                {tipo === "usuario"
                  ? "(Tú)"
                  : nombreUrl}
              </span>
              <span className="block mt-2">
                <span className="font-bold">ID artista:</span> {idArtista}
              </span>
              <span className="block">
                <span className="font-bold">Nombre artista:</span>{" "}
                {tipo === "usuario"
                  ? nombreUrl
                  : nombreToken}
              </span>
            </div>
            <div className="text-orange-700 font-bold text-lg text-center mt-4">
              Contrato entre{" "}
              <span className="underline">
                {tipo === "usuario" ? "(Tú)" : nombreUrl}
              </span>{" "}
              y{" "}
              <span className="underline">
                {tipo === "usuario" ? nombreUrl : nombreToken}
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Monto</label>
              <input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
                className="w-full border border-orange-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Fecha estimada</label>
              <input
                type="date"
                placeholder="Fecha estimada"
                value={fechaEstimada}
                onChange={(e) => setFechaEstimada(e.target.value)}
                required
                className="w-full border border-orange-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Detalles del contrato</label>
              <textarea
                placeholder="Detalles del contrato"
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
                className="w-full border border-orange-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl w-full shadow transition-all"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear contrato"}
            </button>
          </form>
          {mensaje && (
            <p className={`mt-4 text-center ${mensaje.includes("correctamente") ? "text-green-600" : "text-red-500"}`}>
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ContratoDinamico;