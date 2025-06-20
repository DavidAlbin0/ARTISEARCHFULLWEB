import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Layout from "../../components/layout";

const OBTENER_ARTISTAS = gql`
  query ObtenerArtistaBusqueda {
    obtenerArtistaBusqueda {
      id
      nombreArtistico
      nombre
      apellidoP
      imagen
      especialidad
      descripcion
    }
  }
`;

const OBTENER_CALIFICACIONES = gql`
  query ObtenerCalificaciones($id: ID!, $token: String!) {
    obtenerCalificaciones(id: $id, token: $token) {
      id
      calif
      comentario
      usuario
    }
    promedioCalif(id: $id, token: $token)
  }
`;

const NUEVA_CALIFICACION = gql`
  mutation NuevaCalificacion($input: CalificacionInput!) {
    nuevaCalificacion(input: $input) {
      id
      calif
      comentario
      usuario
      artista
      imagen
    }
  }
`;

const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    } else if (value >= i - 0.5) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">☆</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300 text-xl">★</span>);
    }
  }
  return <span>{stars}</span>;
};

const StarRatingInput = ({ value, onChange }) => (
  <div className="flex flex-row-reverse justify-end">
    {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((star) => (
      <label key={star} className="cursor-pointer text-2xl text-yellow-400">
        <input
          type="radio"
          name="rating"
          value={star}
          checked={value === star}
          onChange={() => onChange(star)}
          className="hidden"
        />
        {star % 1 === 0 ? "★" : "☆"}
      </label>
    ))}
  </div>
);

const Calificaciones = () => {
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(null);

  // Obtener token y usuario
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  let idUsuario = "";
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setTipoUsuario(payload.nombreArtistico ? "artista" : "usuario");
        idUsuario = payload.id;
      } catch {
        setTipoUsuario(null);
      }
    }
  }, [token]);

  // Traer todos los artistas
  const { data: dataArtistas, loading: loadingArtistas } = useQuery(OBTENER_ARTISTAS);

  // Traer calificaciones del artista seleccionado
  const { data: dataCalif, loading: loadingCalif, refetch: refetchCalif } = useQuery(OBTENER_CALIFICACIONES, {
    variables: { id: artistaSeleccionado?.id || "", token: token || "" },
    skip: !artistaSeleccionado || !token,
  });

  const [nuevaCalificacion] = useMutation(NUEVA_CALIFICACION);

  const handleCalificar = async () => {
    setError("");
    setMensaje("");
    let userId = "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id;
    } catch {}
    if (!userId || !token) {
      setError("Debes iniciar sesión para calificar.");
      return;
    }
    if (!artistaSeleccionado?.id) {
      setError("Selecciona un artista.");
      return;
    }
    if (!rating || rating < 0.5 || rating > 5) {
      setError("La calificación debe ser entre 0.5 y 5.");
      return;
    }
    try {
      await nuevaCalificacion({
        variables: {
          input: {
            usuario: userId,
            artista: artistaSeleccionado.id,
            calif: rating,
            comentario,
            imagen: "",
            token,
          },
        },
      });
      setMensaje("¡Calificación enviada!");
      setRating(0);
      setComentario("");
      refetchCalif();
    } catch (err) {
      setError("Error al enviar calificación.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-gray-100 py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
            Calificaciones de Artistas
          </h2>
          {loadingArtistas ? (
            <p className="text-center text-gray-500">Cargando artistas...</p>
          ) : (
            <div className="grid gap-6">
              {!artistaSeleccionado ? (
                dataArtistas?.obtenerArtistaBusqueda?.length > 0 ? (
                  dataArtistas.obtenerArtistaBusqueda.map((artista) => (
                    <div
                      key={artista.id}
                      className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-4 border-l-8 border-orange-400 cursor-pointer hover:bg-orange-50 transition"
                      onClick={() => setArtistaSeleccionado(artista)}
                    >
                      <img
                        src={
                          artista.imagen
                            ? `data:image/jpeg;base64,${artista.imagen}`
                            : "/user.png"
                        }
                        alt="perfil"
                        className="w-24 h-24 rounded-full object-cover border-2 border-orange-300"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-orange-700">
                          {artista.nombreArtistico || artista.nombre} {artista.apellidoP || ""}
                        </h3>
                        <p className="text-gray-700">{artista.especialidad}</p>
                        <p className="text-gray-600">{artista.descripcion}</p>
                        <div className="flex items-center mt-2">
                          <StarRating value={Number(artista.promedioCalificacion) || 0} />
                          <span className="ml-2 text-gray-700 font-semibold">
                            {artista.promedioCalificacion
                              ? Number(artista.promedioCalificacion).toFixed(1)
                              : "Sin calificaciones"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No hay artistas registrados.</p>
                )
              ) : (
                <div>
                  <button
                    className="mb-4 text-orange-600 hover:underline"
                    onClick={() => setArtistaSeleccionado(null)}
                  >
                    ← Volver a la lista de artistas
                  </button>
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-4 border-l-8 border-orange-400">
                    <img
                      src={
                        artistaSeleccionado.imagen
                          ? `data:image/jpeg;base64,${artistaSeleccionado.imagen}`
                          : "/user.png"
                      }
                      alt="perfil"
                      className="w-24 h-24 rounded-full object-cover border-2 border-orange-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-orange-700">
                        {artistaSeleccionado.nombreArtistico || artistaSeleccionado.nombre}{" "}
                        {artistaSeleccionado.apellidoP || ""}
                      </h3>
                      <p className="text-gray-700">{artistaSeleccionado.especialidad}</p>
                      <p className="text-gray-600">{artistaSeleccionado.descripcion}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    {loadingCalif ? (
                      <p className="text-center text-gray-500">Cargando calificaciones...</p>
                    ) : (
                      <>
                        <div className="flex items-center mb-2">
                          <StarRating value={Number(dataCalif?.promedioCalif) || 0} />
                          <span className="ml-2 text-gray-700 font-semibold">
                            {dataCalif?.promedioCalif
                              ? Number(dataCalif.promedioCalif).toFixed(1)
                              : "Sin calificaciones"}
                          </span>
                        </div>
                        {dataCalif?.obtenerCalificaciones?.length > 0 ? (
                          dataCalif.obtenerCalificaciones.map((calif) => (
                            <div key={calif.id} className="mt-2 border-t pt-2">
                              <div className="flex items-center">
                                <StarRating value={Number(calif.calif)} />
                                <span className="ml-2 text-gray-600 text-sm">
                                  {calif.usuario ? `por ${calif.usuario}` : ""}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm italic">{calif.comentario}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm mt-2">
                            Artista aún sin calificaciones
                          </p>
                        )}
                        {tipoUsuario === "usuario" && (
                          <div className="mt-6 bg-orange-50 p-4 rounded-xl shadow-inner">
                            <h4 className="font-bold text-gray-700 mb-2">Calificar</h4>
                            <StarRatingInput value={rating} onChange={setRating} />
                            <textarea
                              className="w-full border border-orange-200 rounded px-3 py-2 mt-2"
                              placeholder="Escribe un comentario (opcional)"
                              value={comentario}
                              onChange={(e) => setComentario(e.target.value)}
                            />
                            <button
                              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
                              onClick={handleCalificar}
                              disabled={rating === 0}
                              type="button"
                            >
                              Enviar calificación
                            </button>
                            {mensaje && (
                              <p className="mt-2 text-center text-sm text-green-600">{mensaje}</p>
                            )}
                            {error && (
                              <p className="mt-2 text-center text-sm text-red-600">{error}</p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Calificaciones;