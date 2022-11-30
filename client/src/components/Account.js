import React from "react";
import SignOutBtn from './SignOut';
import ChangePassword from './ChangePassword';
import "../App.css";

function Account() {
  return (
  <div>
    <h1>ACCOUNT</h1>
    <SignOutBtn />
    <ChangePassword />
  </div>
  );
}

export default Account;