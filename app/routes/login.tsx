import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Input } from "~/@ui/components/ui/input";
import { Label } from "~/@ui/components/ui/label";
import Container from "~/components/Container/Container";
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
    <Container>
      <h1 className="font-bold text-xl mb-5">Login</h1>
      <Form method="POST">
        <div className="mb-3">
          <Label className="block mb-2" htmlFor="email">Your email address</Label>
          <Input type="email" placeholder="Email" id="email" name="email" />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="email">Your password</Label>
          <Input type="password" placeholder="Password" id="password" name="password" />
        </div>
        <div className="flex gap-x-2 items-start">
          <Button type="submit">Login</Button>
          <Button variant="secondary" asChild>
            <Link type="submit" to="/signup">Create account</Link>
          </Button>
        </div>
      </Form>
    </Container>
  );
}
