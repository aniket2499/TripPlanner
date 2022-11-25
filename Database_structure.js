const main_collection = {
  users: [
    {
      _id: "object ID",
      FirstName: "Nirav",
      LastName: "Jain",
      DateofBirth: "DOB",
      emailID: "",
      password: "", //HASHED PASS,
      Trips: [
        {
          id: "id",
          Destination: "Amstredam",
          StartDate: "Date", //OPTIONAL
          EndDate: "Date", //OPTIONAL
          Invites: [
            {
              Email: "email",
              Name: "name",
            },
          ], //OPTIONAL
          Details: {
            Notes: "String",
            Explore: [
              {
                Image: "Image",
                Title: "Title",
                Link: "Link",
              },
            ], // OPTIONAL
            PlacesToVisit: [
              {
                Name: "Name",
                Image: "Image",
                Link: "Link",
              },
            ],
            Itinerary: [
              {
                Date: "Data",
                PlacesToVisit: [
                  {
                    Name: "Name",
                    Image: "Image",
                    Link: "Link",
                  },
                ],
              },
            ],
            Hotels: [
              {
                Name: "name",
                Image: "image",
                Location: "loc",
                Link: "Link",
              },
            ],
            Restraunts: [
              {
                Name: "name",
                Image: "image",
                Location: "loc",
                Link: "Link",
                Cuisine: "cuisine",
              },
            ],
            Attractions: [
              {
                Name: "name",
                Location: "loc",
              },
            ],
          },
        },
      ],
    },
  ],
};
