import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";


export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
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
        <button type="submit" className="button is-block is-primary is-fullwidth is-medium">Register</button>
      </Form>
    </main>
  );
}
