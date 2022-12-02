const User = require("../model/User");
const validation = require("../validation/routesValidation");

const getUserById = async (req, res, next) => {
  try {
    id = validation.checkId(req.params.id, "User Id");
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      throw {
        message: `User not found with ID: ${id}`,
        status: 404,
      };
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const usersList = await User.find();
    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const newUserInfo = new User(req.body);

  try {
    newUserInfo.firstName = validation.checkString();
    newUserInfo.lastName = validation.checkString();

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`User on ID (${req.params.id}) has been deleted...`);
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
