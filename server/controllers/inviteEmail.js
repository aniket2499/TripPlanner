const logInTripEmail = (trip, userData, signedUpUser, inviteData) => {
  let userId = signedUpUser[0]._id;
  const link = `http://localhost:3000/${trip._id}/accept/${userId}`;
  userId = userId.toString();
  return `<div> Hello ${inviteData.name},<br/>
    Wohooooo!! You have just received an invitation from your friend ${userData.displayName}.
    You will be going to ${trip.destination}. The trip would take place between ${trip.tripDate.startDate} and
    ${trip.tripDate.endDate}. So hurry up and start packing. Hope you have a wonderful time.
    Click on the TripPlaner link below to get all the details about your trip and make changes to your itinerary.
    Your friend also sent you a message: ${inviteData.message}. <br/>
    Click on the button below to accept the invite:<br/>
    <a href = "${link}">
    <button class = "button">
      Invite
    </button>
    </a>
   <br/>
    Enjoy your Trip! :)
   </div>
    `;
};

const signUpTripEmail = (trip, userData, inviteData) => {
  const link = `http://localhost:3000/${trip._id}/accept/signup`;
  return `<div> Hello ${inviteData.name},<br/>
  Wohooooo!! You have just received an invitation from your friend ${userData.displayName}.
  You will be going to ${trip.destination}. The trip would take place between ${trip.tripDate.startDate} and
  it ends at ${trip.tripDate.endDate}. So hurry up and start packing. Hope you have a wonderful time.
  Click on the TripPlaner link below to get all the details about your trip and make changes to your itinerary.
  Your friend also sent you a message: ${inviteData.message}. <br/>
  Click on the button below to signup and accept the invite:<br/>
  <a href = "${link}">
  <button class = "button">
    Invite
  </button>
  </a>
  <br/>
  Enjoy your Trip! :)
  </div>
  `;
};

module.exports = { signUpTripEmail, logInTripEmail };
