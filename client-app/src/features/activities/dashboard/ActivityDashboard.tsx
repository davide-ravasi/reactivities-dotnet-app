import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import axios from "axios";
import { useEffect } from "react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setActivities: (activities: Activity[]) => void;
  handleFormOpen: (id?: string) => void;
  handleFormClose: () => void;
  handleSelectedActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  editMode,
  setActivities,
  handleFormOpen,
  handleFormClose,
  handleSelectedActivity,
  handleCancelSelectActivity,
}: IActivityDashboardProps) {
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, [setActivities]);
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && <ActivityForm handleFormClose={handleFormClose} />}
      </Grid.Column>
    </Grid>
  );
}
