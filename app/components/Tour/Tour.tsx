import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/@ui/components/ui/card";

interface Props {
  title: string;
  summary: string;
  country: string;
  city: string;
}

export const Tour = ({ title, summary, country, city }: Props) => (
  <Card>
    <div>
      <figure>
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
      </figure>
    </div>
    <CardHeader className="media">
      <CardTitle className="title is-4">{title}</CardTitle>
    </CardHeader>

    <CardContent>
      <CardDescription>
        <p>{summary}</p>
        <p>{country} - {city}</p>
      </CardDescription>
    </CardContent>
  </Card>
);
