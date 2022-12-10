const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
} = require("../controllers/user");

router.get("/", async (req, res) => {
  try {
    const usersList = await getAllUsers();
    res.status(200).json(usersList);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.post("/create", async (req, res) => {
  console.log("entered");
  console.log(req.body);
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);
    res.status(200).json(deletedUser);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedUser = await updateUserById(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

module.exports = router;
