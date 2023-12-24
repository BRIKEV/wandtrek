import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Card, CardContent, CardHeader } from "~/@ui/components/ui/card";
import Container from "~/components/Container/Container";
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
    <Container>
      <h1 className="font-bold text-xl mb-5">Your profile</h1>
      <div>
        <p>{user.email}</p>
        <p>{user.user_metadata.firstName} {user.user_metadata.lastName}</p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-3">Your tours</h3>
        <Button className="mb-3" asChild>
          <Link to="/profile/tour-create">New route</Link>
        </Button>
        <div>
          {tours.map(tour => (
            <Link key={tour.id} to={`/tour-edit/${tour.id}`}>
              <Card className="mb-3">
                <CardHeader>
                  <h5 className="font-bold text-lg">{tour.title}</h5>
                </CardHeader>
                <CardContent>
                  <p>{tour.summary}</p>
                  <p>{tour.createdAt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </Container>
  );
}
