const { createContributeForm } = require("../services/contribute_service");

const handleSendContributeForm = async (req, res) => {
  try {
    if (req.body.userID !== 0) {
      const data = await createContributeForm(req.body);

      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Vui lòng đăng nhập để sử dụng tính năng này.",
        data: [],
        error: "SIGN-IN_REQUIRED",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không thể gửi biểu mẫu, vui lòng thử lại sau",
      data: [],
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

module.exports = {
  handleSendContributeForm,
};
