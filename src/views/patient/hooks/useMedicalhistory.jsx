import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
export default function useMedicalHistory(historyId) {
  // console.log("useMedicalHistory");
  return useQuery({
    queryKey: ["MedicalHistory", historyId],
    queryFn: async () =>
      Axiosinstance.get(`/patienthistory/${historyId}`).then((res) => res.data),
    staleTime: 20 * 60 * 1000,
  });
}
