import { Button } from "~/@ui/components/ui/button";
import { Card, CardHeader } from "~/@ui/components/ui/card";

interface Props {
  title: string;
  id?: string;
  position: number;
  removeStop: (position: number) => void;
}

const EditStopCard = ({ title, id, removeStop, position }: Props) => (
  <Card className="mb-3">
    <CardHeader>
      <h2>{title}</h2>
      <div className="flex gap-x-2 items-center justify-start">
        <Button size="icon" disabled={!id} onClick={() => removeStop(position)} className="text-xs">
          <span translate="no" className="material-symbols-outlined">edit</span>
        </Button>
        <Button size="icon" variant="destructive" onClick={() => removeStop(position)}>
          <span translate="no" className="material-symbols-outlined">delete</span>
        </Button>
      </div>
    </CardHeader>
  </Card>
);

export default EditStopCard;
