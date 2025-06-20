import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import dynamic from "next/dynamic";

const OBTENER_ARTISTA_CLICK = gql`
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
      imagen
      latitud
      longitud
    }
  }
`;

const OBTENER_POST_CLICK = gql`
  query obtenerPostsClick($artista: ID!) {
    obtenerPostsClick(artista: $artista) {
      id
      artista
      titulo
      descripcion
      imagen
      fechaPublicacion
      ubicacion
    }
  }
`;

const MapClientOnly = dynamic(
  () => import("../../../components/MapClientOnly"),
  { ssr: false }
);

const ArtistaProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setUserLocation(null);
        }
      );
    }
  }, []);

  // Mueve los hooks aquí, siempre se ejecutan
  const { loading, error, data } = useQuery(OBTENER_ARTISTA_CLICK, {
    variables: { id },
    skip: !id,
  });

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(OBTENER_POST_CLICK, {
    variables: { artista: id },
    skip: !id,
  });

  // Ahora solo condiciona el render, no los hooks
  if (!id || loading || postsLoading)
    return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (postsError)
    return (
      <p className="text-center text-red-500">
        Error loading posts: {postsError.message}
      </p>
    );

  return (
    <Layout>
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 min-h-screen py-6">
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
          <div className="flex items-center space-x-4">
            <div
              className="w-24 h-24 bg-cover rounded-full shadow-lg flex-shrink-0"
              style={{
                backgroundImage: `url(data:image/jpeg;base64,${data.obtenerArtistaClick.imagen})`,
              }}
            />
            <div>
              {data?.obtenerArtistaClick?.nombreArtistico && (
                <h1 className="text-5xl font-extrabold text-orange-600 mb-2">
                  {data.obtenerArtistaClick.nombreArtistico}
                </h1>
              )}

              <p className="text-lg text-orange-600">
                {data.obtenerArtistaClick.especialidad}
              </p>
            </div>
          </div>

          <div className="mt-6 text-gray-800 space-y-4">
            <p>
              <span className="font-semibold">Apellido:</span>{" "}
              {data.obtenerArtistaClick.nombre +
                " " +
                data.obtenerArtistaClick.apellidoP +
                " " +
                data.obtenerArtistaClick.apellidoM}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {data.obtenerArtistaClick.email}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span>{" "}
              {data.obtenerArtistaClick.telefono}
            </p>
            <p>
              <span className="font-semibold">Ubicación:</span>{" "}
              {data.obtenerArtistaClick.ubicacion || "No disponible"}
            </p>
            <p>
              <span className="font-semibold">Descripción:</span>{" "}
              {data.obtenerArtistaClick.descripcion || "No disponible"}
            </p>
            <p>
              <span className="font-semibold">id:</span>{" "}
              {data.obtenerArtistaClick.id}
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-orange-600 mb-4">
              Posts de {data.obtenerArtistaClick.nombreArtistico}
            </h2>
            {postsData.obtenerPostsClick.length === 0 ? (
              <p className="text-center text-gray-500">
                No hay posts disponibles
              </p>
            ) : (
              <div className="space-y-6">
                {postsData.obtenerPostsClick.map((post) => (
                  <div
                    key={post.id}
                    className="bg-orange-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {post.titulo}
                    </h3>
                    {post.imagen && (
                      <img
                        src={`data:image/jpeg;base64,${post.imagen}`}
                        alt={post.titulo}
                        className="mt-4 w-full h-64 object-cover rounded-lg shadow-md"
                      />
                    )}
                    <p className="mt-4 text-gray-700">{post.descripcion}</p>
                    <p className="mt-2 text-gray-500 text-sm">
                      Publicado el{" "}
                      {new Date(post.fechaPublicacion).toLocaleDateString()}
                    </p>
                    <p className="mt-1 text-gray-500 text-sm">
                      Ubicación: {post.ubicacion || "No disponible"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {data.obtenerArtistaClick.latitud &&
            data.obtenerArtistaClick.longitud &&
            userLocation && (
              <div className="my-8">
                <h3 className="text-xl font-bold mb-2 text-orange-700">
                  Ubicación en el mapa
                </h3>
                <MapClientOnly
                  artistaLat={parseFloat(data.obtenerArtistaClick.latitud)}
                  artistaLon={parseFloat(data.obtenerArtistaClick.longitud)}
                  userLat={userLocation.lat}
                  userLon={userLocation.lon}
                  artistaName={data.obtenerArtistaClick.nombreArtistico}
                />
                <div className="mt-2 text-gray-700">
                  Distancia:{" "}
                  {getDistanceFromLatLonInKm(
                    userLocation.lat,
                    userLocation.lon,
                    parseFloat(data.obtenerArtistaClick.latitud),
                    parseFloat(data.obtenerArtistaClick.longitud)
                  ).toFixed(2)}{" "}
                  km
                </div>
              </div>
            )}

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => alert("Iniciando chat...")} // Aquí puedes poner la función que manejará el inicio del chat
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none"
            >
              Iniciar Chat
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radio de la tierra en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default ArtistaProfile;
