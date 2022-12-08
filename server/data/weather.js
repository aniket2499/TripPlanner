const axios = require("axios");

const getWeatherForCity = async (city) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?APPID=987ab96b5c3ce295c905c2521ad75d17&q=${city}`,
    );
    const weatherDataForCity = {
      name: data.name,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };

    return weatherDataForCity;
  } catch (e) {
    console.error(e);
  }
};

const getWeatherForeCastForLocation = async (date) => {
  try {
    const weatherOnDay = [];
    const { data } = await axios.get(
      `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=32.7668&lon=-96.7836&appid=987ab96b5c3ce295c905c2521ad75d17`,
    );
    //Converting the date to the format that is come from database
    function convertingDateFromAPI(date) {
      var d = new Date(date * 1000);
      (month = "" + (d.getMonth() + 1)),
        (day = "" + d.getDate()),
        (year = d.getFullYear());
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      const dateFromAPI = [month, day, year].join("/");
      return dateFromAPI;
    }
    function convertingDateFromDatabase(date) {
      return date;
    }

    data.list.map((e) => {
      if (convertingDateFromAPI(e.dt) == convertingDateFromDatabase(date)) {
        const forCastForAnyDate = {
          date: date,
          main: e.weather[0].main,
          temperature: parseInt((e.temp.day - 273.15) * 9) / 5 + 32,
          description: e.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,
        };
        weatherOnDay.push(forCastForAnyDate);
      }
    });
    if (weatherOnDay.length > 0) {
      return weatherOnDay;
    } else {
      throw {
        message: "No data found for this date",
        status: 404,
      };
    }
  } catch (e) {
    console.error(e);
  }
};
getWeatherForeCastForLocation("12/03/2022");
module.exports = {
  getWeatherForCity,
  getWeatherForeCastForLocation,
};
