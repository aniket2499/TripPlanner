const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
} = require("../controllers/user");

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", function (req, res) {
  createUser;
});

router.delete("/:id", deleteUserById);

router.patch("/:id", function (req, res) {
  updateUserById;
});

module.exports = router;
