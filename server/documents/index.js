module.exports = ({ trip, hotels, restaurants, attractions }) => {
  let tripData = Object.values(trip);
  let itinerary = Object.values(tripData[0].itinerary);
  let hotelData = Object.values(hotels);
  let restaurantData = Object.values(restaurants);
  let attractionData = Object.values(attractions);

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=10.0" />
      <style>
      
        table {
          border-collapse: collapse;
          width: 100%;
        }
        table,
        th,
        td {
          border: 1px solid black;
        }
        th {
          height: 50px;
        }
        td {
          text-align: left;
          padding: 8px;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .header {
          text-align: center;
          margin-top: 20px;
        }
        .title {
          font-weight: bold;
          font-size: 20px;
        }
        .subtitle {
          font-weight: bold;
          font-size: 18px;
        }
        .description {
          font-size: 15px;
        }
        .row {
          display: flex;
          flex-direction: row;
        }
        .column {
          flex: 50%;
        }
        .column1 {
          flex: 50%;
          margin-left: 20px;
        }
        .column2 {
          flex: 50%;
          margin-left: 20px;
        }
        
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">Trip Report</h1>
        <h2 class="subtitle">Trip Details</h2>
      </div>
      <div class="row">
        <div class="column">
          <table>
            <tr>
              <th>Trip Name</th>
              <td>Trip to ${tripData[0].destination}</td>
            </tr>
            <tr>
              <th>Start Date</th>
              <td>${tripData[0].tripDate.startDate}</td>
            </tr>
            <tr>
              <th>End Date</th>
              <td>${tripData[0].tripDate.endDate}</td>
            </tr>
          
          </table>
        </div>
        <div class="column">
          <table>
           
            <tr>
              <th>Image</th>
              <td><img width = "200px" height = "200px" src="https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/4:3/w_2664,h_1998,c_limit/Roadtrip-2020-GettyImages-1151192650.jpg" alt="trip image" /></td>
            </tr>
          </table>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br />
      <div class="header">
        <h2 class="subtitle">Hotels</h2>
      </div>
      <div class="row">
        <div class="column1">
          <table>
            <tr>
              <th>Hotel Name</th>
              <th>Hotel Address</th>
              <th>Hotel Image</th>
            </tr>
            ${hotelData
              .map(
                (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.location_id}</td>
                <td><img width = "200px" height = "200px" src="${item.image}" alt="hotel image" /></td>
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
        <div class="column2">
          <table>
            <tr>
              <th>Hotel Rating</th>
            </tr>
            ${hotelData
              .map(
                (item) => `
                    
              <tr>
                <td>${item.rating}</td>
                
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
      </div>
      <div class="header">
        <h2 class="subtitle">Restaurants</h2>
      </div>
      <div class="row">
        <div class="column1">
                    
          <table> 
            <tr>
              <th>Restaurant Name</th>
              <th>Restaurant Address</th>
              <th>Restaurant Image</th>
            </tr>
            ${restaurantData
              .map(
                (item) => `
              <tr>
                    
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td><img width = "200px" height = "200px" src="${item.image}" alt="restaurant image" /></td>
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
        <div class="column2">
          <table>
            <tr>
              <th>Restaurant Rating</th>
              <th>Restaurant Price</th>
              <th>Restaurant Website</th>
            </tr>
            ${restaurantData
              .map(
                (item) => `
              <tr>
                    
                <td>${item.rating}</td>
                <td>${item.price}</td>
                <td><a href="${item.website}">Restaurant Website</a></td>
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
      </div>
      <div class="header">
        <h2 class="subtitle">Attractions</h2>
      </div>
      <div class="row">
                    
        <div class="column1">
                    
          <table>
            <tr>
              <th>Attraction Name</th>
              <th>Attraction Address</th>
              <th>Attraction Image</th>
            </tr>
            ${attractionData
              .map(
                (item) => `
                    
              <tr>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td><img width = "200px" height = "200px" src="${item.image}" alt="attraction image" /></td>
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
        <div class="column2">
          <table>
            <tr>
              <th>Attraction Rating</th>
              <th>Attraction Price</th>
              <th>Attraction Website</th>
            </tr>
            ${attractionData
              .map(
                (item) => `
              <tr>
                <td>${item.rating}</td>
                <td>${item.price}</td>
                <td><a href="${item.website}">Attraction Website</a></td>
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
      </div>
    </body>
    </html>


  `;
};
