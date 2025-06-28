const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("../ArtiSearchBack/db/Schema.cjs")
const { resolvers } = require("../ArtiSearchBack/db/Resolvers.cjs")
const conectarDB = require('../ArtiSearchBack/config/db.cjs')
const Usuario = require('../ArtiSearchBack/models/Usuario.cjs');
const Artista =require('../ArtiSearchBack/models/Artista.cjs');
const Post =require('../ArtiSearchBack/models/Post.cjs');
const Calificacion = require('../ArtiSearchBack/models/Calificacion.cjs');
const Contrato = require('../ArtiSearchBack/models/Contrato.cjs');
const Pago = require('../ArtiSearchBack/models/Pago.cjs');

//Conetcar a la BD
conectarDB();


// Crear servidor Apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Iniciar servidor
server.listen().then(({ url }) => {
    console.log(`🚀 Servidor listo en ${url}`);
});
