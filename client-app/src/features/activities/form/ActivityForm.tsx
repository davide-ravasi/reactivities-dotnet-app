import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useState } from "react";

interface IActivityFormProps {
  selectedActivity: Activity | undefined;
  handleFormClose: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
}

export default function ActivityForm({
  selectedActivity,
  handleFormClose,
  handleCreateOrEditActivity,
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
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleCreateOrEditActivity(activity)}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
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
