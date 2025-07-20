const db = require("../models/index");

const getAllUser = async () => {
  try {
    let data = await db.User.findAll({
      attributes: ["id", "email", "username", "createdAt", "updatedAt"],
      raw: true,
    });
    return {
      success: true,
      message: "Get user successfully.",
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Cannot get user, server error.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};

const deleteUser = async (deleteInfo) => {
  try {
    await db.User.destroy({
      where: {
        email: deleteInfo,
      },
      raw: true,
    });

    return {
      success: true,
      message: "Xóa user thành công.",
      data: [],
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể xóa user.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};
const getAllContributeForm = async () => {
  try {
    let data = await db.UserReview.findAll({
      raw: true,
    });
    return {
      success: true,
      message: "Get contribute form successfully.",
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Cannot get contribute form, server error.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};

const updateContributeForm = async (formArr) => {
  try {
    for (const form of formArr) {
      await db.UserReview.update(
        { status: form.status },
        { where: { id: form.id } }
      );
    }

    return {
      success: true,
      message: "update contribute form successfully.",
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Cannot update contribute form, server error.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};

module.exports = {
  getAllUser,
  deleteUser,
  getAllContributeForm,
  updateContributeForm,
};
