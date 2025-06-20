import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_ARTISTA_CLICK = gql`
  query obtenerArtistaClick($id: ID!) {
    obtenerArtistaClick(id: $id) {
      id
      nombre
      apellidoP
      genero
      email
      telefono
      ubicacion
      descripcion
      especialidad
      imagenPerfil
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

const ArtistaProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p className="text-center text-gray-500">Loading...</p>;

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

  if (loading || postsLoading)
    return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (postsError)
    return (
      <p className="text-center text-red-500">
        Error loading posts: {postsError.message}
      </p>
    );

  const artista = data.obtenerArtistaClick;
  const posts = postsData.obtenerPostsClick;

  return (
    <div className="bg-gradient-to-r from-orange-400 to-orange-600 min-h-screen py-6">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <div className="flex items-center space-x-4">
          <img
            src={`data:image/jpeg;base64,${artista.imagenPerfil}`}
            alt="Imagen del Artista"
            className="w-24 h-24 rounded-full shadow-lg object-cover"
          />
          <div>
            <h1 className="text-5xl font-extrabold text-orange-600 mb-2">
              {artista.nombre}
            </h1>
            <p className="text-lg text-orange-600">{artista.especialidad}</p>
          </div>
        </div>

        <div className="mt-6 text-gray-800 space-y-4">
          <p>
            <span className="font-semibold">Apellido:</span> {artista.apellidoP}
          </p>
          <p>
            <span className="font-semibold">Género:</span> {artista.genero}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {artista.email}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span> {artista.telefono}
          </p>
          <p>
            <span className="font-semibold">Ubicación:</span>{" "}
            {artista.ubicacion || "No disponible"}
          </p>
          <p>
            <span className="font-semibold">Descripción:</span>{" "}
            {artista.descripcion || "No disponible"}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">
            Posts del Artista
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay posts disponibles
            </p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-orange-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {post.titulo}
                  </h3>
                  {post.imagen && (
                    <img
                      src={post.imagen.startsWith("data:image")
                        ? post.imagen
                        : `data:image/jpeg;base64,${post.imagen}`}
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

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => alert("Iniciando chat...")}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none"
          >
            Iniciar Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistaProfile;
