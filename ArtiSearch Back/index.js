const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("../ArtiSearch Back/db/Schema.cjs")
const { resolvers } = require("../ArtiSearch Back/db/Resolvers.cjs")
const conectarDB = require('../ArtiSearch Back/config/db.cjs')
const Usuario = require('../ArtiSearch Back/models/Usuario.cjs');
const Artista =require('../ArtiSearch Back/models/Artista.cjs');
const Post =require('../ArtiSearch Back/models/Post.cjs');
const Calificacion = require('../ArtiSearch Back/models/Calificacion.cjs');
const Contrato = require('../ArtiSearch Back/models/Contrato.cjs');
const Pago = require('../ArtiSearch Back/models/Pago.cjs');

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
