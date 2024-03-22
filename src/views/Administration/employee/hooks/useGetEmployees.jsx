import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["Employees"],
    queryFn: async () => {
      console.log("fetched");
      return Axiosinstance.get("/employee").then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 day in ms
  });
};
