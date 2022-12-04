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

  checkPageNumber(pageNumber) {
    if (!pageNumber || pageNumber == undefined)
      throw {
        message: `Error: You must provide a page number`,
        status: 400,
      };
    if (typeof pageNumber !== "string")
      throw { message: `Error: Page number must be a string`, status: 400 };
    pageNumber = pageNumber.trim();
    if (pageNumber.length === 0)
      throw {
        message: `Error: Page number cannot be an empty string or just spaces`,
        status: 400,
      };
    if (isNaN(pageNumber))
      throw {
        message: `Error: Page number must be a number`,
        status: 400,
      };
    pageNumber = parseInt(pageNumber);
    if (pageNumber < 1)
      throw {
        message: `Error: Page number must be greater than 0`,
        status: 400,
      };
    return pageNumber;
  },

  checkLocationCode(locationCode) {
    if (!locationCode || locationCode == undefined)
      throw {
        message: `Error: You must provide a location code`,
        status: 400,
      };
    if (typeof locationCode !== "string")
      throw { message: `Error: Location code must be a string`, status: 400 };
    locationCode = locationCode.trim();
    if (locationCode.length === 0)
      throw {
        message: `Error: Location code cannot be an empty string or just spaces`,
        status: 400,
      };
    if (isNaN(locationCode))
      throw {
        message: `Error: Location code must be a number`,
        status: 400,
      };
    locationCode = parseInt(locationCode);
    if (locationCode < 1)
      throw {
        message: `Error: Location code must be greater than 0`,
        status: 400,
      };
    return locationCode;
  },

  checkString(strVal, varName) {
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
  checkStringForNumber(strVal, varName) {
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
    if (isNaN(strVal))
      throw {
        message: `Error: ${strVal} is not a valid value for ${varName} as it doesn't contains digits`,
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

  checkNonNull() {
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
    this.isValidString(str, varName);
    const regEx = /^[\S]{6,}$/gm;
    if (str.match(regEx) == null) {
      throw {
        message: `Invalid password (Must be atleast 6 characters long and must not contain spaces)`,
        status: 400,
      };
    }
  },

  checkPassword(password, varName) {
    // this.checkString(password, varName);
    let passre =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!password.match(passre)) {
      throw {
        message: `Entered ${varName} is Invalid password`,
        status: 400,
      };
    } else {
      return password;
    }
  },

  checkEmail(inputEmail, varName) {
    this.checkString(inputEmail, varName);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!inputEmail.toLowerCase().match(re)) {
      throw {
        message: `Entered ${varName} is Invalid email`,
        status: 400,
      };
    } else {
      return inputEmail;
    }
  },

  isValidDate(date, varName) {
    try {
      if (
        !/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(date)
      ) {
        throw {
          message: `Enter a valid date in MM/DD/YYYY format for ${varName}`,
          status: 400,
        };
      }
      const today = new Date();
      if (Math.abs(today.getFullYear() - parseInt(date.split("/")[2])) < 13) {
        throw {
          message: `Error: User must be 13 years old to register`,
          status: 400,
        };
      }
      return date;
    } catch (e) {
      throw {
        message: e.message,
        status: 400,
      };
    }
  },

  checkURL(url, varName) {
    this.checkString(url, varName);
    if (!url.startsWith("http://") && !url.startsWith("https://"))
      throw {
        message: `Error: ${varName} must start with http:// or https://`,
        status: 400,
      };
    return url;
  },

  checkPriceLevel(priceLevel, varName) {
    if (!priceLevel)
      throw { message: `You must provide a ${varName}`, status: 400 };
    if (
      priceLevel == "$" ||
      priceLevel == "$$" ||
      priceLevel == "$$$" ||
      priceLevel == "$$$$"
    ) {
      return priceLevel;
    } else {
      throw {
        message: `You must provide a valid ${varName} (i.e. $, $$, $$$, $$$$)`,
        status: 400,
      };
    }
  },
  checkPhoneNumber(phone, varName) {
    this.checkStringForNumber(phone, varName);
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;
    if (!phone.match(re)) {
      throw {
        message: `Error: ${varName} must be a 10 digit number`,
        status: 400,
      };
    }
    return phone;
  },
  checkPriceRange(priceRange, varName) {
    if (!priceRange)
      throw { message: `You must provide a ${varName}`, status: 400 };
    const re = /^(\$|\€\£|\₪|)(?!0\.00)\d{1,3}(,\d{3})*(\.\d\d)?/;

    if (priceRange.includes("-")) {
      priceRange.split("-").forEach((price) => {
        if (!price.trim().match(re))
          throw { message: `You must provide a valid ${varName}`, status: 400 };
      });
      return priceRange;
    } else {
      throw { message: `You must provide a valid ${varName}`, status: 400 };
    }
  },
};
