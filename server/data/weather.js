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
    console.log(weatherDataForCity);
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
    function convertingDate(date, format) {
      if (format == "api") {
        var d = new Date(date);
      } else {
        var d = new Date(date * 1000);
      }
      (month = "" + (d.getMonth() + 1)),
        (day = "" + d.getDate()),
        (year = d.getFullYear());
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    }

    // const index = data.list.findIndex(
    //   (e) => timeConverterFromUNIX(e.dt) == timeConverterToUNIX(date),
    // );

    data.list.map((e) => {
      console.log(e);
      console.log(convertingDate(e.dt, "database"), "=");
      console.log(convertingDate(date, "database"), "==");

      if (
        (timeConverterFromUNIX(e.dt),
        "database" == timeConverterToUNIX(date),
        "database")
      ) {
        console.log(e);
        weatherOnDay.push(e);
      }
    });
    // if (index == -1) {
    //   console.log("No data for this date");
    // } else {
    //   const forCastForAnyDate = {
    //     date: data.list[index].dt,
    //     main: data.list[index].weather[0].main,
    //     temperature:
    //       parseInt((data.list[index].temp.day - 273.15) * 9) / 5 + 32,
    //     description: data.list[index].weather[0].description,
    //     icon: `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`,
    //   };
    //   weatherOnDay.push(forCastForAnyDate);
    //   console.log(weatherOnDay);
    // }
  } catch (e) {
    console.log(e);
  }
};
getWeatherForeCastForLocation(1670004000);
module.exports = {
  getWeatherForCity,
  getWeatherForeCastForLocation,
};
