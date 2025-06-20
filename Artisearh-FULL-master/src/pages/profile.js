import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Layout from "../../components/layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const OBTENER_DATOS = gql`
  query ObtenerDatos($token: String!) {
    obtenerArtista(token: $token) {
      id
      nombreArtistico
      nombre
      apellidoP
      apellidoM
      genero
      email
      creado
      telefono
      ubicacion
      descripcion
      especialidad
      estado
      imagen
    }
    obtenerPost(token: $token) {
      titulo
      descripcion
      imagen
      fechaPublicacion
      ubicacion
    }
  }
`;

const ACTUALIZAR_ARTISTA = gql`
  mutation actualizarArtista($id: ID, $input: ArtistaInput) {
    actualizarArtista(id: $id, input: $input) {
      id
      email
      telefono
      descripcion
      especialidad
    }
  }
`;

const OBTENER_IMAGEN_PERFIL = gql`
  query ObtenerImagenArtista($obtenerImagenArtistaId: ID!) {
    obtenerImagenArtista(id: $obtenerImagenArtistaId)
  }
`;

const OBTENER_USUARIO = gql`
  query ObtenerUsuario($token: String!) {
    obtenerUsuario(token: $token) {
      id
      nombre
      apellidoP
      apellidoM
      email
      telefono
    }
  }
`;

const NUEVO_POST = gql`
  mutation NuevoPost($input: PostInput) {
    nuevoPost(input: $input) {
      id
      titulo
      descripcion
      imagen
      fechaPublicacion
      ubicacion
    }
  }
`;

export default function Profile() {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imagenPerfilBase64, setImagenPerfilBase64] = useState(null);

  const { data, loading, error } = useQuery(OBTENER_DATOS, {
    variables: { token },
    skip: !token || !isReady,
  });

  const {
    data: dataS,
    loading: loadingS,
    error: errorS,
  } = useQuery(OBTENER_USUARIO, {
    variables: { token },
    skip: !token || !isReady,
  });

  const handleImagenPerfilChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result es "data:image/xxx;base64,AAA..."
        // Separamos para guardar solo la parte base64 sin "data:image/...;base64,"
        const base64String = reader.result.split(",")[1];
        setImagenPerfilBase64(base64String);
        setEditMode(true); // Activar el formulario de edición
      };
      reader.readAsDataURL(file);
    }
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    estado: "",
  });

  const [perfilEditable, setPerfilEditable] = useState({
    email: "",
    telefono: "",
    descripcion: "",
    especialidad: "",
    estado: "",
  });

  const artista = data?.obtenerArtista;

  // Cuando `artista` se carga, actualiza el estado
  useEffect(() => {
    if (artista) {
      setPerfilEditable({
        email: artista.email || "",
        telefono: artista.telefono || "",
        descripcion: artista.descripcion || "",
        especialidad: artista.especialidad || "",
      });
    }
  }, [artista]);

  const [mensaje, setMensaje] = useState("");
  const [errorActualizar, setErrorActualizar] = useState("");

  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfilEditable((prev) => ({ ...prev, [name]: value }));
  };

  const [actualizarArtista, { loading: loadingActualizar }] = useMutation(
    gql`
      mutation actualizarArtista($id: ID, $input: ArtistaInput) {
        actualizarArtista(id: $id, input: $input) {
          id
          email
          telefono
          descripcion
          especialidad
          estado
        }
      }
    `,
    {
      onCompleted(data) {
        setMensaje("Perfil actualizado con éxito");
        setErrorActualizar("");
      },
      onError(err) {
        setErrorActualizar(err.message);
        setMensaje("");
      },
    }
  );

  const handleActualizarPerfil = () => {
    if (!artista?.id) return;
    const inputData = {
      email: perfilEditable.email.toUpperCase(),
      telefono: perfilEditable.telefono,
      descripcion: perfilEditable.descripcion.toUpperCase(),
      especialidad: perfilEditable.especialidad.toUpperCase(),
      estado: perfilEditable.estado.toUpperCase(),
    };
    if (imagenPerfilBase64) {
      inputData.imagen = imagenPerfilBase64; // agregar imagen solo si hay cambio
    }
    actualizarArtista({
      variables: {
        id: artista.id,
        input: inputData,
      },
    });
  };

  const MapClientOnly = dynamic(
    () => import("../../components/MapClientOnly"),
    {
      ssr: false,
    }
  );

  const { data: imagenData, loading: imagenLoading } = useQuery(
    OBTENER_IMAGEN_PERFIL,
    {
      variables: { obtenerImagenArtistaId: data?.obtenerArtista?.id },
      skip: !data?.obtenerArtista?.id,
    }
  );

  const [nuevoPost, { data: nuevoPostData, error: nuevoPostError }] =
    useMutation(NUEVO_POST);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
      setIsReady(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error obteniendo la ubicación:", error);
          }
        );
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1];
        setFormData({ ...formData, imagen: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.titulo || !formData.descripcion) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (formData.titulo.length > 64) {
      alert("El título no puede tener más de 32 caracteres.");
      return;
    }
    if (formData.descripcion.length > 64) {
      alert("La descripción no puede tener más de 128 caracteres.");
      return;
    }
    if (!formData.imagen) {
      alert("Debes seleccionar una imagen para el post.");
      return;
    }

    try {
      const postInput = {
        artista: data?.obtenerArtista?.id,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        imagen: formData.imagen,
        fechaPublicacion: new Date().toISOString(),
        ubicacion: location
          ? `${location.lat},${location.lon}`
          : "Ubicación no disponible",
      };

      await nuevoPost({
        variables: {
          input: postInput,
        },
      });
      setIsFormVisible(false);
      window.location.reload();
    } catch (err) {
      console.error("Error al crear el post:", err);
      alert("Ocurrió un error al crear el post.");
    }
  };

  const router = useRouter();
  const [tipo, setTipo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setTipo(payload.nombreArtistico ? "artista" : "usuario");
      } catch {
        setTipo(null);
      }
    }
  }, []);

  if (loadingS)
    return <p className="text-center text-black">Cargando usuario...</p>;

  if (errorS) {
    return (
      <p className="text-center text-red-600">
        Error usuario: {errorS.message}
      </p>
    );
  }

  if (loading)
    return <p className="text-center text-black">Cargando datos...</p>;

  if (error) {
    if (
      error.message.includes("not authenticated") ||
      error.message.includes("invalid")
    ) {
      return (
        <p className="text-center text-red-600">
          Autenticación requerida. Inicia sesión.
        </p>
      );
    }
    return <p className="text-center text-red-600">Error: {error.message}</p>;
  }

  const usuario = dataS?.obtenerUsuario;
  const posts = data?.obtenerPost || [];

  const getImageSrc = (imagen) =>
    imagen && imagen.startsWith("data:image")
      ? imagen
      : `data:image/jpeg;base64,${imagen}`;

  if (!token) {
    return (
      <Layout>
        <div className="p-8 bg-orange-400 text-black">
          <h1 className="text-3xl font-semibold">Autenticación requerida</h1>
          <p className="mt-4">
            Solo los artistas tienen acceso a esta pestaña.
          </p>
          <p className="mt-4">
            Inicie sesion como artista o cree uan cuenta de artista
          </p>
          <p></p>
        </div>
      </Layout>
    );
  }

  if (token && artista?.nombreArtistico === null) {
    return (
      <Layout>
        <div className="p-8 bg-orange-400 min-h-screen text-black">
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-orange-700">
              Perfil de {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
            </h1>

            <div className="text-lg space-y-2 mb-8">
              <p>
                <span className="font-semibold text-orange-700">Email:</span>{" "}
                {usuario.email}
              </p>
              <p>
                <span className="font-semibold text-orange-700">Teléfono:</span>{" "}
                {usuario.telefono}
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-black">Opciones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={() => router.push("/nuevoContrato")}
              >
                Nuevo contrato
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={() => router.push("/contratos")}
              >
                Historial de contratos
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={() => router.push("//misCalificaciones")}
              >
                Comentarios y calificaciones
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-orange-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-black mb-8">
            {artista
              ? `Perfil de ${artista.nombreArtistico}`
              : "Perfil del artista"}
          </h1>

          <div className="relative bg-white rounded-xl shadow-xl p-6 grid md:grid-cols-3 gap-6 items-center">
            {/* Botón de edición */}
            <button
              onClick={() => setEditMode(true)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 text-sm rounded-lg shadow transition flex items-center gap-2"
            >
              ✏️ Editar perfil
            </button>

            <div className="flex flex-col items-center">
              {/* Imagen y overlay */}
              <div className="relative group w-40 h-40">
                <div
                  className="w-40 h-40 bg-cover bg-center rounded-full shadow-md border-4 border-orange-300"
                  style={{
                    backgroundImage: `url(data:image/jpeg;base64,${
                      imagenPerfilBase64 ||
                      imagenData?.obtenerImagenArtista ||
                      ""
                    })`,
                  }}
                ></div>

                <div
                  className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() =>
                    document.getElementById("inputImagenPerfil").click()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5h2m-1 1v2m0 10v2m-1-1h2m-3.5-6.5l7-7 2 2-7 7-2-2z"
                    />
                  </svg>
                </div>

                <input
                  type="file"
                  id="inputImagenPerfil"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagenPerfilChange}
                />
              </div>

              {/* 🔶 Mensaje de advertencia si está en modo edición */}
              {editMode && (
                <p className="text-orange-500 mt-2 text-sm text-center">
                  Has cambiado tu foto. No olvides guardar los cambios.
                </p>
              )}
            </div>

            <div className="md:col-span-2 text-black space-y-3">
              <div>
                <span className="font-semibold text-orange-700">Nombre:</span>{" "}
                {artista.nombre} {artista.apellidoP} {artista.apellidoM}
              </div>
              <div>
                <span className="font-semibold text-orange-700">
                  Descripción:
                </span>{" "}
                {artista.descripcion}
              </div>
              <div>
                <span className="font-semibold text-orange-700">
                  Especialidad:
                </span>{" "}
                {artista.especialidad}
              </div>
              <div>
                <span className="font-semibold text-orange-700">Teléfono:</span>{" "}
                {artista.telefono}
              </div>
              <div>
                <span className="font-semibold text-orange-700">Email:</span>{" "}
                {artista.email}
              </div>
              <div>
                <span className="font-semibold text-orange-700">Estado:</span>{" "}
                <span
                  className={
                    artista.estado === "ACTIVO"
                      ? "text-green-600 font-bold"
                      : artista.estado === "PAUSADO"
                      ? "text-yellow-600 font-bold"
                      : artista.estado === "INACTIVO"
                      ? "text-red-600 font-bold"
                      : "text-gray-600"
                  }
                >
                  {artista.estado}
                </span>
              </div>
            </div>
          </div>
          {editMode && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-black mb-4">
                Editar Perfil
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  // Validación simple
                  if (
                    !perfilEditable.email ||
                    !/\S+@\S+\.\S+/.test(perfilEditable.email)
                  ) {
                    alert("Por favor ingresa un correo válido.");
                    return;
                  }

                  if (!/^\d{10}$/.test(perfilEditable.telefono)) {
                    alert(
                      "El teléfono debe tener exactamente 10 dígitos numéricos."
                    );
                    return;
                  }

                  if (perfilEditable.descripcion.length > 64) {
                    alert(
                      "La descripción no puede tener más de 64 caracteres."
                    );
                    return;
                  }

                  if (!perfilEditable.estado) {
                    alert("Por favor selecciona un estado.");
                    return;
                  }

                  if (
                    confirm("¿Estás seguro de que deseas guardar los cambios?")
                  ) {
                    handleActualizarPerfil();
                    setEditMode(false);
                  }
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-black font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={perfilEditable.email}
                      onChange={handlePerfilChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-black font-semibold">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={perfilEditable.telefono}
                      onChange={handlePerfilChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      maxLength={10}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-black font-semibold">
                      Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      value={perfilEditable.descripcion}
                      onChange={handlePerfilChange}
                      maxLength={64}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {perfilEditable.descripcion.length}/64 caracteres
                    </p>
                  </div>
                  <div>
                    <label className="block text-black font-semibold">
                      Especialidad
                    </label>
                    <input
                      type="text"
                      name="especialidad"
                      value={perfilEditable.especialidad}
                      onChange={handlePerfilChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-black font-semibold">
                      Estado
                    </label>
                    <select
                      name="estado"
                      value={perfilEditable.estado}
                      onChange={handlePerfilChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Selecciona un estado</option>
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="PAUSADO">PAUSADO</option>
                      <option value="INACTIVO">INACTIVO</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="bg-red-600 hover:underline text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500 "
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500 transition"
            >
              Crear nuevo post
            </button>
          </div>

          {isFormVisible && (
            <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-black">
                Crear un nuevo post
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="titulo"
                    className="block font-semibold text-black mb-1"
                  >
                    Título
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="descripcion"
                    className="block font-semibold text-black mb-1"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="imagen"
                    className="block font-semibold text-black mb-1"
                  >
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-500 transition"
                  >
                    Crear Post
                  </button>
                </div>
              </form>
            </div>
          )}

          <hr className="my-10 border-orange-300" />

          <h2 className="text-2xl font-bold text-black mb-6">
            Mis publicaciones
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-black">Aún no has publicado nada.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={getImageSrc(post.imagen)}
                    alt="Imagen del post"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-black">
                    <h3 className="text-xl font-semibold mb-2">
                      {post.titulo}
                    </h3>
                    <p className="text-gray-700 mb-2">{post.descripcion}</p>
                    <p className="text-sm text-gray-500">
                      Publicado el:{" "}
                      {new Date(post.fechaPublicacion).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tipo === "usuario" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={() => router.push("/nuevoContrato")}
              >
                Nuevo contrato
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={() => router.push("/contratos")}
              >
                Historial contrato
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={() => router.push("/calificaciones")}
              >
                Calificaciones y comentarios
              </button>
            </div>
          )}
          {location && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-black mb-4">
                Mi Ubicación Actual
              </h3>
              <MapClientOnly location={location} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
