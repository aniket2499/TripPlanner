const user_collection = {
  users: [
    {
      _id: "object ID",
      FirstName: "Nirav",
      LastName: "Jain",
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
      TripName: "trip name",
      Location: "location",
      Destination: "Amsterdam",
      TripDate: { startDate: "date", endDate: "date" },
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
            Temperature: 0,
            Description: "String",
            Icon: "id",
            Weather: "main",
          },
          PlacesToVisit: [id],
        },
      ],
      Hotels: [id],
      Restaurants: [id],
      Attractions: [id],
    },
  ],
};

const hotel_collection = {
  id: "id",
  Name: "name",
  Category: "category",
  Image: "image",
  Location: "address",
  Link: "link",
  Rating: "rating",
  Review: "review",
  Pricing: "pricing",
};

const restaurants_collection = {
  id: "id",
  Name: "name",
  Category: "category",
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
  Category: "category",
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
