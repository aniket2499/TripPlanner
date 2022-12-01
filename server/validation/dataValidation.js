const emailvalidator = require("email-validator");
const { ObjectId } = require("mongodb");

const checkName = (string) => {
  if (!string) throw "String Undefined";

  if (typeof string != "string") throw "Name must be a string Data Type";

  string = string.trim();
  if (string.length === 0) throw "Cannot have empty a Name";

  if (string.split(" ").length > 1) throw "Name cannot have spaces inside";

  var letterOnly = /^[a-zA-Z]+$/;
  let result = string.match(letterOnly);

  if (!(result == string && typeof result === "object"))
    throw "Name should be Only Alphabets";

  if (string.split("").length >= 20)
    throw "Name should have atmost 20 characters";
  if (!(string.split("").length >= 2))
    throw "Name should have atleast 2 characters";
  return string;
};

const checkLocation = (string) => {
  if (!string) throw "Location Undefined";

  if (typeof string != "string") throw "Location must be of string Data Type";

  string = string.trim();
  if (string.length === 0) throw "Cannot have an empty Location";

  var letterOnly = /^[a-zA-Z\s]*$/;
  let result = string.match(letterOnly);

  if (!(result == string && typeof result === "object"))
    throw "Location should be Only Alphabets";

  return string;
};

const checkEmail = (email) => {
  if (!email)
    throw { code: 400, message: "Please provide an id. Id is missing" };
  email = email.trim();
  if (email.length === 0)
    throw { code: 400, message: "ID cannot be blank. Please enter a String" };
  if (typeof email !== "string")
    throw { code: 400, message: "Enter ID in string format" };
  if (!emailvalidator.validate(email))
    throw { code: 400, message: "Email Not Valid" };
  return email;
};

const checkPassword = (password) => {
  // check if we have to trim
  if (!password) throw " Please enter a password";

  if (typeof password != "string") throw "Password must be a string";

  password = password.trim();
  if (password.length === 0) throw "Cannot have empty Password";

  if (password.split(" ").length > 1) throw "Password has Spaces inside";

  var letterNumber = /^[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]+$/; //not sure what all is considred as special char confirm once on slack
  let result = password.match(letterNumber);
  if (!(result == password && typeof result === "object"))
    throw "Password can include AlphaNumeric and have Special Chars";

  if (!(password.split("").length >= 6))
    throw "Password should have atleast 6 characters";
};

const checkLocationId = (code) => {
  if (!code) {
    throw "Location code is not provided!!";
  }

  if (parseInt(code) < 1) {
    throw "Location code cannot be less than one";
  }
  if (isNaN(code)) {
    throw "Location code is invalid";
  }
  return code;
};

const checkPageNum = (pg) => {
  if (!pg) {
    throw "Page Number is not provided!!";
  }
  if (typeof pg !== "string") {
    throw "Page Number is not a string!!";
  }
  if (pg.trim().length === 0) {
    throw "Page Number cannot be an empty";
  }
  pg = pg.trim();
  if (parseInt(pg) < 1) {
    throw "Page Number cannot be less than one";
  }
  if (isNaN(pg)) {
    throw "Page Number is invalid";
  }
  return pg;
};

module.exports = {
  checkName,
  checkEmail,
  checkPassword,
  checkLocationId,
  checkPageNum,
  checkLocation,
};
