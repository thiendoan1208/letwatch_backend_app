const {
  getAllUser,
  findUser,
  deleteUser,
  getAllContributeForm,
  updateContributeForm,
  deleteContributeForm,
} = require("../services/admin_services");

const handleGetAllUser = async (req, res) => {
  try {
    let data = await getAllUser(req.query.limit, req.query.page);
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get user information",
      data: [],
      error: "USER_ERROR",
    });
  }
};

const handleFindUser = async (req, res) => {
  try {
    let data = await findUser(req.body.keyword);
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot find user information",
      data: [],
      error: "USER_ERROR",
    });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    let data = await deleteUser(req.body);
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete users.",
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get contribute form",
      data: [],
      error: "FORM_ERROR",
    });
  }
};

const handleUpdateContributeForm = async (req, res) => {
  try {
    let data = await updateContributeForm(req.body);
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot update contribute form",
      data: [],
      error: "FORM_ERROR",
    });
  }
};

const handlDeleteContributeForm = async (req, res) => {
  try {
    let data = await deleteContributeForm(req.body);
    return res.status(200).json({
      success: data.success,
      data: data.data,
      message: data.message,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete contribute form",
      data: [],
      error: "FORM_ERROR",
    });
  }
};

module.exports = {
  handleGetAllUser,
  handleFindUser,
  handleDeleteUser,
  handleGetAllContributeForm,
  handleUpdateContributeForm,
  handlDeleteContributeForm,
};
