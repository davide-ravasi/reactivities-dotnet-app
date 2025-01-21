import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useState } from "react";
import { Activity } from "../models/activity";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);

  function handleSelectedActivity(id: string) {
    const activity = activities.find((x) => x.id === id);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setActivities={setActivities}
          handleSelectedActivity={handleSelectedActivity}
          handleCancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </>
  );
}

export default App;
