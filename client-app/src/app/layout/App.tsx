import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "./ActivityDashboard";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default App;
