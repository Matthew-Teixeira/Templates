const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = ({ id, username, email }) => {
  const payload = { id, username, email };
  return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

module.exports = { generateToken };
