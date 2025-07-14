const { Resend } = require("resend");
const { config } = require("dotenv");
const { createUser } = require("../services/authen_service");
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
      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
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

module.exports = {
  handleSendVerifyCode,
  handleSignUp,
};
