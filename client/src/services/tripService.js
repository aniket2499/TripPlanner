import axios from "axios";
const DATA_URL = "http://localhost:3001/api";

const getAllTrips = () => {
  return axios.get(DATA_URL + "/trips").then((response) => {
    return response.data;
  });
};

const getTripById = (id) => {
  return axios.get(DATA_URL + `/trips/${id}`).then((response) => {
    return response.data;
  });
};

const createTrip = (body) => {
  return axios.post(DATA_URL + "/trips", { body: body }).then((response) => {
    return response.data;
  });
};

const deleteTripById = (id) => {
  return axios.delete(DATA_URL + `/trips/${id}`).then((response) => {
    return response.data;
  });
};

const updateTripById = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const addAttractionToTrip = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}/attractions`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const removeAttractionFromTrip = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}/attractions/remove`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const addHotelToTrip = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}/hotels`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const removeHotelFromTrip = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}/hotels/remove`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const addRestaurantToTrip = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}/restaurants`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const removeRestaurantFromTrip = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/${id}/restaurants/remove`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const inviteUserToTrip = (id, body) => {
  return axios
    .post(DATA_URL + `/trips/${id}/invite`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const acceptTripInvite = (id, body) => {
  return axios
    .post(DATA_URL + `/trips/${id}/accept`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const exports = {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTripById,
  updateTripById,
  addAttractionToTrip,
  removeAttractionFromTrip,
  addHotelToTrip,
  removeHotelFromTrip,
  addRestaurantToTrip,
  removeRestaurantFromTrip,
  inviteUserToTrip,
  acceptTripInvite,
};

export default exports;
