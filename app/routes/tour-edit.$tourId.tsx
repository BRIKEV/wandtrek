import type { ShouldRevalidateFunction } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, MetaFunction, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Input } from "~/@ui/components/ui/input";
import { Label } from "~/@ui/components/ui/label";
import { Textarea } from "~/@ui/components/ui/textarea";
import Container from "~/components/Container/Container";
import { getTour } from "~/data/tours/tours.server";
import { validateAuth } from "~/utils/auth.server";

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


export const shouldRevalidate: ShouldRevalidateFunction = ({ nextParams, nextUrl }) => {
  if (nextUrl.pathname.includes('/new')) return false;
  return true;
};


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  if (!params.tourId) {
    return redirect('/404');
  }
  const response = new Response();
  await validateAuth({ request, response });
  const tour = await getTour({ request, response }, params.tourId);
  return tour;
};

export default function RouteComponent(){
  const tour = useLoaderData<typeof loader>();
  const location = useLocation();
  const editMap = !location.pathname.includes('/map');
  return (
    <Container>
      <Form>
        <div className="mb-3">
          <Label className="block mb-2" htmlFor="title">Tour title</Label>
          <Input
            type="text"
            placeholder="Tour title"
            id="title"
            name="title"
            defaultValue={tour.title}
          />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="country">Country</Label>
          <Input
            type="text"
            placeholder="tour country"
            name="country"
            id="country"
            defaultValue={tour.country}
          />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="city">City</Label>
          <Input
            type="text"
            placeholder="tour city"
            name="city"
            id="city"
            defaultValue={tour.city}
          />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="description">Description</Label>
          <Textarea
            placeholder="tour description"
            name="description"
            id="description"
            defaultValue={tour.description}
          />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="image">Picture</Label>
          <Input
            type="file"
            name="image"
            id="image"
          />
        </div>
        <Button type="submit">Edit route info</Button>
      </Form>
      {editMap && (
        <Button asChild>
          <Link to={`/tour-edit/${tour.id}/map`} className="button is-primary is-medium">Edit map</Link>
        </Button>
      )}

      <Outlet context={tour} />
    </Container>
  );
}
