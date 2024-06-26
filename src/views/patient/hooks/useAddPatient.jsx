import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAddPatient = () => {
  const { headers } = AxiosHeaders();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/patient", data, { headers });
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);
      toast.success("Registered succeessfully");
      // navigate("/patients/patientlist");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message);
    },
  });
};
