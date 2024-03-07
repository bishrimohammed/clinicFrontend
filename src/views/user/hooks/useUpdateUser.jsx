import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

export const useUpdateUser = () => {
  const header = AxiosHeaders();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  //console.log(userId);
  return useMutation({
    mutationFn: async (userData) => {
      //console.log(userData);
      return Axiosinstance.put(`/user/${userId}`, userData, {
        ...header,
      });
    },
    onSuccess: async (response, variables) => {
      const { data } = response;
      // console.log(data);
      toast.success("user Updated");
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
