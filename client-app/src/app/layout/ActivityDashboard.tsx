import { Grid } from "semantic-ui-react";
import { Activity } from "../models/activity";
import ActivityList from "./ActivityList";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ActivityDashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  );
}
