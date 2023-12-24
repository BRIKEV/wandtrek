import { useState } from "react";
import { MapContainer } from "react-leaflet";
import { Map } from './Map.client';
import { LeafletMouseEvent } from "leaflet";
import { RadioGroup, RadioGroupItem } from "~/@ui/components/ui/radio-group";
import { Label } from "~/@ui/components/ui/label";
import { Card, CardHeader, CardTitle } from "~/@ui/components/ui/card";

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
    <div>
      <h1 className="font-bold text-xl mb-5">Modify your map</h1>
      <div className="flex gap-x-2">
        <div className="w-3/12">
          <div className="mb-3">
            <RadioGroup defaultValue="ROUTE">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="STOPS" id="STOPS" />
                <Label htmlFor="STOPS">Modify stops</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ROUTE" id="ROUTE" />
                <Label htmlFor="ROUTE">Modify route</Label>
              </div>
            </RadioGroup>
          </div>
          <h3 className="font-bold text-lg mb-3">Stops</h3>
          {markers.map(marker => (
            <Card className="mb-3">
              <CardHeader>
                <h2>{marker.title}</h2>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="w-9/12">
          <MapContainer
            className="min-h-96"
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
      </div>
    </div>
  );
}
