const User = require("../model/User");
const validation = require("../validation/routesValidation");

const getUserById = async (id) => {
  let parsedId = validation.checkString(id, "UserId");
  const user = await User.findById(parsedId);
  if (user) {
    return user;
  } else {
    throw {
      message: `User not found with ID: ${id}`,
      status: 404,
    };
  }
};

const getAllUsers = async () => {
  const usersList = await User.find();
  if (usersList.length > 0) {
    return usersList;
  } else {
    throw {
      message: `No users found`,
      status: 404,
    };
  }
};

const createUser = async (userBody) => {
  const newUserInfo = new User(userBody.body);
  console.log(newUserInfo);
  if (newUserInfo.displayName) {
    newUserInfo.displayName = validation.checkString(
      newUserInfo.displayName,
      "Display Name",
    );
  }
  if (newUserInfo.email) {
    newUserInfo.email = validation.checkEmail(newUserInfo.email, "User Email");
  }
  if (newUserInfo.password) {
    newUserInfo.password = validation.checkString(
      newUserInfo.password,
      "Password",
    );
  }

  const savedUser = await newUserInfo.save();
  if (savedUser) {
    return savedUser;
  } else {
    throw {
      message: `User not created`,
      status: 400,
    };
  }
};

const updateUserById = async (id, updateUserBody) => {
  let parsedId = validation.checkString(id, "UserId");
  const user = await User.findById(parsedId);
  if (!user) {
    throw {
      message: `User not found with ID: ${id}`,
      status: 404,
    };
  } else {
    const newUserInfo = updateUserBody.body;
    let updatedUser = {};

    id = validation.checkString(id, "User Id");
    if (newUserInfo.displayName) {
      newUserInfo.displayName = validation.checkString(
        newUserInfo.displayName,
        "Display Name",
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
      newUserInfo.displayName &&
      newUserInfo.displayName !== oldUserInfo.displayName
    ) {
      updatedUser.displayName = newUserInfo.displayName;
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
        id,
        { $set: updateUserBody },
        { new: true },
      );
      if (updateUser) {
        return updateUser;
      } else {
        throw {
          message: `User with ID: ${id} was not updated`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the user with ID: ${id}`,
        status: 400,
      };
    }
  }
};

const deleteUserById = async (id) => {
  let parsedId = validation.checkString(id, "UserId");
  const user = await User.findById(parsedId);
  if (user) {
    const userToDelete = await User.findByIdAndDelete(parsedId);
    if (userToDelete) {
      return {
        message: `User with ID: ${id} was deleted`,
        deleted: true,
      };
    } else {
      return {
        message: `User with ID: ${id} was not deleted`,
        status: 400,
      };
    }
  } else {
    throw {
      message: `User not found with ID: ${id}`,
      status: 404,
    };
  }
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
};
