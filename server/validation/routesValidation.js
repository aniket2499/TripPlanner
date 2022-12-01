const { ObjectId } = require("mongodb");

module.exports = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    let arrayInvalidFlag = false;
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (i in arr) {
      if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      arr[i] = arr[i].trim();
    }
    if (arrayInvalidFlag)
      throw `One or more elements in ${varName} array is not a string or is an empty string`;
    return arr;
  },

  isNonNull() {
    //get all arguments passed in isNonNull function and throw if anyone of them is null or undefined
    for (let i = 0; i < arguments.length; i++) {
      const val = arguments[i];
      //!val won't give expected output when passed value is false
      if (val == null) throw new Error(`A field is either null or not passed`); //used == to also consider undefined values
    }
  },

  isValidString(str, varName) {
    //varName is used to display invalid variable name in error message
    if (!varName) varName = "Parameter";
    if (typeof str !== "string") throw new Error(`${varName} must be a string`);
    if (str.trim().length == 0)
      throw new Error(`${varName} must not be just empty spaces`);
  },

  isValidUsername(str, varName) {
    //varName is used to display invalid variable name in error message
    if (!varName) varName = "Username";
    isValidString(str, varName);
    const regEx = /^[A-Za-z0-9._]{4,}$/gm;
    if (str.match(regEx) == null) {
      throw new Error(
        `Invalid username (Must only contain alphanumeric characters, moust be at least 4 characters long and must not contain spaces)`,
      );
    }
  },

  isValidPassword(str, varName) {
    //varName is used to display invalid variable name in error message
    if (!varName) varName = "Password";
    isValidString(str, varName);
    const regEx = /^[\S]{6,}$/gm;
    if (str.match(regEx) == null) {
      throw new Error(
        `Invalid password (Must be atleast 6 characters long and must not contain spaces)`,
      );
    }
  },
};
