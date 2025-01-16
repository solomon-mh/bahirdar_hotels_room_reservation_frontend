import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function useLogout() {
  const navigate = useNavigate();
  const { handleOpenModal, handleSetUserOnLogout } = useAuthContext();

  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: apiAuth.logout,
    onSuccess: async () => {
      handleSetUserOnLogout();
      // remove all queries:
      queryClient.removeQueries();
      // refetch all queries:
      // await queryClient.refetchQueries();

      toast.success("Logout successful");
      navigate("/", { replace: true });
      handleOpenModal();
    },
    onError: (err) => {
      if ("response" in err)
      {
        const {data: {message}} = err.response as {data: {message: string}};
        toast.error(message || "Logout failed with error");
      }
      toast.error("Logout faile please try again");
    },
  });

  return { logout, isPending };
}

export default useLogout;
