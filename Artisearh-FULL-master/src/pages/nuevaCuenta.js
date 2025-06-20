import React, { useState } from "react";
import Layout from "../../components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

// Mutación para crear un nuevo usuario
const NUEVO_USUARIO_MUTATION = gql`
  mutation nuevoUsuario($input: UsuarioInput!) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellidoP
      apellidoM
      genero
      email
      telefono
      imagen
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

const NuevaCuenta = () => {
  const [crearUsuario] = useMutation(NUEVO_USUARIO_MUTATION);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCrearCuenta = async () => {
    setIsLoading(true);
    try {
      await crearCuenta(); // tu función para crear la cuenta
    } finally {
      setIsLoading(false);
    }
  };

  // Estado para errores de servidor
  const [serverError, setServerError] = useState("");

  const handleUpperChange = (e) => {
    const { name, value } = e.target;

    // No convertir password a mayúsculas
    if (name === "password") {
      formik.setFieldValue(name, value);
    } else {
      formik.setFieldValue(name, value.toUpperCase());
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      telefono: "",
      email: "",
      genero: "",
      password: "",
    },
    validationSchema: Yup.object({
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
      setServerError("");
      try {
        const { data } = await crearUsuario({ variables: { input: values } });

        // Guardar token si existe
        const token = data.nuevoUsuario.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        alert("Usuario creado correctamente");
        router.push("/login");
      } catch (error) {
        console.error("Error al crear usuario:", error);
        setIsLoading(false);

        const msg = error.message;
        if (msg.includes("correo")) {
          setServerError("El correo electrónico ya está registrado.");
          setIsLoading(false);
        } else if (msg.includes("teléfono")) {
          setServerError("El número de teléfono ya está registrado.");
          setIsLoading(false);
        } else {
          setServerError("Error al crear usuario. Intenta nuevamente.", error);
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-orange-50 py-8 px-4">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-orange-300">
          <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">
            Crear cuenta de Usuario
          </h1>
          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {serverError}
            </div>
          )}
          <a
            href="/nuevaCuentaArt"
            className="block text-center font-bold text-purple-700 mb-6 underline"
          >
            ¿Quieres crear una cuenta de Arista?
          </a>

          <form onSubmit={formik.handleSubmit}>
            <Campo
              id="nombre"
              label="Nombre"
              placeholder="Nombre Usuario"
              values={formik.values.nombre}
              handleChange={handleUpperChange}
              error={formik.errors.nombre}
              touched={formik.touched.nombre}
            />
            <Campo
              id="apellidoP"
              label="Apellido Paterno"
              placeholder="Apellido Paterno"
              values={formik.values.apellidoP}
              handleChange={handleUpperChange}
              error={formik.errors.apellidoP}
              touched={formik.touched.apellidoP}
            />
            <Campo
              id="apellidoM"
              label="Apellido Materno"
              placeholder="Apellido Materno"
              values={formik.values.apellidoM}
              handleChange={handleUpperChange}
              error={formik.errors.apellidoM}
              touched={formik.touched.apellidoM}
            />
            <Campo
              id="telefono"
              label="Teléfono"
              placeholder="Teléfono"
              values={formik.values.telefono}
              handleChange={formik.handleChange}
              error={formik.errors.telefono}
              touched={formik.touched.telefono}
            />
            <Campo
              id="email"
              label="Email"
              placeholder="Email"
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
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              values={formik.values.password}
              handleChange={formik.handleChange}
              error={formik.errors.password}
              touched={formik.touched.password}
            />

            <div className="flex justify-between mt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                {isLoading ? "Creando..." : "Crear cuenta"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaCuenta;
