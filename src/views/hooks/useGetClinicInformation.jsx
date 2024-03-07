import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";

export const useGetClinicInformation = () => {
  return useQuery({
    queryKey: ["Clinic Information"],
    queryFn: async () =>
      Axiosinstance.get(`/clinicinfo`).then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000,
  });
};
