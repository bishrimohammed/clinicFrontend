import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddEmployee = () => {
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/employee", data);
    },
    onSuccess: async (data) => {
      toast.success("added");
    },
    onError: async (error) => {
      toast.error(error.response.data.message);
    },
  });
};
