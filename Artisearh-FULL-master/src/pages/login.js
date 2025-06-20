import React, { useState } from "react";
import Layout from "../../components/layout";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

// Definir la mutación para autenticar usuario
const AUTENTICAR_USUARIO_MUTATION = gql`
  mutation autenticarUsuario($input: AutenticarInput!) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO_MUTATION);
  const router = useRouter();

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: { email, password },
        },
      });

      // Guardar el token en localStorage
      localStorage.setItem("token", data.autenticarUsuario.token);

      // Redirigir al usuario a la página principal o a otra página
      router.push("/"); // Cambia la URL según la lógica de tu aplicación
    } catch (error) {
      setError("Credenciales incorrectas");
      console.error("Error de autenticación:", error);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-8 px-4">
  <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-orange-300">
    
    {/* CENTRAR ESTA CAJA */}
    <div className="w-full flex justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">Inicio de Sesión para Usuarios</h1>
        
        <a href="/loginArt" className="block text-center font-bold text-purple-700 mb-6 underline">
          ¿Tienes una Cuenta de artista?
        </a>

        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded shadow-md px-8 pb-8 mb-4"
        >
          <div className="mb-4 mt-4">
            <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Email usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value.toUpperCase())}
            />
          </div>

          <div className="mb-6">
            <label className="block text-black-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Password usuario"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}

          <input
            type="submit"
            className="bg-orange-600 w-full mt-5 p-2 text-white uppercase hover:bg-orange-800"
            value="Iniciar sesión"
          />
        </form>

        <div className="text-center mt-4 space-y-2">
          <a href="/nuevaCuenta" className="text-orange-600 hover:text-orange-800 font-bold block">
            ¿No tienes cuenta?
          </a>
          <a href="/recuperarPassword" className="text-orange-600 hover:text-orange-800 font-bold block">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
