import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useAddLabOrder = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();

  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/lab", data, header);
    },
    onSuccess: async (data, variables) => {
      const { data: resData } = data;

      console.log(resData.medicalId._id);
      queryClient.invalidateQueries({
        queryKey: [
          "MedicalHistory",
          resData.medicalId._id,
          "Ordered Lab Investigations",
        ],
        exact: true,
      });
      toast.success("investigations successfully submited");
    },
    onError: (error) => {
      // handle error
      console.log("on error");
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};
