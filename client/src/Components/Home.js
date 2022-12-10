import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
// import actions from "../actions";
import userService from "../services/userService";
import Maps from "./Maps";

function Home() {
  const currUser = useContext(AuthContext);
  // const dispatch = useDispatch();
  // console.log(currUser);

  // const getCurrUser = async (id) => {
  //   return await userService.getUserById(id);
  // };

  const addUserToMongo = async (obj) => {
    console.log(obj);
    await userService.createUser({
      _id: obj._id,
      displayName: obj.displayName,
      email: obj.email,
      password: "password",
    });
  };

  if (currUser) {
    // let user = getCurrUser(currUser._delegate.uid);
    // dispatch(actions.addHotel())
    // if (!user) {
    addUserToMongo({
      _id: currUser._delegate.uid,
      displayName: currUser._delegate.displayName,
      email: currUser._delegate.email,
    });
    // }
  }

  const allHotels = useSelector((state) => state.hotels);
  console.log("allHotels");
  console.log(allHotels);

  return (
    <div>
      <Maps />
    </div>
  );
}

export default Home;
