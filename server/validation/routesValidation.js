function isNonNull() {
  //get all arguments passed in isNonNull function and throw if anyone of them is null or undefined
  for (let i = 0; i < arguments.length; i++) {
    const val = arguments[i];
    //!val won't give expected output when passed value is false
    if (val == null) throw new Error(`A field is either null or not passed`); //used == to also consider undefined values
  }
}

function isValidString(str, varName) {
  //varName is used to display invalid variable name in error message
  if (!varName) varName = "Parameter";
  if (typeof str !== "string") throw new Error(`${varName} must be a string`);
  if (str.trim().length == 0)
    throw new Error(`${varName} must not be just empty spaces`);
}

function isValidUsername(str, varName) {
  //varName is used to display invalid variable name in error message
  if (!varName) varName = "Username";
  isValidString(str, varName);
  const regEx = /^[A-Za-z0-9._]{4,}$/gm;
  if (str.match(regEx) == null) {
    throw new Error(
      `Invalid username (Must only contain alphanumeric characters, moust be at least 4 characters long and must not contain spaces)`
    );
  }
}

function isValidPassword(str, varName) {
  //varName is used to display invalid variable name in error message
  if (!varName) varName = "Password";
  isValidString(str, varName);
  const regEx = /^[\S]{6,}$/gm;
  if (str.match(regEx) == null) {
    throw new Error(
      `Invalid password (Must be atleast 6 characters long and must not contain spaces)`
    );
  }
}

module.exports = {
  isNonNull,
  isValidString,
  isValidUsername,
  isValidPassword,
};
