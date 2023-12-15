import type { LinksFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { Tour } from "~/components/Tour/Tour";
import { getTours } from "~/data/tours/tours.server";
import styles from "~/styles/tours.css";

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
    { rel: 'stylesheet', href: styles },
  ]
);


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const tours = await getTours({ request, response });
  return tours;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>();
  return (
    <main className="container">
      <h1 className="title is-1">Enjoy our tours!</h1>
      <div className="tour-list">
        {data.tours.map(tour => (
          <Link key={tour.id} to={`/tours/${tour.id}`}>
            <Tour
              city={tour.city}
              country={tour.country}
              summary={tour.summary}
              title={tour.title}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}