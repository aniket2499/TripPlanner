const logInTripEmail = (trip, userData, signedUpUser, inviteData) => {
  let userId = signedUpUser[0]._id;
  userId = userId.toString();
  return `<p> Hello ${inviteData.name},
    Wohooooo!! You have just received an invitation from your friend ${userData.displayName}.
    You will be goint to ${trip.destination}. The trip would start from ${trip.tripDate.startDate} and
    it ends at ${trip.tripDate.startDate}. So hurry up and start packing. Hope you have a wonderful time.
    Click on the TripPlaner link below to get all the details about your trip and make changes to your itinerary.
    Your friend also sent you a message: ${inviteData.message}. Accept the invite using the link given below.
    "http://localhost:3001/api/trips/${trip._id}/accept/${userId}"</p>
    <button> <a href="http://localhost:3001/api/trips/${trip._id}/accept/${userId}"/> ACCEPT </button>
    `;
};

const signUpTripEmail = (trip, userData, inviteData) => {
  console.log(userData);
  console.log(inviteData);
  return `<p> Hello ${inviteData.name},
  Wohooooo!! You have just received an invitation from your friend ${userData.displayName}.
  You will be goint to ${trip.destination}. The trip would start from ${trip.tripDate.startDate} and
  it ends at ${trip.tripDate.startDate}. So hurry up and start packing. Hope you have a wonderful time.
  Click on the TripPlaner link below to get all the details about your trip and make changes to your itinerary.
  Your friend also sent you a message: ${inviteData.message}. Signup using the link given below.</p>
  <a href="http://localhost:3000/${trip._id}/accept/signup"/><input type=button value='HOME'></a>
  `;
};

module.exports = { signUpTripEmail, logInTripEmail };