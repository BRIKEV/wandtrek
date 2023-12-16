import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { getTour } from "~/data/tours/tours.server";
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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return null;
};

export default function RouteComponent(){
  const tour = useLoaderData<typeof loader>();
  return (
    <main className="container">
      <h1>Hola</h1>
    </main>
  );
}
