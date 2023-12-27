import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Input } from "~/@ui/components/ui/input";
import { Label } from "~/@ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/@ui/components/ui/radio-group";
import Container from "~/components/Container/Container";
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
  return redirect('/tours', { headers: response.headers });
};

export default function RouteComponent(){
  return (
    <Container>
      <h1 className="font-bold text-xl mb-5">Create account</h1>
      <Form method="POST">
        <div className="mb-3">
          <Label className="block mb-2" htmlFor="firstName">First name</Label>
          <Input type="text" placeholder="First name" id="firstName" name="firstName" />
        </div>
        <div className="mb-3">
          <Label className="block mb-2" htmlFor="lastName">Last name</Label>
          <Input type="text" placeholder="Last name" id="lastName" name="lastName" />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="email">Your email address</Label>
          <Input type="email" placeholder="Email" id="email" name="email" />
        </div>

        <div className="mb-3">
          <Label className="block mb-2" htmlFor="email">Your password</Label>
          <Input type="password" placeholder="Password" id="password" name="password" />
        </div>

        <div className="mb-3">
          <RadioGroup name="type" defaultValue="USER">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USER" id="USER" />
              <Label htmlFor="USER">Tourist</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="GUIDE" id="GUIDE" />
              <Label htmlFor="GUIDE">Guide</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-x-2 items-start">
          <Button type="submit">Register</Button>
          <Button variant="secondary" asChild>
            <Link type="submit" to="/signup">Login</Link>
          </Button>
        </div>
      </Form>
    </Container>
  );
}
