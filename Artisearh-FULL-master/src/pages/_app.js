import "leaflet/dist/leaflet.css";
import "@/styles/globals.css";
const { ApolloProvider } = require("@apollo/client");
import client from '../../config/apollo.js';  // Asegúrate de importar correctamente tu cliente

export default function App({ Component, pageProps }) {
  console.log("App component rendered");
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
