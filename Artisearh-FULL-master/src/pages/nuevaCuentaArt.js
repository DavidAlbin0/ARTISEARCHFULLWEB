import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

// Mutación para crear un nuevo artista
const NUEVO_ARTISTA_MUTATION = gql`
  mutation nuevoArtista($input: ArtistaInput!) {
    nuevoArtista(input: $input) {
      id
      nombreArtistico
      nombre
      apellidoP
      apellidoM
      genero
      email
      telefono
      imagen
      ubicacion
      descripcion
      especialidad
      latitud
      longitud
    }
  }
`;

const Campo = ({
  id,
  label,
  type = "text",
  placeholder,
  values,
  handleChange,
  error,
  touched,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    {id === "genero" ? (
      <select
        id={id}
        name={id}
        value={values}
        onChange={handleChange}
        className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">SELECCIONA</option>
        <option value="M">MASCULINO</option>
        <option value="F">FEMENINO</option>
      </select>
    ) : id === "imagen" ? (
      <input
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    ) : (
      <input
        className="bg-white shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={values}
        onChange={handleChange}
      />
    )}
    {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const NuevaCuentaArt = () => {
  const [crearArtista] = useMutation(NUEVO_ARTISTA_MUTATION);
  const [imagenBase64, setImagenBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [especialidad, setEspecialidad] = useState("");
  const router = useRouter();

  // Obtener ubicación al cargar el componente
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
        },
        (error) => {
          setLatitud(null);
          setLongitud(null);
        }
      );
    }
  }, []);

  const handleUpperChange = (e) => {
    const { name, value } = e.target;

    // No convertir password a mayúsculas
    if (name === "password") {
      formik.setFieldValue(name, value);
    } else {
      formik.setFieldValue(name, value.toUpperCase());
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Guarda todo el string base64 con el prefijo
        setImagenBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombreArtistico: "",
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      telefono: "",
      email: "",
      genero: "",
      descripcion: "",
      especialidad: "",
      ubicacion: "",
      imagen: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombreArtistico: Yup.string().required("Campo obligatorio"),
      nombre: Yup.string().required("Campo obligatorio")
      .matches(/^[A-ZÁÉÍÓÚÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
      apellidoP: Yup.string().required("Campo obligatorio")
      .matches(/^[A-ZÁÉÍÓÚÑ\s]+$/, "El apellido paterno solo puede contener letras y espacios"),
      apellidoM: Yup.string().required("Campo obligatorio")
      .matches(/^[A-ZÁÉÍÓÚÑ\s]+$/, "El apellido materno solo puede contener letras y espacios"),
      telefono: Yup.string().required("Campo obligatorio")
      .min(10, "El teléfono debe tener al menos 10 dígitos")
      .max(12, "El teléfono no puede tener más de 12 dígitos")
      .matches(/^\d+$/, "El teléfono solo puede contener números"),
      email: Yup.string().email("Email inválido").required("Campo obligatorio")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, "El email debe tener un formato correcto"),
      genero: Yup.string().required("Campo obligatorio"),
      password: Yup.string()
        .required("Campo obligatorio")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "Debe tener al menos una letra mayúscula")
        .matches(/[a-z]/, "Debe tener al menos una letra minúscula")
        .matches(/\d/, "Debe tener al menos un número")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe tener al menos un símbolo"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMensaje("");
      try {
        // Incluye latitud y longitud si están disponibles
        const input = { 
          ...values, 
          imagen: imagenBase64 || "",
          latitud: latitud !== null ? latitud : 0,
          longitud: longitud !== null ? longitud : 0,
          especialidad, // <-- asegúrate de incluirlo aquí
        };
        const { data } = await crearArtista({ variables: { input } });

        // Obtener token real desde la respuesta
        const token = data?.crearArtista?.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        alert("Artista creado correctamente");
        router.push("/loginArt");
      } catch (error) {
        const graphqlError = error?.graphQLErrors?.[0]?.message;
        setErrorMensaje(
          graphqlError || "Error inesperado al crear el artista."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-8 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-orange-300">
        <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">
          Crear cuenta de artista
        </h1>
        <a
          href="/nuevaCuenta"
          className="block text-center font-bold text-purple-700 mb-6 underline"
        >
          ¿Quieres crear una cuenta de Usuario?
        </a>

        <form onSubmit={formik.handleSubmit}>
          <Campo
            id="nombreArtistico"
            label="Nombre Artístico"
            values={formik.values.nombreArtistico}
            handleChange={handleUpperChange}
            error={formik.errors.nombreArtistico}
            touched={formik.touched.nombreArtistico}
          />
          <Campo
            id="nombre"
            label="Nombre"
            values={formik.values.nombre}
            handleChange={handleUpperChange}
            error={formik.errors.nombre}
            touched={formik.touched.nombre}
          />
          <Campo
            id="apellidoP"
            label="Apellido Paterno"
            values={formik.values.apellidoP}
            handleChange={handleUpperChange}
            error={formik.errors.apellidoP}
            touched={formik.touched.apellidoP}
          />
          <Campo
            id="apellidoM"
            label="Apellido Materno"
            values={formik.values.apellidoM}
            handleChange={handleUpperChange}
            error={formik.errors.apellidoM}
            touched={formik.touched.apellidoM}
          />
          <Campo
            id="telefono"
            label="Teléfono"
            values={formik.values.telefono}
            handleChange={formik.handleChange}
            error={formik.errors.telefono}
            touched={formik.touched.telefono}
          />
          <Campo
            id="email"
            label="Email"
            type="email"
            values={formik.values.email}
            handleChange={handleUpperChange}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <Campo
            id="genero"
            label="Género"
            values={formik.values.genero}
            handleChange={handleUpperChange}
            error={formik.errors.genero}
            touched={formik.touched.genero}
          />
          <Campo
            id="descripcion"
            label="Descripción"
            values={formik.values.descripcion}
            handleChange={handleUpperChange}
          />
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Especialidad
            </label>
            <select
              value={especialidad}
              onChange={e => setEspecialidad(e.target.value)}
              required
              className="w-full border border-orange-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Selecciona una especialidad</option>
              <optgroup label="Artes Visuales">
                <option value="Pintura">Pintura</option>
                <option value="Dibujo">Dibujo</option>
                <option value="Ilustración digital">Ilustración digital</option>
                <option value="Fotografía">Fotografía</option>
                <option value="Diseño gráfico">Diseño gráfico</option>
                <option value="Arte callejero / muralismo">
                  Arte callejero / muralismo
                </option>
              </optgroup>
              <optgroup label="Artes Escénicas">
                <option value="Actuación">Actuación</option>
                <option value="Danza contemporánea">Danza contemporánea</option>
                <option value="Teatro musical">Teatro musical</option>
              </optgroup>
              <optgroup label="Música">
                <option value="Canto">Canto</option>
                <option value="Producción musical">Producción musical</option>
                <option value="Guitarra">Guitarra</option>
                <option value="Piano">Piano</option>
                <option value="Rap / Freestyle">Rap / Freestyle</option>
              </optgroup>
              <optgroup label="Literatura">
                <option value="Escritura creativa">Escritura creativa</option>
                <option value="Poesía">Poesía</option>
                <option value="Guion cinematográfico">Guion cinematográfico</option>
              </optgroup>
              <optgroup label="Audiovisuales y Nuevos Medios">
                <option value="Cine">Cine</option>
                <option value="Edición de video">Edición de video</option>
                <option value="Animación 2D / 3D">Animación 2D / 3D</option>
              </optgroup>
              <optgroup label="Arte Urbano y Cultura Alternativa">
                <option value="Graffiti">Graffiti</option>
                <option value="Tatuaje artístico">Tatuaje artístico</option>
              </optgroup>
              <optgroup label="Artes Aplicadas y Oficios Creativos">
                <option value="Joyería">Joyería</option>
                <option value="Cerámica">Cerámica</option>
                <option value="Diseño de moda">Diseño de moda</option>
              </optgroup>
            </select>
          </div>
          <Campo
            id="ubicacion"
            label="Ubicación"
            values={formik.values.ubicacion}
            handleChange={formik.handleChange}
          />
          <Campo
            id="imagen"
            label="Imagen"
            values={formik.values.imagen}
            onChange={handleImagenChange}
          />
          <Campo
            id="password"
            label="Contraseña"
            type="password"
            values={formik.values.password}
            handleChange={formik.handleChange}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          {errorMensaje && (
            <p className="text-red-600 text-sm mb-4">{errorMensaje}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-500 text-white px-6 py-2 rounded"
          >
            {isLoading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevaCuentaArt;
