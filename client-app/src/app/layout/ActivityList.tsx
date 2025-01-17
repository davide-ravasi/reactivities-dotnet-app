import { List } from "semantic-ui-react";
import { Activity } from "../models/activity";

interface ActivityListProps {
  activities: Activity[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <List>
      {activities.map((activity) => (
        <List.Item key={activity.id}>{activity.title}</List.Item>
      ))}
    </List>
  );
}
