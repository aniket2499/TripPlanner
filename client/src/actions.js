const addUser = (id) => ({
  type: "ADD_USER",
  payload: {
    id: id,
  },
});

const initializeUser = (id) => ({
  type: "INITIALIZE_USER",
  payload: {
    id: id,
  },
});

const getUser = () => ({
  type: "GET_USER",
});

const deleteUser = (id) => ({
  type: "DELETE_USER",
  payload: {
    id: id,
  },
});

const addAttraction = (
  location_id,
  name,
  latitude,
  longitude,
  num_reviews,
  category,
  address,
  image,
  description,
  rating,
  web_url,
  phone,
  website,
) => ({
  type: "ADD_ATTRACTION",
  payload: {
    location_id: location_id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    num_reviews: num_reviews,
    category: category,
    address: address,
    image: image,
    description: description,
    rating: rating,
    web_url: web_url,
    phone: phone,
    website: website,
  },
});

const deleteAttratcion = (id) => ({
  type: "DELETE_ATTRACTION",
  payload: {
    id: id,
  },
});

const addHotel = (obj) => ({
  type: "ADD_HOTEL",
  payload: {
    obj: obj,
  },
});

const deleteHotel = (location_id) => ({
  type: "DELETE_HOTEL",
  payload: {
    location_id: location_id,
  },
});

const binHotel = (tripId, location_id) => ({
  type: "BIN_HOTEL",
  payload: {
    tripId: tripId,
    location_id: location_id,
  },
});

const unbinHotel = (tripId, location_id) => ({
  type: "UNBIN_HOTEL",
  payload: {
    tripId: tripId,
    location_id: location_id,
  },
});

const addRest = (
  location_id,
  name,
  latitude,
  longitude,
  num_reviews,
  category,
  rating,
  web_url,
  address,
  price_level,
  image,
  description,
  phone,
  price,
  website,
) => ({
  type: "ADD_RESTAURANT",
  payload: {
    location_id: location_id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    num_reviews: num_reviews,
    category: category,
    rating: rating,
    web_url: web_url,
    address: address,
    price_level: price_level,
    image: image,
    description: description,
    phone: phone,
    price: price,
    website: website,
  },
});

const deleteRest = (id) => ({
  type: "DELETE_RESTAURANT",
  payload: {
    id: id,
  },
});

// adding a trip according to parameters from the form

const initializeTrip = (userId) => ({
  type: "INITIALIZE_TRIP",
  payload: {
    userId: userId,
  },
});

const addTrip = (obj) => ({
  type: "ADD_TRIP",
  payload: {
    obj: obj,
  },
});

const deleteTrip = (location_id) => ({
  type: "DELETE_TRIP",
  payload: {
    location_id: location_id,
  },
});

const addHotelToTripItinerary = (tripId, data, visitDate) => ({
  type: "ADD_HOTEL_TO_TRIP_ITINERARY",
  payload: {
    tripId: tripId,
    hotel: data,
    visitDate: visitDate,
  },
});

const deleteHotelFromTripItinerary = (tripId, hotelId, visitDate) => ({
  type: "DELETE_HOTEL_FROM_TRIP_ITINERARY",
  payload: {
    tripId: tripId,
    hotelId: hotelId,
    visitDate: visitDate,
  },
});

let exports = {
  addUser,
  deleteUser,
  addAttraction,
  deleteAttratcion,
  addHotel,
  deleteHotel,
  addRest,
  deleteRest,
  addTrip,
  deleteTrip,
  getUser,
  initializeUser,
  initializeTrip,
  binHotel,
  unbinHotel,
  addHotelToTripItinerary,
  deleteHotelFromTripItinerary,
};

export default exports;
