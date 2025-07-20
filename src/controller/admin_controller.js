const {
  getAllUser,
  getAllContributeForm,
  updateContributeForms,
} = require("../services/admin_services");

const handleGetAllUser = async (req, res) => {
  try {
    let data = await getAllUser();
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot get user information",
      data: [],
      error: "USER_ERROR",
    });
  }
};

const handleGetAllContributeForm = async (req, res) => {
  try {
    let data = await getAllContributeForm();
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot get contribute form",
      data: [],
      error: "FORM_ERROR",
    });
  }
};

const handleUpdateContributeForms = async (req, res) => {
  try {
    let data = await updateContributeForms(req.body);
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update contribute form",
      data: [],
      error: "FORM_ERROR",
    });
  }
};

module.exports = {
  handleGetAllUser,
  handleGetAllContributeForm,
  handleUpdateContributeForms,
};
