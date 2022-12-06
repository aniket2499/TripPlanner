import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getHotelData = (location, page) => {
  return axios
    .get(DATA_URL + `/hotels/data/${location}/${page}`)
    .then((response) => {
      return response.data;
    });
};

const getRestaurantData = (location, page, rating) => {
  return axios
    .get(DATA_URL + `/restaurants/data/${location}/${page}/${rating}`)
    .then((response) => {
      return response.data;
    });
};

const getAttractionsData = (location, page, rating) => {
  return axios
    .get(DATA_URL + `/attractions/data/${location}/${page}/${rating}`)
    .then((response) => {
      return response.data;
    });
};
export default { getHotelData, getRestaurantData, getAttractionsData };
