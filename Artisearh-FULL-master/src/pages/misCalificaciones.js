import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

// Query para obtener datos del artista y usuario
const OBTENER_ARTISTA = gql`
  query ObtenerArtista($token: String!) {
    obtenerArtista(token: $token) {
      id
      nombreArtistico
      nombre
      email
    }
  }
`;

const OBTENER_USUARIO = gql`
  query ObtenerUsuario($token: String!) {
    obtenerUsuario(token: $token) {
      id
      nombre
      email
    }
  }
`;

// Query para obtener calificaciones del artista
const OBTENER_CALIFICACIONES = gql`
  query ObtenerCalificaciones($token: String!) {
    obtenerCalificaciones(token: $token) {
      id
      usuario
      calif
      comentario
      imagen
    }
  }
`;

export default function MisCalificaciones() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      router.push("/");
    } else {
      setToken(t);
    }
  }, []);

  // Consultar si es artista
  const { data: artistaData } = useQuery(OBTENER_ARTISTA, {
    variables: { token },
    skip: !token,
  });

  // Consultar si es usuario
  const { data: usuarioData } = useQuery(OBTENER_USUARIO, {
    variables: { token },
    skip: !token,
  });

  // Consultar calificaciones solo si es artista
  const { data: califData, loading, error } = useQuery(OBTENER_CALIFICACIONES, {
    variables: { token },
    skip: !token || !artistaData?.obtenerArtista,
  });

  useEffect(() => {
    // Si es usuario normal, redirige a index
    if (usuarioData?.obtenerUsuario && !artistaData?.obtenerArtista) {
      router.push("/");
    }
  }, [usuarioData, artistaData]);

  if (loading) return <p>Cargando calificaciones...</p>;
  if (error) return <p>Error al cargar calificaciones</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      {!califData?.obtenerCalificaciones?.length && (
        <p>No tienes calificaciones aún.</p>
      )}
      <ul>
        {califData?.obtenerCalificaciones?.map((calif) => (
          <li key={calif.id} className="mb-4 border-b pb-2">
            <div>
              <strong>Calificación:</strong> {calif.calif} / 5
            </div>
            <div>
              <strong>Comentario:</strong> {calif.comentario}
            </div>
            {calif.imagen && (
              <img
                src={
                  calif.imagen.startsWith("data:image")
                    ? calif.imagen
                    : `data:image/jpeg;base64,${calif.imagen}`
                }
                alt="Imagen de calificación"
                className="w-24 h-24 object-cover mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}