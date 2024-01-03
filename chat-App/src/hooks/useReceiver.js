import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../service/apiUsers";
import { useLocation } from "react-router-dom";

export function useReceiver() {
  const location = useLocation();
  const receiverId = location.pathname.split("/").pop();

  const { isFetching, data: receiver } = useQuery({
    queryKey: ["receiver", receiverId],
    queryFn: () => getUserById(receiverId),
  });

  return { isFetching, receiver };
}
