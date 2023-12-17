import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { UserType, emailPasswordSignUp } from "~/data/auth/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const { email, password, firstName, lastName, type } = Object.fromEntries(await request.formData());
  await emailPasswordSignUp({ request, response }, {
    email: email.toString().trim().toLowerCase(),
    password: password.toString().trim(),
    firstName: firstName.toString().trim(),
    lastName: lastName.toString().trim(),
    type: type.toString().trim() as UserType,
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
            <input className="input is-medium" type="text" placeholder="First name" id="firstName" name="firstName" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input is-medium" type="text" placeholder="Last name" id="lastName" name="lastName" />
          </div>
        </div>

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

        <div className="field">
          <div className="control">
            <label className="radio">
              <input type="radio" name="type" value="USER" />
              User
            </label>
            <label className="radio">
              <input type="radio" name="type" value="GUIDE" checked />
              Guide
            </label>
          </div>
        </div>
        <button type="submit" className="button is-block is-primary is-fullwidth is-medium">Register</button>
      </Form>
    </main>
  );
}
