import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../service/apiUsers";
export function useReceiver(recieverId) {
  const { isFetching, data: receiver } = useQuery({
    queryKey: ["receiver"],
    queryFn: () => getUserById(recieverId),
    
  });

  return { isFetching, receiver };
}
