import React, {useContext, useCallback, useState} from "react";
import {AuthContext} from '../firebase/Auth';
import { doChangePassword } from "../firebase/FirebaseFunctions";
import "../App.css";

function ChangePassword() {

  const currUser = useContext(AuthContext);
  const [passwordMatch, setPasswordMatch] = useState('');
  console.log(currUser);
  
  return <div className="App">ChangePassword</div>;

}

export default ChangePassword;