import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getAllHotels = () => {
  return axios.get(DATA_URL + "/hotels").then((response) => {
    return response.data;
  });
};
const getHotelById = (id) => {
  return axios.get(DATA_URL + `/hotels/${id}`).then((response) => {
    return response.data;
  });
};

const createHotel = (body) => {
  return axios
    .post(DATA_URL + "/hotels/create", { body: body })
    .then((response) => {
      return response.data;
    });
};
const deleteHotelById = (id) => {
  return axios.delete(DATA_URL + `/hotels/delete/${id}`).then((response) => {
    return response.data;
  });
};
const updateHotelById = (id, body) => {
  return axios
    .patch(DATA_URL + `/hotels/update/${id}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  deleteHotelById,
  updateHotelById,
};

export default exports;
