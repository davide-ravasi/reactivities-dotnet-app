import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Activity } from "../models/activity";
import Agent from "../api/agent";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSelectedActivity(id: string) {
    const activity = activities.find((x) => x.id === id);
    setSelectedActivity(activity);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  // handleCreateOrEditActivity function here
  // check if id exists, if not, then create new activity
  // create or edit in state for now
  // close form and open activity details
  // installing guid package
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      Agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      Agent.Activities.create(newActivity).then(() => {
        setActivities([...activities, newActivity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((activity) => activity.id != id)]);
  }

  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          editMode={editMode}
          submitting={submitting}
          setEditMode={setEditMode}
          setActivities={setActivities}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          handleSelectedActivity={handleSelectedActivity}
          handleCancelSelectActivity={handleCancelSelectActivity}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
