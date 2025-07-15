const db = require("../models/index");
const { hashPassword } = require("../utils/hass_password");
const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const { createJWt, verifyJWT } = require("../middleware/jwt");
config();

const checkEmailDB = async (email) => {
  let dbEmail = await db.User.findAll({
    attributes: ["email"],
    raw: true,
  });

  let emailArray = dbEmail.map((email) => email.email);
  let checkEmail = emailArray.includes(email);
  return checkEmail;
};

const checkUsernameDB = async (username) => {
  let dbUsername = await db.User.findAll({
    attributes: ["username"],
    raw: true,
  });
  let usernameArray = dbUsername.map((username) => username.username);
  let checkUsername = usernameArray.includes(username);

  return checkUsername;
};

const checkPassword = (userPassword, hashPassword) => {
  return bcrypt.compare(userPassword, hashPassword);
};

const createUser = async (userInfo) => {
  try {
    let checkEmail = await checkEmailDB(userInfo.email);
    let checkUsername = await checkUsernameDB(userInfo.username);

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

// Sign in user
const signIn = async (userInfo) => {
  try {
    let checkEmail = await checkEmailDB(userInfo.email_username);
    let checkUsername = await checkUsernameDB(userInfo.email_username);

    if (checkEmail || checkUsername) {
      if (checkEmail) {
        let userInfoDB = await db.User.findOne({
          where: { email: userInfo.email_username },
          attributes: ["id", "username", "email", "password", "roleID"],
          raw: true,
        });

        let checkpass = await checkPassword(
          userInfo.password,
          userInfoDB.password
        );

        if (checkpass) {
          let payload = {
            id: userInfoDB.id,
            username: userInfoDB.username,
            email: userInfoDB.email,
            role: userInfoDB.roleID,
          };
          let jwt = createJWt(payload);

          return {
            success: true,
            message: "Đăng nhập thành công.",
            data: {
              jwt,
              userInfoDB: {
                id: userInfoDB.id,
                email: userInfoDB.email,
                username: userInfoDB.username,
                role: userInfoDB.roleID,
              },
            },
            error: null,
          };
        } else {
          return {
            success: false,
            message: "Tài khoản hoặc mật khẩu không chính xác.",
            data: [],
            error: "MISSING_INFORMATION_ERROR",
          };
        }
      }

      if (checkUsername) {
        let userInfoDB = await db.User.findOne({
          where: { username: userInfo.email_username },
          attributes: ["id", "username", "email", "password", "roleID"],
          raw: true,
        });

        let checkpass = await checkPassword(
          userInfo.password,
          userInfoDB.password
        );

        if (checkpass) {
          let payload = {
            id: userInfoDB.id,
            username: userInfoDB.username,
            email: userInfoDB.email,
            role: userInfoDB.roleID,
          };
          let jwt = createJWt(payload);

          return {
            success: true,
            message: "Đăng nhập thành công.",
            data: {
              jwt,
              userInfoDB: {
                id: userInfoDB.id,
                email: userInfoDB.email,
                username: userInfoDB.username,
                role: userInfoDB.roleID,
              },
            },
            error: null,
          };
        } else {
          return {
            success: false,
            message: "Tài khoản hoặc mật khẩu không chính xác.",
            data: [],
            error: "MISSING_INFORMATION_ERROR",
          };
        }
      }
    } else {
      return {
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác.",
        data: [],
        error: "MISSING_INFORMATION_ERROR",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Tài khoản hoặc mật khẩu không chính xác.",
      data: [],
      error: "INVALID_INFORMATION_ERROR",
    };
  }
};

const getUserInfo = (access_token) => {
  let checkJWT = verifyJWT(access_token);
  if (checkJWT !== null) {
    return {
      success: true,
      message: "Lấy thông tin người dùng thành công.",
      data: checkJWT,
      error: null,
    };
  }

  return {
    success: false,
    message: "Không lấy được thông tin người dùng.",
    data: null,
    error: "GET_USER_INFORMATION_ERROR",
  };
};

module.exports = {
  createUser,
  signIn,
  getUserInfo,
};
