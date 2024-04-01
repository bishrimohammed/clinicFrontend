import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetEmployees = (query) => {
  console.log(query);
  const queryString = Object.keys(query)
    .map((key) => `${encodeURIComponent(key)}=${query[key]}`)
    .join("&");
  console.log(queryString);
  return useQuery({
    queryKey: [
      "Employees",
      { status: query.status, position: query.position, gender: query.gender },
    ],
    queryFn: async () => {
      console.log("fetched");
      return Axiosinstance.get(`/employee`, {
        params: query,
      }).then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 day in ms
  });
};
