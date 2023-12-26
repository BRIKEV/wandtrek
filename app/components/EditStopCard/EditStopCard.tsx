import { Link } from "@remix-run/react";
import { Button } from "~/@ui/components/ui/button";
import { Card, CardHeader } from "~/@ui/components/ui/card";

interface Props {
  title: string;
  id?: string;
  order: number;
  position: [number, number];
  removeStop: (order: number) => void;
}

const EditStopCard = ({ title, id, removeStop, order, position }: Props) => (
  <Card className="mb-3">
    <CardHeader>
      <h2>{order + 1}. {title}</h2>
      <div className="flex gap-x-2 items-center justify-start">
        <Button size="icon" className="text-xs" asChild>
          <Link to={`stop-edit/${id || `new?order=${order}&lt=${position[0]}&lg=${position[1]}`}`}>
            <span translate="no" className="material-symbols-outlined">edit</span>
          </Link>
        </Button>
        <Button size="icon" variant="destructive" onClick={() => removeStop(order)}>
          <span translate="no" className="material-symbols-outlined">delete</span>
        </Button>
      </div>
    </CardHeader>
  </Card>
);

export default EditStopCard;
