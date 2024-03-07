import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddHistoryNote = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  //console.log(header);
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/patienthistory/physicalExam", data, {
        header,
      }).then((res) => res.data);
    },
    onSuccess: async (data, variables) => {
      toast.success("submitted successfully");
      console.log(variables.historyId);
      queryClient.invalidateQueries({
        queryKey: ["MedicalHistory", variables.historyId, "note"],
        exact: true,
      });
    },
    onError: async (err) => {
      toast.err(err.response.data.message);
    },
  });
};
