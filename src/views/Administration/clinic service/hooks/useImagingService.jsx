import React from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useAddImagingService = () => {
  const navigate = useNavigate();
  const header = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(`/service/imagingservice`, data, {
        ...header,
      });
    },
    onSuccess: async () => {
      toast.success("Added succeessfully");
      queryClient.invalidateQueries({
        queryKey: ["Imaging Studies tests"],
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

export const useUpdateImagingService = () => {
  const { imagingId } = useParams();
  const header = AxiosHeaders();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/service/updateimagingService/${imagingId}`,
        data,
        {
          ...header,
        }
      );
    },
    onSuccess: async () => {
      toast.success("successfully updated", {});
      navigate("/administrations/services");
      queryClient.invalidateQueries({
        queryKey: ["Imaging Studies tests"],
        exact: true,
      });
      //navigate("/administrations/services");
    },
    onError: async (err) => {
      toast.error(err.response.data.message);
    },
  });
};
