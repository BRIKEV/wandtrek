import { Link } from "@remix-run/react";
import type { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

interface Props {
  center: [number, number];
  height: string;
  stops: {
    id: string;
    title: string;
    position: [number, number]
  }[];
  route: [number, number][];
}

export function Map({ height, center, stops, route }: Props) {
  return (
    <div style={{ height }}>
      <MapContainer
        style={{
          height: "100%",
        }}
        center={center}
        zoom={15}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops.map((stop) => (
          <Marker key={stop.id} position={stop.position}>
            <Popup>
              {stop.title}
              <Link className="button is-primary" to={`stop/${stop.id}`}>Check Stop</Link>
            </Popup>
          </Marker>
        ))}
        <Polyline positions={route} />
      </MapContainer>
    </div>
  );
}
