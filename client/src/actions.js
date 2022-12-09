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

const addTrip = (
  name,
  userId,
  cur_location,
  destination,
  destination_lat,
  destination_long,
  start_date,
  end_date,
) => ({
  type: "ADD_TRIP",
  payload: {
    name: name,
    userId: userId,
    cur_location: cur_location,
    destination: destination,
    destination_lat: destination_lat,
    destination_long: destination_long,
    start_date: start_date,
    end_date: end_date,
  },
});

const deleteTrip = (location_id) => ({
  type: "DELETE_TRIP",
  payload: {
    location_id: location_id,
  },
});

let exports = {
  addAttraction,
  deleteAttratcion,
  addHotel,
  deleteHotel,
  addRest,
  deleteRest,
  addTrip,
  deleteTrip,
};

export default exports;
