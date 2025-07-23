const {
  getFilmList,
  getFilmInfo,
  getFilmListSortByType,
  findFilm,
  getFilmType,
  getFilmListByCategory,
  getFilmCountries,
  getFilmListByCountries,
  getFilmListByYear,
} = require("../services/film_service");

const { Vibrant } = require("node-vibrant/node");
const { slugify } = require("../utils/modify_text");

// Get new film list
const handleGetFilmList = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;

    const data = await getFilmList(page, limit);

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
    let posterImage = data.data.movie.poster_url;

    if (posterImage && posterImage !== null) {
      const pallete = await Vibrant.from(posterImage).getPalette();
      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data,
        pallete: pallete,
        error: data.error,
      });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
      pallete: null,
      error: data.error,
    });
  } catch (error) {
    console.log(error);
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

// Get film Episode depend on server and episode slug
const handleGetFilmEpisode = async (req, res) => {
  try {
    let filmSlug = req.params.filmSlug;
    let episodeSlug = req.params.episodeSlug;
    let serverSlugQuery = req.query.server;

    const data = await getFilmInfo(filmSlug);

    if (serverSlugQuery !== undefined) {
      let serverData = data.data.episodes.find((server) => {
        return slugify(server.server_name) === serverSlugQuery;
      });

      let filmEpisode = serverData.server_data.find((episode) => {
        return episode.slug === episodeSlug;
      });

      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: filmEpisode,
        error: data.error,
      });
    } else {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data.episodes[0].server_data[0],
        error: data.error,
      });
    }
  } catch (error) {
    console.log(error);
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

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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

    const data = await getFilmListByCategory(filmType, filterInfo);

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
  handleGetFilmEpisode,
  handleGetFilmListSortByType,
  handleFindFilms,
  handleGetFilmType,
  handleGetFilmListByType,
  handleGetAllCountries,
  handleGetFilmListByCountry,
  handleGetFilmListByYear,
};
