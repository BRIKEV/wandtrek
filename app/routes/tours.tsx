import type { LinksFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import Container from "~/components/Container/Container";
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
  const data = useLoaderData<typeof loader>();
  return (
    <Container>
      <h1 className="font-bold text-xl mb-5">Enjoy our tours!</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
    </Container>
  );
}