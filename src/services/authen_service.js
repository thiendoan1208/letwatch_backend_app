const db = require("../models/index");
const { hashPassword } = require("../utils/hass_password");
const { config } = require("dotenv");
config();

const createUser = async (userInfo) => {
  try {
    let dbEmail = await db.User.findAll({
      attributes: ["email"],
      raw: true,
    });
    let emailArray = dbEmail.map((email) => email.email);

    let dbUsername = await db.User.findAll({
      attributes: ["username"],
      raw: true,
    });
    let usernameArray = dbUsername.map((username) => username.username);

    let checkEmail = emailArray.includes(userInfo.email);
    let checkUsername = usernameArray.includes(userInfo.username);

    if (
      userInfo.email === "" ||
      userInfo.username === "" ||
      userInfo.password === ""
    ) {
      return {
        success: false,
        message: "Thông tin chưa đầy đủ",
        data: [],
        error: "MISSING_INFORMATION_ERROR",
      };
    }

    if (
      !checkEmail &&
      !checkUsername &&
      userInfo.email === process.env.ADMIN_EMAIL
    ) {
      let encryptPassword = await hashPassword(userInfo.password);

      await db.User.create({
        username: userInfo.username,
        email: userInfo.email,
        password: encryptPassword,
        roleID: 2,
      });

      return {
        success: true,
        message: "Tạo tài khoản thành công.",
        data: [],
        error: null,
      };
    }

    if (
      !checkEmail &&
      !checkUsername &&
      userInfo.email !== process.env.ADMIN_EMAIL
    ) {
      let encryptPassword = await hashPassword(userInfo.password);

      await db.User.create({
        username: userInfo.username,
        email: userInfo.email,
        password: encryptPassword,
        roleID: 1,
      });

      return {
        success: true,
        message: "Tạo tài khoản thành công.",
        data: [],
        error: null,
      };
    }

    return {
      success: false,
      message: "Email hoặc Username đã tồn tại.",
      data: [],
      error: "DUPLICATE_INFORMATION_ERROR",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Email hoặc Username đã tồn tại.",
      data: [],
      error: "DUPLICATE_INFORMATION_ERROR",
    };
  }
};

module.exports = {
  createUser,
};
