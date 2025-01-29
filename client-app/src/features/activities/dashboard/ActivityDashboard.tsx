import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import { useEffect } from "react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import Agent from "../../../app/api/agent";

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
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
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
  handleCreateOrEditActivity,
  handleDeleteActivity,
}: IActivityDashboardProps) {
  useEffect(() => {
    Agent.Activities.list().then((response) => {
      const activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, [setActivities]);
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
          handleDeleteActivity={handleDeleteActivity}
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
        {editMode && (
          <ActivityForm
            selectedActivity={selectedActivity}
            handleFormClose={handleFormClose}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
