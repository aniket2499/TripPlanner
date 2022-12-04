import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { doChangePassword } from "../firebase/FirebaseFunctions";
import "../App.css";

function ChangePassword() {
  // new function
  const currUser = useContext(AuthContext);
  const [passwordMatch, setPasswordMatch] = useState("");
  console.log("currUser");
  console.log(currUser._delegate.providerData[0].providerId);

  function temp() {
    console.log("here");
  }

  temp();

  const submitForm = async (e) => {
    e.preventDefault();
    const { currentPassword, newPasswordOne, newPasswordTwo } =
      e.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPasswordMatch("New Passwords do not match, please try again");
      return false;
    }

    try {
      await doChangePassword(
        currUser.email,
        currentPassword.value,
        newPasswordOne.value,
      );
      alert("Password has been changed, you will now be logged out");
    } catch (error) {
      alert(error);
    }
  };

  if (currUser._delegate.providerData[0].providerId === "password") {
    return (
      <div>
        {passwordMatch && <h4 className="error">{passwordMatch}</h4>}
        <h2>Change Password</h2>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>
              Current Password:
              <input
                className="form-control"
                name="currentPassword"
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                autoComplete="off"
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              New Password:
              <input
                className="form-control"
                name="newPasswordOne"
                id="newPasswordOne"
                type="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm New Password:
              <input
                className="form-control"
                name="newPasswordTwo"
                id="newPasswordTwo"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                required
              />
            </label>
          </div>

          <button type="submit">Change Password</button>
        </form>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          You are signed in using a Social Media Provider, You cannot change
          your password
        </h2>
      </div>
    );
  }
}

export default ChangePassword;
