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

const {
  handleSendVerifyCode,
  handleSignUp,
  handleSignIn,
  handleGetUserInfo,
  handleSignOut,
  handleRefeshToken,
  handleCheckRecoverCode,
  handleRecoverPassWord,
} = require("../controller/authen_controller");

const {
  handleAddFilmToWatchlist,
  handleGetFilmFromPlayList,
  handleDeleteFilmFromWatchList,
} = require("../controller/personal_controller");

const {
  handleSendContributeForm,
} = require("../controller/contribute_controller");

const {
  handleGetAllUser,
  handleFindUser,
  handleDeleteUser,
  handleGetAllContributeForm,
  handleUpdateContributeForm,
  handlDeleteContributeForm,
} = require("../controller/admin_controller");

const apiRoutes = express.Router();

/* Handle Film API */

// Get new film list
apiRoutes.get("/category/new-film-list", handleGetFilmList);
// List of available movies, tv-show, anime,... separate by type list, page,..
apiRoutes.get("/category/:type", handleGetFilmListSortByType);
// Specific movie information and film episode
apiRoutes.get("/film/:filmSlug", handleGetFilmInfo);
// Get film Episode depend on server and episode slug
apiRoutes.get("/film/:filmSlug/:episodeSlug", handleGetFilmEpisode);
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

/* Handle Authentication */

// Send code when sign up
apiRoutes.post("/auth/verify-code", handleSendVerifyCode);
// Sign Up
apiRoutes.post("/auth/sign-up", handleSignUp);
// Sign In
apiRoutes.post("/auth/sign-in", handleSignIn);
// Sign out
apiRoutes.delete("/auth/sign-out", handleSignOut);
// Refresh token
apiRoutes.post("/auth/refresh-token", handleRefeshToken);
// Check Recover Password
apiRoutes.post("/auth/recover-code/check", handleCheckRecoverCode);
// Recover password
apiRoutes.patch("/auth/recover", handleRecoverPassWord);
// Me
apiRoutes.get("/me", handleGetUserInfo);

/* Personal */
// Get all film in watchlist
apiRoutes.get("/personal/watchlist", handleGetFilmFromPlayList);
// Add Film to watchlist
apiRoutes.post("/personal/watchlist/add", handleAddFilmToWatchlist);
// Delete film in watchlist
apiRoutes.delete("/personal/watchlist/delete", handleDeleteFilmFromWatchList);

/* Contribute */
apiRoutes.post("/contribute/send-form", handleSendContributeForm);

/* Admin */

// Get all user
apiRoutes.get("/admin/users", handleGetAllUser);
// Find User
apiRoutes.post("/admin/users/find", handleFindUser);
// Delete user
apiRoutes.delete("/admin/users/delete", handleDeleteUser);
// Get all contribute form
apiRoutes.get("/admin/contribute-form", handleGetAllContributeForm);
// Update contribute forms status
apiRoutes.post("/admin/contribute-form/update", handleUpdateContributeForm);
// Delete contribute form
apiRoutes.delete("/admin/contribute-form/delete", handlDeleteContributeForm);

module.exports = {
  apiRoutes,
};
