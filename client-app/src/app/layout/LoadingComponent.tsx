import { Dimmer, Loader } from "semantic-ui-react";

interface ILoadingComponent {
  message: string;
  inverted?: boolean;
}

export default function LoadingComponent({
  message,
  inverted = true,
}: ILoadingComponent) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader>{message}</Loader>
    </Dimmer>
  );
}
