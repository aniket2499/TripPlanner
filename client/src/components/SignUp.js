import React, {useState, useContext} from "react";
import {Navigate} from 'react-router-dom'
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../firebase/Auth';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import SocialSignIn from './SocialSignIn';
import "../App.css";

function SignUp() {

  const currUser = useContext(AuthContext);
  const [pswdMatch, setPswdMatch] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {displayName, email, pwd1, pwd2} = e.target.elements;
    if (pwd1.value !== pwd2.value) {
      setPswdMatch('Passwords do not match');
      return false;
    } else {
      try {
        await doCreateUserWithEmailAndPassword(email.value, pwd1.value, displayName.value);
      } catch (error) {
        alert(error);
      }
    }
  }

  if (currUser) {
    return <Navigate to="/" />
  }

  return(
    <div>
      <br/>
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '20vh' }}>
        <Grid item xs={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {pswdMatch && <h4 className="error">{pswdMatch}</h4>}
          <form onSubmit={handleSignUp}>
            <label>
              Name:
              <input name='displayName' type='text' placeholder='Name' required/>
            </label>
            <br/>
            <label>
              Email:
              <input name='email' type='email' placeholder='Email' required/>
            </label>
            <br/>
            <label>
              Password:
              <input name='pwd1' id="pwd1" type='password' placeholder='Password' autoComplete="off" required/>
            </label>
            <br/>
            <label>
              Confirm Password:
              <input name='pwd2' id="pwd2" type='password' placeholder='Password' autoComplete="off" required/>
            </label>
            <br/>
            <button id='submitButton' name='submitButton' type='submit'>
              Sign Up
            </button>
          </form>
        </Grid>
        <SocialSignIn />
      </Grid>
      <br />
      
    </div>
  );
}

export default SignUp;