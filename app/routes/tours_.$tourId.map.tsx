import type { LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData, useOutletContext } from "@remix-run/react";
import { ClientOnly } from "~/components/ClientOnly/ClientOnly";
import { Map } from "~/components/Map/Map.client";
import { getTourCoordinates } from "~/data/tours/tours.server";
import { Context } from "./tours_.$tourId";

export const meta: MetaFunction = () => [
  {
    title: 'Tours',
  },
  {
    property: "og:title",
    content: "Tours",
  },
  {
    name: "description",
    content: "Discover best tours",
  },
];


export const links: LinksFunction = () => (
  [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css",
    },
  ]
);


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  if (!params.tourId) {
    return redirect('/404');
  }
  const tourCoordinates = await getTourCoordinates({ request, response }, params.tourId);
  return tourCoordinates;
};

export default function RouteComponent(){
  const mapHeight = "400px";
  const tourCoordinates = useLoaderData<typeof loader>();
  const context = useOutletContext<Context>();
  const firstStop = context.stops[0];
  const center: [number, number] = [
    firstStop.lat,
    firstStop.long,
  ];
  const stops: [number, number][] = context.stops.map(stop => ([
    stop.lat, stop.long,
  ]));
  const route: [number, number][] = tourCoordinates.map((coordinate) => ([
    coordinate.lat, coordinate.long,
  ]));
  return (
    <main className="container">
      <h1>Hola</h1>
      <ClientOnly>
        {() => (
          <Map
            height={mapHeight}
            center={center}
            stops={stops}
            route={route}
          />
        )}
      </ClientOnly>
    </main>
  );
}
