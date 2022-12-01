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

router.post("/", function (req, res, next) {
  createUser(req, res, next);
});

router.delete("/:id", deleteUserById);

router.patch("/:id", function (req, res, next) {
  updateUserById(req, res, next);
});

module.exports = router;
