import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUser as insertUserApi } from "../service/apiUsers";
import { useNavigate } from "react-router-dom";

export function useInsertUser() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: insertUser, isLoading } = useMutation({
    mutationFn: ({ fullName, userId }) => insertUserApi({ fullName, userId }),
    onSuccess: (user) => {
      queryClient.setQueryData(["users"], user.user);
      navigate("/", { replace: true });
    },
  });

  return { insertUser, isLoading };
}
