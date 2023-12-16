import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, MetaFunction, Outlet, useLoaderData } from "@remix-run/react";
import { getTour } from "~/data/tours/tours.server";

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

export interface Context {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  image: string | null;
  created_at: string;
  stops: {
    id: string;
    title: string;
    lat: number;
    long: number;
  }[];
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  if (!params.tourId) {
    return redirect('/404');
  }
  const tour = await getTour({ request, response }, params.tourId);
  return tour;
};

export default function RouteComponent(){
  const tour = useLoaderData<typeof loader>();
  return (
    <main className="container">
      <h1 className="title is-1">{tour.title}</h1>
      <figure className="image is-128x128">
        <img src="https://bulma.io/images/placeholders/128x128.png" />
      </figure>
      <p>{tour.description}</p>
      <p>{tour.country} - {tour.city}</p>
      <ul>
        {tour.stops.map(stop => (
          <li key={stop.id}>{stop.title}</li>
        ))}
      </ul>
      <Link className="button is-primary" to={`/tours/${tour.id}/map`}>Load Map</Link>
      <Outlet context={tour} />
    </main>
  );
}
