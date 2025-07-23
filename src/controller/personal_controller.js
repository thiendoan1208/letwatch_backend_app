const {
  addFilmToWatchlist,
  getFilmFromWatchList,
  deleteFilmFromWatchList,
} = require("../services/personal_service");

const handleAddFilmToWatchlist = async (req, res) => {
  try {
    let filmWatchListInfo = req.body;

    if (
      filmWatchListInfo &&
      filmWatchListInfo.movieID &&
      filmWatchListInfo.userID !== 0
    ) {
      let data = await addFilmToWatchlist(filmWatchListInfo);

      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
      });
    } else if (
      filmWatchListInfo &&
      filmWatchListInfo.movieID &&
      filmWatchListInfo.userID === 0
    ) {
      return res.status(200).json({
        success: false,
        message: "Vui lòng đăng nhập để sử dụng tính năng này.",
        data: [],
        error: "AUTH_ERROR",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Có lỗi xảy ra, không thể lấy thông tin phim.",
      data: null,
      error: "GET_FILM_INFORMATION_ERROR",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể thêm phim vào danh sách xem.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

const handleGetFilmFromPlayList = async (req, res) => {
  try {
    let data = await getFilmFromWatchList(req.query.userID);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể lấy danh sách phim.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

const handleDeleteFilmFromWatchList = async (req, res) => {
  try {
    let data = await deleteFilmFromWatchList(req.body);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra, không thể xóa danh sách phim.",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

module.exports = {
  handleAddFilmToWatchlist,
  handleGetFilmFromPlayList,
  handleDeleteFilmFromWatchList,
};
