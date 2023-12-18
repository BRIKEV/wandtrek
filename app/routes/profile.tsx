import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUserTours } from "~/data/tours/tours.server";
import { validateAuth } from "~/utils/auth.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  const user = await validateAuth({ request, response });
  const tours = await getUserTours({ request, response }, user.id);
  
  return { user, tours };
};

export default function RouteComponent(){
  const { user, tours } = useLoaderData<typeof loader>();
  return (
    <main className="container">
      <div>
        <p>{user.email}</p>
        <p>{user.user_metadata.firstName} {user.user_metadata.lastName}</p>
      </div>
      <div>
        <h3 className="title is-3">Your tours</h3>
        <Link className="button is-primary" to="/profile/tour-create">New route</Link>
        <div>
          {tours.map(tour => (
            <div key={tour.id}>
              <h5 className="subtitle is-4">{tour.title}</h5>
              <p>{tour.summary}</p>
              <p>{tour.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </main>
  );
}
