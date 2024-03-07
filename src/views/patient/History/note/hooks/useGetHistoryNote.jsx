import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetHistoryNote = (historyId) => {
  return useQuery({
    queryKey: ["MedicalHistory", historyId, "note"],
    queryFn: async () =>
      Axiosinstance.get(`/patienthistory/${historyId}/gethistorynote`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 100,
    //retry: 1,
  });
};
