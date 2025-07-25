const { instance: axios } = require("../config/axios");

// Get new film list
const getFilmList = async (page, limit) => {
  try {
    let data = await axios.get(
      `/danh-sach/phim-moi-cap-nhat-v2?page=${page}&limit=${limit}`
    );
    // Ví dụ V2: GET https://phimapi.com/danh-sach/phim-moi-cap-nhat-v2?page=1
    // Ví dụ V3: GET https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1

    return {
      success: true,
      message: "Lấy phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể lấy thông tin phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Cannot connect to server",
      },
    };
  }
};

// Specific movie information and film episode
const getFilmInfo = async (filmSlug) => {
  try {
    let data = await axios.get(`/phim/${filmSlug}`);

    return {
      success: true,
      message: "Lấy phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể lấy thông tin phim",
      data: [],
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

// List of available movies, tv-show, anime,... separate by type list, page,..
const getFilmListSortByType = async (type, filterInfo) => {
  try {
    // reconstruct url
    let newInfo = {};
    for (const [key, value] of Object.entries(filterInfo)) {
      if (key && value !== "" && value !== "no") {
        newInfo[key] = value;
      }
    }
    const newURL = new URLSearchParams(newInfo);
    const toString = newURL.toString();

    // Working with data
    let data = await axios.get(`/v1/api/danh-sach/${type}?${toString}`);

    return {
      success: true,
      message: "Lấy phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể lấy thông tin phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

// Find films
const findFilm = async (findInfo) => {
  try {
    // reconstruct url
    let newInfo = {};
    for (const [key, value] of Object.entries(findInfo)) {
      if (key && value !== "") {
        newInfo[key] = value;
      }
    }
    const newURL = new URLSearchParams(newInfo);
    const toString = newURL.toString();

    // Working with data
    let data = await axios.get(`/v1/api/tim-kiem?${toString}`);

    return {
      success: true,
      message: "Lấy danh sách phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không có kết quả tìm kiếm phù hợp",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

// Get all film type
const getFilmType = async () => {
  try {
    let data = await axios.get(`/the-loai`);

    return {
      success: true,
      message: "Lấy danh sách thể loại phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không lấy được danh sách thể loại phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

const getFilmListByCategory = async (type, filterInfo) => {
  try {
    // reconstruct url
    let newInfo = {};
    for (const [key, value] of Object.entries(filterInfo)) {
      if (key && value !== "" && value !== "no") {
        newInfo[key] = value;
      }
    }
    const newURL = new URLSearchParams(newInfo);
    const toString = newURL.toString();

    // Working with data
    let data = await axios.get(`/v1/api/the-loai/${type}?${toString}`);

    return {
      success: true,
      message: "Lấy phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể lấy thông tin phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

// Get all film countries
const getFilmCountries = async () => {
  try {
    let data = await axios.get(`/quoc-gia`);

    return {
      success: true,
      message: "Lấy danh sách thể loại phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không lấy được danh sách thể loại phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

const getFilmListByCountries = async (type, filterInfo) => {
  try {
    // reconstruct url
    let newInfo = {};
    for (const [key, value] of Object.entries(filterInfo)) {
      if (key && value !== "") {
        newInfo[key] = value;
      }
    }
    const newURL = new URLSearchParams(newInfo);
    const toString = newURL.toString();

    // Working with data
    let data = await axios.get(`/v1/api/quoc-gia/${type}?${toString}`);

    return {
      success: true,
      message: "Lấy phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể lấy thông tin phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

const getFilmListByYear = async (year, filterInfo) => {
  try {
    // reconstruct url
    let newInfo = {};
    for (const [key, value] of Object.entries(filterInfo)) {
      if (key && value !== "") {
        newInfo[key] = value;
      }
    }
    const newURL = new URLSearchParams(newInfo);
    const toString = newURL.toString();

    // Working with data
    let data = await axios.get(`/v1/api/nam/${year}?${toString}`);

    return {
      success: true,
      message: "Lấy phim thành công",
      data: data.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Không thể lấy thông tin phim",
      data: null,
      error: {
        code: "SERVER_ERROR",
        details: "Không thể kết nối đến server",
      },
    };
  }
};

module.exports = {
  getFilmList,
  getFilmInfo,
  getFilmListSortByType,
  findFilm,
  getFilmType,
  getFilmListByCategory,
  getFilmCountries,
  getFilmListByCountries,
  getFilmListByYear,
};
