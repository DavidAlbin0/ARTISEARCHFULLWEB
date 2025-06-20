import Head from "next/head";
import Layout from "../../components/layout";
import React, { useEffect } from 'react';

export const CerrarSesion = () => {
  useEffect(() => {
    // Eliminar el token del localStorage al entrar en la página
    localStorage.removeItem("token");
    // También podrías hacer: localStorage.setItem("token", null);
  }, []);

  return (
    <div>
      <Layout>
        <h2>Sesión cerrada</h2>
      </Layout>
    </div>
  );
};

export default CerrarSesion;
