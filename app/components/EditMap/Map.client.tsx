import { LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet";

interface Stop {
  title: string;
  position: [number, number]
}

interface Props {
  stops: Stop[];
  route: [number, number][];
  clickMap: (event: LeafletMouseEvent) => void;
}

export function Map({ stops, route, clickMap }: Props) {
  useMapEvents({
    click(event) {
      clickMap(event)
    },
  });


  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops.map((stop, index) => (
        <Marker key={index} position={stop.position} />
      ))}
      <Polyline positions={route} />
    </>
  );
}
