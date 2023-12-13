import type { LinksFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => [{
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
}];


export const links: LinksFunction = () => (
  [
    { rel: 'stylesheet', href: 'https://unpkg.com/cirrus-ui' }
  ]
);


export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
