import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
//import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useAddLabService = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const header = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(`/service/labservice`, data, {
        ...header,
      });
    },
    onSuccess: async () => {
      toast.success("Added succeessfully");
      queryClient.invalidateQueries({
        queryKey: ["laboratoryTests", "pricing"],
        exact: true,
      });
      navigate("/administrations/services");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message, {});
    },
  });
};

export const useUpdateLabService = () => {
  const navigate = useNavigate();
  const { labId } = useParams();
  const header = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(`/service/updatelabService/${labId}`, data, {
        ...header,
      });
    },
    onSuccess: async () => {
      toast.success("successfully updated", {});
      queryClient.invalidateQueries({
        queryKey: ["laboratoryTests", "pricing"],
        exact: true,
      });
      navigate("/administrations/services");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message, {});
    },
  });
};
