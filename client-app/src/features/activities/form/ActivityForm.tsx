import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useState } from "react";

interface IActivityFormProps {
  selectedActivity: Activity | undefined;
  handleFormClose: () => void;
}

export default function ActivityForm({
  selectedActivity,
  handleFormClose,
}: IActivityFormProps) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  // add handleinputchange function here
  // add handlesubmit function here

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={activity.title} />
        <Form.TextArea placeholder="Description" value={activity.description} />
        <Form.Input placeholder="Category" value={activity.category} />
        <Form.Input placeholder="Date" value={activity.date} />
        <Form.Input placeholder="City" value={activity.city} />
        <Form.Input placeholder="Venue" value={activity.venue} />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => handleFormClose()}
        />
      </Form>
    </Segment>
  );
}
