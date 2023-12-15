import type { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { Tour } from "~/components/Tour/Tour";
import { getTours } from "~/data/tours/tours.server";

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const tours = await getTours({ request, response });
  return tours;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  return (
    <main className="container">
      <h1 className="title is-1">Enjoy our {data.count} tours!</h1>
      {data.tours.map(tour => (
        <Tour
          key={tour.id}
          city={tour.city}
          country={tour.country}
          summary={tour.summary}
          title={tour.title}
        />
      ))}
    </main>
  );
}