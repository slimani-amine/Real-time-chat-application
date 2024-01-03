import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUserChat } from "../service/apiUsers";

export function useUpdateUserChat() {
  const queryClient = useQueryClient();
  const { mutate: updateUserChat, isLoading: isUpadating } = useMutation({
    mutationFn: updateCurrentUserChat,
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpadating, updateUserChat };
}
