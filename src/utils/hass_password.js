const bycrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bycrypt.genSalt(saltRounds);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

module.exports = {
  hashPassword,
};
