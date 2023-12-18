import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { createDraftTour } from "~/data/tours/tours.server";
import { validateAuth } from "~/utils/auth.server";

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
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <Form method="POST">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="tour title"
                name="title"
              />
            </div>
          </div>
          <button type="submit" className="button is-block is-primary is-medium">Create draft</button>
        </Form>
      </div>
      <Link className="modal-close is-large" aria-label="close" to=".." />
    </div>
  );
}
