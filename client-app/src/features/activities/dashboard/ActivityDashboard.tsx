import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import { useEffect, useState } from "react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import Agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //setLoading(true);
    Agent.Activities.list().then((response) => {
      const activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setLoading(false);
      setActivities(activities);
    });
  }, [setActivities]);
  return (
    <>
      {loading ? (
        <LoadingComponent message={"loading activities..."} />
      ) : (
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
      )}
    </>
  );
}
