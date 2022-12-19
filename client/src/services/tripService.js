import axios from "axios";
import { saveAs } from "file-saver";
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
    const temp = response.data.filter((x) => x.users[0] === id);
    return temp;
  });
};

const getTripById = (id) => {
  return axios.get(DATA_URL + `/trips/${id}`).then((response) => {
    return response.data;
  });
};

const createTrip = (body) => {
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
  console.log(id, body, "inside services");
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
  const attractionid = body;
  return axios
    .patch(DATA_URL + `/trips/${id}/attractions/remove/${attractionid}`)
    .then((response) => {
      return response.data;
    });
};

const addHotelToTrip = (id, body) => {
  const hotelId = body;
  return axios
    .patch(DATA_URL + `/trips/${id}/hotels/add/${hotelId}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

const removeHotelFromTrip = (id, body, visitDate) => {
  const hotelId = body;
  return axios
    .patch(DATA_URL + `/trips/${id}/hotels/remove/${hotelId}/${visitDate}`)
    .then((response) => {
      console.log(response, "response.data");
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
  const restaurantId = body;
  return axios
    .patch(DATA_URL + `/trips/${id}/restaurants/remove/${restaurantId}`)
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

  // const currUser = useContext(AuthContext);
  // const userId = currUser.uid;
  // console.log(userId);
  return axios
    .post(DATA_URL + `/trips/${tripId}/accept/${userId}`)
    .then((response) => {
      return response.data;
    });
};

const createPDF = (body) => {
  console.log(body, "inside services");
  return axios.post(DATA_URL + `/trips/trips/pdf`, body).then((response) => {
    return response.data;
  });
};
const fetchPDF = () => {
  return axios
    .get(DATA_URL + `/trips/fetch/pdf`, { responseType: "blob" })
    .then((response) => {
      console.log(response.data, "response.data");
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "newPdf.pdf");
    });
};

const exports = {
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
  createPDF,
  fetchPDF,
};

export default exports;
