import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getAllPlaces = () => {
  return axios.get(DATA_URL + "/places").then((response) => {
    return response.data;
  });
};

const getPlaceById = (id) => {
  return axios.get(DATA_URL + `/places/${id}`).then((response) => {
    return response.data;
  });
};

const createPlace = (body) => {
  return axios
    .post(DATA_URL + "/places/create", { body: body })
    .then((response) => {
      return response.data;
    });
};

const deletePlaceById = (id) => {
  return axios.delete(DATA_URL + `/places/delete/${id}`).then((response) => {
    return response.data;
  });
};

const updatePlaceById = (id, body) => {
  return axios
    .patch(DATA_URL + `/places/update/${id}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  deletePlaceById,
  updatePlaceById,
};

export default exports;
