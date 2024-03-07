import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export default function useGetProgressNote(historyId) {
  // console.log("useGetProgressNote");
  return useQuery({
    queryKey: ["MedicalHistory", historyId, "ProgressNote"],
    queryFn: async () =>
      Axiosinstance(`/patienthistory/progressnote/${historyId}`).then(
        (res) => res.data
      ),
    staleTime: 2 * 60 * 1000,
  });
}
