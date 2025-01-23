import { Button, Container, Menu } from "semantic-ui-react";

interface INavBarProps {
  handleFormOpen: (id?: string) => void;
}

export default function NavBar({ handleFormOpen }: INavBarProps) {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => handleFormOpen()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
