import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import Head from "next/head";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { Token } from "graphql";

const QUERY = gql`
  query obtenerPostAll {
    obtenerPostAll {
      id
      artista
      imagen
      descripcion
      ubicacion
    }
  }
`;

const OBTENER_IMAGEN_PERFIL = gql`
  query ObtenerImagenArtista($obtenerImagenArtistaId: ID!) {
    obtenerImagenArtista(id: $obtenerImagenArtistaId)
  }
`;

const ARTISTA = gql`
  query obtenerArtistaClick($id: ID!) {
    obtenerArtistaClick(id: $id) {
      id
      nombreArtistico
      nombre
      apellidoP
      apellidoM
      genero
      email
      telefono
      ubicacion
      descripcion
      especialidad
    }
  }
`;

const OBTENER_ARTISTA = gql`
  query obtenerArtista($token: String!) {
    obtenerArtista(token: $token) {
      id
    }
  }
`;

const ACTUALIZAR_LOCALIZACION = gql`
  mutation ActualizarLocalizacion($id: ID!, $latitud: Float!, $longitud: Float!) {
    actualizarLocalizacion(id: $id, latitud: $latitud, longitud: $longitud) {
      id
      latitud
      longitud
    }
  }
`;

const ArtistaNombre = ({ id }) => {
  const { data, loading, error } = useQuery(ARTISTA, { variables: { id } });

  if (loading)
    return <p className="text-sm text-gray-400">Cargando artista...</p>;
  if (error)
    return <p className="text-sm text-red-500">Error al cargar artista</p>;

  return (
    <p className="text-sm text-gray-500 mt-1 italic">
      {data.obtenerArtistaClick.nombre} {data.obtenerArtistaClick.apellidoP}
    </p>
  );
};

const Index = () => {
  const { data, loading, error } = useQuery(QUERY);
  const [actualizarLocalizacion] = useMutation(ACTUALIZAR_LOCALIZACION);
  const [getArtista, { data: artistaData }] = useLazyQuery(OBTENER_ARTISTA);
  const [selectedPost, setSelectedPost] = useState(null);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!selectedPost) return;

    const isLiked = localStorage.getItem(`liked-${selectedPost.id}`);
    setLiked(isLiked === "true");
  }, [selectedPost]);

  const handleLike = () => {
    if (!selectedPost) return;

    const newValue = !liked;
    localStorage.setItem(`liked-${selectedPost.id}`, newValue);
    setLiked(newValue);
  };

  function PostCard({ postId }) {
    useEffect(() => {
      const isLiked = localStorage.getItem(`liked-${postId}`);
      setLiked(isLiked === "true");
    }, [postId]);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("Token encontrado:", storedToken);
      setToken(storedToken);
      getArtista({ variables: { token: storedToken } });
    } else {
      console.log("No se encontró el token");
    }
  }, [getArtista]);

  useEffect(() => {
    if (!artistaData || !artistaData.obtenerArtista) return;

    const artistaId = artistaData.obtenerArtista.id;
    if (!artistaId) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          actualizarLocalizacion({
            variables: {
              id: artistaId,
              latitud: position.coords.latitude,
              longitud: position.coords.longitude,
            },
          });
        },
        (error) => {
          // Si no da permiso, no pasa nada
          console.log("No se pudo obtener ubicación:", error.message);
        }
      );
    }
  }, [artistaData, actualizarLocalizacion]);

  if (loading)
    return (
      <p className="text-center text-blue-500 mt-6">
        Cargando publicaciones...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-6">
        Error al cargar publicaciones: {error.message}
      </p>
    );

  return (
    <Layout>
      <Head>
        <title>Publicaciones</title>
      </Head>

      {/* CONTENEDOR FLEX PRINCIPAL */}
      <div className="flex flex-col w-full min-h-screen px-4 py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Publicaciones {Token}
        </h1>

        {/* Grid que se expande automáticamente */}
        <div
          className="grid gap-6 p-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {data.obtenerPostAll.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={`data:image/jpeg;base64,${post.imagen}`}
                alt={post.descripcion}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <ArtistaNombre id={post.artista} />
              <h3 className="text-xl font-semibold text-gray-700">
                {post.descripcion}
              </h3>
              <p className="text-gray-600 truncate">{post.descripcion}</p>
              <p className="text-sm text-gray-500 mt-1 italic">
                {post.ubicacion}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-lg">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow transition-all"
              onClick={() => {
                router.push(`/artistaProfile/${selectedPost.artista}`);
              }}
            >
              👤 Ver perfil
            </button>

            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => setSelectedPost(null)}
            >
              &times;
            </button>
            <img
              src={`data:image/jpeg;base64,${selectedPost.imagen}`}
              alt={selectedPost.descripcion}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedPost.descripcion}
            </h2>
            <p className="text-gray-700 mb-2">{selectedPost.descripcion}</p>
            <p className="text-sm text-gray-500 italic">
              {selectedPost.ubicacion}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  handleLike();
                  setAnimate(true); // activa la animación
                }}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow transition-all 
                  ${animate ? "scale-125 shadow-xl" : "scale-100"}
                `}
                onAnimationEnd={() => setAnimate(false)} // limpia animación al terminar
              >
                {liked ? "💔" : "❤️"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
