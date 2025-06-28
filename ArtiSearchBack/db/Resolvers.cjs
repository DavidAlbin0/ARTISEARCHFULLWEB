const Usuario = require("../models/Usuario.cjs");
const Artista = require("../models/Artista.cjs");
const Contrato = require("../models/Contrato.cjs");
const Pago = require("../models/Pago.cjs");
const Calificacion = require("../models/Calificacion.cjs");
const Post = require("../models/Post.cjs");
const bcrypt = require("bcryptjs"); // IMPORTAR bcryptjs
const bcryptjs = require("bcryptjs"); // IMPORTAR bcryptjs
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "PALABRASECRETA" });

//************************************************//
//Creacion de Tokens//
//************************************************//
const crearToken = (usuario, PALABRASECRETA, expiresIn) => {
  console.log(usuario); // Verifica qué valores tiene usuario
  const { id, email, nombre, apellidoP, apellidoM, telefono } = usuario;

  return jwt.sign(
    { id, email, nombre, apellidoP, apellidoM, telefono },
    PALABRASECRETA,
    {
      expiresIn,
    }
  );
};

const crearTokenArt = (Artista, PALABRASECRETA, expiresIn) => {
  console.log(Artista); // Verifica qué valores tiene usuario
  const {
    id,
    email,
    nombre,
    apellidoP,
    apellidoM,
    descripcion,
    nombreArtistico,
    longitud,
    latitud,
    estado,
    especialidad,
    telefono,
  } = Artista;

  return jwt.sign(
    {
      id,
      email,
      nombre,
      apellidoP,
      apellidoM,
      descripcion,
      nombreArtistico,
      longitud,
      latitud,
      estado,
      especialidad,
      telefono,
    },
    PALABRASECRETA,
    {
      expiresIn,
    }
  );
};

const resolvers = {
  Query: {
    //************************************************//
    //Consultas artista//
    //************************************************//
    obtenerArtista: async (_, { token }) => {
      const ArtistaID = await jwt.verify(token, process.env.PALABRASECRETA);

      return ArtistaID;
    },

    obtenerImagenArtista: async (_, { id }) => {
      const artista = await Artista.findById(id).select("imagen");
      if (!artista) throw new Error("Artista no encontrado");
      return artista.imagen;
    },

    obtenerCalificaciones: async (_, { id }) => {
      try {
        // Busca las calificaciones en la base de datos por el id del artista
        const calificaciones = await Calificacion.find({ artista: id });
        return calificaciones;
      } catch (error) {
        console.log("Error al obtener las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    obtenerTodasCalificaciones: async () => {
      try {
        const calificaciones = await Calificacion.find({});
        return calificaciones;
      } catch (error) {
        console.error("Error al obtener todas las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    promedioCalif: async (_, { token }) => {
      try {
        // Verifica el token
        const decodedToken = await jwt.verify(
          token,
          process.env.PALABRASECRETA
        );
        console.log("Datos del Token:", decodedToken);

        if (!decodedToken.nombre) {
          throw new Error("Token inválido o sin nombre.");
        }

        // Busca las calificaciones en la base de datos
        const calificaciones = await Calificacion.find({
          artista: decodedToken.id,
        });
        console.log("Calificaciones encontradas:", calificaciones);

        if (calificaciones.length === 0) {
          throw new Error("No hay calificaciones para este usuario.");
        }

        // Calcula el promedio
        let sumatoria = 0;
        for (let item of calificaciones) {
          sumatoria += item.calif;
        }
        let promedio = sumatoria / calificaciones.length;

        return {
          promedio,
          totalCalificaciones: calificaciones.length,
          detalles: calificaciones,
        };
      } catch (error) {
        console.log("Error al calcular el promedio:", error);
        throw new Error("No se pudo calcular el promedio.");
      }
    },

    obtenerUsuario: async (_, { token }) => {
      const UsuarioID = await jwt.verify(token, process.env.PALABRASECRETA);

      return UsuarioID;
    },

    obtenerPost: async (_, { token }) => {
      try {
        // Verifica el token
        const decodedToken = await jwt.verify(
          token,
          process.env.PALABRASECRETA
        );

        // Depuración: Verifica qué datos tiene el token
        console.log("Datos del Token:", decodedToken);

        if (!decodedToken.nombre) {
          throw new Error("Token inválido o sin nombre.");
        }

        // Busca las calificaciones en la base de datos
        const posts = await Post.find({ artista: decodedToken.id });

        // Depuración: Verifica qué datos se están obteniendo
        console.log("Calificaciones encontradas:", posts);

        return posts;
      } catch (error) {
        console.log("Error al obtener las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    obtenerContrato: async (_, { token }) => {
      try {
        // Verifica el token
        const decodedToken = await jwt.verify(
          token,
          process.env.PALABRASECRETA
        );

        // Depuración: Verifica qué datos tiene el token
        console.log("Datos del Token:", decodedToken);

        if (!decodedToken.nombre) {
          throw new Error("Token inválido o sin nombre.");
        }

        // Busca las calificaciones en la base de datos
        const contratos = await Contrato.find({ artista: decodedToken.id });

        // Depuración: Verifica qué datos se están obteniendo
        console.log("Calificaciones encontradas:", contratos);

        return contratos;
      } catch (error) {
        console.log("Error al obtener las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    obtenerPago: async (_, { token }) => {
      try {
        // Verifica el token
        const decodedToken = await jwt.verify(
          token,
          process.env.PALABRASECRETA
        );

        // Depuración: Verifica qué datos tiene el token
        console.log("Datos del Token:", decodedToken);

        if (!decodedToken.nombre) {
          throw new Error("Token inválido o sin nombre.");
        }

        // Busca las calificaciones en la base de datos
        const pagos = await Pago.find({ artista: decodedToken.id });

        // Depuración: Verifica qué datos se están obteniendo
        console.log("Calificaciones encontradas:", pagos);

        return pagos;
      } catch (error) {
        console.log("Error al obtener las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    //************************************************//
    //Consultas generales//
    //************************************************//

    obtenerPostAll: async () => {
      //Aqui trae todos de todos
      try {
        const posts = await Post.find({});
        return posts;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerArtistaAll: async () => {
      //Aqui trae todos de todos
      try {
        const artistas = await Artista.find({});
        return artistas;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPostsClick: async (_, { artista }) => {
      const posts = await Post.find({ artista }); // Usar "Post" en lugar de "post"

      if (!posts.length) {
        throw new Error("Este usuario no tiene posts");
      }

      return posts;
    },

    obtenerContratoUser: async (_, { token }) => {
      try {
        // Verifica el token
        const decodedToken = await jwt.verify(
          token,
          process.env.PALABRASECRETA
        );

        // Depuración: Verifica qué datos tiene el token
        console.log("Datos del Token:", decodedToken);

        if (!decodedToken.nombre) {
          throw new Error("Token inválido o sin nombre.");
        }

        // Busca las calificaciones en la base de datos
        const contratos = await Contrato.find({ usuario: decodedToken.id });

        // Depuración: Verifica qué datos se están obteniendo
        console.log("Calificaciones encontradas:", contratos);

        return contratos;
      } catch (error) {
        console.log("Error al obtener las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    obtenerArtistaClick: async (_, { id }) => {
      //Revisar si existe el artiusta o nel
      const artistaAlone = await Artista.findById(id);

      if (!artistaAlone) {
        throw new Error("Artista no encontrado");
      }

      return artistaAlone;
    },

    obtenerPagoUser: async (_, { token }) => {
      try {
        // Verifica el token
        const decodedToken = await jwt.verify(
          token,
          process.env.PALABRASECRETA
        );

        // Depuración: Verifica qué datos tiene el token
        console.log("Datos del Token:", decodedToken);

        if (!decodedToken.nombre) {
          throw new Error("Token inválido o sin nombre.");
        }

        // Busca las calificaciones en la base de datos
        const pagos = await Pago.find({ usuario: decodedToken.id });

        // Depuración: Verifica qué datos se están obteniendo
        console.log("Calificaciones encontradas:", pagos);

        return pagos;
      } catch (error) {
        console.log("Error al obtener las calificaciones:", error);
        throw new Error("No se pudieron obtener las calificaciones.");
      }
    },

    mejoresCalificados: async (_, { id }) => {
      "Algo";
    },

    buscarArtistaPorCorreoTelefono: async (_, { email, telefono }) => {
      return await Artista.findOne({ email, telefono });
    },

    buscarUsuarioPorCorreoTelefono: async (_, { email, telefono }) => {
      return await Usuario.findOne({ email, telefono });
    },

    obtenerArtistaBusqueda: async () => {
      return await Artista.find({});
    },

    obtenerUsuarioBusqueda: async () => {
      return await Usuario.find({});
    },
  },

  //************************************************//
  //Empiezan los mutation//
  //************************************************//

  Mutation: {
    //************************************************//
    //Empiezan con Inserts//
    //************************************************//

    nuevoUsuario: async (_, { input }) => {
      const { email, telefono, password } = input;

      // Verifica si el email ya está registrado
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        throw new Error("El correo electrónico ya está registrado.");
      }

      // Verifica si el teléfono ya está registrado
      const existeTelefono = await Usuario.findOne({ telefono });
      if (existeTelefono) {
        throw new Error("El número de teléfono ya está registrado.");
      }

      // Hashear password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        // Crear usuario
        const nuevoUsuario = new Usuario(input);
        await nuevoUsuario.save();

        console.log("Usuario creado:", nuevoUsuario);
        return nuevoUsuario;
      } catch (error) {
        console.error("Error al crear usuario:", error);
        throw new Error("No se pudo crear el usuario.");
      }
    },

    nuevoArtista: async (_, { input }) => {
      const { email, telefono, password, nombreArtistico } = input;

      // Revisar si el correo ya está registrado
      const existeEmail = await Artista.findOne({ email });
      if (existeEmail) {
        throw new Error("El correo electrónico ya está registrado.");
      }

      // Revisar si el teléfono ya está registrado
      const existeTelefono = await Artista.findOne({ telefono });
      if (existeTelefono) {
        throw new Error("El número de teléfono ya está registrado.");
      }

      const existeNombreArtistico = await Artista.findOne({ nombreArtistico });
      if (existeNombreArtistico) {
        throw new Error(
          "Ya hay alguien registrado con ese nombre artístico, Elige otro."
        );
      }

      try {
        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);

        // Crear nuevo artista
        const nuevoArtista = new Artista(input);

        // Guardar en la base de datos
        await nuevoArtista.save();

        console.log("Artista creado:", nuevoArtista);

        return nuevoArtista;
      } catch (error) {
        console.error("Error al crear artista:", error);
        throw new Error("No se pudo crear el artista.");
      }
    },

    nuevoContrato: async (_, { input }) => {
      try {
        // Validar que hechoPor venga en el input
        if (!input.hechoPor || !input.hechoPor.id || !input.hechoPor.tipo) {
          throw new Error("El campo hechoPor es obligatorio y debe tener id y tipo.");
        }

        // Verificar si el artista ya tiene 3 contratos activos
        const contratosActivos = await Contrato.countDocuments({
          artista: input.artista,
          estado: { $nin: ["Finalizado", "Cancelado"] },
        });

        if (contratosActivos >= 3) {
          throw new Error(
            "Lo siento, ya tienes 3 contratos activos. Termina uno para poder continuar."
          );
        }

        // Guardar el nuevo contrato (incluyendo hechoPor)
        const nuevoContrato = new Contrato(input);
        await nuevoContrato.save();

        // Si el contrato NO está "Finalizado" ni "Cancelado", crear un pago asociado
        if (input.estado !== "Finalizado" && input.estado !== "Cancelado") {
          const nuevoPago = new Pago({
            contrato: nuevoContrato._id,
            usuario: input.usuario,
            artista: input.artista,
            monto: input.monto,
            estado: "Pendiente",
          });

          await nuevoPago.save();
        }

        return nuevoContrato;
      } catch (error) {
        console.error(error);
        throw new Error("Error al crear el contrato");
      }
    },

    nuevoPago: async (_, { input }) => {
      try {
        // Buscar el contrato existente
        const contrato = await Contrato.findById(input.contrato);
        if (!contrato) {
          throw new Error("El contrato no existe.");
        }

        // Crear un nuevo pago solo si el contrato no está finalizado o cancelado
        if (
          contrato.estado !== "Finalizado" &&
          contrato.estado !== "Cancelado"
        ) {
          const nuevoPago = new Pago({
            contrato: contrato._id,
            usuario: contrato.usuario,
            artista: contrato.artista,
            monto: contrato.monto, // Mismo monto del contrato
            metodoPago: "Pendiente", // Se actualizará después
            estado: "Pendiente", // Pago inicial en estado Pendiente
            fechaPago: null, // Solo se asignará cuando el estado cambie
          });

          await nuevoPago.save();
          return nuevoPago;
        } else {
          throw new Error(
            "No se puede generar un pago para un contrato finalizado o cancelado."
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error al generar el pago.");
      }
    },

    nuevaCalificacion: async (_, { input }) => {
      const { usuario, artista, calif, comentario, imagen } = input;

      try {
        // Verificar si el usuario y el artista existen
        const existeUsuario = await Usuario.findById(usuario);
        if (!existeUsuario) {
          throw new Error("El usuario no existe");
        }

        const existeArtista = await Artista.findById(artista);
        if (!existeArtista) {
          throw new Error("El artista no existe");
        }

        // Convertir calificación a número (por si viene como string)
        const calificacionNumero = parseFloat(calif);
        if (
          isNaN(calificacionNumero) ||
          calificacionNumero < 1 ||
          calificacionNumero > 5
        ) {
          throw new Error("La calificación debe ser un número entre 1 y 5");
        }

        // Crear nueva calificación
        const nuevaCalificacion = new Calificacion({
          usuario,
          artista,
          calif: calificacionNumero,
          comentario,
          imagen,
        });

        // Guardar en la base de datos
        await nuevaCalificacion.save();

        return nuevaCalificacion;
      } catch (error) {
        console.error("Error al registrar la calificación:", error.message);
        throw new Error("No se pudo registrar la calificación");
      }
    },

    nuevoPost: async (_, { input }) => {
      const { artista, titulo, descripcion, imagen, ubicacion } = input;

      try {
        // Verificar si el artista existe
        const existeArtista = await Artista.findById(artista);
        if (!existeArtista) {
          throw new Error("El artista no existe");
        }

        // Crear nuevo post
        const nuevoPost = new Post({
          artista,
          titulo,
          descripcion,
          imagen,
          ubicacion,
        }); // ...dentro de resolvers.Mutation...
        actualizarLocalizacion: async (_, { id, latitud, longitud }) => {
          const artista = await Artista.findById(id);
          if (!artista) {
            throw new Error("No existe el artista");
          }
          artista.latitud = latitud;
          artista.longitud = longitud;
          await artista.save();
          return artista;
        },
          // Guardar en la base de datos
          await nuevoPost.save();

        return nuevoPost;
      } catch (error) {
        console.error("Error al publicar el post:", error.message);
        throw new Error("No se pudo publicar el post");
      }
    },
    //************************************************//
    //Autenticaciones//
    //************************************************//

    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("El usuario no existe"); // Mensaje corregido
      }

      // Revisar si password es correcto
      const passwordCorrecto = await bcrypt.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("El password es incorrecto");
      }

      // Crear Token
      return {
        token: crearToken(existeUsuario, process.env.PALABRASECRETA, "72h"),
      };
    },

    autenticarArtista: async (_, { input }) => {
      const { email, password } = input;

      const existeArtista = await Artista.findOne({ email });
      if (!existeArtista) {
        throw new Error("Este Artista no existe"); // Mensaje corregido
      }

      // Revisar si password es correcto
      const passwordCorrecto = await bcrypt.compare(
        password,
        existeArtista.password
      );
      if (!passwordCorrecto) {
        throw new Error("El password es incorrecto");
      }

      // Crear Token
      return {
        token: crearTokenArt(existeArtista, process.env.PALABRASECRETA, "72h"),
      };
    },

    //************************************************//
    //Actualizaciones//
    //************************************************//

    actualizarPost: async (_, { id, input }) => {
      let post = await Post.findById(id);
      if (!post) {
        throw new Error("No existe el post");
      }

      //Si lo hace lo guardamos
      post = await Post.findByIdAndUpdate({ _id: id }, input, { new: true });
      return post;
    },

    actualizarContrato: async (_, { id, input }) => {
      let contrato = await Contrato.findById(id);
      if (!contrato) {
        throw new Error("No existe el post");
      }

      //Si lo hace lo guardamos
      contrato = await Contrato.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });
      return contrato;
    },

    actualizarPago: async (_, { id, input }) => {
      let pago = await Pago.findById(id);
      if (!pago) {
        throw new Error("No existe el post");
      }

      //Si lo hace lo guardamos
      pago = await Pago.findByIdAndUpdate({ _id: id }, input, { new: true });
      return pago;
    },

    actualizarArtista: async (_, { id, input }) => {
      let artista = await Artista.findById(id);
      if (!artista) {
        throw new Error("No existe el artista");
      }

      //Si lo hace lo guardamos
      artista = await Artista.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });
      return artista;
    },

    actualizarUsuario: async (_, { id, input }) => {
      let usuario = await Usuario.findById(id);
      if (!usuario) {
        throw new Error("No existe el Usuario");
      }

      //Si lo hace lo guardamos
      usuario = await Usuario.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });
      return usuario;
    },

    actualizarPassword: async (_, { email, telefono, input }) => {
      let usuario = await Usuario.findOne({ email, telefono });
      let artista = await Artista.findOne({ email, telefono });
      if (!usuario && !artista) {
        throw new Error("No existe el usuario o artista con esos datos");
      }

      // Hashear la nueva contraseña
      const salt = await bcryptjs.genSalt(10);
      const nuevaContraseña = await bcryptjs.hash(input.password, salt);
      if (usuario) {
        // Actualizar contraseña del usuario
        usuario.password = nuevaContraseña;
        await usuario.save();
        return "Contraseña de usuario actualizada correctamente";
      } else if (artista) {
        // Actualizar contraseña del artista
        artista.password = nuevaContraseña;
        await artista.save();
        return "Contraseña de artista actualizada correctamente";
      }
    },

    // ...dentro de resolvers.Mutation...
    actualizarLocalizacion: async (_, { id, latitud, longitud }) => {
      const artista = await Artista.findById(id);
      if (!artista) {
        throw new Error("No existe el artista");
      }
      artista.latitud = latitud;
      artista.longitud = longitud;
      await artista.save();
      return artista;
    },

    //************************************************//
    //Eliminaciones//
    //************************************************//

    eliminarPost: async (_, { id }) => {
      let post = await Post.findById(id);

      if (!post) {
        throw new Error("No existe el post");
      }

      await Post.findByIdAndDelete({ _id: id });

      return "Post Eliminado :)";
    },

    eliminarCallificacion: async (_, { id }) => {
      let calificacion = await Calificacion.findById(id);

      if (!calificacion) {
        throw new Error("No existe el post");
      }

      await Calificacion.findByIdAndDelete({ _id: id });

      return "Post Eliminado :)";
    },
  },
  Calificacion: {
    usuario: async (parent) => {
      // parent.usuario es el ID del usuario
      if (!parent.usuario) return null;
      // Si ya es un objeto (por populate), regresa directo
      if (typeof parent.usuario === "object" && parent.usuario.nombre) return parent.usuario;
      // Si es un string (ID), busca el usuario
      const usuario = await Usuario.findById(parent.usuario);
      return usuario;
    },
  },
};

module.exports = { resolvers };
