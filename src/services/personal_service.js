const db = require("../models/index");

const addFilmToWatchlist = async (filmWatchlistInfo) => {
  try {
    let data = await db.UserWatchList.findAll({
      where: {
        userID: filmWatchlistInfo.userID,
      },
    });

    let checkFilmExist = data.some((film) => {
      return (
        film.userID === filmWatchlistInfo.userID &&
        film.movieSlug === filmWatchlistInfo.movieSlug
      );
    });

    if (!checkFilmExist) {
      await db.UserWatchList.create({
        userID: filmWatchlistInfo.userID,
        movieID: filmWatchlistInfo.movieID,
        movieTitle: filmWatchlistInfo.movieTitle,
        movieSlug: filmWatchlistInfo.movieSlug,
        moviePoster: filmWatchlistInfo.moviePoster,
      });

      return {
        success: true,
        message: "Đã thêm phim vào danh sách xem.",
        data: [],
        error: null,
      };
    } else {
      return {
        success: false,
        message: "Phim đã được thêm vào danh sách xem.",
        data: [],
        error: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể thêm phim vào danh sách xem.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};

const getFilmFromWatchList = async (userID) => {
  try {
    let data = await db.UserWatchList.findAll({
      where: {
        userID: userID,
      },
      raw: true,
    });

    return {
      success: true,
      message: "Lấy danh sách thành công.",
      data: data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể kết nối đến máy chủ.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};

const deleteFilmFromWatchList = async (deleteInfo) => {
  try {
    await db.UserWatchList.destroy({
      where: {
        movieSlug: deleteInfo.filmDeleteList,
        userID: deleteInfo.userID,
      },
      raw: true,
    });

    return {
      success: true,
      message: "Xóa phim thành công.",
      data: [],
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể xóa phim.",
      data: [],
      error: "SERVER_ERROR",
    };
  }
};

module.exports = {
  addFilmToWatchlist,
  getFilmFromWatchList,
  deleteFilmFromWatchList,
};
