import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { emailPasswordSignUp } from "~/data/auth/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const { email, password } = Object.fromEntries(await request.formData());
  await emailPasswordSignUp({ request, response }, {
    email: email.toString().trim().toLowerCase(),
    password: password.toString().trim(),
  });
  return null;
};

export default function RouteComponent(){
  return (
    <main className="container">
      <h1 className="title is-1">Signup</h1>
      <Form method="POST">
        <div className="field">
          <div className="control">
            <input className="input is-medium" type="email" placeholder="Email" id="email" name="email" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input is-medium" type="password" placeholder="Password" id="password" name="password" />
          </div>
        </div>
        <button type="submit" className="button is-block is-primary is-fullwidth is-medium">Register</button>
      </Form>
    </main>
  );
}
