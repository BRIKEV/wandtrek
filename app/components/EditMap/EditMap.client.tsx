import { useState } from "react";
import { MapContainer } from "react-leaflet";
import { Map } from './Map.client';
import { LeafletMouseEvent } from "leaflet";

interface Stop {
  id?: string;
  title: string;
  position: [number, number]
}

interface Props {
  center: [number, number];
  height: string;
  stops: Stop[];
  route: [number, number][];
}

export function EditMap({ height, center, stops, route }: Props) {
  const [markers, setMarkers] = useState<Stop[]>(stops);
  const [option, setOption] = useState<'STOPS' | 'ROUTE'>('STOPS');
  const [polyline, setPolyline] = useState<[number, number][]>(route);

  const handleMap = (event: LeafletMouseEvent) => {
    if (option === 'ROUTE') {
      setPolyline([...polyline, [event.latlng.lat, event.latlng.lng]]);
    } else if (option === 'STOPS') {
      setMarkers([...markers, {
        position: [event.latlng.lat, event.latlng.lng],
        title: 'TBD',
      }]);
    }
  };

  return (
    <div style={{ height }}>
      <div className="control">
        <label className="radio">
          <input type="radio" name="foobar" value="STOPS" />
          Stops
        </label>
        <label className="radio">
          <input type="radio" name="foobar" value="ROUTE" checked />
          Route
        </label>
      </div>
      {markers.map(marker => (
        <>
          <p>{marker.title}</p>
          <p>{marker.position[0]}</p>
        </>
      ))}
      <MapContainer
        style={{
          height: "100%",
        }}
        center={center}
        zoom={15}
        scrollWheelZoom
      >
        <Map
          route={polyline}
          stops={markers}
          clickMap={handleMap}
        />
      </MapContainer>
    </div>
  );
}
