import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface IActivityListProps {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({
  activities,
  handleSelectedActivity,
  handleDeleteActivity,
}: IActivityListProps) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  content="View"
                  color="blue"
                  floated="right"
                  onClick={() => handleSelectedActivity(activity.id)}
                />
                <Button
                  content="Delete"
                  color="red"
                  floated="right"
                  onClick={() => handleDeleteActivity(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
