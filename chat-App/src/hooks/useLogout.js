import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../service/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.refetchQueries();
      toast.success("goodbye");
      navigate("login", { replace: true });
    },
  });
  return { logout, isLoading };
}
