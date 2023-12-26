import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/@ui/components/ui/card";
import { Input } from "~/@ui/components/ui/input";
import { Label } from "~/@ui/components/ui/label";
import { Textarea } from "~/@ui/components/ui/textarea";
import Modal from "~/components/Modal/Modal";
import { createStop, getStop } from "~/data/tours/tours.server";
import { validateAuth } from "~/utils/auth.server";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const response = new Response();
  const user = await validateAuth({ request, response });
  const form = await request.formData();
  const { 
    title,
    description,
  } = Object.fromEntries(form);
  const tourId = params.tourId as string;
  const order = url.searchParams.get('order');
  const lat = url.searchParams.get('lt');
  const long = url.searchParams.get('lg');
  if (!order || !lat || !long) throw new Error('Missing params');
  const stop = await createStop({ request, response }, tourId, {
    title: title.toString().trim(),
    description: description.toString().trim(),
    order: parseInt(order, 10),
    lat: parseFloat(lat),
    long: parseFloat(long),
  });
  return redirect(`/tour-edit/${tourId}/map`, { headers: response.headers });
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  const stopId = params.stopId;
  if (!stopId) {
    return redirect('/404');
  }
  await validateAuth({ request, response });
  if (stopId === 'new') return null;
  const stop = await getStop({ request, response }, stopId);
  return stop;
};

export default function RouteComponent(){
  const stop = useLoaderData<typeof loader>();
  return (
    <Modal>
      <Card>
        <CardHeader>
          <CardTitle>Stop editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST">
            <div className="mb-3">
              <Label className="block mb-2" htmlFor="title">Stop title</Label>
              <Input type="text" placeholder="Stop title" id="title" name="title" defaultValue={stop?.title} />
            </div>
            <div className="mb-3">
              <Label className="block mb-2" htmlFor="description">Stop description</Label>
              <Textarea
                placeholder="Stop description"
                id="description"
                name="description"
                defaultValue={stop?.description}
              />
            </div>
            <div className="flex gap-x-2 items-start">
              <Button type="submit">Create stop</Button>
              <Button variant="secondary" asChild>
                <Link to="..">Back</Link>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </Modal>
  );
}
