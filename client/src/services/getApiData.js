import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getHotelData = (location, page) => {
  return axios
    .get(DATA_URL + `/hotels/data/?location=${location}&pg=${page}`)
    .then((response) => {
      return response.data;
    });
};

const mock = async () => {
  console.log("mock");
  let url = DATA_URL + "/restaurants/mock";
  let data = { name: "Nirav Jain", friend: "Deep Manek" };

  let data2 = await axios.post(url, data).then((res) => {
    console.log(res);
    console.log(res.data);
  });
};

const getRestaurantData = (location, page, rating) => {
  return axios
    .get(
      DATA_URL +
        `/restaurants/data/?location=${location}&pg=${page}&rating=${rating}`
    )
    .then((response) => {
      return response.data;
    });
};

const getAttractionsData = (location, page, rating) => {
  return axios
    .get(
      DATA_URL +
        `/attractions/data/?location=${location}&pg=${page}&rating=${rating}`
    )
    .then((response) => {
      return response.data;
    });
};
export default { getHotelData, getRestaurantData, getAttractionsData, mock };
