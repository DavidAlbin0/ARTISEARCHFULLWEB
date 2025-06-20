import React, { useState } from "react";
import Layout from "../../components/layout";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

// Mutación para autenticar al artista — fijarse en el input correcto
const AUTENTICAR_ARTISTA_MUTATION = gql`
  mutation autenticarArtista($input: AutenticArtistaInput!) {
    autenticarArtista(input: $input) {
      token
    }
  }
`;

const LoginArtista = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [autenticarArtista, { loading }] = useMutation(
    AUTENTICAR_ARTISTA_MUTATION,
    {
      onError(err) {
        console.error("Error de autenticación del artista:", err);
        console.log("graphQLErrors:", err.graphQLErrors);
        console.log("networkError:", err.networkError);
        console.log("message:", err.message);
        setError("Credenciales incorrectas o el artista no existe.");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1) Eliminar cualquier token previo
    localStorage.removeItem("tokenArtista");

    try {
      // 2) Lanzar la mutación
      const resp = await autenticarArtista({
        variables: { input: { email, password } },
      });
      console.log("Respuesta completa de login:", resp);

      // 3) Extraer token
      const token = resp?.data?.autenticarArtista?.token;
      console.log("Token obtenido:", token);

      if (token) {
        // 4) Guardar y redirigir
        localStorage.setItem("token", token);
        router.push("/"); // o a tu dashboard, según necesites
      } else {
        setError("Ocurrio un error al autenticar al artista.", err.graphQLErrors);

        console.error("Error de autenticación del artista:", err);
        console.log("graphQLErrors:", err.graphQLErrors);
        console.log("networkError:", err.networkError);
        console.log("message:", err.message);
        setError("Credenciales incorrectas");
      }
    } catch {
      // onError de useMutation ya cubre el setError
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-8 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-orange-300">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">
              Inisio de Secion para Artistas
            </h1>

            <a
              href="/login"
              className="block text-center font-bold text-purple-700 mb-6 underline"
            >
              ¿Tienes una Cuenta de Usuario normal?
            </a>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded shadow-md px-8 pb-8 mb-4"
            >
              <div className="mb-4 mt-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email artista"
                  className="bg-white shadow border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toUpperCase())}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password artista"
                  className="bg-white shadow border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white uppercase rounded ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-800"
                }`}
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>

              <div className="text-center mt-4 space-y-2">
                <a
                  href="/nuevaCuentaArt"
                  className="text-orange-600 hover:text-orange-800 font-bold block"
                >
                  ¿No tienes cuenta?
                </a>
                <a
                  href="/recuperarPassword"
                  className="text-orange-600 hover:text-orange-800 font-bold block"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginArtista;
