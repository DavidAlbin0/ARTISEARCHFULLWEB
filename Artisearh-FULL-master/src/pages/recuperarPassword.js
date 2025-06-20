import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const ACTUALIZAR_PASSWORD = gql`
  mutation actualizarPassword(
    $email: String!
    $telefono: String!
    $input: PasswordInput!
  ) {
    actualizarPassword(email: $email, telefono: $telefono, input: $input)
  }
`;

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const [actualizarPassword, { loading }] = useMutation(ACTUALIZAR_PASSWORD, {
    onCompleted(data) {
      setMensaje(data.actualizarPassword);
      setError("");

      // Redirige a login después de mostrar mensaje de éxito
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    },
    onError(err) {
      setError(err.message);
      setMensaje("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !telefono || !password) {
      setError("Todos los campos son obligatorios");
      setMensaje("");
      return;
    }

    actualizarPassword({
      variables: {
        email,
        telefono,
        input: { password },
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-8 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-orange-300">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">
              Recuperar contraseña
            </h1>

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
                  className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="email"
                  type="email"
                  placeholder="Email usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="telefono"
                >
                  Teléfono
                </label>
                <input
                  className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="telefono"
                  type="text"
                  placeholder="Teléfono usuario"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Nueva contraseña
                </label>
                <input
                  className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="password"
                  type="password"
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              {mensaje && (
                <p className="text-green-500 text-xs mt-1">{mensaje}</p>
              )}

              <input
                type="submit"
                disabled={loading}
                className="bg-orange-600 w-full mt-5 p-2 text-white uppercase hover:bg-orange-800 disabled:opacity-50"
                value={loading ? "Actualizando..." : "Actualizar contraseña"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;
