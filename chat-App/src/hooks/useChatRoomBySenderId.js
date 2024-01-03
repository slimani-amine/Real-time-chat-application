import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getChatRoomBySenderId } from "../service/apiChatRooms";

export function useChatRoomBySenderId() {
  const queryClient = useQueryClient();
  const { mutate: chatRoomBySenderId, isLoading } = useMutation({
    mutationFn: (userId) => getChatRoomBySenderId(userId),
    onSuccess: (user) => {
      queryClient.setQueryData(["chatroom"], chatRoomBySenderId);
    },
  });
  console.log(chatRoomBySenderId);
  return { chatRoomBySenderId, isLoading };
}
