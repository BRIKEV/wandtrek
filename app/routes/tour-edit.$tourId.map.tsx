import type { ActionFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, useFetcher, useRouteError, useSubmit } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { ClientOnly } from "~/components/ClientOnly/ClientOnly";
import { createCoordinates, getTourCoordinates } from "~/data/tours/tours.server";
import { Context } from "./tour-edit.$tourId";
import { EditMap } from "~/components/EditMap/EditMap.client";
import { validateAuth } from "~/utils/auth.server";

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
  await validateAuth({ request, response });
  const tourCoordinates = await getTourCoordinates({ request, response }, params.tourId);
  return tourCoordinates;
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const response = new Response();
  const tourId = params.tourId;
  if (!tourId) {
    return redirect('/404');
  }
  await validateAuth({ request, response });
  const body = await request.json() as {
    route: [number, number][];
  };
  await createCoordinates({ request, response }, tourId, body.route);
  return null;
};

export function ErrorBoundary(){
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function RouteComponent(){
  const tourCoordinates = useLoaderData<typeof loader>();
  const submit = useSubmit()
  const context = useOutletContext<Context>();
  const firstStop = context.stops[0] || {
    lat: 51.505,
    long: -0.09
  };
  const center: [number, number] = [
    firstStop.lat,
    firstStop.long,
  ];
  const stops = context.stops.map(stop => ({
    id: stop.id,
    title: stop.title,
    position: [
      stop.lat, stop.long,
    ] as [number, number]
  }));
  const route: [number, number][] = tourCoordinates.map((coordinate) => ([
    coordinate.lat, coordinate.long,
  ]));
  return (
    <div className="my-5">
      <ClientOnly>
        {() => (
          <EditMap
            center={center}
            stops={stops}
            route={route}
            saveMapConfig={(_, route) => {
              submit({ route }, {
                method: 'POST',
                encType: 'application/json',
              });
            }}
          />
        )}
      </ClientOnly>
      <Outlet />
    </div>
  );
}
