import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useEditEmployee = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await Axiosinstance.put(
        `/employee/${data.id}`,
        data.formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
