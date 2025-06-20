import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

const OBTENER_CONTRATOS_USUARIO = gql`
  query ObtenerContratoUser($token: String!) {
    obtenerContratoUser(token: $token) {
      id
      artista
      fechaInicio
      fechaFin
      fechaEstimadaFin
      detalles
      estado
      monto
    }
  }
`;

const OBTENER_CONTRATOS_ARTISTA = gql`
  query ObtenerContrato($token: String!) {
    obtenerContrato(token: $token) {
      id
      usuario
      fechaInicio
      fechaFin
      fechaEstimadaFin
      detalles
      estado
      monto
    }
  }
`;

const contratos = () => {
  const [token, setToken] = useState(null);
  const [tipo, setTipo] = useState(null);
  const router = useRouter();

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

  const {
    data: dataUsuario,
    loading: loadingUsuario,
    error: errorUsuario,
  } = useQuery(OBTENER_CONTRATOS_USUARIO, {
    variables: { token },
    skip: !token || tipo !== "usuario",
  });

  const {
    data: dataArtista,
    loading: loadingArtista,
    error: errorArtista,
  } = useQuery(OBTENER_CONTRATOS_ARTISTA, {
    variables: { token },
    skip: !token || tipo !== "artista",
  });

  if (!token) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
            <h2 className="text-3xl font-extrabold text-orange-600 mb-4">Contratos</h2>
            <p className="text-gray-700">Debes iniciar sesión para ver tus contratos.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if ((tipo === "usuario" && loadingUsuario) || (tipo === "artista" && loadingArtista)) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
            <h2 className="text-3xl font-extrabold text-orange-600 mb-4">Contratos</h2>
            <p className="text-gray-700">Cargando contratos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if ((tipo === "usuario" && errorUsuario) || (tipo === "artista" && errorArtista)) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
            <h2 className="text-3xl font-extrabold text-orange-600 mb-4">Contratos</h2>
            <p className="text-red-500">Error al cargar contratos.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const contratos =
    tipo === "usuario"
      ? dataUsuario?.obtenerContratoUser || []
      : dataArtista?.obtenerContrato || [];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-extrabold text-orange-600">Mis Contratos</h2>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-xl shadow transition-all"
              onClick={() => router.push("./nuevoContrato")}
            >
              Nuevo contrato
            </button>
          </div>
          {contratos.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <p className="text-gray-600 text-lg">No tienes contratos registrados.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {contratos.map((contrato) => (
                <div
                  key={contrato.id}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-orange-400"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <span className="text-orange-600 font-bold text-lg">
                      {contrato.estado}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {contrato.fechaInicio
                        ? `Inicio: ${new Date(contrato.fechaInicio).toLocaleDateString()}`
                        : "Sin fecha de inicio"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">Monto:</span>{" "}
                    <span className="text-gray-900">${contrato.monto}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">Detalles:</span>{" "}
                    <span className="text-gray-700">{contrato.detalles}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">
                      Fecha estimada fin:
                    </span>{" "}
                    <span className="text-gray-700">
                      {contrato.fechaEstimadaFin
                        ? new Date(contrato.fechaEstimadaFin).toLocaleDateString()
                        : "No definida"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      {tipo === "usuario" ? "Artista" : "Usuario"}:
                    </span>{" "}
                    <span className="text-gray-700">
                      {tipo === "usuario" ? contrato.artista : contrato.usuario}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default contratos