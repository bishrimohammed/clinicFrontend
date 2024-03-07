import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  return useMutation({
    mutationFn: async (userData) => {
      console.log(userData);
      return Axiosinstance.post(
        "/user/register",
        { userData },
        {
          ...header,
        }
      );
    },
    onSuccess: async (response) => {
      const { data } = response;
      console.log(data);
      toast.success("user added");
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
      <Navigate to="administrations/user/userlist" />;
      // console.log(variables);
    },
    onError: async (error) => {
      const { message } = error;
      const { data } = error.response;
      toast.error(data.message);
      console.log(data.message);
    },
  });
};
