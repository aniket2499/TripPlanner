import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getFlights = () => {
  return axios.get(DATA_URL + "/flights").then((response) => {
    return response.data;
  });
};

export default {
  getFlights,
};
