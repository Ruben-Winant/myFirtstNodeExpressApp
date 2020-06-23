var express = require("express");
var router = express.Router();

var db = require("../queries");

//#region members

router.get("/api/members/:id", db.getSingleMember);
router.get("/api/members", db.getAllMembers);
router.post("/api/members/register", db.createMember);
router.post("/api/members/edit/:id", db.updateMember);
router.post("/api/members/remove/:id", db.removeMember);

//#endregion

//#region movies

router.get("/api/movies/:id", db.getSingleMovie);
router.get("/api/movies", db.getAllMovies);
router.post("/api/movies/register", db.createMovie);
router.post("/api/movies/edit/:id", db.updateMovie);
router.post("/api/movies/remove/:id", db.removeMovie);

//#endregion

//#region member_movies

router.get("/api/members/:id/favorites", db.getAllMoviesFromMemberFavorites);
router.post(
  "/api/members/:id/favorites/add/:imdb",
  db.addMovieToMemberFavorites
);
router.post(
  "/api/members/:id/favorites/remove/:imdb",
  db.removeMovieFromMemberFavorites
);

//#endregion

module.exports = router;
