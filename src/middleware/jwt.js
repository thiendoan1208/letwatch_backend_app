const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const securePath = ["/admin"];

const createJWt = (payload) => {
  try {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log("Error when create JWT");
    return null;
  }
};

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log("Cannot verify JWT");
    return null;
  }
};

module.exports = {
  createJWt,
  verifyJWT,
};
