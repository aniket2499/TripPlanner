const User = require("../model/User");
const validation = require("../validation/routesValidation");
const { ObjectId } = require("mongodb");

const getUserById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    // id = validation.checkId(req.params.id, "User Id");
    const user = await User.findById(ObjectId(req.params.id));
    if (user._doc) {
      console.log(user._doc);
      res.status(200).json(user._doc);
      return user._doc;
    } else {
      throw {
        message: `User not found with ID: ${id}`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const usersList = await User.find();
    if (usersList.length > 0) {
      res.status(200).json(usersList);
    } else {
      throw {
        message: `No users found`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const newUserInfo = new User(req.body);

  try {
    newUserInfo.firstName = validation.checkString(
      newUserInfo.firstName,
      "First Name",
    );
    newUserInfo.lastName = validation.checkString(
      newUserInfo.lastName,
      "Last Name",
    );
    newUserInfo.email = validation.checkEmail(newUserInfo.email, "User Email");
    newUserInfo.password = validation.checkPassword(
      newUserInfo.password,
      "User Password",
    );
    newUserInfo.dateOfBirth = validation.isValidDate(
      newUserInfo.dateOfBirth,
      "Date of Birth",
    );
    const savedUser = await newUserInfo.save();
    if (savedUser) {
      res.status(201).json(savedUser);
    } else {
      throw {
        message: `User not created`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  const newUserInfo = req.body;
  let updatedUser = {};

  try {
    id = validation.checkId(req.params.id, "User Id");
    if (newUserInfo.firstName) {
      newUserInfo.firstName = validation.checkString(
        newUserInfo.firstName,
        "First Name",
      );
    }
    if (newUserInfo.lastName) {
      newUserInfo.lastName = validation.checkString(
        newUserInfo.lastName,
        "Last Name",
      );
    }
    if (newUserInfo.email) {
      newUserInfo.email = validation.checkEmail(
        newUserInfo.email,
        "User Email",
      );
    }
    // if (newUserInfo.password) {
    //   newUserInfo.password = validation.checkPassword(
    //     newUserInfo.password,
    //     "User Password",
    //   );
    // }
    if (newUserInfo.dateOfBirth) {
      newUserInfo.dateOfBirth = validation.isValidDate(
        newUserInfo.dateOfBirth,
        "Date of Birth",
      );
    }

    const oldUserInfo = await User.findById(id);
    if (
      newUserInfo.firstName &&
      newUserInfo.firstName !== oldUserInfo.firstName
    ) {
      updatedUser.firstName = newUserInfo.firstName;
    }
    if (newUserInfo.lastName && newUserInfo.lastName !== oldUserInfo.lastName) {
      updatedUser.lastName = newUserInfo.lastName;
    }
    if (newUserInfo.email && newUserInfo.email !== oldUserInfo.email) {
      updatedUser.email = newUserInfo.email;
    }
    // if (newUserInfo.password && newUserInfo.password !== oldUserInfo.password) {
    //   updatedUser.password = newUserInfo.password;
    // }
    if (
      newUserInfo.dateOfBirth &&
      newUserInfo.dateOfBirth !== oldUserInfo.dateOfBirth
    ) {
      updatedUser.dateOfBirth = newUserInfo.dateOfBirth;
    }

    if (newUserInfo.trips) {
      updatedUser.trips = newUserInfo.trips;
    }

    if (Object.keys(updatedUser).length !== 0) {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      );
      if (updateUser) {
        res.status(200).json(updateUser._doc);
      } else {
        throw {
          message: `User not found with ID: ${id}`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the user with ID: ${id}`,
        status: 400,
      };
    }
  } catch (e) {
    next(e);
  }

  // try {
  //
  // } catch (err) {
  //   next(err);
  // }
};

const deleteUserById = async (req, res, next) => {
  try {
    id = validation.checkId(req.params.id, "User Id");
    userToDelete = await User.findByIdAndDelete(req.params.id);
    if (userToDelete) {
      res.status(200).json(userToDelete);
    } else {
      throw {
        message: `User not found with ID: ${id}`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
};
