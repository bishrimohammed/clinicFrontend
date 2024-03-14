import { useMutation, useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
export const useUpdateClinicProfile = () => {
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return await Axiosinstance.put(
        `/clinicprofile/${data.id}`,
        data.formData
      ).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Clinic profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
