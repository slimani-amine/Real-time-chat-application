import { getChatRoom } from "../service/apiChatRooms";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useGetChatRoom() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: chatRoom, isLoading } = useMutation({
    mutationFn: getChatRoom,
    onSuccess: (user) => {
      queryClient.setQueryData(["chatRoom"], user.user);
    },
    onError: (err) => {
      toast.error("cannot find chatRoom");
    },
  });

  return { isLoading, chatRoom };
}
