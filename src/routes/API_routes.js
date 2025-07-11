const express = require("express");
const {
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
} = require("../controller/film_controller");

const apiRoutes = express.Router();

/* Handle Film API */

// Get new film list
apiRoutes.get("/category/new-film-list", handleGetFilmList);
// List of available movies, tv-show, anime,... separate by type list, page,..
apiRoutes.get("/category/:type", handleGetFilmListSortByType);
// Specific movie information and film episode
apiRoutes.get("/film/:filmSlug", handleGetFilmInfo);
// Get film Episode depend on server and episode slug 
apiRoutes.get("/film/:filmSlug/:episodeSlug", handleGetFilmEpisode)
// Find films
apiRoutes.get("/find-film", handleFindFilms);
// All film type
apiRoutes.get("/all-film-type", handleGetFilmType);
// Specific films in film type
apiRoutes.get("/film-type/:filmType", handleGetFilmListByType);
// All film countries
apiRoutes.get("/all-film-countries", handleGetAllCountries);
// Specific films in film countries
apiRoutes.get("/film-country/:filmCountry", handleGetFilmListByCountry);
// Specific film by year
apiRoutes.get("/film-year/:year", handleGetFilmListByYear);

module.exports = {
  apiRoutes,
};
