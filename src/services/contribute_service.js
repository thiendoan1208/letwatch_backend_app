const db = require("../models/index");

const createContributeForm = async (form) => {
  try {
    await db.UserReview.create({
      userID: form.userID,
      description: form.description,
      type: form.type,
      status: form.status,
    });

    return {
      success: true,
      message:
        "Cảm ơn bạn đã dành thời gian đóng góp ý kiến. Chúng tôi sẽ xem xét và gửi mail cho bạn khi quá trình xử lý hoàn tất",
      data: [],
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể tạo biểu mẫu.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

module.exports = {
  createContributeForm,
};
