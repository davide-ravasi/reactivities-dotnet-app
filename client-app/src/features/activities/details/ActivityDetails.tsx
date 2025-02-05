import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface IActivityDetailsProps {
  activity: Activity;
  handleFormOpen: (id: string) => void;
  handleCancelSelectActivity: () => void;
}

export default function ActivityDetails({
  activity,
  handleFormOpen,
  handleCancelSelectActivity,
}: IActivityDetailsProps) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>{activity.date}</Card.Meta>
        <Card.Description>
          {activity.description}
          <div>
            {activity.city}, {activity.venue}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => handleFormOpen(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => handleCancelSelectActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

// can you give me backticks
// example of backticks
// ```
