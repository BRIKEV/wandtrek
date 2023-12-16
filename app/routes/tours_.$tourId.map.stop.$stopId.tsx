import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return null;
};

export default function RouteComponent(){
  return (
    <main className="container">
      Holaaa
      <Link className="button is-primary" to="..">Back</Link>
    </main>
  );
}
