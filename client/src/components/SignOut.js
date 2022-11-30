import React from "react";
import {doSignOut} from '../firebase/FirebaseFunctions';
import "../App.css";

const SignOutBtn = () => {
  return <button type="button" onClick={doSignOut}> Sign Out </button>
}

export default SignOutBtn;