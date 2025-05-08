const { gql } = require("apollo-server");

// Definición del esquema
const typeDefs = gql`

type Token {
    token: String
}

   # //************************************************//
   #            //Definicion de Objetos//
   # //************************************************//
    
type Usuario {
        id: ID
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        creado: String
        telefono: String
        imagen: String
    }

    type Artista {
        id: ID
        nombreArtistico: String
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        creado: String
        telefono: String
        ubicacion: String
        descripcion: String
        especialidad: String
        imagen: String
    }

    type Calificacion {
        id: ID
        usuario: String
        artista: String
        calif: Float
        comentario: String
        imagen: String
    }
    
    type CalificacionesResponse {
        promedio: Float
        totalCalificaciones: Int
        detalles: [Calificacion]
      }

    type Contrato {
        id: ID
        usuario: String
        artista: String
        fechaInicio: String
        fechaFin: String
        fechaEstimadaFin: String
        detalles: String
        estado: String
        monto: Float
    }

    type Post{
        id: ID
        artista: String
        titulo: String
        descripcion: String
        imagen: String
        fechaPublicacion: String
        ubicacion: String
    }

    type PostResponse{
        id: ID
        artista: String
        titulo: String
        descripcion: String
        imagen: String
        fechaPublicacion: String
        ubicacion: String
        detalles: [Post]

    }

    type Pago{
        id: ID
        contrato: String
        usuario: String
        artista: String
        monto: Float
        metodoPago: String
        estado: String
        fechaPago: String
    }

    
    type topCliente{
        id: ID
        Calificacion: Float
        Artista: [Artista]
        
    }

   # //************************************************//
   #                  //Inputs//
   # //************************************************//
    

    input UsuarioInput {
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        telefono: String
        password: String
        imagen: String

    }

    input ArtistaInput {
        nombreArtistico: String
        nombre: String
        apellidoP: String
        apellidoM: String
        genero: String
        email: String
        telefono: String
        descripcion: String
        especialidad: String
        password: String
        imagen: String
        ubicacion: String! 
    }

    input ContratoInput {
        usuario: String
        artista: String
        fechaInicio: String
        fechaFin: String
        fechaEstimadaFin: String
        detalles: String
        estado: String
        monto: Float
    }


    input CalificacionInput {
        usuario: String
        artista: String
        calif: Float
        comentario: String
        imagen: String
    }

    input PostInput {
        artista: String
        titulo: String
        descripcion: String
        imagen: String
        fechaPublicacion: String
        ubicacion: String
    }

    input PagoInput {
        contrato: String
        usuario: String
        artista: String
        monto: Float
        metodoPago: String
        estado: String
        fechaPago: String
    }

    input AutenticarInput{
        email: String
        password: String
    }

    input AutenticArtistaInput{
        email: String
        password: String
    }

   # //************************************************//
   #                  //Mutations//
   # //************************************************//
    
    type Mutation {
        #INSERTS
        nuevoUsuario(input: UsuarioInput!) : Usuario
        nuevoArtista(input: ArtistaInput!) : Artista
        nuevoContrato(input: ContratoInput) : Contrato
        nuevoPago(input: PagoInput) : Pago
        nuevaCalificacion(input: CalificacionInput) : Calificacion
        nuevoPost(input: PostInput) : Post

        #AUTENTICACIONES
        autenticarUsuario(input: AutenticarInput) : Token
        autenticarArtista(input: AutenticArtistaInput): Token

        #ACTUALIZACIONES
        actualizarPost(id: ID, input: PostInput): Post
        actualizarContrato(id: ID, input: ContratoInput): Contrato
        actualizarPago(id: ID, input: PagoInput): Pago
        actualizarArtista(id: ID, input: ArtistaInput): Artista
        actualizarUsuario(id: ID, input: UsuarioInput): Usuario
        
        #ELIMINACIONES
        eliminarCallificacion(id: ID!) : String
        eliminarPost(id: ID!) : String
    }
    
   # //************************************************//
   #                  //Querys//
   # //************************************************//
    
    type Query {
        #PROMEDIO DE CALIFICACION 
        promedioCalif(token: String!): CalificacionesResponse
        #Aqui debes de ingresar un promedio pero para que te regrese el 
        #promedio de un artista en especifico, es decir, que lo traiga con 
        #el id del artista, no con el token

        #QUERYS GENERALES
        obtenerArtista(token: String!): Artista
        obtenerCalificaciones(token: String!): [Calificacion]
        obtenerUsuario(token: String!): Usuario
        obtenerPost(token: String!): [Post]
        obtenerPostAll: [Post]
        obtenerPago(token: String!): [Pago]
        obtenerContrato(token: String!): [Contrato]
        obtenerArtistaAll: [Artista]
        obtenerContratoUser(token: String!): [Contrato]
        obtenerPagoUser(token: String!): [Pago]
        obtenerArtistaClick(id: ID!) : Artista
        obtenerPostsClick(artista: ID!): [Post]
        
        #BUSQUEDAS AVANZADAS 
        mejoresCalificados: [topCliente]
    }
    
`;

module.exports = { typeDefs };
