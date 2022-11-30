const register = async (req, res, next) => {
  res.status(200).json({ message: "Register" });
};

module.exports = {
  register,
};
