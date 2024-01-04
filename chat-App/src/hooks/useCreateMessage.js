import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage as createMessageApi } from "../service/apiMessages";

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const { mutate: createMessage, isLoading } = useMutation({
    mutationFn: ({ sender_id, chat_id, message  }) =>
      createMessageApi({ sender_id, chat_id, message  }),
    onSuccess: (msg) => {
      queryClient.setQueryData(["message"], msg);
    },
  });

  return { createMessage, isLoading };
}
