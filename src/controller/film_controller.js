const {
  getFilmList,
  getFilmInfo,
  getFilmListSortByType,
  findFilm,
  getFilmType,
  getFilmListByType,
  getFilmCountries,
  getFilmListByCountries,
  getFilmListByYear,
} = require("../services/film_service");

// Get new film list
const handleGetFilmList = async (req, res) => {
  try {
    let page = req.query.page;
    const data = await getFilmList(page);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách phim, vui lòng thử lại sau",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Specific movie information and film episode
const handleGetFilmInfo = async (req, res) => {
  try {
    let filmSlug = req.params.filmSlug;
    const data = await getFilmInfo(filmSlug);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không thể lấy thông tin phim, vui lòng thử lại sau",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// List of available movies, tv-show, anime,... separate by type list, page,..
const handleGetFilmListSortByType = async (req, res) => {
  try {
    let type = req.params.type;
    let filterInfo = req.query;

    const data = await getFilmListSortByType(type, filterInfo);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách phim, vui lòng thử lại sau",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Find films
const handleFindFilms = async (req, res) => {
  try {
    let findInfo = req.query;

    const data = await findFilm(findInfo);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không có kết quả tìm kiếm phù hợp",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Get all film type
const handleGetFilmType = async (req, res) => {
  try {
    const data = await getFilmType();

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy thể loại phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Specific films in film type
const handleGetFilmListByType = async (req, res) => {
  try {
    let filmType = req.params.filmType;
    let filterInfo = req.query;

    const data = await getFilmListByType(filmType, filterInfo);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Get all film countries
const handleGetAllCountries = async (req, res) => {
  try {
    const data = await getFilmCountries();

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy thể loại phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Specific films in film country
const handleGetFilmListByCountry = async (req, res) => {
  try {
    let filmCountry = req.params.filmCountry;
    let filterInfo = req.query;

    const data = await getFilmListByCountries(filmCountry, filterInfo);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

// Specific films by year
const handleGetFilmListByYear = async (req, res) => {
  try {
    let year = req.params.year;
    let filterInfo = req.query;

    const data = await getFilmListByYear(year, filterInfo);

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      error: data.error,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Không tìm thấy phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    });
  }
};

module.exports = {
  handleGetFilmList,
  handleGetFilmInfo,
  handleGetFilmListSortByType,
  handleFindFilms,
  handleGetFilmType,
  handleGetFilmListByType,
  handleGetAllCountries,
  handleGetFilmListByCountry,
  handleGetFilmListByYear,
};
