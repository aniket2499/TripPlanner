import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import actions from '../actions';
import getApiData from '../services/getApiData';

function Restaurants() {

  const dispatch = useDispatch();
  // const [restaurantData, setRestaurantData] = useState(null);

  async function getResData(){
    let data = await getApiData.getRestaurantData("ahmedabad", 2, 3.0);
    console.log(data)
    dispatch(actions.addRest(data[0].location_id, data[0].name, data[0].latitude, data[0].longitude, data[0].rating, data[0].web_url, data[0].address, data[0].price_level, "image"))
    return data
  }

  
  getResData()
  

  return <div>Restaurants</div>;
}

export default Restaurants;
