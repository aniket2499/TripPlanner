import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getAllAttractions = () => {
  return axios.get(DATA_URL + "/attractions").then((response) => {
    return response.data;
  });
};

const getAttractionById = (id) => {
  return axios.get(DATA_URL + `/attractions/${id}`).then((response) => {
    return response.data;
  });
};

const createAttraction = (body) => {
  return axios
    .post(DATA_URL + "/attractions", { body: body })
    .then((response) => {
      return response.data;
    });
};
const deleteAttractionById = (id) => {
  return axios.delete(DATA_URL + `/attractions/${id}`).then((response) => {
    return response.data;
  });
};
const updateAttractionById = (id, body) => {
  return axios
    .patch(DATA_URL + `/attractions/${id}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const exports = {
  getAllAttractions,
  getAttractionById,
  createAttraction,
  deleteAttractionById,
  updateAttractionById,
};

export default exports;
