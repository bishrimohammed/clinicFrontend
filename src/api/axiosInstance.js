import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
//console.log(apiUrl);
const Axiosinstance = axios.create({
  baseURL: apiUrl,
});

//console.log(instance);
export default Axiosinstance;
