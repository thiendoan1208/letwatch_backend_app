const { Resend } = require("resend");
const { config } = require("dotenv");
const {
  createUser,
  signIn,
  getUserInfo,
  reNewAccessToken,
} = require("../services/authen_service");
config();

const CODE_LENGTH = 900000;
const resend = new Resend(process.env.RESEND_VALIDATE_API_KEY);
let VERIFY_CODE = 0;

// Create Verify Code
const createVerifyCode = () => {
  let verifyCode = Math.floor(100000 + Math.random() * CODE_LENGTH);
  return verifyCode;
};

// Send Verify Code
const handleSendVerifyCode = async (req, res) => {
  const verifyCode = createVerifyCode();
  VERIFY_CODE = verifyCode;
  let userEmail = req.body.email;

  const { data, error } = await resend.emails.send({
    from: "noreply@letwatch.net",
    to: [`${userEmail}`],
    subject: "LetWatch Verify Code",
    html: `<strong> Mã xác minh của bạn là: ${verifyCode}</strong>`,
  });

  if (error) {
    return res.status(400).json({ error, success: false });
  }

  return res.status(200).json({ data, success: true });
};

// Sign Up User
const handleSignUp = async (req, res) => {
  try {
    let saveCode = VERIFY_CODE;
    let userVerifyCode = req.body.verifyCode;
    let userInfo = req.body;

    if (String(saveCode) === String(userVerifyCode)) {
      const data = await createUser(userInfo);
      if (data) {
        return res.status(200).json({
          success: data.success,
          message: data.message,
          data: data.data,
          error: data.error,
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "Mã xác minh không chính xác",
        data: [],
        error: "INVALID_VERIFY_CODE",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể đăng ký. Vui lòng thử lại sau.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Sign In User
const handleSignIn = async (req, res) => {
  try {
    let userInfo = req.body;
    let data = await signIn(userInfo);

    if (data && data.success) {
      res.cookie("access_token", data.data.accessTokenJWT, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.cookie("refresh_token", data.data.refreshTokenJWT, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data.userInfoDB,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể đăng nhập. Vui lòng thử lại sau.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

const handleSignOut = async (req, res) => {
  try {
    await res.clearCookie("access_token");
    await res.clearCookie("refresh_token");
    return res.status(200).json({
      success: true,
      message: "Đăng xuất thành công.",
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể đăng xuất.",
      data: null,
      error: "SIGN_OUT_ERROR",
    });
  }
};

// Get user info
const handleGetUserInfo = (req, res) => {
  try {
    let access_token = req.cookies.access_token;

    if (access_token) {
      let data = getUserInfo(access_token);

      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
      });
    }

    return res.status(200).json({
      success: false,
      message: "Có lỗi xảy ra, không thể lấy thông tin người dùng.",
      data: null,
      error: "GET_USER_INFORMATION_ERROR",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể lấy thông tin người dùng.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

const handleRefeshToken = (req, res) => {
  try {
    let refresh_token = req.cookies.refresh_token;

    if (refresh_token) {
      let data = reNewAccessToken(refresh_token);

      if (data && data.success) {
        res.cookie("access_token", data.data.access_token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
      }

      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: null,
        error: data.error,
      });
    }

    return res.status(200).json({
      success: false,
      message: "Không re-new dc access_token",
      data: null,
      error: "RENEW_ACCESS_TOKEN_ERROR",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể lấy thông tin người dùng.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

module.exports = {
  handleSendVerifyCode,
  handleSignUp,
  handleSignIn,
  handleGetUserInfo,
  handleSignOut,
  handleRefeshToken,
};
