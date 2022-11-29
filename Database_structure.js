const user_collection = {
  users: [
    {
      _id: "object ID",
      FirstName: "Nirav",
      LastName: "Jain",
      DateOfBirth: "DOB",
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
      TripName: "trip name",
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
