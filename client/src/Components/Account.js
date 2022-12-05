import React, {useContext} from "react";
import SignOutBtn from './SignOut';
import { AuthContext } from "../firebase/Auth";
import ChangePassword from './ChangePassword';
import "../App.css";

function Account() {

  const {currUser} = useContext(AuthContext);
  console.log(currUser)

  return (
  <div>
    <h1>ACCOUNT</h1>
    <SignOutBtn />
    <ChangePassword />
  </div>
  );
}

export default Account;