import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, MetaFunction, Outlet, useLoaderData } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Card, CardHeader, CardTitle } from "~/@ui/components/ui/card";
import Container from "~/components/Container/Container";
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
    <Container>
      <h1 className="font-bold text-4xl mb-5">{tour.title}</h1>
      <figure className="image is-128x128">
        <img src="https://bulma.io/images/placeholders/128x128.png" />
      </figure>
      <p>{tour.description}</p>
      <p>{tour.country} - {tour.city}</p>
      <div>
        {tour.stops.map(stop => (
          <Card className="mb-3" key={stop.id}>
            <CardHeader>
              <CardTitle>{stop.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Button asChild>
        <Link to={`/tours/${tour.id}/map`}>Start route</Link>
      </Button>
      <Outlet context={tour} />
    </Container>
  );
}
