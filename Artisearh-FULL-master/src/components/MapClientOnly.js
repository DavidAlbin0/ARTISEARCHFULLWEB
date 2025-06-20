import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapClientOnly({ artistaLat, artistaLon, userLat, userLon, artistaName }) {
  return (
    <MapContainer
      center={[artistaLat, artistaLon]}
      zoom={13}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[artistaLat, artistaLon]}>
        <Popup>Artista: {artistaName}</Popup>
      </Marker>
      <Marker position={[userLat, userLon]}>
        <Popup>Tu ubicación</Popup>
      </Marker>
    </MapContainer>
  );
}