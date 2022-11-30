const User = require("../model/User");

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next;
  }
};

const updateUserById = async (req, res) => {
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

const deleteUserById = async (req, res) => {
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
