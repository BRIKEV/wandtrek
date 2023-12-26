import { useState } from "react";
import { MapContainer } from "react-leaflet";
import { Map } from './Map.client';
import { LeafletMouseEvent } from "leaflet";
import { RadioGroup, RadioGroupItem } from "~/@ui/components/ui/radio-group";
import { Label } from "~/@ui/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/@ui/components/ui/card";
import { Button } from "~/@ui/components/ui/button";
import EditStopCard from "../EditStopCard/EditStopCard";

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
  saveMapConfig: (stops:  Stop[], route: [number, number][]) => void;
}

enum MAP_OPTIONS {
  STOPS = 'STOPS',
  ROUTE = 'ROUTE',
}

export function EditMap({ center, stops, route, saveMapConfig }: Props) {
  const [markers, setMarkers] = useState<Stop[]>(stops);
  const [option, setOption] = useState<MAP_OPTIONS>(MAP_OPTIONS.STOPS);
  const [polyline, setPolyline] = useState<[number, number][]>(route);

  const handleMap = (event: LeafletMouseEvent) => {
    if (option === MAP_OPTIONS.ROUTE) {
      setPolyline([...polyline, [event.latlng.lat, event.latlng.lng]]);
    } else if (option === MAP_OPTIONS.STOPS) {
      setMarkers([...markers, {
        position: [event.latlng.lat, event.latlng.lng],
        title: 'TBD',
      }]);
    }
  };

  const handleOption = (value: MAP_OPTIONS) => {
    setOption(value);
  };

  const removeBasedOnOption = (position: number) => {
    if (option === MAP_OPTIONS.ROUTE) {
      const newRoute = polyline.filter((_, index) => index !== position);
      setPolyline(newRoute);
    } else if (option === MAP_OPTIONS.STOPS) {
      const newMarkers = markers.filter((_, index) => index !== position);
      setMarkers(newMarkers);
    }
  };

  return (
    <div>
      <hr className="mb-4" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl mb-5">Modify your map</h1>
        <Button type="button" onClick={() => saveMapConfig(markers, polyline)}>Save configuration</Button>
      </div>
      <div className="flex gap-x-2">
        <div className="w-3/12">
          <div className="mb-3">
            <RadioGroup
              onValueChange={handleOption}
              value={option}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={MAP_OPTIONS.STOPS} id="STOPS" />
                <Label htmlFor="STOPS">Modify stops</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={MAP_OPTIONS.ROUTE} id="ROUTE" />
                <Label htmlFor="ROUTE">Modify route</Label>
              </div>
            </RadioGroup>
          </div>
          {option === MAP_OPTIONS.ROUTE ? (
            <>
              <h3 className="font-bold text-lg mb-3">Route</h3>
              {polyline.reverse().map((point, index) => (
                <Card>
                  <CardContent>
                    <div className="my-3 flex gap-x-2 items-center justify-between">
                      <h4 className="text-lg font-bold">Position {index + 1}</h4>
                      <Button size="icon" variant="destructive" onClick={() => removeBasedOnOption(index)}>
                        <span translate="no" className="material-symbols-outlined">delete</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-3">Stops</h3>
              {markers.map((marker, index) => (
                <EditStopCard
                  key={index}
                  id={marker.id}
                  title={marker.title}
                  position={index}
                  removeStop={removeBasedOnOption}
                />
              ))}
            </>
          )}
        </div>
        <div className="w-9/12">
          <MapContainer
            className="min-h-[30rem]"
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
