import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Card, CardContent } from "~/@ui/components/ui/card";
import { getStop } from "~/data/tours/tours.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();
  if (!params.stopId) {
    return redirect('/404');
  }
  const stop = await getStop({ request, response }, params.stopId);
  return stop;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>();
  const speak = (message: string) => {
    const msg = new SpeechSynthesisUtterance();
    // Set voice (if available)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      msg.voice = voices.find((voice) => voice.lang === 'en-US') || voices[0];
    }

    // Set volume (0 to 1)
    msg.volume = 1;

    // Set speech rate (0.1 to 10)
    msg.rate = 1;

    // Set language
    msg.lang = 'en-US';

    // Set pitch (0 to 2)
    msg.pitch = 1;
    msg.text = message;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <Card className="z-[1] w-screen max-w-4xl">
        <CardContent>
          <h2 className="font-bold text-lg">{data.title}</h2>
          <figure>
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </figure>
          <p>{data.description}</p>
          <div className="flex gap-x-2 items-start">
            <Button type="button" className="button is-primary" onClick={() => speak(data.description)}>
              Play
            </Button>
            <Button variant="secondary" asChild>
              <Link to="..">Back</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
