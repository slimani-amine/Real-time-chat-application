import { useQuery } from "@tanstack/react-query";
import { getChatRooms } from "../service/apiChatRooms";

export function useChatRoom() {
  const { isLoading, data: chatRoom } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: getChatRooms,
  });
  return { isLoading, chatRoom };
}
