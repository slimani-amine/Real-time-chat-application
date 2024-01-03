import UserLayout from "../components/layouts/UserLayout";
import { useReceiver } from "../hooks/useReceiver";
import Spinner from "./Spinner";

export default function Contact() {
  const { isFetching, receiver } = useReceiver();

  if (isFetching) {
    return <Spinner />;
  }
  return <UserLayout user={receiver && receiver[0]} />;
}
