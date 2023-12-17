import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, MetaFunction, Outlet, useLoaderData } from "@remix-run/react";
import { getTour } from "~/data/tours/tours.server";

export const meta: MetaFunction = () => [
  {
    title: 'Tours',
  },
  {
    property: "og:title",
    content: "Tours",
  },
  {
    name: "description",
    content: "Discover best tours",
  },
];

export interface Context {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  image: string | null;
  created_at: string;
  stops: {
    id: string;
    title: string;
    lat: number;
    long: number;
  }[];
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return null;
};

export default function RouteComponent(){
  const tour = useLoaderData<typeof loader>();
  return (
    <main className="container">
      <Form>
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

        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="tour country"
              name="country"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="tour city"
              name="city"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Tour description"
              name="description"
            ></textarea>
          </div>
        </div>

        <div className="file is-boxed">
          <label className="file-label">
            <input className="file-input" type="file" name="resume" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>
      </Form>

      <Outlet context={tour} />
    </main>
  );
}
