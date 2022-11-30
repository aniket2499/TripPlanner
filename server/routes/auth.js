const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth");

router.get("/", register);

module.exports = router;
