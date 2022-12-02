const e = require("express");
const { ObjectId } = require("mongodb");

module.exports = {
  checkId(id, varName) {
    if (!varName) varName = "ID";
    if (!id || id == undefined)
      throw {
        message: `Error: You must provide a ${varName}`,
        status: 400,
      };
    if (typeof id !== "string")
      throw { message: `Error:${varName} must be a string`, status: 400 };
    id = id.trim();
    if (id.length === 0)
      throw {
        message: `Error: ${varName} cannot be an empty string or just spaces`,
        status: 400,
      };
    if (!ObjectId.isValid(id))
      throw {
        message: `Error: ${varName} invalid object ID`,
        status: 400,
      };
    return id;
  },

  checkString(strVal, varName) {
    if (!varName) varName = "String";
    if (!strVal)
      throw { message: `Error: You must supply a ${varName}!`, status: 400 };
    if (typeof strVal !== "string")
      throw { message: `Error: ${varName} must be a string!`, status: 400 };
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw {
        message: `Error: ${varName} cannot be an empty string or string with just spaces`,
        status: 400,
      };
    if (!isNaN(strVal))
      throw {
        message: `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`,
        status: 400,
      };
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    let arrayInvalidFlag = false;
    if (!arr || !Array.isArray(arr))
      throw { message: `You must provide an array of ${varName}`, status: 400 };
    for (i in arr) {
      if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      arr[i] = arr[i].trim();
    }
    if (arrayInvalidFlag)
      throw {
        message: `One or more elements in ${varName} array is not a string or is an empty string`,
        status: 400,
      };
    return arr;
  },

  isNonNull() {
    //get all arguments passed in isNonNull function and throw if anyone of them is null or undefined
    for (let i = 0; i < arguments.length; i++) {
      const val = arguments[i];
      //!val won't give expected output when passed value is false
      if (val == null)
        throw { message: `A field is either null or not passed`, status: 400 }; //used == to also consider undefined values
    }
  },

  isValidString(str, varName) {
    //varName is used to display invalid variable name in error message
    if (!varName) varName = "Parameter";
    if (typeof str !== "string")
      throw { message: `${varName} must be a string`, status: 400 };
    if (str.trim().length == 0)
      throw {
        message: `${varName} must not be just empty spaces`,
        status: 400,
      };
  },

  isValidUsername(str, varName) {
    //varName is used to display invalid variable name in error message
    if (!varName) varName = "Username";
    isValidString(str, varName);
    const regEx = /^[A-Za-z0-9._]{4,}$/gm;
    if (str.match(regEx) == null) {
      throw {
        message: `Invalid username (Must only contain alphanumeric characters, moust be at least 4 characters long and must not contain spaces)`,
        status: 400,
      };
    }
  },

  isValidPassword(str, varName) {
    //varName is used to display invalid variable name in error message
    if (!varName) varName = "Password";
    isValidString(str, varName);
    const regEx = /^[\S]{6,}$/gm;
    if (str.match(regEx) == null) {
      throw {
        message: `Invalid password (Must be atleast 6 characters long and must not contain spaces)`,
        status: 400,
      };
    }
  },
};
