import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
//import Axiosinstance from "../../api/axiosInstance";

export const useGetLabCompleted = () => {
  return useQuery({
    queryKey: ["lab completed"],
    queryFn: async () =>
      Axiosinstance.get(`/lab/completed`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
