import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
const DATA_URL = "http://localhost:3001/api";

// const getAllTrips = () => {
//   return axios.get(DATA_URL + "/trips").then((response) => {
//     return response.data;
//   });
// };

const getAllTripsForCurrentUser = (id) => {
  return axios.get(DATA_URL + `/trips`).then((response) => {
    const temp = response.data.filter((x) => x.users[0] == id);
    return temp;
  });
};

const getTripById = (id) => {
  console.log("getTripById");
  return axios.get(DATA_URL + `/trips/${id}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const createTrip = (body) => {
  // console.log(body);
  const userId = body.id;
  return axios
    .post(DATA_URL + `/trips/create/${userId}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const deleteTripById = (id) => {
  return axios.delete(DATA_URL + `/trips/delete/${id}`).then((response) => {
    return response.data;
  });
};

const updateTripById = (id, body) => {
  return axios
    .patch(DATA_URL + `/trips/update/${id}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const addAttractionToTrip = (id, body) => {
  const attractionid = body.attractionId;
  return axios
    .patch(DATA_URL + `/trips/${id}/attractions/add/${attractionid}`, {
      body: body,
    })
    .then((response) => {
      return response.data;
    });
};

const removeAttractionFromTrip = (id, body) => {
  const attractionid = body.attractionId;
  return axios
    .patch(DATA_URL + `/trips/${id}/attractions/remove/${attractionid}`, {
      body: body,
    })
    .then((response) => {
      return response.data;
    });
};

const addHotelToTrip = (id, body) => {
  const hotelId = body.hotelId;
  return axios
    .patch(DATA_URL + `/trips/${id}/hotels/add/${hotelId}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const removeHotelFromTrip = (id, body) => {
  const hotelId = body.hotelId;
  return axios
    .patch(DATA_URL + `/trips/${id}/hotels/remove/${hotelId}`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const addRestaurantToTrip = (id, body) => {
  const restaurantId = body.restaurantId;
  return axios
    .patch(DATA_URL + `/trips/${id}/restaurants/add/${restaurantId}`, {
      body: body,
    })
    .then((response) => {
      return response.data;
    });
};

const removeRestaurantFromTrip = (id, body) => {
  const restaurantId = body.restaurantId;
  return axios
    .patch(DATA_URL + `/trips/${id}/restaurants/remove/${restaurantId}`, {
      body: body,
    })
    .then((response) => {
      return response.data;
    });
};

const inviteUserToTrip = (id, body) => {
  // console.log(id, "===");
  const trip_id = id;
  // console.log(body, "==");
  return axios
    .post(DATA_URL + `/trips/${trip_id}/invite`, { body: body })
    .then((response) => {
      return response.data;
    });
};

const acceptTripInvite = (trip, user) => {
  const tripId = trip.tripId;
  const userId = user.userId;
  console.log(userId, "-user");
  console.log(tripId, "=kjdbcjkb");
  // const currUser = useContext(AuthContext);
  // const userId = currUser.uid;
  // console.log(userId);
  return axios
    .post(DATA_URL + `/trips/${tripId}/accept/${userId}`)
    .then((response) => {
      return response.data;
    });
};

const exports = {
  // getAllTrips,

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
  getAllTripsForCurrentUser,
};

export default exports;
