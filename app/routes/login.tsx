import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { emailPasswordLogin } from "~/data/auth/auth.server";


export const action = async ({ request }: ActionFunctionArgs) => {
  const response = new Response();
  const { email, password } = Object.fromEntries(await request.formData());
  await emailPasswordLogin({ request, response }, {
    email: email.toString().trim().toLowerCase(),
    password: password.toString().trim(),
  });
  return redirect('/tours', { headers: response.headers });
};

export default function RouteComponent(){
  return (
    <main className="container">
      <h1 className="title is-1">Login</h1>
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
        <button type="submit" className="button is-block is-primary is-fullwidth is-medium">Login</button>
        <Link type="submit" className="button is-block is-secondary is-fullwidth is-medium" to="/signup">Create account</Link>
      </Form>
    </main>
  );
}
