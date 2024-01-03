import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatRoom as createChatRoomApi } from "../service/apiChatRooms";

export function useCreateChatRoom() {
  const queryClient = useQueryClient();
  const { mutate: createChatRoom, isLoading } = useMutation({
    mutationFn: ({ senderId, receiverId }) => createChatRoomApi({senderId, receiverId }),
    onSuccess: (user) => {
      queryClient.setQueryData(["chatRoom"], user.user);
    },
  });

  return { createChatRoom, isLoading };
}
