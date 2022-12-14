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

const addAttraction = (
  location_id,
  name,
  latitude,
  longitude,
  rating,
  web_url,
  address,
  image,
) => ({
  type: "ADD_ATTRACTION",
  payload: {
    location_id: location_id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    rating: rating,
    web_url: web_url,
    address: address,
    image: image,
  },
});

const deleteAttratcion = (location_id) => ({
  type: "DELETE_ATTRACTION",
  payload: {
    location_id: location_id,
  },
});

const addHotel = (
  location_id,
  name,
  latitude,
  longitude,
  imageUrl,
  rating,
) => ({
  type: "ADD_HOTEL",
  payload: {
    location_id: location_id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    rating: rating,
    imageUrl: imageUrl,
  },
});

const deleteHotel = (location_id) => ({
  type: "DELETE_HOTEL",
  payload: {
    location_id: location_id,
  },
});

const addRest = (
  location_id,
  name,
  latitude,
  longitude,
  rating,
  web_url,
  address,
  price_level,
  image,
) => ({
  type: "ADD_RESTAURANT",
  payload: {
    location_id: location_id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    rating: rating,
    web_url: web_url,
    address: address,
    price_level: price_level,
    image: image,
  },
});

const deleteRest = (location_id) => ({
  type: "DELETE_RESTAURANT",
  payload: {
    location_id: location_id,
  },
});

// adding a trip according to parameters from the form

const initializeTrip = () => ({
  type: "INITIALIZE_TRIP",
});

const addTrip = (
  trip_id,
  cur_location,
  destination,
  startDate,
  endDate,
  destination_lat,
  destination_long,
  userId,
  tripName,
) => ({
  type: "ADD_TRIP",
  payload: {
    trip_id: trip_id,
    cur_location: cur_location,
    destination: destination,
    startDate: startDate,
    endDate: endDate,
    destination_lat: destination_lat,
    destination_long: destination_long,
    userId: userId,
    tripName: tripName,
  },
});

const deleteTrip = (location_id) => ({
  type: "DELETE_TRIP",
  payload: {
    location_id: location_id,
  },
});

let exports = {
  addUser,
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
};

export default exports;
