const logInTripEmail = (trip, userData, signedUpUser, inviteData) => {
  let userId = signedUpUser[0]._id;
  userId = userId.toString();
  return `<div> Hello ${inviteData.name},<br/>
    Wohooooo!! You have just received an invitation from your friend ${userData.displayName}.
    You will be going to ${trip.destination}. The trip would take place between ${trip.tripDate.startDate} and
    ${trip.tripDate.endDate}. So hurry up and start packing. Hope you have a wonderful time.
    Click on the TripPlaner link below to get all the details about your trip and make changes to your itinerary.
    Your friend also sent you a message: ${inviteData.message}. <br/>
    Accept the invite using the link given below:<br/>
    http://localhost:3000/${trip._id}/accept/${userId}<br/>
    Enjoy your Trip! :)
   </div>
    `;
};

const signUpTripEmail = (trip, userData, inviteData) => {
  return `<div> Hello ${inviteData.name},<br/>
  Wohooooo!! You have just received an invitation from your friend ${userData.displayName}.
  You will be going to ${trip.destination}. The trip would take place between ${trip.tripDate.startDate} and
  it ends at ${trip.tripDate.endDate}. So hurry up and start packing. Hope you have a wonderful time.
  Click on the TripPlaner link below to get all the details about your trip and make changes to your itinerary.
  Your friend also sent you a message: ${inviteData.message}. <br/>
  SignUp using the link given below:<br/>
  http://localhost:3000/${trip._id}/accept/signup <br/>
  Enjoy your Trip! :)
  </div>
  `;
};

module.exports = { signUpTripEmail, logInTripEmail };
