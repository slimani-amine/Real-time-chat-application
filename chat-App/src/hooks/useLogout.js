// useLogout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      queryClient.setQueryData(["user"], null); 
      toast.success("Goodbye");
      navigate("login", { replace: true });
    },
  });

  return { logout, isLoading };
}
