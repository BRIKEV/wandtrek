import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { createDraftTour } from "~/data/tours/tours.server";
import { validateAuth } from "~/utils/auth.server";
import Modal from "~/components/Modal/Modal";
import { Button } from "~/@ui/components/ui/button";
import { Label } from "~/@ui/components/ui/label";
import { Input } from "~/@ui/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/@ui/components/ui/card";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  await validateAuth({ request, response });
  return null;
};


export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const form = await request.formData();
  const user = await validateAuth({ request, response });
  const { title } = Object.fromEntries(form) as { title: string };
  const newTour = await createDraftTour({ response, request }, title, user.id);
  return redirect(`/tour-edit/${newTour.id}`, { headers: response.headers });
};


export default function RouteComponent(){
  return (
    <Modal>
      <Card>
        <CardHeader>
          <CardTitle>Create a new route</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST">
            <div className="mb-3">
              <Label className="block mb-2" htmlFor="title">Tour title</Label>
              <Input type="text" placeholder="Tour title" id="title" name="title" />
            </div>
            <div className="flex gap-x-2 items-start">
              <Button type="submit">Create draft route</Button>
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
