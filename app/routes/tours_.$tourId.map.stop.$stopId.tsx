import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStop } from "~/data/tours/tours.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  if (!params.stopId) {
    return redirect('/404');
  }
  const stop = await getStop({ request, response }, params.stopId);
  return stop;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>();
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <h2 className="title is-2">{data.title}</h2>
        <figure className="image is-128x128">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </figure>
        <p>{data.description}</p>
      </div>
      <Link className="modal-close is-large" aria-label="close" to=".." />
    </div>
  );
}
