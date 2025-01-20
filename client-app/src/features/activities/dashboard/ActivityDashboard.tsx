import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import axios from "axios";
import { useState, useEffect } from "react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

export default function ActivityDashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();

  function handleSelectedActivity(id: string) {
    const activity = activities.find((x) => x.id === id);
    setSelectedActivity(activity);
  }

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
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
}
