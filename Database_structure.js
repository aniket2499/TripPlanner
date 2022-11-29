const user_collection = {
  users: [
    {
      _id: "object ID",
      FirstName: "Neel",
      LastName: "Tejani",
      DateofBirth: "DOB",
      emailID: "",
      password: "", //HASHED PASS,
      Trips: [id],
    },
  ],
};

const trips_collection = {
  trips: [
    {
      id: "id",
      Location: "location",
      Destination: "Amstredam",
      StartDate: "Date", //OPTIONAL
      EndDate: "Date", //OPTIONAL
      Invites: [
        {
          Email: "email",
          Name: "name",
        },
      ], //OPTIONAL

      Notes: "String",
      Explore: [
        {
          id: "id",
          Image: "Image",
          Title: "Title",
          Link: "Link",
        },
      ], // OPTIONAL
      PlacesToVisit: [id],
      Itinerary: [
        {
          Date: "Data",
          WeatherDetails: {
            Temerature: 0,
            Description: "String",
            Icon: "id",
            Weather: "main",
          },
          PlacesToVisit: [id],
        },
      ],
      Hotels: [id],
      Restraunts: [id],
      Attractions: [id],
      // Flights:{
      //   Departure:"String",
      //   Arrival:"String",
      //   Price:"String",
      //   Airline:"String",
      //   Duration:"String",
      //   Stops:"String",
      //   DepartureTime:"String",
      //   ArrivalTime:"String",
      //   DepartureDate:"String",
      //   ArrivalDate:"String",
      //   DepartureAirport:"String",
      //   ArrivalAirport:"String",
      //   DepartureCity:"String",
      //   ArrivalCity:"String",
      // }
    },
  ],
};

const hotel_collection = {
  id: "id",
  Name: "name",
  Catrgory: "category",
  Image: "image",
  Location: "address",
  Link: "link",
  Rating: "rating",
  Review: "review",
  Pricing: "pricing",
};

const restraunts_collection = {
  id: "id",
  Name: "name",
  Catrgory: "category",
  Image: "image",
  Location: "loc",
  Link: "Link",
  Cuisine: ["Cuisine"],
  Rating: "rating",
  Review: "review",
  Description: "desc",
  Contact: "contact",
  Pricing: "pricing",
};

const attractions_collection = {
  id: "id",
  Name: "name",
  Catrgory: "category",
  Location: "loc",
  ImagesURL: "image",
  Description: "desc",
  Rating: "rating",
  Link: "link",
};

const places_collection = {
  id: "id",
  Name: "name",
};
