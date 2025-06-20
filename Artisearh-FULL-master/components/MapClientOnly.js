import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icono naranja para el artista
const artistaIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  className: "leaflet-marker-icon-artista",
});

// Icono azul para el usuario (de leaflet-color-markers)
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  className: "leaflet-marker-icon-user",
});

export default function MapClientOnly({
  artistaLat,
  artistaLon,
  userLat,
  userLon,
  artistaName,
}) {
  if (
    typeof artistaLat !== "number" ||
    typeof artistaLon !== "number" ||
    typeof userLat !== "number" ||
    typeof userLon !== "number"
  ) {
    return null;
  }

  const polylinePositions = [
    [artistaLat, artistaLon],
    [userLat, userLon],
  ];

  return (
    <MapContainer
      center={[artistaLat, artistaLon]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[artistaLat, artistaLon]} icon={artistaIcon}>
        <Popup>
          Aquí está el artista: <b>{artistaName}</b>
        </Popup>
      </Marker>
      <Marker position={[userLat, userLon]} icon={userIcon}>
        <Popup>
          <b>Tú estás aquí</b>
        </Popup>
      </Marker>
      <Polyline positions={polylinePositions} color="black">
        <Popup>
          Distancia entre tú y el artista
        </Popup>
      </Polyline>
    </MapContainer>
  );
}
